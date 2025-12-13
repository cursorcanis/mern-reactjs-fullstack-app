# Deploy backend to AWS App Runner
# PowerShell script for Windows

$AWS_ACCOUNT_ID = "171863532522"
$AWS_REGION = "us-east-1"
$ECR_REPO = "ml-articles-backend"
$SERVICE_ARN = "arn:aws:apprunner:us-east-1:171863532522:service/ml-articles-backend/234e282f2f204ca798114a8cd1632d26"

Write-Host "Building Docker image..." -ForegroundColor Cyan
Set-Location back-end
docker build -t $ECR_REPO .

Write-Host "`nTagging image..." -ForegroundColor Cyan
docker tag "${ECR_REPO}:latest" "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}:latest"

Write-Host "`nLogging in to ECR..." -ForegroundColor Cyan
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

Write-Host "`nPushing to ECR..." -ForegroundColor Cyan
docker push "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}:latest"

Write-Host "`nDeploying to App Runner..." -ForegroundColor Cyan
aws apprunner start-deployment --service-arn $SERVICE_ARN --region $AWS_REGION

Write-Host "`n✅ Backend deployment initiated!" -ForegroundColor Green
Write-Host "Check status with: aws apprunner describe-service --service-arn $SERVICE_ARN --region $AWS_REGION --query 'Service.Status'" -ForegroundColor Yellow

Set-Location ..
