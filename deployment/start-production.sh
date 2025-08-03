#!/bin/bash

# Production startup script for AI Portfolio
# This script sets up the environment and starts the application on port 3001

echo "🚀 Starting AI Portfolio production server..."

# Set environment variables
export NODE_ENV=production
export PORT=3001

# Navigate to application directory
cd /opt/bitnami/apache/htdocs/ai-portfolio

# Create logs directory
mkdir -p logs

# Start with PM2 using ecosystem config
pm2 start ecosystem.config.json

# Save PM2 configuration
pm2 save

echo "✅ AI Portfolio is running on port 3001"
echo "🌐 Access your app at: http://your-server-ip:3001"
echo "📊 Monitor with: pm2 monit"
echo "📝 View logs with: pm2 logs ai-portfolio"
