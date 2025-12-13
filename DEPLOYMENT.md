# Deployment Guide

This guide explains how to update and deploy your MERN ML Articles Blog to AWS.

## Quick Start

### Windows (PowerShell)
```powershell
# Deploy everything (frontend + backend)
.\deploy-all.ps1

# Or deploy individually
.\deploy-frontend.ps1  # Frontend only
.\deploy-backend.ps1   # Backend only
```

### Linux/Mac (Bash)
```bash
# Make scripts executable (first time only)
chmod +x deploy-*.sh

# Deploy everything (frontend + backend)
./deploy-all.sh

# Or deploy individually
./deploy-frontend.sh  # Frontend only
./deploy-backend.sh   # Backend only
```

## What Gets Deployed

### Frontend (`deploy-frontend`)
1. **Builds** the React application with Vite
2. **Uploads** build files to S3 bucket: `aleaportfolio-frontend`
3. **Invalidates** CloudFront cache (distribution: `E25X4TT6CY4C3`)
4. **Takes:** ~1-2 minutes total
5. **Live at:** https://aleaportfolio.com

### Backend (`deploy-backend`)
1. **Builds** Docker image from `back-end/`
2. **Tags** image for AWS ECR
3. **Pushes** to ECR repository: `ml-articles-backend`
4. **Triggers** deployment on AWS App Runner
5. **Takes:** ~3-5 minutes total
6. **Live at:** https://api.aleaportfolio.com

## When to Deploy What

### Frontend Changes
Deploy frontend when you modify:
- React components (`front-end/src/pages/`, `front-end/src/components/`)
- Styles (`front-end/src/index.css`)
- Static content in `article-content.js`
- Vite configuration
- Frontend dependencies

**Command:** `.\deploy-frontend.ps1` (Windows) or `./deploy-frontend.sh` (Linux/Mac)

### Backend Changes
Deploy backend when you modify:
- Server code (`back-end/src/server.js`)
- API routes or endpoints
- Database connection logic
- Authentication logic
- Backend dependencies (`back-end/package.json`)

**Command:** `.\deploy-backend.ps1` (Windows) or `./deploy-backend.sh` (Linux/Mac)

### Both
Deploy both when:
- API contract changes (endpoints, request/response formats)
- Major feature additions affecting both layers
- Version updates affecting full stack

**Command:** `.\deploy-all.ps1` (Windows) or `./deploy-all.sh` (Linux/Mac)

## Prerequisites

Before deploying, ensure you have:
- ✅ AWS CLI configured (`aws configure`)
- ✅ Docker Desktop running (for backend deployments)
- ✅ Node.js installed
- ✅ Git repository committed (recommended)

## Troubleshooting

### Frontend deployment fails
```powershell
# Check if S3 bucket exists
aws s3 ls s3://aleaportfolio-frontend

# Check CloudFront distribution
aws cloudfront get-distribution --id E25X4TT6CY4C3
```

### Backend deployment fails
```powershell
# Check if Docker is running
docker ps

# Check ECR repository
aws ecr describe-repositories --repository-names ml-articles-backend

# Check App Runner service status
aws apprunner describe-service --service-arn "arn:aws:apprunner:us-east-1:171863532522:service/ml-articles-backend/234e282f2f204ca798114a8cd1632d26" --query 'Service.Status'
```

### Cache invalidation not working
CloudFront cache invalidation can take 1-2 minutes to propagate. If changes aren't visible:
```powershell
# Check invalidation status
aws cloudfront list-invalidations --distribution-id E25X4TT6CY4C3

# Force refresh in browser
# Press Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
```

## Manual Deployment

If scripts fail, you can deploy manually:

### Manual Frontend Deploy
```bash
cd front-end
npm run build
aws s3 sync dist/ s3://aleaportfolio-frontend --delete
aws cloudfront create-invalidation --distribution-id E25X4TT6CY4C3 --paths "/*"
```

### Manual Backend Deploy
```bash
cd back-end
docker build -t ml-articles-backend .
docker tag ml-articles-backend:latest 171863532522.dkr.ecr.us-east-1.amazonaws.com/ml-articles-backend:latest
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 171863532522.dkr.ecr.us-east-1.amazonaws.com
docker push 171863532522.dkr.ecr.us-east-1.amazonaws.com/ml-articles-backend:latest
aws apprunner start-deployment --service-arn "arn:aws:apprunner:us-east-1:171863532522:service/ml-articles-backend/234e282f2f204ca798114a8cd1632d26" --region us-east-1
```

## AWS Resources

### Frontend
- **S3 Bucket:** aleaportfolio-frontend
- **CloudFront:** E25X4TT6CY4C3 (d3n0lhva74il6k.cloudfront.net)
- **URL:** https://aleaportfolio.com, https://www.aleaportfolio.com

### Backend
- **ECR:** ml-articles-backend
- **App Runner:** ml-articles-backend (234e282f2f204ca798114a8cd1632d26)
- **CloudFront:** E2XAAFMAKV81GJ (d2w3j0z3xhs9zw.cloudfront.net)
- **URL:** https://api.aleaportfolio.com

### Database
- **Provider:** MongoDB Atlas
- **Cluster:** Cluster0 (cluster0.zplzm.mongodb.net)
- **Database:** full-stack-react-db
- **Collections:** articles

## Cost Optimization Tips

1. **CloudFront:** Uses pay-as-you-go pricing. Cache invalidations are limited to reduce costs.
2. **App Runner:** Scales to zero when not in use. Monitor usage in AWS Console.
3. **MongoDB Atlas:** Free tier (M0) cluster. Upgrade if you need more storage/performance.
4. **S3:** Pay only for storage and data transfer. Frontend files are typically small.

## CI/CD (Future Enhancement)

Consider setting up GitHub Actions to automatically deploy on push to main:
- Create `.github/workflows/deploy.yml`
- Use AWS credentials as GitHub Secrets
- Auto-deploy on merge to main branch

## Support

For issues or questions:
- Check AWS CloudWatch logs for App Runner
- Review S3 bucket permissions
- Verify CloudFront distribution settings
- Check Route 53 DNS configuration
