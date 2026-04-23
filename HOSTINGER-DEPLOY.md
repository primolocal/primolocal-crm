# Deploy PrimoLocal CRM to Hostinger VPS

## Prerequisites

- Hostinger VPS with Ubuntu (22.04 or 24.04 recommended)
- Root or sudo SSH access
- Domain pointed to VPS IP (`primolocal.org`)

---

## Step 1: Connect to VPS

```bash
ssh root@YOUR_VPS_IP
```

---

## Step 2: Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
apt-get install -y nodejs
node -v  # Should show v24.x
npm -v
```

---

## Step 3: Install PM2 (Process Manager)

```bash
npm install -g pm2
pm2 startup
# Run the command PM2 outputs to enable startup on boot
```

---

## Step 4: Upload Your Code

### Option A: ZIP Upload (Recommended)

**On your local machine:**
```bash
cd /home/tommy/PrimoLocal/crm
# Build the app
npm run build

# Create deployment package
mkdir -p deploy
cp -r .next/standalone/* deploy/
cp -r .next/static deploy/.next/
cp -r public deploy/
cp package.json deploy/
cp ecosystem.config.cjs deploy/
cp .env.local deploy/
cd deploy
zip -r ../primolocal-deploy.zip .
```

**Upload to VPS:**
```bash
scp primolocal-deploy.zip root@YOUR_VPS_IP:/tmp/
```

**On VPS:**
```bash
mkdir -p /var/www/primolocal
cd /var/www/primolocal
unzip /tmp/primolocal-deploy.zip
npm install --production
```

### Option B: Git Clone (If using Git)

```bash
cd /var/www
git clone YOUR_REPO_URL primolocal
cd primolocal
npm install
npm run build
# Copy static files to standalone
cp -r .next/static .next/standalone/.next/
cp -r public .next/standalone/
```

---

## Step 5: Set Environment Variables

```bash
cd /var/www/primolocal
nano .env.local
```

Paste your actual values:
```
NEXT_PUBLIC_SUPABASE_URL=https://ftcjyhwmpaopoxckbevo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0Y2p5aHdtcGFvcG94Y2tiZXZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NDUxNzEsImV4cCI6MjA5MjMyMTE3MX0.HIONzsD-YWQUdfQHp2ds--Z9wyJoGqPDAClnGaqdX0Y
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_ID/YOUR_TOKEN
PORT=3000
```

Save: `Ctrl+O`, `Enter`, `Ctrl+X`

---

## Step 6: Start with PM2

```bash
cd /var/www/primolocal
pm2 start server.js --name primolocal -- -p 3000
pm2 save
```

Check status:
```bash
pm2 status
pm2 logs primolocal
```

---

## Step 7: Install & Configure Nginx (Reverse Proxy)

```bash
apt update
apt install -y nginx
certbot --nginx -d primolocal.org -d www.primolocal.org
```

Create Nginx config:
```bash
nano /etc/nginx/sites-available/primolocal
```

Paste:
```nginx
server {
    listen 80;
    server_name primolocal.org www.primolocal.org;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name primolocal.org www.primolocal.org;

    ssl_certificate /etc/letsencrypt/live/primolocal.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/primolocal.org/privkey.pem;

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

Enable:
```bash
ln -s /etc/nginx/sites-available/primolocal /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

---

## Step 8: Set Up SSL (Let's Encrypt)

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d primolocal.org -d www.primolocal.org
```

---

## Step 9: Firewall

```bash
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw enable
```

---

## Updating the App Later

```bash
cd /var/www/primolocal
# Upload new build files
# Restart
pm2 restart primolocal
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Port already in use | `lsof -ti:3000 | xargs kill -9` then restart |
| PM2 won't start | Check logs: `pm2 logs primolocal` |
| 502 Bad Gateway | Make sure Node app is running: `pm2 status` |
| Static files missing | Ensure `.next/static` is copied to standalone dir |
| Discord webhook fails | Check `DISCORD_WEBHOOK_URL` is set in `.env.local` |

---

**Last Updated:** April 22, 2026
