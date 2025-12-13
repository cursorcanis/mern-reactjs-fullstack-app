#!/bin/bash
# Deploy frontend to AWS

set -e

echo "Building frontend..."
cd front-end
npm run build

echo "Uploading to S3..."
aws s3 sync dist/ s3://aleaportfolio-frontend --delete

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id E25X4TT6CY4C3 --paths "/*"

echo "✅ Frontend deployment complete!"
echo "Changes will be live in 1-2 minutes after cache invalidation."
