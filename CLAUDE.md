# Project Overview

This is a MERN (MongoDB, Express, React, Node.js) fullstack blog application from the LinkedIn Learning course "React: Creating and Hosting a Full-Stack Site" by Shaun Wassell.

## Tech Stack

### Frontend
- **React** 19.2.1
- **Vite** 7.2.7 (build tool)
- **React Router DOM** 7.10 (routing)
- **Axios** 1.13.2 (HTTP client)
- **Firebase** 12.6.0 (authentication)
- **ESLint** 9.39.1 (linting)

### Backend
- **Node.js** with ES Modules
- **Express** 5.2.1
- **MongoDB** 7.0.0 (database driver)
- **Firebase Admin** 13.6.0 (auth verification)
- **Nodemon** 3.1.11 (dev server)

### Database
- **MongoDB** 8.2.2 (local: `mongodb://127.0.0.1:27017`)
- Database name: `full-stack-react-db`
- Collection: `articles`

### Deployment Target
- **AWS Container Services** (ECS/EKS)
- Domain hosted on AWS (Route 53)
- All services provided by AWS

## Project Structure

```
_MERN_ReactJS_fullstack/
├── back-end/
│   ├── src/
│   │   └── server.js          # Express server with API routes
│   ├── credentials.json       # Firebase service account (not in repo)
│   ├── package.json
│   ├── package-lock.json
│   └── app.yaml               # Google App Engine config (legacy)
│
├── front-end/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── ArticlesListPage.jsx
│   │   │   ├── ArticlePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── CreateAccountPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── App.jsx            # Main app with routing
│   │   ├── Layout.jsx         # Page layout wrapper
│   │   ├── NavBar.jsx         # Navigation component
│   │   ├── ArticlesList.jsx   # Article list component
│   │   ├── CommentsList.jsx   # Comments display
│   │   ├── AddCommentForm.jsx # Comment form
│   │   ├── useUser.js         # Firebase auth hook
│   │   ├── article-content.js # Static article data
│   │   ├── main.jsx           # App entry point + Firebase config
│   │   └── index.css          # Global styles
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── package.json
│
├── .devcontainer/             # VS Code dev container config
├── .github/                   # GitHub workflows
├── .vscode/                   # VS Code settings
├── CLAUDE.md                  # This file
└── README.md                  # Course documentation
```

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/articles/:name` | Get article by name | No |
| POST | `/api/articles/:name/upvote` | Upvote an article | Yes |
| POST | `/api/articles/:name/comments` | Add comment to article | Yes |

## Features

- **Article Blog**: View and read articles (learn-react, learn-node, mongodb)
- **User Authentication**: Login/signup via Firebase Auth
- **Upvoting**: Authenticated users can upvote articles (once per user)
- **Comments**: Authenticated users can post comments on articles
- **SPA Routing**: Client-side routing with React Router

## Development Notes

### Getting Started

1. **Install dependencies:**
   ```bash
   cd front-end && npm install
   cd ../back-end && npm install
   ```

2. **Set up Firebase:**
   - Create a Firebase project
   - Enable Authentication (Email/Password)
   - Download service account credentials as `credentials.json` in `back-end/`
   - Configure Firebase in `front-end/src/main.jsx`

3. **Set up MongoDB:**
   - Install MongoDB 8.2+ locally via `winget install MongoDB.Server`
   - MongoDB runs as a Windows service on port 27017
   - Install MongoDB Shell: `winget install MongoDB.Shell`

4. **Initialize the database:**
   ```javascript
   // In MongoDB shell (mongosh):
   use('full-stack-react-db');
   db.articles.insertMany([
     { name: 'learn-react', upvotes: 0, upvoteIds: [], comments: [] },
     { name: 'learn-node', upvotes: 0, upvoteIds: [], comments: [] },
     { name: 'mongodb', upvotes: 0, upvoteIds: [], comments: [] }
   ])
   ```

5. **Run the development servers:**
   ```bash
   # Terminal 1 - Backend (port 8000)
   cd back-end && npm run dev

   # Terminal 2 - Frontend (port 5173)
   cd front-end && npm run dev
   ```

### Environment Variables

#### Backend
- `PORT` - Server port (default: 8000)
- `MONGODB_USERNAME` - MongoDB Atlas username (optional for local)
- `MONGODB_PASSWORD` - MongoDB Atlas password (optional for local)

#### Frontend
- Firebase config in `main.jsx` (project: `mern-ai-blog-app`)

### NPM Scripts

#### Frontend (`front-end/`)
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

#### Backend (`back-end/`)
- `npm run dev` - Start with nodemon (auto-reload)
- `npm start` - Start production server

## AWS Deployment Plan

### Architecture
- **Frontend**: AWS S3 + CloudFront (static hosting)
- **Backend**: AWS ECS (Fargate) or EKS
- **Database**: Amazon DocumentDB (MongoDB-compatible) or MongoDB Atlas
- **Domain**: AWS Route 53
- **SSL**: AWS Certificate Manager

### Container Strategy
- Dockerize both front-end and back-end
- Use multi-stage builds for optimized images
- Store images in Amazon ECR

### Environment Configuration
- Use AWS Secrets Manager for Firebase credentials
- Use AWS Parameter Store for environment variables
- Configure VPC for secure database access

## Progress Log

- **2025-12-06:** Project initialized, CLAUDE.md created
- **2025-12-08:** Cloned finished application from LinkedIn Learning repo (branch: 06_04_end)
- **2025-12-08:** Documented full project structure and setup instructions
- **2025-12-09:** Set up Firebase authentication (project: mern-ai-blog-app)
- **2025-12-09:** Upgraded all packages to latest versions (React 19, Express 5, etc.)
- **2025-12-09:** Installed MongoDB 8.2.2 locally, initialized database
- **2025-12-09:** Added AWS deployment plan and notes

## Key Decisions

- Uses ES Modules (`"type": "module"`) in both front-end and back-end
- Firebase for authentication (both client-side and server-side verification)
- MongoDB for persistent storage of articles, upvotes, and comments
- Vite as the build tool (faster than Create React App)
- **Target deployment: AWS (migrating from Google App Engine)**
- All packages upgraded to latest versions for security and features

## Known Issues

- Requires `credentials.json` (Firebase service account) - not included in repo
- MongoDB must be running locally or configured with Atlas/DocumentDB credentials
- Express 5 has some API changes from Express 4 (minimal impact on this codebase)

## Future Enhancements

- Add article creation/editing functionality
- Implement user profiles
- Add article categories/tags
- Implement search functionality
- Add pagination for articles and comments
- Create Dockerfile for containerization
- Set up CI/CD pipeline with GitHub Actions
- Implement infrastructure as code (Terraform/CDK)
