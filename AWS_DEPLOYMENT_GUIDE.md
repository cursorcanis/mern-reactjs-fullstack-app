# AWS Deployment Guide for MERN ML Articles Blog

## Domain: aleaportfolio.com

---

## Architecture Overview

```
                    ┌─────────────────┐
                    │   Route 53      │
                    │ aleaportfolio.com│
                    └────────┬────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
    ┌─────────▼─────────┐       ┌──────────▼──────────┐
    │   CloudFront      │       │   CloudFront        │
    │   (Frontend)      │       │   (API)             │
    │ aleaportfolio.com │       │ api.aleaportfolio.com│
    └─────────┬─────────┘       └──────────┬──────────┘
              │                             │
    ┌─────────▼─────────┐       ┌──────────▼──────────┐
    │   S3 Bucket       │       │   App Runner/ECS    │
    │   (Static Files)  │       │   (Node.js API)     │
    └───────────────────┘       └──────────┬──────────┘
                                           │
                                ┌──────────▼──────────┐
                                │   MongoDB Atlas     │
                                │   (Database)        │
                                └─────────────────────┘
```

---

## Prerequisites

1. AWS Account with admin access
2. AWS CLI installed and configured
3. Domain registered (aleaportfolio.com)
4. MongoDB Atlas account (free tier works)

---

## Step 1: Set Up MongoDB Atlas

### 1.1 Create MongoDB Atlas Cluster

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Sign up / Log in
3. Create a new project: "ml-articles-blog"
4. Build a Database → Select FREE tier (M0)
5. Choose AWS as provider, select region closest to your users (e.g., us-east-1)
6. Name cluster: "ml-articles-cluster"
7. Click "Create Cluster"

### 1.2 Configure Database Access

