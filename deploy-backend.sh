#!/bin/bash
# Deploy backend to AWS App Runner

set -e

AWS_ACCOUNT_ID="171863532522"
AWS_REGION="us-east-1"
ECR_REPO="ml-articles-backend"
SERVICE_ARN="arn:aws:apprunner:us-east-1:171863532522:service/ml-articles-backend/234e282f2f204ca798114a8cd1632d26"

echo "Building Docker image..."
cd back-end
docker build -t $ECR_REPO .

echo "Tagging image..."
docker tag $ECR_REPO:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:latest

echo "Logging in to ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

echo "Pushing to ECR..."
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:latest

echo "Deploying to App Runner..."
aws apprunner start-deployment --service-arn "$SERVICE_ARN" --region $AWS_REGION

echo "✅ Backend deployment initiated!"
echo "Check status with: aws apprunner describe-service --service-arn $SERVICE_ARN --region $AWS_REGION --query 'Service.Status'"
