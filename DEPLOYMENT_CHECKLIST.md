# Quick Deployment Checklist

## ✅ Pre-Deployment Setup Complete

Your project is now configured for deployment! Here's what was changed:

### Backend Changes:
- ✅ Uploads path now switches between `frontend/uploads` (dev) and `backend/uploads` (production)
- ✅ CORS configured to use `FRONTEND_URL` environment variable
- ✅ Production start script added: `npm run backend:prod`

### Frontend Changes:
- ✅ API URLs now use `VITE_API_URL` environment variable
- ✅ Works with local proxy (dev) and production URL

---

## 🚀 Deployment Steps

### 1. Backend on Render

**Environment Variables to Set:**
```
NODE_ENV=production
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://your-vercel-app.vercel.app (set after frontend deploy)
PAYPAL_CLIENT_ID=your_paypal_client_id
```

**Start Command:** `node backend/index.js`

**After deployment, copy your backend URL** (e.g., `https://buyfromhere-backend.onrender.com`)

---

### 2. Frontend on Vercel

**Environment Variable to Set:**
```
VITE_API_URL=https://your-backend-url.onrender.com
```

**Root Directory:** `frontend`
**Build Command:** `npm run build`
**Output Directory:** `dist`

**After deployment, copy your frontend URL** (e.g., `https://buyfromhere.vercel.app`)

---

### 3. Update Backend CORS

Go back to Render and update:
```
FRONTEND_URL=https://your-vercel-app.vercel.app
```

Redeploy the backend service.

---

## 📝 Important Notes

1. **Image Uploads**: Files in `backend/uploads` on Render are **ephemeral** (lost on redeploy)
   - Consider using Cloudinary for production (already in dependencies)

2. **First Request**: Render free tier may take 30-60 seconds on first request after inactivity

3. **Testing**: 
   - Test backend: `https://your-backend.onrender.com/api/products`
   - Test frontend: Visit your Vercel URL and check browser console

---

## 📚 Full Documentation

See `DEPLOYMENT.md` for detailed step-by-step instructions.

