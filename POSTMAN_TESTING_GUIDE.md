# Postman Testing Guide for BuyFromHere API

**Base URL:** `https://kharidlo-backend.onrender.com`

---

## 🔧 Postman Setup

### 1. Enable Cookie Management
1. Open Postman Settings (⚙️ icon)
2. Go to **General** tab
3. Enable **"Automatically follow redirects"**
4. Go to **Cookies** tab
5. Enable **"Manage Cookies automatically"**

### 2. Create Environment (Optional but Recommended)
1. Click **Environments** → **+**
2. Name: `BuyFromHere Production`
3. Add variable:
   - Variable: `baseUrl`
   - Initial Value: `https://kharidlo-backend.onrender.com`
4. Save and select this environment

---

## 📋 API Endpoints

### 🔐 Authentication Endpoints

#### 1. Register User
```
POST {{baseUrl}}/api/users
Content-Type: application/json

Body (JSON):
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

**Expected Response:** 201 Created
```json
{
  "_id": "...",
  "username": "testuser",
  "email": "test@example.com",
  "isAdmin": false
}
```
**Note:** Cookie `jwt` will be automatically saved by Postman

---

#### 2. Login User
```
POST {{baseUrl}}/api/users/auth
Content-Type: application/json

Body (JSON):
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Expected Response:** 201 Created
```json
{
  "_id": "...",
  "username": "testuser",
  "email": "test@example.com",
  "isAdmin": false
}
```
**Note:** Cookie `jwt` will be automatically saved

---

#### 3. Logout User
```
POST {{baseUrl}}/api/users/logout
```

**Expected Response:** 200 OK
```json
{
  "message": "Logged out successfully"
}
```

---

#### 4. Get Current User Profile
```
GET {{baseUrl}}/api/users/profile
```
**Requires:** Authentication (JWT cookie)

**Expected Response:** 200 OK
```json
{
  "_id": "...",
  "username": "testuser",
  "email": "test@example.com"
}
```

---

#### 5. Update Current User Profile
```
PUT {{baseUrl}}/api/users/profile
Content-Type: application/json

Body (JSON):
{
  "username": "updatedusername",
  "email": "updated@example.com",
  "password": "newpassword123"  // optional
}
```
**Requires:** Authentication

---

### 👥 User Management (Admin Only)

#### 6. Get All Users
```
GET {{baseUrl}}/api/users
```
**Requires:** Admin authentication

**Expected Response:** Array of users

---

#### 7. Get User by ID
```
GET {{baseUrl}}/api/users/:id
```
**Requires:** Admin authentication

**Example:**
```
GET {{baseUrl}}/api/users/507f1f77bcf86cd799439011
```

---

#### 8. Update User by ID
```
PUT {{baseUrl}}/api/users/:id
Content-Type: application/json

Body (JSON):
{
  "username": "newusername",
  "email": "newemail@example.com",
  "isAdmin": true
}
```
**Requires:** Admin authentication

---

#### 9. Delete User by ID
```
DELETE {{baseUrl}}/api/users/:id
```
**Requires:** Admin authentication

---

### 📦 Product Endpoints

#### 10. Get Products (Paginated)
```
GET {{baseUrl}}/api/products
```

**Query Parameters (Optional):**
- `keyword`: Search term (e.g., `?keyword=laptop`)

**Example:**
```
GET {{baseUrl}}/api/products?keyword=laptop
```

**Expected Response:**
```json
{
  "products": [...],
  "page": 1,
  "pages": 5,
  "hasMore": false
}
```

---

#### 11. Get All Products
```
GET {{baseUrl}}/api/products/allproducts
```

**Expected Response:** Array of all products (limited to 12)

---

#### 12. Get Product by ID
```
GET {{baseUrl}}/api/products/:id
```

**Example:**
```
GET {{baseUrl}}/api/products/507f1f77bcf86cd799439011
```

---

#### 13. Get Top Products
```
GET {{baseUrl}}/api/products/top
```

**Expected Response:** Array of top 4 rated products

---

#### 14. Get New Products
```
GET {{baseUrl}}/api/products/new
```

**Expected Response:** Array of 5 newest products

---

