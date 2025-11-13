# 📖 คู่มือการใช้งาน API - Test Cannabis Backend

## 🌐 Base URL

```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

---

## 📋 สารบัญ

1. [Authentication Endpoints](#1-authentication-endpoints)
2. [User Management Endpoints](#2-user-management-endpoints)
3. [Error Handling](#3-error-handling)
4. [Request Examples](#4-request-examples)
5. [Response Examples](#5-response-examples)
6. [Postman Collection](#6-postman-collection)

---

## 1. Authentication Endpoints

### 1.1 Register (สมัครสมาชิก)

สร้างบัญชีผู้ใช้ใหม่

**Endpoint:** `POST /api/auth/register`

**Access:** Public (ไม่ต้อง login)

**Headers:**
```http
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "username",
  "firstName": "John",      // Optional
  "lastName": "Doe"         // Optional
}
```

**Validation Rules:**
- `email`: ต้องเป็น email ที่ถูกต้อง
- `password`: ความยาว 6-50 ตัวอักษร
- `username`: ความยาว 3-30 ตัวอักษร
- `firstName`: ความยาวไม่เกิน 50 ตัวอักษร (ถ้ามี)
- `lastName`: ความยาวไม่เกิน 50 ตัวอักษร (ถ้ามี)

**Success Response (201 Created):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

**409 Conflict** - Email หรือ username ซ้ำ
```json
{
  "statusCode": 409,
  "message": "ผู้ใช้ที่มีอีเมลหรือชื่อผู้ใช้นี้มีอยู่แล้ว"
}
```

**400 Bad Request** - ข้อมูลไม่ถูกต้อง
```json
{
  "statusCode": 400,
  "message": [
    "กรุณาระบุอีเมลที่ถูกต้อง",
    "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"
  ],
  "error": "Bad Request"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123",
    "username": "johndoe",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

---

### 1.2 Login (เข้าสู่ระบบ)

เข้าสู่ระบบด้วย email หรือ username

**Endpoint:** `POST /api/auth/login`

**Access:** Public (ไม่ต้อง login)

**Headers:**
```http
Content-Type: application/json
```

**Request Body:**
```json
{
  "usernameOrEmail": "user@example.com",  // หรือ "username"
  "password": "password123"
}
```

**Validation Rules:**
- `usernameOrEmail`: ต้องไม่ว่าง
- `password`: ความยาวอย่างน้อย 6 ตัวอักษร

**Success Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

**401 Unauthorized** - ข้อมูลไม่ถูกต้อง
```json
{
  "statusCode": 401,
  "message": "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"
}
```

**403 Forbidden** - บัญชีถูกระงับ
```json
{
  "statusCode": 403,
  "message": "บัญชีของคุณถูกระงับการใช้งาน"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "usernameOrEmail": "john@example.com",
    "password": "password123"
  }'
```

---

### 1.3 Get Profile (ดูข้อมูลโปรไฟล์)

ดูข้อมูลผู้ใช้ที่ login อยู่

**Endpoint:** `GET /api/auth/me`

**Access:** Protected (ต้อง login)

**Headers:**
```http
Authorization: Bearer <access_token>
```

**Success Response (200 OK):**
```json
{
  "sub": "1",
  "email": "john@example.com",
  "username": "johndoe",
  "roles": ["user"],
  "iat": 1763032263,
  "exp": 1763033163
}
```

**Error Responses:**

**401 Unauthorized** - Token ไม่ถูกต้องหรือหมดอายุ
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### 1.4 Refresh Token (ต่ออายุ Token)

ขอ Access Token ใหม่โดยใช้ Refresh Token

**Endpoint:** `POST /api/auth/refresh`

**Access:** Public (แต่ต้องมี Refresh Token)

**Headers:**
```http
Authorization: Bearer <refresh_token>
```

**Success Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

**403 Forbidden** - Refresh Token ไม่ถูกต้อง
```json
{
  "statusCode": 403,
  "message": "Access Denied"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### 1.5 Logout (ออกจากระบบ)

ออกจากระบบและลบ Refresh Token

**Endpoint:** `POST /api/auth/logout`

**Access:** Protected (ต้อง login)

**Headers:**
```http
Authorization: Bearer <access_token>
```

**Success Response (200 OK):**
```json
{
  "message": "ออกจากระบบสำเร็จ"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 2. User Management Endpoints

### 2.1 Get All Users (ดูรายชื่อผู้ใช้ทั้งหมด)

ดูรายชื่อผู้ใช้ทั้งหมด (เฉพาะ Admin)

**Endpoint:** `GET /api/users`

**Access:** Protected (ต้องเป็น ADMIN หรือ SUPER_ADMIN)

**Headers:**
```http
Authorization: Bearer <access_token>
```

**Success Response (200 OK):**
```json
[
  {
    "id": "1",
    "email": "john@example.com",
    "username": "johndoe",
    "firstName": "John",
    "lastName": "Doe",
    "roles": ["user"],
    "isActive": true,
    "createdAt": "2025-11-13T12:00:00.000Z",
    "updatedAt": "2025-11-13T12:00:00.000Z"
  },
  {
    "id": "2",
    "email": "admin@example.com",
    "username": "admin",
    "firstName": "Admin",
    "lastName": "User",
    "roles": ["admin"],
    "isActive": true,
    "createdAt": "2025-11-13T12:00:00.000Z",
    "updatedAt": "2025-11-13T12:00:00.000Z"
  }
]
```

**Error Responses:**

**403 Forbidden** - ไม่มีสิทธิ์เข้าถึง
```json
{
  "statusCode": 403,
  "message": "Forbidden resource"
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### 2.2 Get User by ID (ดูข้อมูลผู้ใช้ตาม ID)

ดูข้อมูลผู้ใช้คนใดคนหนึ่ง

**Endpoint:** `GET /api/users/:id`

**Access:** Protected (ต้อง login)

**Headers:**
```http
Authorization: Bearer <access_token>
```

**URL Parameters:**
- `id` (string) - User ID

**Success Response (200 OK):**
```json
{
  "id": "1",
  "email": "john@example.com",
  "username": "johndoe",
  "firstName": "John",
  "lastName": "Doe",
  "roles": ["user"],
  "isActive": true,
  "createdAt": "2025-11-13T12:00:00.000Z",
  "updatedAt": "2025-11-13T12:00:00.000Z"
}
```

**Error Responses:**

**404 Not Found** - ไม่พบผู้ใช้
```json
{
  "statusCode": 404,
  "message": "ไม่พบผู้ใช้ที่มี ID: 999"
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:3000/api/users/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### 2.3 Create User (สร้างผู้ใช้ใหม่)

สร้างผู้ใช้ใหม่ (เฉพาะ Admin)

**Endpoint:** `POST /api/users`

**Access:** Protected (ต้องเป็น ADMIN หรือ SUPER_ADMIN)

**Headers:**
```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "username": "newuser",
  "firstName": "New",
  "lastName": "User",
  "roles": ["user"]  // Optional: ["user", "admin", "moderator", "super_admin"]
}
```

**Success Response (201 Created):**
```json
{
  "id": "3",
  "email": "newuser@example.com",
  "username": "newuser",
  "firstName": "New",
  "lastName": "User",
  "roles": ["user"],
  "isActive": true,
  "createdAt": "2025-11-13T12:00:00.000Z",
  "updatedAt": "2025-11-13T12:00:00.000Z"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "password123",
    "username": "newuser",
    "firstName": "New",
    "lastName": "User",
    "roles": ["user"]
  }'
```

---

### 2.4 Update User (แก้ไขข้อมูลผู้ใช้)

แก้ไขข้อมูลผู้ใช้

**Endpoint:** `PATCH /api/users/:id`

**Access:** Protected (ต้อง login)

**Headers:**
```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

**URL Parameters:**
- `id` (string) - User ID

**Request Body:** (ส่งเฉพาะฟิลด์ที่ต้องการแก้ไข)
```json
{
  "firstName": "Updated",
  "lastName": "Name",
  "isActive": true
}
```

**Success Response (200 OK):**
```json
{
  "id": "1",
  "email": "john@example.com",
  "username": "johndoe",
  "firstName": "Updated",
  "lastName": "Name",
  "roles": ["user"],
  "isActive": true,
  "createdAt": "2025-11-13T12:00:00.000Z",
  "updatedAt": "2025-11-13T13:00:00.000Z"
}
```

**cURL Example:**
```bash
curl -X PATCH http://localhost:3000/api/users/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Updated",
    "lastName": "Name"
  }'
```

---

### 2.5 Delete User (ลบผู้ใช้)

ลบผู้ใช้ (เฉพาะ Super Admin)

**Endpoint:** `DELETE /api/users/:id`

**Access:** Protected (ต้องเป็น SUPER_ADMIN)

**Headers:**
```http
Authorization: Bearer <access_token>
```

**URL Parameters:**
- `id` (string) - User ID

**Success Response (200 OK):**
```
(No content)
```

**Error Responses:**

**403 Forbidden** - ไม่มีสิทธิ์ลบ
```json
{
  "statusCode": 403,
  "message": "Forbidden resource"
}
```

**404 Not Found** - ไม่พบผู้ใช้
```json
{
  "statusCode": 404,
  "message": "ไม่พบผู้ใช้ที่มี ID: 999"
}
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:3000/api/users/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 3. Error Handling

### HTTP Status Codes

| Code | Description | เมื่อไหร่เกิด |
|------|-------------|---------------|
| 200 | OK | Request สำเร็จ |
| 201 | Created | สร้างข้อมูลสำเร็จ |
| 400 | Bad Request | ข้อมูลไม่ถูกต้อง |
| 401 | Unauthorized | ไม่มี token หรือ token ไม่ถูกต้อง |
| 403 | Forbidden | ไม่มีสิทธิ์เข้าถึง |
| 404 | Not Found | ไม่พบข้อมูล |
| 409 | Conflict | ข้อมูลซ้ำ |
| 429 | Too Many Requests | เกิน rate limit |
| 500 | Internal Server Error | เกิดข้อผิดพลาดในระบบ |

### Error Response Format

```json
{
  "statusCode": 400,
  "message": "Error message here",
  "error": "Bad Request"
}
```

หรือ (สำหรับ validation errors)

```json
{
  "statusCode": 400,
  "message": [
    "กรุณาระบุอีเมลที่ถูกต้อง",
    "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"
  ],
  "error": "Bad Request"
}
```

---

## 4. Request Examples

### 4.1 Complete Authentication Flow

```bash
# 1. Register
REGISTER_RESPONSE=$(curl -s -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "username": "testuser"
  }')

# Extract access token
ACCESS_TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.accessToken')
REFRESH_TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.refreshToken')

# 2. Get Profile
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer $ACCESS_TOKEN"

# 3. Logout
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer $ACCESS_TOKEN"

# 4. Login again
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "usernameOrEmail": "test@example.com",
    "password": "password123"
  }')

# 5. Refresh Token
NEW_ACCESS_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.accessToken')
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Authorization: Bearer $REFRESH_TOKEN"
```

---

### 4.2 JavaScript/TypeScript (Axios)

```typescript
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Register
const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email: userData.email,
      password: userData.password,
      username: userData.username,
    });
    
    // Save tokens
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    
    return response.data;
  } catch (error) {
    console.error('Register error:', error.response.data);
    throw error;
  }
};

// Login
const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      usernameOrEmail: credentials.usernameOrEmail,
      password: credentials.password,
    });
    
    // Save tokens
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response.data);
    throw error;
  }
};

// Get Profile
const getProfile = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Get profile error:', error.response.data);
    throw error;
  }
};

// Refresh Token
const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axios.post(`${API_URL}/auth/refresh`, {}, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    
    // Update tokens
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    
    return response.data;
  } catch (error) {
    console.error('Refresh token error:', error.response.data);
    // Redirect to login
    localStorage.clear();
    window.location.href = '/login';
    throw error;
  }
};

// Logout
const logout = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    await axios.post(`${API_URL}/auth/logout`, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    // Clear tokens
    localStorage.clear();
  } catch (error) {
    console.error('Logout error:', error.response.data);
    throw error;
  }
};

// Axios Interceptor for Auto Token Refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If 401 and not already retried
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        await refreshToken();
        const newAccessToken = localStorage.getItem('accessToken');
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
```

---

### 4.3 Python (Requests)

```python
import requests
import json

API_URL = 'http://localhost:3000/api'

class AuthAPI:
    def __init__(self):
        self.access_token = None
        self.refresh_token = None
    
    def register(self, email, password, username):
        """Register new user"""
        url = f'{API_URL}/auth/register'
        data = {
            'email': email,
            'password': password,
            'username': username
        }
        
        response = requests.post(url, json=data)
        
        if response.status_code == 201:
            result = response.json()
            self.access_token = result['accessToken']
            self.refresh_token = result['refreshToken']
            return result
        else:
            raise Exception(f'Register failed: {response.json()}')
    
    def login(self, username_or_email, password):
        """Login user"""
        url = f'{API_URL}/auth/login'
        data = {
            'usernameOrEmail': username_or_email,
            'password': password
        }
        
        response = requests.post(url, json=data)
        
        if response.status_code == 200:
            result = response.json()
            self.access_token = result['accessToken']
            self.refresh_token = result['refreshToken']
            return result
        else:
            raise Exception(f'Login failed: {response.json()}')
    
    def get_profile(self):
        """Get user profile"""
        url = f'{API_URL}/auth/me'
        headers = {
            'Authorization': f'Bearer {self.access_token}'
        }
        
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f'Get profile failed: {response.json()}')
    
    def refresh_tokens(self):
        """Refresh access token"""
        url = f'{API_URL}/auth/refresh'
        headers = {
            'Authorization': f'Bearer {self.refresh_token}'
        }
        
        response = requests.post(url, headers=headers)
        
        if response.status_code == 200:
            result = response.json()
            self.access_token = result['accessToken']
            self.refresh_token = result['refreshToken']
            return result
        else:
            raise Exception(f'Refresh token failed: {response.json()}')
    
    def logout(self):
        """Logout user"""
        url = f'{API_URL}/auth/logout'
        headers = {
            'Authorization': f'Bearer {self.access_token}'
        }
        
        response = requests.post(url, headers=headers)
        
        if response.status_code == 200:
            self.access_token = None
            self.refresh_token = None
            return response.json()
        else:
            raise Exception(f'Logout failed: {response.json()}')

# Usage
auth = AuthAPI()

# Register
auth.register('test@example.com', 'password123', 'testuser')

# Get profile
profile = auth.get_profile()
print(profile)

# Logout
auth.logout()

# Login
auth.login('test@example.com', 'password123')
```

---

## 5. Response Examples

### 5.1 Successful Responses

**Register/Login Success:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsInJvbGVzIjpbInVzZXIiXSwiaWF0IjoxNzYzMDMyMjYzLCJleHAiOjE3NjMwMzMxNjN9.Kkg9hx4DFS5IvDpsu6mueLW2V0yTeKlT5v2twPY6RSg",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsInJvbGVzIjpbInVzZXIiXSwiaWF0IjoxNzYzMDMyMjYzLCJleHAiOjE3NjM2MzcwNjN9.woIMVmpa2ItTwzZgGM82fmILW-334VYMPM3nCAgh9yA"
}
```

**Get Profile Success:**
```json
{
  "sub": "1",
  "email": "test@example.com",
  "username": "testuser",
  "roles": ["user"],
  "iat": 1763032263,
  "exp": 1763033163
}
```

**Logout Success:**
```json
{
  "message": "ออกจากระบบสำเร็จ"
}
```

**Get User Success:**
```json
{
  "id": "1",
  "email": "test@example.com",
  "username": "testuser",
  "firstName": "Test",
  "lastName": "User",
  "roles": ["user"],
  "isActive": true,
  "createdAt": "2025-11-13T12:00:00.000Z",
  "updatedAt": "2025-11-13T12:00:00.000Z"
}
```

---

### 5.2 Error Responses

**Validation Error:**
```json
{
  "statusCode": 400,
  "message": [
    "กรุณาระบุอีเมลที่ถูกต้อง",
    "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
    "ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร"
  ],
  "error": "Bad Request"
}
```

**Unauthorized Error:**
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

**Forbidden Error:**
```json
{
  "statusCode": 403,
  "message": "Forbidden resource"
}
```

**Not Found Error:**
```json
{
  "statusCode": 404,
  "message": "ไม่พบผู้ใช้ที่มี ID: 999"
}
```

**Conflict Error:**
```json
{
  "statusCode": 409,
  "message": "ผู้ใช้ที่มีอีเมลหรือชื่อผู้ใช้นี้มีอยู่แล้ว"
}
```

**Rate Limit Error:**
```json
{
  "statusCode": 429,
  "message": "ThrottlerException: Too Many Requests"
}
```

---

## 6. Postman Collection

### Import ใน Postman

สร้าง Collection ใหม่และ import JSON นี้:

```json
{
  "info": {
    "name": "API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000/api"
    },
    {
      "key": "accessToken",
      "value": ""
    },
    {
      "key": "refreshToken",
      "value": ""
    }
  ],
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "event": [
            {
              "listen": "test",
              "script": {
                "exec": [
                  "if (pm.response.code === 201) {",
                  "    const response = pm.response.json();",
                  "    pm.collectionVariables.set('accessToken', response.accessToken);",
                  "    pm.collectionVariables.set('refreshToken', response.refreshToken);",
                  "}"
                ]
              }
            }
          ],
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\",\n  \"username\": \"testuser\",\n  \"firstName\": \"Test\",\n  \"lastName\": \"User\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/auth/register",
              "host": ["{{baseUrl}}"],
              "path": ["auth", "register"]
            }
          }
        },
        {
          "name": "Login",
          "event": [
            {
              "listen": "test",
              "script": {
                "exec": [
                  "if (pm.response.code === 200) {",
                  "    const response = pm.response.json();",
                  "    pm.collectionVariables.set('accessToken', response.accessToken);",
                  "    pm.collectionVariables.set('refreshToken', response.refreshToken);",
                  "}"
                ]
              }
            }
          ],
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"usernameOrEmail\": \"test@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/auth/login",
              "host": ["{{baseUrl}}"],
              "path": ["auth", "login"]
            }
          }
        },
        {
          "name": "Get Profile",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{accessToken}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/auth/me",
              "host": ["{{baseUrl}}"],
              "path": ["auth", "me"]
            }
          }
        },
        {
          "name": "Refresh Token",
          "event": [
            {
              "listen": "test",
              "script": {
                "exec": [
                  "if (pm.response.code === 200) {",
                  "    const response = pm.response.json();",
                  "    pm.collectionVariables.set('accessToken', response.accessToken);",
                  "    pm.collectionVariables.set('refreshToken', response.refreshToken);",
                  "}"
                ]
              }
            }
          ],
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{refreshToken}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/auth/refresh",
              "host": ["{{baseUrl}}"],
              "path": ["auth", "refresh"]
            }
          }
        },
        {
          "name": "Logout",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{accessToken}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/auth/logout",
              "host": ["{{baseUrl}}"],
              "path": ["auth", "logout"]
            }
          }
        }
      ]
    },
    {
      "name": "Users",
      "item": [
        {
          "name": "Get All Users",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{accessToken}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/users",
              "host": ["{{baseUrl}}"],
              "path": ["users"]
            }
          }
        },
        {
          "name": "Get User by ID",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{accessToken}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/users/1",
              "host": ["{{baseUrl}}"],
              "path": ["users", "1"]
            }
          }
        },
        {
          "name": "Create User",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{accessToken}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"newuser@example.com\",\n  \"password\": \"password123\",\n  \"username\": \"newuser\",\n  \"firstName\": \"New\",\n  \"lastName\": \"User\",\n  \"roles\": [\"user\"]\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/users",
              "host": ["{{baseUrl}}"],
              "path": ["users"]
            }
          }
        },
        {
          "name": "Update User",
          "request": {
            "method": "PATCH",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{accessToken}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"firstName\": \"Updated\",\n  \"lastName\": \"Name\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/users/1",
              "host": ["{{baseUrl}}"],
              "path": ["users", "1"]
            }
          }
        },
        {
          "name": "Delete User",
          "request": {
            "method": "DELETE",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{accessToken}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/users/1",
              "host": ["{{baseUrl}}"],
              "path": ["users", "1"]
            }
          }
        }
      ]
    }
  ]
}
```

---

## 7. Testing Tips

### 7.1 ทดสอบด้วย REST Client (VS Code)

ใช้ไฟล์ `test-auth.http` ที่มีอยู่แล้วในโปรเจค

### 7.2 ทดสอบ Rate Limiting

```bash
# ยิง request 15 ครั้งติดกัน (จะโดน rate limit ที่ครั้งที่ 11)
for i in {1..15}; do
  echo "Request $i:"
  curl -X GET http://localhost:3000/api
  echo ""
