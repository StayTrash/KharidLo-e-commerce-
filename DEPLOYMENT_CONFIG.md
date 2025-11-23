# Deployment Configuration with Your URLs

## 🌐 Your Deployed URLs

- **Frontend**: https://kharidlo-b4cd.onrender.com
- **Backend**: https://kharidlo-backend.onrender.com

---

## 🔧 Frontend Environment Variables (Render)

### Required Variable:

Go to your **Frontend Web Service** on Render → **Environment** tab:

```env
VITE_API_URL=https://kharidlo-backend.onrender.com
```

**Important:**
- ✅ No trailing slash
- ✅ Must include `https://`
- ✅ Must start with `VITE_` (Vite requirement)

**After setting:**
1. Save changes
2. Wait for auto-redeploy
3. Images and API calls will work

---

## 🔧 Backend Environment Variables (Render)

### Current Configuration:

Go to your **Backend Web Service** on Render → **Environment** tab:

```env
NODE_ENV=production
MONGO_URI=mongodb+srv://admin:admin123@cluster0.nolau.mongodb.net/KharidLo
JWT_SECRET=<your_jwt_secret_here>
FRONTEND_URL=https://kharidlo-b4cd.onrender.com
PAYPAL_CLIENT_ID=AXbf8wKv2Xf-1sPBcb6CxSEmjw1C08qGZeGs3pk05074_JtEoBzqSNw75cTssrEUWfYiHP8osR8xLoLW
PORT=5000
```

**Important Notes:**
- ✅ `FRONTEND_URL` should be: `https://kharidlo-b4cd.onrender.com` (no trailing slash)
- ⚠️ `JWT_SECRET` should be at least 32 characters (generate a new one if needed)
- ✅ `PORT` is optional (Render assigns automatically)

---

## ✅ Verification Checklist

### 1. Frontend Environment Variable
- [ ] `VITE_API_URL` is set to `https://kharidlo-backend.onrender.com`
- [ ] Frontend has been redeployed after setting variable
- [ ] Test: Open browser console, type `console.log(import.meta.env.VITE_API_URL)`
- [ ] Should show: `https://kharidlo-backend.onrender.com`

### 2. Backend Environment Variables
- [ ] `FRONTEND_URL` is set to `https://kharidlo-b4cd.onrender.com` (no trailing slash)
- [ ] `JWT_SECRET` is at least 32 characters long
- [ ] All other variables are set correctly

### 3. Test API Connection
- [ ] Visit: https://kharidlo-backend.onrender.com/api/products
- [ ] Should return products (or empty array, not error)

### 4. Test Image Loading
- [ ] Visit your frontend: https://kharidlo-b4cd.onrender.com
- [ ] Images should load from: `https://kharidlo-backend.onrender.com/uploads/...`
- [ ] Check browser Network tab for image requests

### 5. Test CORS
- [ ] Open frontend in browser
- [ ] Open DevTools → Console
- [ ] Should NOT see CORS errors
- [ ] API calls should work

---

## 🐛 Troubleshooting

### Images Not Loading

**Check 1: Frontend Environment Variable**
```bash
# In browser console on your frontend site:
console.log(import.meta.env.VITE_API_URL)
# Should show: https://kharidlo-backend.onrender.com
```

**Check 2: Image URLs**
- Right-click broken image → Inspect
- Check `src` attribute
- Should be: `https://kharidlo-backend.onrender.com/uploads/image-123.jpg`
- If it's just `/uploads/image-123.jpg`, `VITE_API_URL` is not set

**Check 3: Backend Image Serving**
- Visit directly: `https://kharidlo-backend.onrender.com/uploads/image-123.jpg`
- Replace `image-123.jpg` with actual filename from database
- Should show image (not 404)

### CORS Errors

**Fix:**
- Check backend `FRONTEND_URL` is exactly: `https://kharidlo-b4cd.onrender.com`
- No trailing slash
- Redeploy backend after changing

### API Calls Failing

**Check:**
- Frontend `VITE_API_URL` is set correctly
- Backend is running and accessible
- Network tab shows requests going to backend URL

---

## 📝 Quick Reference

### Frontend (kharidlo-b4cd.onrender.com)
```env
VITE_API_URL=https://kharidlo-backend.onrender.com
```

### Backend (kharidlo-backend.onrender.com)
```env
FRONTEND_URL=https://kharidlo-b4cd.onrender.com
NODE_ENV=production
MONGO_URI=mongodb+srv://admin:admin123@cluster0.nolau.mongodb.net/KharidLo
JWT_SECRET=<strong_random_32+_characters>
PAYPAL_CLIENT_ID=AXbf8wKv2Xf-1sPBcb6CxSEmjw1C08qGZeGs3pk05074_JtEoBzqSNw75cTssrEUWfYiHP8osR8xLoLW
```

---

## 🚀 After Configuration

Once both services are configured correctly:

1. ✅ Frontend will call backend API
2. ✅ Images will load from backend
3. ✅ CORS will allow requests
4. ✅ Authentication will work
5. ✅ All features should function

---

**Need Help?** Check browser console and network tab for specific error messages.