#### 15. Filter Products
```
POST {{baseUrl}}/api/products/filtered-products
Content-Type: application/json

Body (JSON):
{
  "checked": ["categoryId1", "categoryId2"],  // Array of category IDs
  "radio": [0, 1000]  // Price range [min, max]
}
```

**Example:**
```json
{
  "checked": ["507f1f77bcf86cd799439011"],
  "radio": [100, 500]
}
```

---

#### 16. Add Product Review
```
POST {{baseUrl}}/api/products/:id/reviews
Content-Type: application/json

Body (JSON):
{
  "rating": 5,
  "comment": "Great product!"
}
```
**Requires:** Authentication

---

#### 17. Create Product (Admin Only)
```
POST {{baseUrl}}/api/products
Content-Type: multipart/form-data
```
**Requires:** Admin authentication

**Form Data:**
- `name`: Product name
- `description`: Product description
- `price`: Product price (number)
- `category`: Category ID
- `quantity`: Stock quantity (number)
- `brand`: Brand name
- `image`: Image file (optional, can upload separately)

**Note:** Uses `formidable` middleware, so use **form-data** in Postman

---

#### 18. Update Product (Admin Only)
```
PUT {{baseUrl}}/api/products/:id
Content-Type: multipart/form-data
```
**Requires:** Admin authentication

**Form Data:** Same as Create Product

---

#### 19. Delete Product (Admin Only)
```
DELETE {{baseUrl}}/api/products/:id
```
**Requires:** Admin authentication

---

### 📁 Category Endpoints

#### 20. Get All Categories
```
GET {{baseUrl}}/api/category/categories
```

**Expected Response:** Array of categories

---

#### 21. Get Category by ID
```
GET {{baseUrl}}/api/category/:id
```

---

#### 22. Create Category (Admin Only)
```
POST {{baseUrl}}/api/category
Content-Type: application/json

Body (JSON):
{
  "name": "Electronics"
}
```
**Requires:** Admin authentication

---

#### 23. Update Category (Admin Only)
```
PUT {{baseUrl}}/api/category/:categoryId
Content-Type: application/json

Body (JSON):
{
  "name": "Updated Category Name"
}
```
**Requires:** Admin authentication

---

#### 24. Delete Category (Admin Only)
```
DELETE {{baseUrl}}/api/category/:categoryId
```
**Requires:** Admin authentication

---

### 🛒 Order Endpoints

#### 25. Create Order
```
POST {{baseUrl}}/api/orders
Content-Type: application/json

Body (JSON):
{
  "orderItems": [
    {
      "name": "Product Name",
      "qty": 2,
      "image": "/uploads/image-123.jpg",
      "price": 99.99,
      "product": "507f1f77bcf86cd799439011"
    }
  ],
  "shippingAddress": {
    "address": "123 Main St",
    "city": "New York",
    "postalCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "PayPal",
  "itemsPrice": 199.98,
  "taxPrice": 20.00,
  "shippingPrice": 10.00,
  "totalPrice": 229.98
}
```
**Requires:** Authentication

---

#### 26. Get User Orders
```
GET {{baseUrl}}/api/orders/mine
```
**Requires:** Authentication

**Expected Response:** Array of user's orders

---

#### 27. Get Order by ID
```
GET {{baseUrl}}/api/orders/:id
```
**Requires:** Authentication

---

#### 28. Get All Orders (Admin Only)
```
GET {{baseUrl}}/api/orders
```
**Requires:** Admin authentication

---

#### 29. Mark Order as Paid
```
PUT {{baseUrl}}/api/orders/:id/pay
Content-Type: application/json

Body (JSON):
{
  "id": "PAYMENT_ID",
  "status": "COMPLETED",
  "update_time": "2024-01-01T00:00:00Z",
  "email_address": "payer@example.com"
}
```
**Requires:** Authentication

---

#### 30. Mark Order as Delivered (Admin Only)
```
PUT {{baseUrl}}/api/orders/:id/deliver
```
**Requires:** Admin authentication

---

#### 31. Get Total Orders Count
```
GET {{baseUrl}}/api/orders/total-orders
```

---

#### 32. Get Total Sales
```
GET {{baseUrl}}/api/orders/total-sales
```

---

