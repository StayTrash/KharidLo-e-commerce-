# Environment Variables for Deployment

This guide lists all environment variables needed for deploying your BuyFromHere application.

---

## 🔧 Backend Environment Variables (Render)

Add these in your **Render Dashboard** → **Environment** section:

### Required Variables:

```env
NODE_ENV=production
```

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```
**How to get:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create/select your cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `<dbname>` with your database name

```env
JWT_SECRET=your_super_secret_random_string_here_minimum_32_characters
```
**How to generate:**
- Use a strong random string (minimum 32 characters)
- You can use: `openssl rand -base64 32` in terminal
- Or use an online generator: https://randomkeygen.com/

```env
FRONTEND_URL=https://your-vercel-app.vercel.app
```
**Important:** 
- Set this **AFTER** you deploy your frontend to Vercel
- Replace `your-vercel-app` with your actual Vercel app name
- Example: `https://buyfromhere.vercel.app`

```env
PAYPAL_CLIENT_ID=your_paypal_client_id_here
```
**How to get:**
1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/)
2. Log in with your PayPal account
3. Go to "My Apps & Credentials"
4. Create a new app (or use existing)
5. Copy the "Client ID" (not the secret)
6. For production, use "Live" credentials
7. For testing, use "Sandbox" credentials

### Optional Variables:

```env
PORT=10000
```
**Note:** Render automatically assigns a port, but you can set this if needed.

---

## 🎨 Frontend Environment Variables (Vercel)

Add these in your **Vercel Dashboard** → **Project Settings** → **Environment Variables**:

### Required Variables:

```env
VITE_API_URL=https://kharidlo-backend.onrender.com
```
**Important:**
- Replace `kharidlo-backend.onrender.com` with your actual Render backend URL
- Example: `https://buyfromhere-backend.onrender.com`
- **Do NOT** include a trailing slash
- This is the base URL where your backend API is hosted

### Optional Variables (if needed):

```env
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id_here
```
**Note:** Only if you need PayPal client ID in frontend (usually not needed as backend provides it)

---

## 📋 Quick Setup Checklist

### Step 1: Backend on Render
- [ ] Set `NODE_ENV=production`
- [ ] Set `MONGO_URI` (from MongoDB Atlas)
- [ ] Set `JWT_SECRET` (generate a strong random string)
- [ ] Set `PAYPAL_CLIENT_ID` (from PayPal Developer)
- [ ] **Leave `FRONTEND_URL` empty for now** (set after frontend deploy)

### Step 2: Deploy Backend
- [ ] Deploy backend to Render
- [ ] Copy your backend URL (e.g., `https://kharidlo-backend.onrender.com`)

### Step 3: Frontend on Vercel
- [ ] Set `VITE_API_URL` to your Render backend URL
- [ ] Deploy frontend to Vercel
- [ ] Copy your frontend URL (e.g., `https://buyfromhere.vercel.app`)

### Step 4: Update Backend CORS
- [ ] Go back to Render
- [ ] Set `FRONTEND_URL` to your Vercel frontend URL
- [ ] Redeploy backend (or it will auto-redeploy)

---

## 🔐 Security Best Practices

### 1. JWT Secret
- ✅ Use a long, random string (minimum 32 characters)
- ✅ Never commit to Git
- ✅ Use different secrets for development and production
- ❌ Don't use simple words or predictable patterns

### 2. MongoDB URI
- ✅ Use strong database password
- ✅ Enable IP whitelist in MongoDB Atlas (add Render IPs)
- ✅ Use connection string with authentication
- ❌ Never expose in client-side code

### 3. PayPal Client ID
- ✅ Use Sandbox credentials for testing
- ✅ Use Live credentials for production
- ✅ Keep Client Secret secure (backend only)
- ❌ Don't expose secrets in frontend

### 4. Environment Variables
- ✅ Store all sensitive data in environment variables
- ✅ Never hardcode secrets in code
- ✅ Use different values for dev/staging/production
- ❌ Don't commit `.env` files to Git

---

## 🧪 Testing Environment Variables

### Backend Test:
```bash
# Test if backend can connect to MongoDB
curl https://your-backend.onrender.com/api/products

# Should return products or empty array (not error)
```

### Frontend Test:
1. Open browser console on your Vercel site
2. Check Network tab
3. API calls should go to your Render backend URL
4. Images should load from: `https://your-backend.onrender.com/uploads/...`

---

## 📝 Example Values (DO NOT USE THESE - Generate Your Own!)

### Backend (.env on Render):
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://admin:SecurePass123@cluster0.abc123.mongodb.net/buyfromhere?retryWrites=true&w=majority
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
FRONTEND_URL=https://buyfromhere.vercel.app
PAYPAL_CLIENT_ID=AeA1QIZXiflr1_-0AzP1gV1U1a1b1c1d1e1f1g1h1i1j1k1l1m1n1o1p1q1r1s1t1u1v1w1x1y1z1
```

### Frontend (Vercel Environment Variables):
```env
VITE_API_URL=https://kharidlo-backend.onrender.com
```

---

## 🐛 Troubleshooting

### Issue: Backend can't connect to MongoDB
**Solution:**
- Check `MONGO_URI` is correct
- Verify password doesn't have special characters (URL encode if needed)
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for Render)
- Verify database name is correct

### Issue: CORS errors in frontend
**Solution:**
- Check `FRONTEND_URL` in Render matches your Vercel URL exactly
- No trailing slash
- Include `https://` protocol
- Redeploy backend after changing `FRONTEND_URL`

### Issue: Images not loading
**Solution:**
- Check `VITE_API_URL` in Vercel is correct
- Verify backend URL is accessible
- Check browser console for 404 errors
- Ensure images exist in `backend/uploads` folder

### Issue: Authentication not working
**Solution:**
- Verify `JWT_SECRET` is set in Render
- Check cookies are being set (browser DevTools → Application → Cookies)
- Ensure `FRONTEND_URL` allows credentials (already configured)

### Issue: PayPal not working
**Solution:**
- Verify `PAYPAL_CLIENT_ID` is correct
- Check if using Sandbox (testing) or Live (production) credentials
- Verify PayPal app is active in PayPal Developer Dashboard

---

## 📚 Additional Resources

- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)
- [PayPal Developer Guide](https://developer.paypal.com/docs/)
- [Render Environment Variables](https://render.com/docs/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## ✅ Final Checklist Before Going Live

- [ ] All environment variables set correctly
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] CORS configured correctly
- [ ] Images loading from backend
- [ ] Authentication working
- [ ] PayPal integration tested
- [ ] Database connection stable
- [ ] No sensitive data in code
- [ ] `.env` files in `.gitignore`

---

**Remember:** Never commit environment variables or `.env` files to Git!

