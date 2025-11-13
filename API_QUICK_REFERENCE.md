# 🚀 API Quick Reference - Test Cannabis Backend

## 📍 Base URL
```
http://localhost:3000/api
```

---

## 🔑 Authentication Endpoints

### 1. Register (สมัครสมาชิก)
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "username": "username"
}

# Response: { accessToken, refreshToken }
```

### 2. Login (เข้าสู่ระบบ)
```bash
POST /api/auth/login
Content-Type: application/json

{
  "usernameOrEmail": "user@example.com",
  "password": "password123"
}

# Response: { accessToken, refreshToken }
```

### 3. Get Profile (ดูโปรไฟล์)
```bash
GET /api/auth/me
Authorization: Bearer <access_token>

# Response: { sub, email, username, roles }
```

### 4. Refresh Token (ต่ออายุ Token)
```bash
POST /api/auth/refresh
Authorization: Bearer <refresh_token>

# Response: { accessToken, refreshToken }
```

### 5. Logout (ออกจากระบบ)
```bash
POST /api/auth/logout
Authorization: Bearer <access_token>

# Response: { message: "ออกจากระบบสำเร็จ" }
```

---

## 👥 User Management Endpoints

### 1. Get All Users (ดูรายชื่อทั้งหมด) - Admin Only
```bash
GET /api/users
Authorization: Bearer <access_token>

# Response: [{ id, email, username, roles, ... }]
```

### 2. Get User by ID (ดูข้อมูลผู้ใช้)
```bash
GET /api/users/:id
Authorization: Bearer <access_token>

# Response: { id, email, username, roles, ... }
```

### 3. Create User (สร้างผู้ใช้) - Admin Only
```bash
POST /api/users
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "email": "new@example.com",
  "password": "password123",
  "username": "newuser",
  "roles": ["user"]
}

# Response: { id, email, username, roles, ... }
```

### 4. Update User (แก้ไขข้อมูล)
```bash
PATCH /api/users/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "firstName": "Updated",
  "lastName": "Name"
}

# Response: { id, email, username, ... }
```

### 5. Delete User (ลบผู้ใช้) - Super Admin Only
```bash
DELETE /api/users/:id
Authorization: Bearer <access_token>

# Response: 200 OK
```

---

## 📝 cURL Examples

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","username":"testuser"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"usernameOrEmail":"test@example.com","password":"password123"}'
```

### Get Profile
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Refresh Token
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Authorization: Bearer YOUR_REFRESH_TOKEN"
```

### Logout
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 🔐 Roles & Permissions

| Role | Description | Permissions |
|------|-------------|-------------|
| `user` | ผู้ใช้ทั่วไป | ดูข้อมูลตัวเอง, แก้ไขข้อมูลตัวเอง |
| `moderator` | ผู้ดูแลเนื้อหา | + จัดการเนื้อหา |
| `admin` | ผู้ดูแลระบบ | + จัดการผู้ใช้, ดูรายชื่อทั้งหมด |
| `super_admin` | ผู้ดูแลสูงสุด | + ลบผู้ใช้, เข้าถึงทุกอย่าง |

---

## ⚠️ HTTP Status Codes

| Code | Meaning | เมื่อไหร่เกิด |
|------|---------|---------------|
| 200 | OK | สำเร็จ |
| 201 | Created | สร้างข้อมูลสำเร็จ |
| 400 | Bad Request | ข้อมูลไม่ถูกต้อง |
| 401 | Unauthorized | ไม่มี token หรือ token ไม่ถูกต้อง |
| 403 | Forbidden | ไม่มีสิทธิ์ |
| 404 | Not Found | ไม่พบข้อมูล |
| 409 | Conflict | ข้อมูลซ้ำ |
| 429 | Too Many Requests | เกิน rate limit |

---

## 🛡️ Security Features

- **Password Hashing:** bcrypt (10 rounds)
- **Access Token:** อายุ 15 นาที
- **Refresh Token:** อายุ 7 วัน
- **Rate Limiting:** 10 requests / 60 seconds
- **CORS:** Configurable origins
- **Security Headers:** Helmet middleware

---

## 💡 Quick Tips

1. **Save Tokens:** เก็บ accessToken และ refreshToken หลัง login
2. **Use Access Token:** ใส่ใน Authorization header
3. **Refresh When Expired:** ใช้ refreshToken เมื่อ accessToken หมดอายุ
4. **Clear on Logout:** ลบ tokens ทั้งหมดเมื่อ logout
5. **Handle 401:** Redirect ไป login เมื่อได้ 401

---

## 🔄 Complete Flow Example

```bash
# 1. Register
RESPONSE=$(curl -s -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","username":"testuser"}')

# 2. Extract tokens
ACCESS_TOKEN=$(echo $RESPONSE | jq -r '.accessToken')
REFRESH_TOKEN=$(echo $RESPONSE | jq -r '.refreshToken')

# 3. Get profile
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer $ACCESS_TOKEN"

# 4. Refresh token (when access token expires)
NEW_RESPONSE=$(curl -s -X POST http://localhost:3000/api/auth/refresh \
  -H "Authorization: Bearer $REFRESH_TOKEN")

# 5. Logout
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

---

## 📱 JavaScript Example

```javascript
// Register
const register = async () => {
  const response = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'test@example.com',
      password: 'password123',
      username: 'testuser'
    })
  });
  
  const data = await response.json();
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
};

// Get Profile
const getProfile = async () => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch('http://localhost:3000/api/auth/me', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  return await response.json();
};

// Logout
const logout = async () => {
  const token = localStorage.getItem('accessToken');
  await fetch('http://localhost:3000/api/auth/logout', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  localStorage.clear();
};
```

---

## 🐍 Python Example

```python
import requests

# Register
response = requests.post('http://localhost:3000/api/auth/register', json={
    'email': 'test@example.com',
    'password': 'password123',
    'username': 'testuser'
})

tokens = response.json()
access_token = tokens['accessToken']
refresh_token = tokens['refreshToken']

# Get Profile
response = requests.get('http://localhost:3000/api/auth/me', 
    headers={'Authorization': f'Bearer {access_token}'})

profile = response.json()
print(profile)

# Logout
requests.post('http://localhost:3000/api/auth/logout',
    headers={'Authorization': f'Bearer {access_token}'})
```

---

## 📚 More Documentation

- **[API_USAGE_GUIDE.md](./API_USAGE_GUIDE.md)** - เอกสารฉบับเต็ม
- **[AUTH_DOCUMENTATION.md](./AUTH_DOCUMENTATION.md)** - เอกสาร Authentication
- **[QUICK_START.md](./QUICK_START.md)** - คู่มือเริ่มต้น
- **[test-auth.http](./test-auth.http)** - ไฟล์ทดสอบ

---

**Version:** 1.0.0 | **Updated:** November 13, 2025