done
```

### 7.3 ทดสอบ Token Expiry

```bash
# รอให้ access token หมดอายุ (15 นาที)
# แล้วลองเรียก API อีกครั้ง จะได้ 401
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer <expired_token>"
```

---

## 8. Best Practices

### 8.1 การจัดการ Tokens

1. **เก็บ Access Token ใน Memory** - อย่าเก็บใน localStorage
2. **เก็บ Refresh Token ใน httpOnly Cookie** - ปลอดภัยกว่า
3. **Refresh Token อัตโนมัติ** - ใช้ interceptor
4. **Clear Tokens เมื่อ Logout** - ลบทั้ง access และ refresh token

### 8.2 Error Handling

```typescript
try {
  const response = await api.call();
} catch (error) {
  if (error.response) {
    // Server responded with error
    switch (error.response.status) {
      case 401:
        // Redirect to login
        break;
      case 403:
        // Show permission denied
        break;
      case 429:
        // Show rate limit message
        break;
      default:
        // Show generic error
    }
  } else if (error.request) {
    // No response from server
    console.error('Network error');
  } else {
    // Other errors
    console.error('Error:', error.message);
  }
}
```

### 8.3 Security

1. **ใช้ HTTPS ใน Production**
2. **อย่า commit tokens ลง git**
3. **Validate input ทุกครั้ง**
4. **Handle errors อย่างเหมาะสม**
5. **Log security events**

---

## 📞 Support

หากมีปัญหาหรือข้อสงสัย:

1. อ่านเอกสารเพิ่มเติม: `AUTH_DOCUMENTATION.md`
2. ดูตัวอย่างโค้ด: `test-auth.http`
3. ตรวจสอบ logs ของ server

---

**Created by:**  Backend Team  
**Last Updated:** November 13, 2025  
**Version:** 1.0.0

