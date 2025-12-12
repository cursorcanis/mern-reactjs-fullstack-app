# MERN ML Articles Blog Application

A fullstack blog application for displaying and managing machine learning articles, built with the MERN stack (MongoDB, Express, React, Node.js).

## Author

**Alfredo Alea**

## Features

- View and read machine learning articles
- User authentication with Firebase
- Upvote articles (authenticated users)
- Comment on articles (authenticated users)
- Responsive single-page application
- RESTful API backend
- Cloud deployment on AWS

## Tech Stack

### Frontend
- React 19.2.1
- Vite 7.2.7
- React Router DOM 7.10
- Axios 1.13.2
- Firebase 12.6.0

### Backend
- Node.js with ES Modules
- Express 5.2.1
- MongoDB 7.0.0
- Firebase Admin 13.6.0

### Deployment
- AWS S3 + CloudFront (frontend)
- AWS App Runner (backend)
- MongoDB Atlas (database)
- AWS Route 53 (DNS)
- AWS Certificate Manager (SSL)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB 8.2+ installed locally or MongoDB Atlas account
- Firebase project with Authentication enabled
- AWS account (for deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cursorcanis/mern-reactjs-fullstack-app.git
   cd mern-reactjs-fullstack-app
   ```

2. Install dependencies:
   ```bash
   cd front-end && npm install
   cd ../back-end && npm install
   ```

3. Set up Firebase:
   - Create a Firebase project
   - Enable Authentication (Email/Password)
   - Download service account credentials as `credentials.json` in `back-end/`
   - Configure Firebase in `front-end/src/main.jsx`

4. Set up MongoDB:
   ```javascript
   // In MongoDB shell (mongosh):
   use('full-stack-react-db');
   db.articles.insertMany([
     { name: 'decision-trees', upvotes: 0, upvoteIds: [], comments: [] },
     { name: 'logistic-regression', upvotes: 0, upvoteIds: [], comments: [] },
     { name: 'kmeans-clustering', upvotes: 0, upvoteIds: [], comments: [] }
   ])
   ```

5. Run the development servers:
   ```bash
   # Terminal 1 - Backend (port 8000)
   cd back-end && npm run dev

   # Terminal 2 - Frontend (port 5173)
   cd front-end && npm run dev
   ```

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/articles/:name` | Get article by name | No |
| POST | `/api/articles/:name/upvote` | Upvote an article | Yes |
| POST | `/api/articles/:name/comments` | Add comment to article | Yes |

## Deployment

See [AWS_DEPLOYMENT_GUIDE.md](AWS_DEPLOYMENT_GUIDE.md) for detailed deployment instructions to AWS.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

This is a personal project. Feel free to fork and modify for your own use.
