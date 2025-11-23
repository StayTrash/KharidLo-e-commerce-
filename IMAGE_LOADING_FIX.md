# Fix: Images Not Loading on Deployed Frontend

## 🔍 Root Cause

Images aren't loading because `VITE_API_URL` is **not set** in your frontend deployment on Render.

When `VITE_API_URL` is missing:
- `BASE_URL` becomes empty string `""`
- Images try to load from: `/uploads/image.jpg` (relative to frontend domain)
- But images are on backend: `https://kharidlo-backend.onrender.com/uploads/image.jpg`

---

## ✅ Solution: Set Environment Variable

### Step 1: Go to Render Dashboard
1. Open your **Frontend Web Service** on Render
2. Click on **Environment** tab

### Step 2: Add Environment Variable
Click **"Add Environment Variable"** and add:

```env
KEY: VITE_API_URL
VALUE: https://kharidlo-backend.onrender.com
```

**Important:**
- ✅ Must start with `VITE_` (Vite requirement)
- ✅ No trailing slash
- ✅ Use `https://` (not `http://`)
- ✅ Replace `kharidlo-backend.onrender.com` with your actual backend URL

### Step 3: Save and Redeploy
1. Click **"Save Changes"**
2. Render will automatically redeploy
3. Wait for deployment to complete

---

## 🔍 How to Verify It's Working

### Method 1: Browser Console
1. Open your deployed frontend site
2. Open browser DevTools (F12)
3. Go to **Console** tab
4. Type: `console.log(import.meta.env.VITE_API_URL)`
5. Should show: `https://kharidlo-backend.onrender.com`
6. If it shows `undefined` or empty, the variable is not set

### Method 2: Network Tab
1. Open DevTools → **Network** tab
2. Refresh the page
3. Look for image requests
4. Should see requests to: `https://kharidlo-backend.onrender.com/uploads/...`
5. If you see requests to `/uploads/...` (relative), the variable is not set

### Method 3: Inspect Image Source
1. Right-click on a broken image
2. Select **"Inspect"** or **"Inspect Element"**
3. Check the `src` attribute
4. Should be: `https://kharidlo-backend.onrender.com/uploads/image-123.jpg`
5. If it's just `/uploads/image-123.jpg`, the variable is not set

---

## 🐛 Other Possible Issues

### Issue 1: Backend Not Serving Images
**Test:** Visit directly in browser:
```
https://kharidlo-backend.onrender.com/uploads/image-123.jpg
```

**If 404:**
- Images might not exist in `backend/uploads` folder
- On Render, filesystem is ephemeral (files lost on redeploy)
- Consider using Cloudinary for persistent storage

### Issue 2: CORS Error
**Symptom:** Images fail to load, CORS error in console

**Fix:** Make sure backend has:
```env
FRONTEND_URL=https://kharidlo-b4cd.onrender.com
```
(No trailing slash)

### Issue 3: Image Paths in Database
**Check:** Image paths in database should be:
- ✅ `/uploads/image-123.jpg` (starts with `/uploads`)
- ❌ Not `uploads/image-123.jpg` (missing leading slash)
- ❌ Not full URLs unless using external storage

### Issue 4: Backend Uploads Folder Empty
**Problem:** On Render, `backend/uploads` folder is empty because:
- Files are lost on redeploy (ephemeral filesystem)
- New uploads go to `backend/uploads` but don't persist

**Solution:** 
- Re-upload images after deployment
- Or use Cloudinary for persistent storage (recommended)

---

## 📋 Complete Checklist

- [ ] `VITE_API_URL` is set in frontend environment variables
- [ ] `VITE_API_URL` value is: `https://kharidlo-backend.onrender.com`
- [ ] Frontend has been redeployed after setting variable
- [ ] Backend is accessible: `https://kharidlo-backend.onrender.com/api/products`
- [ ] Backend serves static files: `https://kharidlo-backend.onrender.com/uploads/...`
- [ ] Images exist in database with paths like `/uploads/image-123.jpg`
- [ ] CORS is configured correctly in backend

---

## 🔧 Quick Test Commands

### Test Backend API:
```bash
curl https://kharidlo-backend.onrender.com/api/products
```

### Test Image Serving:
```bash
curl -I https://kharidlo-backend.onrender.com/uploads/image-123.jpg
```
(Replace `image-123.jpg` with an actual image filename from your database)

---

## 💡 Important Notes

1. **Vite Environment Variables:**
   - Must start with `VITE_` to be exposed to frontend
   - Are embedded at **build time**, not runtime
   - Must rebuild/redeploy after changing

2. **Render Filesystem:**
   - Files in `backend/uploads` are **ephemeral**
   - Lost on redeploy or service restart
   - Consider Cloudinary for production

3. **Image Paths:**
   - Database should store: `/uploads/filename.jpg`
   - Frontend converts to: `https://backend-url/uploads/filename.jpg`
   - This happens via `getImageUrl()` utility

---

## 🚀 After Fixing

Once `VITE_API_URL` is set and frontend is redeployed:
1. Images should load from backend
2. Check browser console for any remaining errors
3. Verify images display correctly
4. Test on different pages (home, product details, cart, etc.)

---

**Still not working?** Check browser console for specific error messages and verify all steps above.

