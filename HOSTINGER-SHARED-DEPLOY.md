# Deploy to Hostinger Shared Hosting (Business Plan)

## Your Plan Details
- **Domain:** primolocal.org / www.primolocal.org
- **IP:** 89.116.192.81
- **FTP User:** u652263405
- **Upload Path:** public_html
- **Node.js:** 24.x supported
- **Server:** server1289 (USA AZ)

---

## Step 1: Connect via SSH (Recommended)

Hostinger Business plans include SSH access.

```bash
ssh u652263405@89.116.192.81
```

If SSH isn't enabled yet, activate it in **hPanel → Advanced → SSH Access**.

---

## Step 2: Upload Your App

### Option A: SCP (Fastest)

**From your local machine:**
```bash
scp /home/tommy/primolocal-deploy.tar.gz u652263405@89.116.192.81:~/
```

**Then SSH in and extract:**
```bash
ssh u652263405@89.116.192.81
cd ~
mkdir -p primolocal-app
# Remove old deployment first if updating
rm -rf primolocal-app/*
tar -xzf primolocal-deploy.tar.gz -C primolocal-app/
```

### Option B: FTP (FileZilla / Any FTP Client)

1. Connect with:
   - **Host:** 89.116.192.81
   - **User:** u652263405
   - **Password:** your Hostinger password
   - **Port:** 21

2. Create a folder `primolocal-app` in the home directory (NOT inside `public_html`)
3. Upload ALL contents of `.next/standalone/` into `primolocal-app/`
   - `server.js`
   - `.next/` folder
   - `public/` folder
   - `node_modules/`
   - `package.json`
   - `.env.local`

---

## Step 3: Configure Node.js App in hPanel

1. Log into **hPanel** at https://www.hostinger.com
2. Go to **Websites → Manage → Advanced → Node.js**
3. Click **Create Application** or **Edit** existing:

| Setting | Value |
|---------|-------|
| Node.js version | 24.x |
| Application root | `primolocal-app` |
| Application URL | `https://primolocal.org` |
| Application startup file | `server.js` |
| Environment | Production |

4. Click **Save**

---

## Step 4: Set Environment Variables in hPanel

In the same Node.js app settings, add these **Environment Variables**:

```
NEXT_PUBLIC_SUPABASE_URL=https://ftcjyhwmpaopoxckbevo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0Y2p5aHdtcGFvcG94Y2tiZXZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NDUxNzEsImV4cCI6MjA5MjMyMTE3MX0.HIONzsD-YWQUdfQHp2ds--Z9wyJoGqPDAClnGaqdX0Y
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_ID/YOUR_TOKEN
PORT=3000
```

> **Important:** Replace `DISCORD_WEBHOOK_URL` with your actual webhook URL. If you don't have one, you can add it later.

---

## Step 5: Restart the App

In hPanel Node.js settings:
1. Click **Restart**
2. Wait 10-20 seconds
3. Click **Run NPM Install** (if button available) OR SSH in and run:
   ```bash
   cd ~/primolocal-app
   npm install --production
   ```

---

## Step 6: Verify Deployment

Open in browser:
```
https://primolocal.org
```

If you see errors, check:
1. **hPanel → Node.js → Logs** for startup errors
2. SSH in and run: `cat ~/primolocal-app/.next/logs/*.log` (if logs exist)

---

## Updating the App Later

1. Build locally again: `npm run build`
2. Re-package: `tar -czf primolocal-deploy.tar.gz -C .next standalone/`
3. Upload and extract to `~/primolocal-app/`
4. Restart in hPanel Node.js settings

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| 502 Bad Gateway | App crashed. Check hPanel Node.js logs. |
| Static files not loading (CSS/JS) | Make sure `.next/static/` was uploaded inside the app folder |
| API routes return 404 | Restart the Node.js app in hPanel |
| Images missing | Upload `public/images/` folder to `~/primolocal-app/public/` |
| Discord not notifying | Add `DISCORD_WEBHOOK_URL` to environment variables |

---

## ⚠️ Important: Shared Hosting Limitations

Your Business plan has:
- **3 GB RAM**
- **2 CPU cores**
- **120 max processes**

This should handle the marketing site + CRM for moderate traffic. If you hit performance limits:
1. **VPS route** (which you also have) gives dedicated resources
2. Or upgrade Hostinger plan

---

## Alternative: Deploy to VPS Instead

If you prefer your VPS for full control + better performance:
- Follow `HOSTINGER-DEPLOY.md` (VPS guide) instead
- You'll install Node.js, PM2, and Nginx manually
- More control but more setup

---

**Ready to deploy?** The fastest path is SSH upload + hPanel Node.js config.

**Last Updated:** April 22, 2026
