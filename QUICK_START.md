# 🚀 Quick Start Guide - Backend

## ✅ ติดตั้งเสร็จสิ้น! (Installation Complete!)

ระบบ Authentication & Authorization พร้อมใช้งานแล้ว

---

## 📦 สิ่งที่ติดตั้งแล้ว (What's Installed)

### Dependencies
- ✅ @nestjs/jwt - JWT token management
- ✅ @nestjs/passport - Authentication middleware
- ✅ passport-jwt - JWT strategy
- ✅ bcrypt - Password hashing
- ✅ class-validator - DTO validation
- ✅ class-transformer - Object transformation
- ✅ @nestjs/throttler - Rate limiting
- ✅ helmet - Security headers

### โครงสร้างโปรเจค (Project Structure)
```
src/
├── auth/                    # Authentication module
│   ├── dto/                # Data Transfer Objects
│   ├── guards/             # JWT Guards
│   ├── strategies/         # Passport strategies
│   └── types/              # TypeScript types
├── users/                   # Users module
│   ├── dto/                # User DTOs
│   └── entities/           # User entity
├── common/                  # Shared resources
│   ├── decorators/         # Custom decorators
│   ├── guards/             # Role guards
│   └── enums/              # Enums (roles)
└── config/                  # Configuration files
```

---

## 🏃 วิธีเริ่มใช้งาน (How to Start)

### 1. ตั้งค่า Environment Variables

สร้างไฟล์ `.env` ในโฟลเดอร์ root:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

### 2. รันเซิร์ฟเวอร์

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

เซิร์ฟเวอร์จะรันที่: **http://localhost:3000/api**

---

## 🔑 API Endpoints

### Public Endpoints (ไม่ต้อง login)

#### 1. Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "username": "username",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### 2. Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "usernameOrEmail": "user@example.com",
  "password": "password123"
}
```

Response จะได้:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Protected Endpoints (ต้อง login)

ใส่ token ใน header:
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

#### 3. Get Profile
```bash
GET /api/auth/me
Authorization: Bearer YOUR_ACCESS_TOKEN
```

#### 4. Logout
```bash
POST /api/auth/logout
Authorization: Bearer YOUR_ACCESS_TOKEN
```

#### 5. Refresh Token
```bash
POST /api/auth/refresh
Authorization: Bearer YOUR_REFRESH_TOKEN
```

---

## 🛡️ ฟีเจอร์ความปลอดภัย (Security Features)

### ✅ ที่ติดตั้งแล้ว:

1. **JWT Authentication**
   - Access Token (อายุ 15 นาที)
   - Refresh Token (อายุ 7 วัน)

2. **Password Security**
   - Hash ด้วย bcrypt (10 rounds)
   - ไม่เก็บ plain text password

3. **Global Guards**
   - ทุก route ป้องกันโดยอัตโนมัติ
   - ใช้ @Public() เพื่อเปิด route

4. **Role-Based Access Control**
   - Roles: USER, ADMIN, MODERATOR, SUPER_ADMIN
   - ใช้ @Roles() decorator

5. **Rate Limiting**
   - จำกัด 10 requests ต่อ 60 วินาที
   - ป้องกัน brute force attack

6. **Security Headers**
   - ใช้ Helmet middleware
   - ป้องกัน common vulnerabilities

7. **CORS Configuration**
   - กำหนด allowed origins
   - รองรับ credentials

8. **Input Validation**
   - ตรวจสอบอัตโนมัติด้วย class-validator
   - ป้องกัน invalid data

---

## 🎯 ตัวอย่างการใช้งาน (Usage Examples)

### 1. สร้าง Public Route

```typescript
import { Public } from './common/decorators/public.decorator';

@Controller('products')
export class ProductsController {
  @Public()
  @Get()
  findAll() {
    return 'Public route - ไม่ต้อง login';
  }
}
```

### 2. สร้าง Protected Route

```typescript
@Controller('profile')
export class ProfileController {
  // Protected by default - ต้อง login
  @Get()
  getProfile(@CurrentUser() user) {
    return user;
  }
}
```

### 3. ใช้ Role-Based Access

```typescript
import { Roles } from './common/decorators/roles.decorator';
import { Role } from './common/enums/role.enum';

