# Vercel Deployment Guide for Dr. Gemini

This guide will walk you through deploying your Dr. Gemini chatbot to Vercel step by step.

## Prerequisites

- A GitHub, GitLab, or Bitbucket account
- Your project code pushed to a Git repository
- A Vercel account (free tier works perfectly)
- Your Google Gemini API key

---

## Step 1: Prepare Your Repository

### 1.1 Ensure Your Code is Committed

Make sure all your changes are committed to Git:

```bash
cd gemini-chatbot-doctor
git add .
git commit -m "Prepare for Vercel deployment"
```

### 1.2 Push to Remote Repository

If you haven't already, push your code to GitHub/GitLab/Bitbucket:

```bash
git push origin main
```

> **Note:** Replace `main` with your branch name if different (e.g., `master`)

---

## Step 2: Create a Vercel Account

1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"**
3. Sign up using your GitHub, GitLab, or Bitbucket account (recommended for easy integration)

---

## Step 3: Import Your Project

### 3.1 Add New Project

1. After logging in, click **"Add New..."** → **"Project"** from your Vercel dashboard
2. You'll see a list of your repositories. Find and click **"Import"** next to your `dr.gemini` or `gemini-chatbot-doctor` repository

### 3.2 Configure Project Settings

Vercel should auto-detect your Vite project, but verify these settings:

- **Framework Preset:** Vite (should be auto-detected)
- **Root Directory:** `gemini-chatbot-doctor` (if your project is in a subdirectory)
- **Build Command:** `npm run build` (should be auto-filled)
- **Output Directory:** `dist` (should be auto-filled)
- **Install Command:** `npm install` (should be auto-filled)

> **Important:** If your project is in the root directory, leave "Root Directory" empty. If it's in `gemini-chatbot-doctor`, set it to `gemini-chatbot-doctor`.

---

## Step 4: Configure Environment Variables

This is **CRITICAL** - Your API key must be set here!

### 4.1 Add Environment Variable

1. In the project configuration page, scroll down to **"Environment Variables"**
2. Click **"Add"** or the **"+"** button
3. Add the following:

   - **Name:** `VITE_API_KEY`
   - **Value:** `AIzaSyDBt2VfZOJatQo_Od-xkzfInBIwlLo88jQ` (your actual API key)
   - **Environment:** Select all three:
     - ☑️ Production
     - ☑️ Preview
     - ☑️ Development

4. Click **"Save"**

> **Security Note:** Never commit your `.env` file to Git. The API key should only be in Vercel's environment variables.

---

## Step 5: Deploy

1. Review all settings one more time
2. Click **"Deploy"** button at the bottom
3. Wait for the build to complete (usually 1-3 minutes)

You'll see the build logs in real-time. The deployment will:
- Install dependencies (`npm install`)
- Build your project (`npm run build`)
- Deploy to Vercel's CDN

---

## Step 6: Verify Deployment

### 6.1 Check Build Status

- If successful: You'll see a green "Ready" status
- If failed: Check the build logs for errors

### 6.2 Test Your Application

1. Click on your deployment URL (e.g., `https://your-project.vercel.app`)
2. Test the chatbot functionality
3. Verify the API key is working correctly

---

## Step 7: Custom Domain (Optional)

### 7.1 Add Custom Domain

1. Go to your project settings
2. Click **"Domains"** tab
3. Enter your domain name
4. Follow Vercel's instructions to configure DNS

---

## Troubleshooting

### Build Fails

**Error: "Module not found"**
- Ensure all dependencies are in `package.json`
- Check that `node_modules` is not committed to Git

**Error: "API_KEY is missing"**
- Double-check environment variable name is exactly `VITE_API_KEY`
- Ensure it's set for all environments (Production, Preview, Development)
- Redeploy after adding environment variables

**Error: "Build command failed"**
- Check build logs for specific TypeScript or build errors
- Test build locally: `npm run build`

### Runtime Errors

**API not working after deployment**
- Verify environment variable is set correctly
- Check browser console for errors
- Ensure API key is valid and has proper permissions

**404 errors on page refresh**
- The `vercel.json` rewrite rules should handle this
- If issues persist, check that `vercel.json` is in the correct location

---

## Updating Your Deployment

### Automatic Deployments

Vercel automatically deploys when you push to your main branch:
1. Make changes to your code
2. Commit and push: `git push origin main`
3. Vercel will automatically build and deploy

### Manual Deployments

1. Go to your project dashboard
2. Click **"Deployments"** tab
3. Click **"Redeploy"** on any previous deployment

---

## Environment Variables Management

### Viewing/Editing Variables

1. Go to Project Settings → **"Environment Variables"**
2. View, edit, or delete variables as needed
3. **Important:** After changing environment variables, you must redeploy

### Best Practices

- ✅ Use different API keys for production and development
- ✅ Never commit `.env` files
- ✅ Use Vercel's environment variables for all secrets
- ✅ Test in Preview environment before Production

---

## Project Structure Reference

```
gemini-chatbot-doctor/
├── .env                    # Local development (not committed)
├── .env.example           # Template (committed)
├── vercel.json            # Vercel configuration
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── index.html             # Entry HTML
├── src/                   # Source code
│   └── App.tsx
├── services/              # API services
│   └── geminiService.ts
└── dist/                  # Build output (generated)
```

---

## Quick Reference Commands

```bash
# Local development
npm run dev

# Build locally (test before deploying)
npm run build

# Preview production build locally
npm run preview

# Check for linting errors
npm run lint
```

---

## Support

If you encounter issues:
1. Check Vercel's [documentation](https://vercel.com/docs)
2. Review build logs in Vercel dashboard
3. Test build locally: `npm run build`
4. Check Vercel community forums

---

## Security Checklist

Before deploying to production:

- [ ] API key is in Vercel environment variables (not in code)
- [ ] `.env` file is in `.gitignore`
- [ ] `.env.example` is committed (without real keys)
- [ ] No hardcoded secrets in source code
- [ ] Dependencies are up to date
- [ ] Build completes successfully locally

---

**Congratulations!** 🎉 Your Dr. Gemini chatbot should now be live on Vercel!

