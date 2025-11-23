# Deployment Guide

This guide will help you deploy the BuyFromHere e-commerce application:
- **Backend**: Render
- **Frontend**: Vercel

---

## 📋 Prerequisites

1. GitHub repository with your code
2. MongoDB Atlas account (or MongoDB database)
3. PayPal Developer account (for payment integration)
4. Render account
5. Vercel account

---

## 🚀 Backend Deployment on Render

### Step 1: Prepare Backend for Deployment

1. **Create `render.yaml`** (optional, for easier setup):
```yaml
services:
  - type: web
    name: buyfromhere-backend
    env: node
    buildCommand: npm install
    startCommand: npm run backend
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGO_URI
        sync: false
      - key: JWT_SECRET
        sync: false
      - key: FRONTEND_URL
        sync: false
      - key: PAYPAL_CLIENT_ID
        sync: false
```

2. **Update `package.json`** in root to add a production start script:
```json
"scripts": {
  "backend": "nodemon backend/index.js",
  "backend:prod": "node backend/index.js",
  "frontend": "npm run dev --prefix frontend",
  "dev": "concurrently \"npm run frontend\" \"npm run backend\""
}
```

### Step 2: Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `buyfromhere-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node backend/index.js`
   - **Root Directory**: Leave empty (or set to project root)

5. **Add Environment Variables** in Render dashboard:
   ```
   NODE_ENV=production
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=https://your-vercel-app.vercel.app
   PAYPAL_CLIENT_ID=your_paypal_client_id
   PORT=10000 (Render will auto-assign, but you can set this)
   ```

6. Click **"Create Web Service"**
7. Wait for deployment to complete
8. **Copy your backend URL** (e.g., `https://buyfromhere-backend.onrender.com`)

### Step 3: Important Notes for Render

- Render provides a free tier with automatic SSL
- The service may spin down after inactivity (free tier)
- First request after spin-down may take 30-60 seconds
- Uploads folder will be in `backend/uploads` (ephemeral - files will be lost on redeploy)
- **Recommendation**: Consider using Cloudinary for image storage (already in dependencies)

---

## 🎨 Frontend Deployment on Vercel

### Step 1: Prepare Frontend for Deployment

1. **Build the frontend locally** (optional, to test):
```bash
cd frontend
npm run build
```

### Step 2: Deploy on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

6. Click **"Deploy"**
7. Wait for deployment to complete
8. **Copy your frontend URL** (e.g., `https://buyfromhere.vercel.app`)

### Step 3: Update Backend CORS

After getting your Vercel URL, update the `FRONTEND_URL` environment variable in Render:
```
FRONTEND_URL=https://your-vercel-app.vercel.app
```

Then redeploy the backend service.

---

## 🔧 Environment Variables Summary

### Backend (.env or Render Environment Variables)
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
FRONTEND_URL=https://your-vercel-app.vercel.app
PAYPAL_CLIENT_ID=your_paypal_client_id
PORT=10000
```

### Frontend (Vercel Environment Variables)
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## 📁 File Structure for Deployment

```
BuyFromHere/
├── backend/
│   ├── uploads/          # Created automatically (ephemeral on Render)
│   ├── index.js
│   └── ...
├── frontend/
│   ├── uploads/          # For local development
│   ├── dist/             # Build output (created by Vite)
│   └── ...
└── package.json
```

---

## ⚠️ Important Considerations

### 1. Image Uploads
- **Current Setup**: Images are stored in `backend/uploads` on Render
- **Problem**: Render's filesystem is ephemeral - files are lost on redeploy
- **Solution**: 
  - Use Cloudinary (already in dependencies) for production
  - Or use a persistent storage service (AWS S3, etc.)

### 2. CORS Configuration
- Backend CORS is configured to accept requests from `FRONTEND_URL`
- Make sure to set `FRONTEND_URL` in Render after deploying frontend

### 3. Cookie Settings
- JWT cookies are set with `credentials: true`
- Ensure CORS allows credentials
- Cookies should work across Render and Vercel domains

### 4. Database
- Use MongoDB Atlas (free tier available)
- Connection string format: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`

### 5. PayPal Configuration
- Get PayPal Client ID from [PayPal Developer Dashboard](https://developer.paypal.com/)
- Add to backend environment variables

---

## 🧪 Testing Deployment

1. **Test Backend**:
   - Visit: `https://your-backend.onrender.com/api/products`
   - Should return products or empty array

2. **Test Frontend**:
   - Visit your Vercel URL
   - Try logging in/registering
   - Check if API calls work (open browser console)

3. **Test Image Uploads**:
   - Login as admin
   - Try uploading a product image
   - Check if image is accessible via `/uploads/` endpoint

---

## 🔄 Updating After Deployment

### Backend Updates
1. Push changes to GitHub
2. Render will automatically redeploy
3. Or manually trigger redeploy from Render dashboard

### Frontend Updates
1. Push changes to GitHub
2. Vercel will automatically redeploy
3. Or manually trigger redeploy from Vercel dashboard

---

## 🐛 Troubleshooting

### Backend Issues
- **503 Error**: Service might be spinning up (free tier)
- **CORS Error**: Check `FRONTEND_URL` environment variable
- **Database Connection**: Verify `MONGO_URI` is correct
- **Uploads Not Working**: Check `backend/uploads` directory exists

### Frontend Issues
- **API Calls Failing**: Check `VITE_API_URL` environment variable
- **Build Errors**: Check Vercel build logs
- **Images Not Loading**: Verify backend URL is correct

---

## 📝 Next Steps (Recommended)

1. **Set up Cloudinary** for persistent image storage
2. **Add error monitoring** (Sentry, etc.)
3. **Set up custom domain** (optional)
4. **Configure auto-scaling** (if needed)
5. **Set up database backups**

---

## 📞 Support

If you encounter issues:
1. Check Render/Vercel deployment logs
2. Verify all environment variables are set
3. Test API endpoints directly
4. Check browser console for frontend errors

