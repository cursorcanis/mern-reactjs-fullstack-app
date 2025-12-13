# Deploy both frontend and backend to AWS
# PowerShell script for Windows

Write-Host "==========================================" -ForegroundColor Magenta
Write-Host "Deploying Full Stack Application" -ForegroundColor Magenta
Write-Host "==========================================" -ForegroundColor Magenta

# Deploy backend first
Write-Host "`nStep 1/2: Deploying Backend..." -ForegroundColor Yellow
& .\deploy-backend.ps1

# Deploy frontend
Write-Host "`nStep 2/2: Deploying Frontend..." -ForegroundColor Yellow
& .\deploy-frontend.ps1

Write-Host "`n==========================================" -ForegroundColor Magenta
Write-Host "✅ Full deployment complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Magenta
Write-Host "Frontend: https://aleaportfolio.com" -ForegroundColor Cyan
Write-Host "API: https://api.aleaportfolio.com" -ForegroundColor Cyan
