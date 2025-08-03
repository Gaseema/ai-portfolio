#!/bin/bash

# Lightsail Deployment Script
# This script sets up the initial deployment environment

set -e

echo "🚀 Setting up AI Portfolio deployment environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    print_error "Please don't run this script as root"
    exit 1
fi

# Update system packages
print_status "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
print_status "Installing Node.js 18..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
    print_status "Node.js $(node --version) installed successfully"
else
    print_status "Node.js $(node --version) already installed"
fi

# Install PM2
print_status "Installing PM2..."
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
    print_status "PM2 installed successfully"
else
    print_status "PM2 already installed"
fi

# Install Git
print_status "Installing Git..."
if ! command -v git &> /dev/null; then
    sudo apt-get install -y git
    print_status "Git installed successfully"
else
    print_status "Git already installed"
fi

# Create application directory
APP_DIR="/opt/bitnami/apache/htdocs/ai-portfolio"
print_status "Creating application directory at $APP_DIR..."
sudo mkdir -p $APP_DIR
sudo chown $USER:$USER $APP_DIR

# Set up PM2 to start on boot
print_status "Setting up PM2 startup script..."
pm2 startup | grep -E '^sudo' | bash || true

print_status "✅ Deployment environment setup complete!"
print_warning "Next steps:"
echo "1. Clone your repository: git clone https://github.com/Gaseema/ai-portfolio.git $APP_DIR"
echo "2. Set up environment variables in $APP_DIR/.env.production"
echo "3. Configure GitHub repository secrets for automatic deployment"
echo "4. Push to main branch to trigger deployment"

print_status "🎉 Ready for deployment!"
