import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Support both file-based credentials (local) and environment variable (production)
let credentials;
if (process.env.FIREBASE_CREDENTIALS) {
  credentials = JSON.parse(process.env.FIREBASE_CREDENTIALS);
} else {
  credentials = JSON.parse(fs.readFileSync('./credentials.json'));
}

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});

const app = express();

// CORS middleware
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://aleaportfolio.com',
    'https://www.aleaportfolio.com',
    'https://d2zq5bn4pmn9kz.cloudfront.net',
    'http://localhost:5173' // for local development
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, authtoken');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

let db;

async function connectToDB() {
  const uri = process.env.MONGODB_URI
    || (process.env.MONGODB_USERNAME
      ? `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.zplzm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
      : 'mongodb://127.0.0.1:27017');

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  await client.connect();

  db = client.db('full-stack-react-db');
}

app.get('/api/articles/:name', async (req, res) => {
  const { name } = req.params;
  const article = await db.collection('articles').findOne({ name });
  res.json(article);
});

app.use(async function(req, res, next) {
  const { authtoken } = req.headers;

  if (authtoken) {
    const user = await admin.auth().verifyIdToken(authtoken);
    req.user = user;
    next();
  } else {
    res.sendStatus(400);
  }
});

app.post('/api/articles/:name/upvote', async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;

  const article = await db.collection('articles').findOne({ name });

  const upvoteIds = article.upvoteIds || [];
  const canUpvote = uid && !upvoteIds.includes(uid);

  if (canUpvote) {
    const updatedArticle = await db.collection('articles').findOneAndUpdate({ name }, {
      $inc: { upvotes: 1 },
      $push: { upvoteIds: uid },
    }, {
      returnDocument: "after",
    });

    res.json(updatedArticle);
  } else {
    res.sendStatus(403);
  }
});

app.post('/api/articles/:name/comments', async (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;
  const newComment = { postedBy, text };

  const updatedArticle = await db.collection('articles').findOneAndUpdate({ name }, {
    $push: { comments: newComment }
  }, {
    returnDocument: 'after',
  });

  res.json(updatedArticle);
});

const PORT = process.env.PORT || 8000;

async function start() {
  await connectToDB();
  app.listen(PORT, function() {
    console.log('Server is listening on port ' + PORT);
  });
}

start();