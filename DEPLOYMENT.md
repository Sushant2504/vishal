# Deployment Guide for Render

## Prerequisites
1. A GitHub account
2. Your code pushed to a GitHub repository
3. A Render account (sign up at https://render.com)

## Deployment Steps

### 1. Push Your Code to GitHub

If you haven't already, push your code to GitHub:

```bash
git add .
git commit -m "Ready for deployment"
git push origin master
```

### 2. Deploy on Render

1. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Sign in or create an account

2. **Create New Web Service**
   - Click "New +" button
   - Select "Web Service"

3. **Connect Repository**
   - Connect your GitHub account if not already connected
   - Select your repository: `Victorious-Medical-Trial-2`
   - Click "Connect"

4. **Configure Service**
   - **Name**: `victorious-medical` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `master` (or your main branch)
   - **Root Directory**: Leave empty (or `.` if needed)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Choose Starter (free) or paid plan

5. **Environment Variables** (if needed)
   - Add any environment variables in the "Environment" section
   - For now, you can leave this empty

6. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your app
   - Wait for the build to complete (usually 5-10 minutes)

### 3. Access Your Deployed Site

- Once deployed, you'll get a URL like: `https://victorious-medical.onrender.com`
- Your site will be live and accessible!

### 4. Custom Domain (Optional)

- Go to your service settings
- Click "Custom Domains"
- Add your domain and follow the DNS configuration instructions

## Important Notes

- **Free Plan Limitations**: 
  - Services on free plan spin down after 15 minutes of inactivity
  - First request after spin-down may take 30-60 seconds
  - Consider upgrading to paid plan for always-on service

- **Build Time**: 
  - First build may take 10-15 minutes
  - Subsequent builds are faster (5-10 minutes)

- **Auto-Deploy**: 
  - Render automatically deploys on every push to your main branch
  - You can disable this in settings if needed

## Troubleshooting

If build fails:
1. Check build logs in Render dashboard
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version compatibility
4. Check for any TypeScript or linting errors

If site doesn't load:
1. Check service logs in Render dashboard
2. Verify `start` command is correct
3. Ensure port is correctly configured (Render uses PORT env variable automatically)

## Support

- Render Documentation: https://render.com/docs
- Render Support: https://render.com/support

