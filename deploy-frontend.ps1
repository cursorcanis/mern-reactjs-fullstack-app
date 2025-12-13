# Deploy frontend to AWS
# PowerShell script for Windows

Write-Host "Building frontend..." -ForegroundColor Cyan
Set-Location front-end
npm run build

Write-Host "`nUploading to S3..." -ForegroundColor Cyan
aws s3 sync dist/ s3://aleaportfolio-frontend --delete

Write-Host "`nInvalidating CloudFront cache..." -ForegroundColor Cyan
aws cloudfront create-invalidation --distribution-id E25X4TT6CY4C3 --paths "/*"

Write-Host "`n✅ Frontend deployment complete!" -ForegroundColor Green
Write-Host "Changes will be live in 1-2 minutes after cache invalidation." -ForegroundColor Yellow

Set-Location ..