@Controller('admin')
export class AdminController {
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Get('dashboard')
  getDashboard() {
    return 'เฉพาะ admin เท่านั้น';
  }
}
```

### 4. ดึงข้อมูล User

```typescript
import { CurrentUser } from './common/decorators/current-user.decorator';
import { GetCurrentUserId } from './common/decorators/get-current-user-id.decorator';

@Controller('posts')
export class PostsController {
  @Post()
  create(
    @CurrentUser() user,
    @GetCurrentUserId() userId: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    console.log('User:', user);
    console.log('User ID:', userId);
    return 'Post created';
  }
}
```

---

## 🧪 ทดสอบระบบ (Testing)

### ใช้ cURL

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "username": "testuser"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "usernameOrEmail": "test@example.com",
    "password": "password123"
  }'

# Get Profile (ใส่ token ที่ได้จาก login)
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### ใช้ REST Client (VS Code Extension)

เปิดไฟล์ `test-auth.http` และกด "Send Request"

---

## 📝 Decorators ที่มีให้ใช้

| Decorator | คำอธิบาย |
|-----------|----------|
| `@Public()` | ทำให้ route เป็น public (ไม่ต้อง login) |
| `@Roles(Role.ADMIN)` | กำหนด roles ที่สามารถเข้าถึงได้ |
| `@CurrentUser()` | ดึงข้อมูล user ปัจจุบัน |
| `@GetCurrentUserId()` | ดึง user ID |
| `@GetCurrentRefreshToken()` | ดึง refresh token |

---

## 🔄 Token Lifecycle

```
User Login
    ↓
Server สร้าง Access Token (15 นาที) + Refresh Token (7 วัน)
    ↓
Client เก็บ tokens
    ↓
Client ใช้ Access Token เรียก API
    ↓
Access Token หมดอายุ
    ↓
Client ใช้ Refresh Token ขอ Access Token ใหม่
    ↓
วนกลับไปเรียก API
```

---

## 👥 Roles ในระบบ

```typescript
enum Role {
  USER = 'user',              // ผู้ใช้ทั่วไป
  ADMIN = 'admin',            // ผู้ดูแลระบบ
  MODERATOR = 'moderator',    // ผู้ดูแลเนื้อหา
  SUPER_ADMIN = 'super_admin' // ผู้ดูแลระบบสูงสุด
}
```

---

## ⚠️ สิ่งที่ควรทำก่อน Production

1. ✅ เปลี่ยน JWT_SECRET และ JWT_REFRESH_SECRET
2. ✅ ตั้งค่า CORS_ORIGIN ให้ถูกต้อง
3. ✅ ใช้ HTTPS
4. ✅ เชื่อมต่อ Database จริง (ตอนนี้ใช้ in-memory)
5. ✅ เพิ่ม logging และ monitoring
6. ✅ ตั้งค่า rate limiting ให้เหมาะสม
7. ✅ เพิ่ม email verification
8. ✅ เพิ่ม password reset

---

## 📚 เอกสารเพิ่มเติม

- [AUTH_DOCUMENTATION.md](./AUTH_DOCUMENTATION.md) - เอกสารฉบับเต็ม
- [test-auth.http](./test-auth.http) - ไฟล์ทดสอบ API

---

## 🎉 ผลการทดสอบ

✅ Register - สำเร็จ  
✅ Login - สำเร็จ  
✅ Get Profile - สำเร็จ  
✅ Invalid Token - ตรวจจับได้ถูกต้อง  
✅ Logout - สำเร็จ  
✅ Validation - ทำงานถูกต้อง  
✅ Rate Limiting - ทำงานถูกต้อง  
✅ Security Headers - ทำงานถูกต้อง  

---

## 💡 Tips

- ใช้ Postman หรือ Insomnia สำหรับทดสอบ API
- เก็บ refresh token ใน httpOnly cookie สำหรับความปลอดภัย
- อย่า commit .env file ลง git
- ใช้ strong passwords
- อัพเดท dependencies เป็นประจำ

---

**🎯 พร้อมใช้งานแล้ว! Happy Coding! 🚀**

---

**Created by:** Backend Team  
**Date:** November 13, 2025  
**Version:** 1.0.0

