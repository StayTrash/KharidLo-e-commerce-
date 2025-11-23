# Frontend Deployment on Render - Fix Guide

## 🐛 Error Fixed: "Cannot read properties of undefined (reading 'message')"

This error has been fixed by improving error handling throughout the application. All error displays now use safe optional chaining.

---

## ✅ What Was Fixed

1. **Error Handling**: All components now safely handle undefined errors
2. **Fallback Messages**: Added fallback error messages when error structure is unexpected
3. **Optional Chaining**: Used `?.` operator throughout for safe property access

---

## 🔧 Required Environment Variable for Render

Since you deployed the frontend on Render, you **MUST** set this environment variable:

### In Render Dashboard:

1. Go to your **Web Service** (frontend)
2. Go to **Environment** tab
3. Add this variable:

```env
VITE_API_URL=https://kharidlo-backend.onrender.com
```

**Important:**
- Replace `kharidlo-backend.onrender.com` with your actual backend URL
- **No trailing slash**
- Must include `https://`
- This tells the frontend where to find your backend API

---

## 📋 Render Frontend Configuration

### Build Settings:
- **Build Command**: `npm run build`
- **Start Command**: `npm run preview` (or use a static file server)
- **Root Directory**: `frontend` (if your repo structure has frontend folder)

### Alternative: Static Site on Render

If you're using Render's Static Site service:

1. **Build Command**: `cd frontend && npm install && npm run build`
2. **Publish Directory**: `frontend/dist`
3. **Environment Variable**: Still add `VITE_API_URL`

---

## 🔍 How to Verify It's Working

### 1. Check Environment Variable
- Go to Render Dashboard → Your Frontend Service → Environment
- Verify `VITE_API_URL` is set correctly

### 2. Check Browser Console
- Open your deployed site
- Open browser DevTools (F12)
- Go to Console tab
- Check for any errors

### 3. Check Network Tab
- Open DevTools → Network tab
- Try to load a page
- API calls should go to: `https://kharidlo-backend.onrender.com/api/...`
- If you see calls to `/api/...` (relative), the environment variable is not set

### 4. Test API Connection
- Open browser console
- Type: `console.log(import.meta.env.VITE_API_URL)`
- Should show your backend URL (not empty)

---

## 🚨 Common Issues & Solutions

### Issue 1: Still Getting Error
**Solution:**
1. Make sure you set `VITE_API_URL` in Render
2. **Redeploy** the frontend after setting the variable
3. Environment variables are only available at build time for Vite

### Issue 2: API Calls Going to Wrong URL
**Solution:**
- Check `VITE_API_URL` is set correctly
- Rebuild and redeploy
- Clear browser cache

### Issue 3: Images Not Loading
**Solution:**
- Images should load from: `https://kharidlo-backend.onrender.com/uploads/...`
- Check backend is serving static files correctly
- Verify image paths in database

### Issue 4: CORS Errors
**Solution:**
- Make sure backend has `FRONTEND_URL` set to your Render frontend URL
- Backend CORS should allow your frontend domain

---

## 📝 Complete Environment Variables Checklist

### Frontend (Render):
```env
VITE_API_URL=https://kharidlo-backend.onrender.com
```

### Backend (Render):
```env
NODE_ENV=production
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://your-frontend-url.onrender.com
PAYPAL_CLIENT_ID=your_paypal_client_id
```

---

## 🔄 Redeployment Steps

1. **Set Environment Variable** in Render dashboard
2. **Redeploy** the service (or it will auto-redeploy)
3. **Wait** for build to complete
4. **Test** the application

---

## 💡 Important Notes

1. **Vite Environment Variables**: 
   - Must start with `VITE_` to be exposed to frontend
   - Are embedded at **build time**, not runtime
   - Must rebuild after changing

2. **Render Static Sites**:
   - Environment variables work the same way
   - Rebuild required after changes

3. **Error Handling**:
   - All errors now have safe fallbacks
   - Won't crash if error structure is unexpected

---

## ✅ After Fixing

Your application should now:
- ✅ Display proper error messages instead of crashing
- ✅ Connect to backend API correctly
- ✅ Load images from backend
- ✅ Handle network errors gracefully

---

**Need Help?** Check the browser console for specific error messages and verify all environment variables are set correctly.

