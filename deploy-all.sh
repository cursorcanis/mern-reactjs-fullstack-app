#!/bin/bash
# Deploy both frontend and backend to AWS

set -e

echo "=========================================="
echo "Deploying Full Stack Application"
echo "=========================================="

# Deploy backend first
echo ""
echo "Step 1/2: Deploying Backend..."
./deploy-backend.sh

# Deploy frontend
echo ""
echo "Step 2/2: Deploying Frontend..."
./deploy-frontend.sh

echo ""
echo "=========================================="
echo "✅ Full deployment complete!"
echo "=========================================="
echo "Frontend: https://aleaportfolio.com"
echo "API: https://api.aleaportfolio.com"
