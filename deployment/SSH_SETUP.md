# SSH Key Setup for GitHub Actions

This guide helps you set up SSH keys for automatic deployment to your Lightsail server.

## 1. Generate SSH Key (if you don't have one)

On your local machine:

```bash
# Generate a new SSH key
ssh-keygen -t rsa -b 4096 -C "github-actions@yourdomain.com"

# When prompted, save it as: ~/.ssh/lightsail_deploy
# Set a passphrase or leave empty for automation
```

## 2. Copy Public Key to Lightsail Server

```bash
# Copy the public key to your server
ssh-copy-id -i ~/.ssh/lightsail_deploy.pub bitnami@YOUR_LIGHTSAIL_IP

# Or manually copy it:
cat ~/.ssh/lightsail_deploy.pub
# Then SSH into your server and add it to ~/.ssh/authorized_keys
```

## 3. Test SSH Connection

```bash
# Test the connection
ssh -i ~/.ssh/lightsail_deploy bitnami@YOUR_LIGHTSAIL_IP

# If successful, you should be able to connect without password
```

## 4. Add to GitHub Secrets

1. Get your private key content:

```bash
cat ~/.ssh/lightsail_deploy
```

2. Copy the entire content (including `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----`)

3. Go to your GitHub repository → Settings → Secrets and variables → Actions

4. Add these secrets:
   - `LIGHTSAIL_HOST`: Your server's public IP address
   - `LIGHTSAIL_USERNAME`: `bitnami` (or your server username)
   - `LIGHTSAIL_SSH_KEY`: The private key content you copied
   - `LIGHTSAIL_PORT`: `22` (or your custom SSH port)

## 5. Security Best Practices

- Use a dedicated SSH key just for deployment
- Consider restricting the key to specific commands if possible
- Regularly rotate your SSH keys
- Monitor your server logs for unauthorized access attempts

## 6. Troubleshooting

### Permission Denied

```bash
# Check SSH key permissions
chmod 600 ~/.ssh/lightsail_deploy
chmod 644 ~/.ssh/lightsail_deploy.pub
```

### Host Key Verification Failed

```bash
# Add server to known hosts
ssh-keyscan -H YOUR_LIGHTSAIL_IP >> ~/.ssh/known_hosts
```

### Connection Timeout

- Check your Lightsail security groups/firewall
- Ensure port 22 (SSH) is open
- Verify your server's public IP address
