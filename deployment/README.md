# Deployment Scripts for Lightsail

This directory contains scripts to help with deployment to AWS Lightsail.

## Setup Instructions

### 1. Server Setup

First, make sure your Lightsail server has the necessary tools:

```bash
# SSH into your Lightsail instance
ssh bitnami@your-lightsail-ip

# Install Node.js and npm (if not already installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Git (if not already installed)
sudo apt-get update
sudo apt-get install git

# Create directory for your application
sudo mkdir -p /opt/bitnami/apache/htdocs/ai-portfolio
sudo chown bitnami:bitnami /opt/bitnami/apache/htdocs/ai-portfolio
```

### 2. Initial Deployment

Clone your repository on the server:

```bash
cd /opt/bitnami/apache/htdocs/
git clone https://github.com/Gaseema/ai-portfolio.git
cd ai-portfolio
npm install
npm run build
```

### 3. GitHub Secrets Setup

Add these secrets to your GitHub repository:

1. Go to your GitHub repository
2. Click on Settings → Secrets and variables → Actions
3. Add the following secrets:

- `LIGHTSAIL_HOST`: Your Lightsail instance public IP
- `LIGHTSAIL_USERNAME`: Usually `bitnami` for Bitnami instances
- `LIGHTSAIL_SSH_KEY`: Your private SSH key content
- `LIGHTSAIL_PORT`: SSH port (usually `22`)

### 4. Environment Variables

If your app needs environment variables, create a `.env.production` file on your server:

```bash
# On your Lightsail server
cd /opt/bitnami/apache/htdocs/ai-portfolio
nano .env.production
```

Add your production environment variables:

```
GROQ_API_KEY=your_production_groq_key
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Alternative Deployment Methods

### Method 1: Using PM2 (Recommended for Node.js apps)

```bash
# Start the application with PM2
pm2 start npm --name "ai-portfolio" -- start
pm2 save
pm2 startup
```

### Method 2: Static File Serving

If you want to serve the built files statically:

```bash
# Build the app
npm run build

# Copy build files to Apache document root
sudo cp -r .next/static/* /opt/bitnami/apache/htdocs/
sudo cp -r public/* /opt/bitnami/apache/htdocs/

# Restart Apache
sudo systemctl restart apache2
```

### Method 3: Using Nginx as Reverse Proxy

If you prefer Nginx:

```bash
# Install Nginx
sudo apt update
sudo apt install nginx

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/ai-portfolio
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/ai-portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Troubleshooting

### Common Issues:

1. **Permission Denied**: Make sure the deployment user has proper permissions
2. **Port Already in Use**: Kill existing processes or use a different port
3. **Build Failures**: Check if all dependencies are installed
4. **SSH Connection Issues**: Verify your SSH key and host settings

### Logs:

```bash
# PM2 logs
pm2 logs ai-portfolio

# GitHub Actions logs
# Check the Actions tab in your GitHub repository

# System logs
sudo journalctl -f
```