1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Authentication Method: Password
4. Username: `ml_articles_user`
5. Password: Generate a secure password (save this!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### 1.3 Configure Network Access

1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. For initial setup, click "Allow Access from Anywhere" (0.0.0.0/0)
   - Note: For production, you'll want to restrict to your App Runner IP ranges
4. Click "Confirm"

### 1.4 Get Connection String

1. Go to "Database" → Click "Connect" on your cluster
2. Select "Connect your application"
3. Driver: Node.js, Version: 5.5 or later
4. Copy the connection string:
   ```
   mongodb+srv://ml_articles_user:<password>@ml-articles-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password

### 1.5 Initialize Database

Connect to MongoDB Atlas and create the articles collection:

```javascript
// Using mongosh or MongoDB Compass, connect to your Atlas cluster
use full-stack-react-db

db.articles.insertMany([
  { name: 'decision-trees', upvotes: 0, upvoteIds: [], comments: [] },
  { name: 'logistic-regression', upvotes: 0, upvoteIds: [], comments: [] },
  { name: 'kmeans-clustering', upvotes: 0, upvoteIds: [], comments: [] }
])
```

---

## Step 2: Request SSL Certificate (ACM)

### 2.1 Request Certificate

1. Go to AWS Console → Certificate Manager (ACM)
2. **IMPORTANT**: Select region **us-east-1** (required for CloudFront)
3. Click "Request a certificate"
4. Select "Request a public certificate"
5. Add domain names:
   - `aleaportfolio.com`
   - `*.aleaportfolio.com` (wildcard for subdomains)
6. Validation method: DNS validation
7. Click "Request"

### 2.2 Validate Certificate

1. Click on the certificate to see details
2. Click "Create records in Route 53" (if domain is in Route 53)
   - OR manually add the CNAME records to your DNS provider
3. Wait for status to change to "Issued" (usually 5-30 minutes)

---

## Step 3: Deploy Frontend to S3 + CloudFront

### 3.1 Build Frontend for Production

First, update the frontend to use the production API URL:

```bash
# In front-end folder, create .env.production
```

Create file `front-end/.env.production`:
```
VITE_API_URL=https://api.aleaportfolio.com
```

Update `front-end/vite.config.js` for production:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  },
  // Production API URL
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(
      process.env.NODE_ENV === 'production'
        ? 'https://api.aleaportfolio.com'
        : ''
    )
  }
})
```

Build the frontend:
```bash
cd front-end
npm run build
```

### 3.2 Create S3 Bucket

```bash
# Create bucket (must be globally unique)
aws s3 mb s3://aleaportfolio-frontend --region us-east-1

# Enable static website hosting
aws s3 website s3://aleaportfolio-frontend --index-document index.html --error-document index.html
```

### 3.3 Configure S3 Bucket Policy

Create `bucket-policy.json`:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::aleaportfolio-frontend/*"
    }
  ]
}
```

Apply policy:
```bash
aws s3api put-bucket-policy --bucket aleaportfolio-frontend --policy file://bucket-policy.json
```

### 3.4 Upload Frontend Build

```bash
cd front-end
aws s3 sync dist/ s3://aleaportfolio-frontend --delete
```

### 3.5 Create CloudFront Distribution

1. Go to AWS Console → CloudFront
2. Click "Create Distribution"
3. Origin Settings:
   - Origin Domain: `aleaportfolio-frontend.s3.us-east-1.amazonaws.com`
   - Origin Access: Origin access control settings (recommended)
   - Create new OAC
4. Default Cache Behavior:
   - Viewer Protocol Policy: Redirect HTTP to HTTPS
   - Allowed HTTP Methods: GET, HEAD
   - Cache Policy: CachingOptimized
5. Settings:
   - Alternate domain name (CNAME): `aleaportfolio.com`, `www.aleaportfolio.com`
   - Custom SSL Certificate: Select your ACM certificate
   - Default Root Object: `index.html`
6. Create Distribution

### 3.6 Configure Error Pages for SPA Routing

1. Go to CloudFront Distribution → Error Pages
2. Create custom error response:
   - HTTP Error Code: 403
   - Customize Error Response: Yes
   - Response Page Path: /index.html
   - HTTP Response Code: 200
3. Repeat for 404 error

---

## Step 4: Deploy Backend to AWS App Runner

### 4.1 Push Docker Image to ECR

```bash
# Create ECR repository
aws ecr create-repository --repository-name ml-articles-backend --region us-east-1

# Get ECR login
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

# Build and push image
cd back-end
docker build -t ml-articles-backend .
docker tag ml-articles-backend:latest YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/ml-articles-backend:latest
docker push YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/ml-articles-backend:latest
```

### 4.2 Create App Runner Service

1. Go to AWS Console → App Runner
2. Click "Create service"
3. Source:
   - Repository type: Container registry
   - Provider: Amazon ECR
   - Container image URI: Select your ECR image
4. Deployment settings:
   - Deployment trigger: Manual (or Automatic for CI/CD)
   - ECR access role: Create new service role
5. Configure service:
   - Service name: `ml-articles-api`
   - CPU: 0.25 vCPU
   - Memory: 0.5 GB
   - Port: 8000
   - Environment variables:
     - `MONGODB_USERNAME`: your_atlas_username
     - `MONGODB_PASSWORD`: your_atlas_password
     - `FIREBASE_CREDENTIALS`: (paste your entire credentials.json as a single line)
     - `PORT`: 8000
6. Click "Create & Deploy"

### 4.3 Note the App Runner URL

After deployment, note the default URL (e.g., `https://xxxxx.us-east-1.awsapprunner.com`)

---

## Step 5: Set Up Custom Domain for API

### 5.1 Create CloudFront Distribution for API

1. Go to CloudFront → Create Distribution
2. Origin Settings:
   - Origin Domain: Your App Runner URL (without https://)
   - Protocol: HTTPS only
3. Default Cache Behavior:
   - Viewer Protocol Policy: Redirect HTTP to HTTPS
   - Allowed HTTP Methods: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
   - Cache Policy: CachingDisabled (APIs shouldn't be cached)
   - Origin Request Policy: AllViewer
4. Settings:
   - Alternate domain name: `api.aleaportfolio.com`
   - Custom SSL Certificate: Select your ACM certificate
5. Create Distribution

---

## Step 6: Configure Route 53 DNS

### 6.1 Create Hosted Zone (if not exists)

1. Go to Route 53 → Hosted Zones
2. Create hosted zone for `aleaportfolio.com`
3. Note the NS records and update your domain registrar

### 6.2 Create DNS Records

**Record 1: Frontend (aleaportfolio.com)**
- Record name: (leave empty for apex domain)
- Record type: A
- Alias: Yes
- Route traffic to: CloudFront distribution (frontend)

**Record 2: Frontend www**
- Record name: www
- Record type: A
- Alias: Yes
- Route traffic to: CloudFront distribution (frontend)

**Record 3: API Subdomain**
- Record name: api
- Record type: A
- Alias: Yes
- Route traffic to: CloudFront distribution (API)

---

## Step 7: Update Frontend API Calls

Update `front-end/src/pages/ArticlePage.jsx` and other files to use the API URL:

```javascript
// Add at the top of files that make API calls
const API_URL = import.meta.env.PROD ? 'https://api.aleaportfolio.com' : '';

// Then use:
const response = await axios.get(`${API_URL}/api/articles/${name}`);
```

Rebuild and redeploy frontend:
```bash
cd front-end
npm run build
aws s3 sync dist/ s3://aleaportfolio-frontend --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

---

## Step 8: Verify Deployment

1. Visit https://aleaportfolio.com - Should show your frontend
2. Visit https://api.aleaportfolio.com/api/articles/decision-trees - Should return JSON
3. Test article pages and authentication

---

## Cost Estimates (Monthly)

| Service | Estimated Cost |
|---------|---------------|
| S3 | ~$1-2 |
| CloudFront | ~$1-5 (depends on traffic) |
| App Runner | ~$5-15 (0.25 vCPU) |
| Route 53 | ~$0.50/hosted zone |
| ACM | Free |
| MongoDB Atlas (M0) | Free |
| **Total** | **~$8-25/month** |

---

## Troubleshooting

### CORS Issues
Add CORS headers to your backend:
```javascript
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://aleaportfolio.com');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authtoken');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
```

### SSL Certificate Not Validating
- Ensure you're in us-east-1 region for ACM
- DNS validation records must be exact matches
- Wait up to 30 minutes for propagation

### App Runner Not Starting
- Check CloudWatch logs in App Runner console
- Verify environment variables are set correctly
- Ensure MongoDB Atlas IP whitelist includes 0.0.0.0/0

---

## Alternative: Simplified Deployment with AWS Amplify

If the above seems complex, AWS Amplify can handle much of this automatically:

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize Amplify in your project
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

Amplify handles S3, CloudFront, and CI/CD automatically.

---

## Quick Reference Commands

```bash
# Rebuild and deploy frontend
cd front-end && npm run build && aws s3 sync dist/ s3://aleaportfolio-frontend --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id XXXXX --paths "/*"

# Update backend image
cd back-end
docker build -t ml-articles-backend .
docker tag ml-articles-backend:latest ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/ml-articles-backend:latest
docker push ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/ml-articles-backend:latest

# View App Runner logs
aws logs tail /aws/apprunner/ml-articles-api --follow
```
