# Quick Deployment Guide for Render

## Step 1: Push to GitHub

```bash
# Add all files
git add .

# Commit
git commit -m "Ready for Render deployment"

# Push to GitHub
git push origin master
```

## Step 2: Deploy on Render

1. **Go to Render**: https://dashboard.render.com
2. **Click "New +"** → **"Web Service"**
3. **Connect your GitHub repository**
4. **Configure**:
   - **Name**: `victorious-medical`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Starter (Free) or choose paid plan
5. **Click "Create Web Service"**

## Step 3: Wait for Deployment

- Build takes 5-10 minutes
- Your site will be live at: `https://victorious-medical.onrender.com`

## Important Notes

- ✅ Build command: `npm install && npm run build`
- ✅ Start command: `npm start`
- ✅ Node version: Auto-detected (should be 18+)
- ⚠️ Free plan: Service spins down after 15 min inactivity
- ⚠️ First request after spin-down: May take 30-60 seconds

## Your Site is Ready!

Once deployed, your site will be accessible at the Render URL provided.