#### 33. Get Total Sales by Date
```
GET {{baseUrl}}/api/orders/total-sales-by-date
```

---

### 📤 Upload Endpoints

#### 34. Upload Image
```
POST {{baseUrl}}/api/upload
Content-Type: multipart/form-data
```

**Form Data:**
- `image`: Select file (jpg, png, webp)

**Expected Response:**
```json
{
  "message": "Image uploaded successfully",
  "image": "/uploads/image-1234567890.jpg"
}
```

**Note:** Use **form-data** in Postman, select **File** type for the image field

---

### 💳 PayPal Configuration

#### 35. Get PayPal Client ID
```
GET {{baseUrl}}/api/config/paypal
```

**Expected Response:**
```json
{
  "clientId": "your_paypal_client_id"
}
```

---

## 🔑 Testing Authenticated Endpoints

### Method 1: Automatic Cookie Management (Recommended)
1. First, call **Login** or **Register** endpoint
2. Postman will automatically save the `jwt` cookie
3. All subsequent requests will include the cookie automatically

### Method 2: Manual Cookie Setup
1. After login, check **Cookies** in Postman
2. Find the cookie for `kharidlo-backend.onrender.com`
3. Ensure `jwt` cookie is present
4. Or manually add in **Headers**:
   ```
   Cookie: jwt=your_jwt_token_here
   ```

### Method 3: Using Postman Pre-request Script
Add this to your request's **Pre-request Script** tab:
```javascript
// Get token from environment variable
const token = pm.environment.get("jwt_token");
if (token) {
    pm.request.headers.add({
        key: 'Cookie',
        value: `jwt=${token}`
    });
}
```

---

## 🧪 Testing Workflow Example

### Step 1: Test Public Endpoints
1. ✅ `GET /api/products` - Should work without auth
2. ✅ `GET /api/products/top` - Should work without auth

### Step 2: Register/Login
1. ✅ `POST /api/users` - Register a new user
2. ✅ `POST /api/users/auth` - Login (cookie saved automatically)

### Step 3: Test Authenticated Endpoints
1. ✅ `GET /api/users/profile` - Should return your profile
2. ✅ `POST /api/orders` - Create an order

### Step 4: Test Admin Endpoints (if you have admin user)
1. ✅ `GET /api/users` - Get all users
2. ✅ `POST /api/products` - Create product (form-data)

---

## ⚠️ Common Issues & Solutions

### Issue 1: "Not authorized, no token"
**Solution:** 
- Make sure you've logged in first
- Check that cookies are enabled in Postman
- Verify the cookie domain matches your backend URL

### Issue 2: "Not authorized as an admin"
**Solution:**
- You need an admin account
- Check `isAdmin: true` in your user document
- Or create admin user directly in database

### Issue 3: CORS Error
**Solution:**
- Check `FRONTEND_URL` environment variable in Render
- Make sure it matches your frontend URL

### Issue 4: Slow Response (First Request)
**Solution:**
- Render free tier spins down after inactivity
- First request may take 30-60 seconds
- This is normal for free tier

### Issue 5: Image Upload Not Working
**Solution:**
- Use **form-data** (not raw JSON)
- Select **File** type for image field
- Ensure file is jpg, png, or webp

---

## 📝 Postman Collection JSON

You can import this collection structure into Postman:

```json
{
  "info": {
    "name": "BuyFromHere API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "https://kharidlo-backend.onrender.com"
    }
  ],
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/api/users"
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/api/users/auth"
          }
        }
      ]
    },
    {
      "name": "Products",
      "item": [
        {
          "name": "Get Products",
          "request": {
            "method": "GET",
            "url": "{{baseUrl}}/api/products"
          }
        }
      ]
    }
  ]
}
```

---

## 🎯 Quick Test Checklist

- [ ] `GET /api/products` - Returns products
- [ ] `POST /api/users` - Creates user
- [ ] `POST /api/users/auth` - Logs in (check cookies)
- [ ] `GET /api/users/profile` - Returns profile (with cookie)
- [ ] `GET /api/products/top` - Returns top products
- [ ] `POST /api/upload` - Uploads image (form-data)
- [ ] `GET /api/config/paypal` - Returns PayPal config

---

**Happy Testing! 🚀**

