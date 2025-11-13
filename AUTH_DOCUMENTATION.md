# 🔐 Authentication & Authorization System Documentation

## ภาพรวมระบบ (System Overview)

ระบบ Authentication & Authorization ที่สมบูรณ์แบบสำหรับ NestJS โดยใช้ JWT (JSON Web Token) พร้อมฟีเจอร์ความปลอดภัยระดับสูง

### ✨ ฟีเจอร์หลัก (Key Features)

1. **JWT Authentication** - ใช้ Access Token และ Refresh Token
2. **Global Guards** - ป้องกันทุก route โดยอัตโนมัติ
3. **Role-Based Access Control (RBAC)** - จัดการสิทธิ์ตามบทบาท
4. **Security Features** - Rate limiting, Helmet, CORS
5. **Validation** - ตรวจสอบข้อมูลด้วย class-validator
6. **Custom Decorators** - ใช้งานง่าย สะดวก

---

## 📁 โครงสร้างโปรเจค (Project Structure)

\`\`\`
src/
├── auth/
│   ├── dto/
│   │   ├── login.dto.ts           # DTO สำหรับ login
│   │   ├── register.dto.ts        # DTO สำหรับ register
│   │   └── tokens.dto.ts          # DTO สำหรับ tokens response
│   ├── guards/
│   │   ├── jwt-auth.guard.ts      # Guard สำหรับ JWT
│   │   └── jwt-refresh-auth.guard.ts  # Guard สำหรับ Refresh Token
│   ├── strategies/
│   │   ├── jwt.strategy.ts        # Strategy สำหรับ Access Token
│   │   └── jwt-refresh.strategy.ts # Strategy สำหรับ Refresh Token
│   ├── types/
│   │   ├── jwt-payload.type.ts    # Type สำหรับ JWT payload
│   │   └── jwt-payload-with-rt.type.ts
│   ├── auth.controller.ts         # Controller สำหรับ auth endpoints
│   ├── auth.service.ts            # Service สำหรับ auth logic
│   └── auth.module.ts             # Module สำหรับ auth
├── users/
│   ├── dto/
│   │   ├── create-user.dto.ts     # DTO สำหรับสร้าง user
│   │   └── update-user.dto.ts     # DTO สำหรับอัพเดท user
│   ├── entities/
│   │   └── user.entity.ts         # Entity สำหรับ user
│   ├── users.controller.ts        # Controller สำหรับ users
│   ├── users.service.ts           # Service สำหรับ users
│   └── users.module.ts            # Module สำหรับ users
├── common/
│   ├── decorators/
│   │   ├── public.decorator.ts    # Decorator สำหรับ public routes
│   │   ├── roles.decorator.ts     # Decorator สำหรับกำหนด roles
│   │   ├── current-user.decorator.ts  # Decorator สำหรับดึงข้อมูล user
│   │   ├── get-current-user-id.decorator.ts
│   │   └── get-current-refresh-token.decorator.ts
│   ├── guards/
│   │   └── roles.guard.ts         # Guard สำหรับตรวจสอบ roles
│   └── enums/
│       └── role.enum.ts           # Enum สำหรับ roles
├── config/
│   └── jwt.config.ts              # Configuration สำหรับ JWT
├── app.module.ts                  # Root module
└── main.ts                        # Entry point
\`\`\`

---

## 🚀 การติดตั้ง (Installation)

### 1. ติดตั้ง Dependencies

\`\`\`bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt class-validator class-transformer @nestjs/throttler helmet
npm install --save-dev @types/passport-jwt @types/bcrypt
\`\`\`

### 2. ตั้งค่า Environment Variables

สร้างไฟล์ \`.env\` ในโฟลเดอร์ root:

\`\`\`env
# Application
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
\`\`\`

---

## 🔑 API Endpoints

### 1. Register (สมัครสมาชิก)

**POST** \`/api/auth/register\`

**Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "username",
  "firstName": "John",
  "lastName": "Doe"
}
\`\`\`

**Response:**
\`\`\`json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
\`\`\`

---

### 2. Login (เข้าสู่ระบบ)

**POST** \`/api/auth/login\`

**Body:**
\`\`\`json
{
  "usernameOrEmail": "user@example.com",
  "password": "password123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
\`\`\`

---

### 3. Refresh Token (ต่ออายุ token)

**POST** \`/api/auth/refresh\`

**Headers:**
\`\`\`
Authorization: Bearer <refresh_token>
\`\`\`

**Response:**
\`\`\`json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
\`\`\`

---

### 4. Logout (ออกจากระบบ)

**POST** \`/api/auth/logout\`

**Headers:**
\`\`\`
Authorization: Bearer <access_token>
\`\`\`

**Response:**
\`\`\`json
{
  "message": "ออกจากระบบสำเร็จ"
}
\`\`\`

---

### 5. Get Profile (ดูข้อมูลโปรไฟล์)

**GET** \`/api/auth/me\`

**Headers:**
\`\`\`
Authorization: Bearer <access_token>
\`\`\`

**Response:**
\`\`\`json
{
  "sub": "1",
  "email": "user@example.com",
  "username": "username",
  "roles": ["user"]
}
\`\`\`

---

## 🛡️ การใช้งาน Guards และ Decorators

### 1. Public Routes (เปิดให้เข้าถึงได้โดยไม่ต้อง login)

\`\`\`typescript
import { Public } from './common/decorators/public.decorator';

@Controller('products')
export class ProductsController {
  @Public()
  @Get()
  findAll() {
    return 'This route is public';
  }
}
\`\`\`

---

### 2. Protected Routes (ต้อง login ก่อน)

\`\`\`typescript
@Controller('profile')
export class ProfileController {
  // ไม่ต้องใส่ decorator เพราะ protected by default
  @Get()
  getProfile(@CurrentUser() user) {
    return user;
  }
}
\`\`\`

---

### 3. Role-Based Access Control

\`\`\`typescript
import { Roles } from './common/decorators/roles.decorator';
import { Role } from './common/enums/role.enum';

@Controller('admin')
export class AdminController {
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Get('dashboard')
  getDashboard() {
    return 'Only admins can access this';
  }

  @Roles(Role.SUPER_ADMIN)
  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return 'Only super admins can delete users';
  }
}
\`\`\`

---

### 4. ใช้ Custom Decorators

\`\`\`typescript
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
    console.log('Current user:', user);
    console.log('User ID:', userId);
    return 'Post created';
  }
}
\`\`\`

---

## 🔐 Security Features

### 1. Password Hashing

ใช้ bcrypt สำหรับ hash password:

\`\`\`typescript
const hashedPassword = await bcrypt.hash(password, 10);
const isValid = await bcrypt.compare(password, hashedPassword);
\`\`\`

---

### 2. Rate Limiting

จำกัดจำนวน request ที่สามารถเรียกได้ใน 1 นาที:

\`\`\`typescript
ThrottlerModule.forRoot([
  {
    ttl: 60000, // 60 seconds
    limit: 10, // 10 requests per ttl
  },
]),
\`\`\`

---

### 3. Security Headers (Helmet)

เพิ่ม security headers ให้กับ response:

\`\`\`typescript
app.use(helmet());
\`\`\`

---

### 4. CORS Configuration

กำหนด origin ที่สามารถเข้าถึง API ได้:

\`\`\`typescript
app.enableCors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
\`\`\`

---

### 5. Validation

ตรวจสอบข้อมูลอัตโนมัติด้วย class-validator:

\`\`\`typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
\`\`\`

---

## 👥 Role Management

### Roles ที่มีในระบบ

\`\`\`typescript
export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  SUPER_ADMIN = 'super_admin',
}
\`\`\`

### การกำหนด Roles

\`\`\`typescript
// กำหนด role เมื่อสร้าง user
const user = await this.usersService.create({
  ...registerDto,
  roles: [Role.USER], // Default role
});

// กำหนดหลาย roles
roles: [Role.ADMIN, Role.MODERATOR]
\`\`\`

---

## 🧪 การทดสอบ (Testing)

### ทดสอบด้วย cURL

**Register:**
\`\`\`bash
curl -X POST http://localhost:3000/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "username": "testuser"
  }'
\`\`\`

**Login:**
\`\`\`bash
curl -X POST http://localhost:3000/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "usernameOrEmail": "test@example.com",
    "password": "password123"
  }'
\`\`\`

**Get Profile:**
\`\`\`bash
curl -X GET http://localhost:3000/api/auth/me \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
\`\`\`

---

## 📝 Best Practices

1. **เปลี่ยน JWT Secrets** - อย่าใช้ default secrets ใน production
2. **ใช้ HTTPS** - ใช้ HTTPS ใน production เสมอ
3. **กำหนด Token Expiry** - Access token ควรมีอายุสั้น (15 นาที)
4. **เก็บ Refresh Token อย่างปลอดภัย** - เก็บใน httpOnly cookie หรือ secure storage
5. **Validate Input** - ใช้ class-validator ตรวจสอบข้อมูลทุกครั้ง
6. **Rate Limiting** - จำกัด request เพื่อป้องกัน brute force attack
7. **Log Security Events** - บันทึก login attempts และ security events

---

## 🔄 Token Lifecycle

\`\`\`
1. User Login
   ↓
2. Server สร้าง Access Token (15 นาที) และ Refresh Token (7 วัน)
   ↓
3. Client เก็บ tokens
   ↓
4. Client ใช้ Access Token ในการเรียก API
   ↓
5. Access Token หมดอายุ
   ↓
6. Client ใช้ Refresh Token เพื่อขอ Access Token ใหม่
   ↓
7. Server ตรวจสอบ Refresh Token และออก tokens ใหม่
   ↓
8. วนกลับไปที่ขั้นตอนที่ 4
\`\`\`

---

## 🚨 Error Handling

### Common Errors:

1. **401 Unauthorized** - Token ไม่ถูกต้องหรือหมดอายุ
2. **403 Forbidden** - ไม่มีสิทธิ์เข้าถึง
3. **409 Conflict** - User มีอยู่แล้ว
4. **429 Too Many Requests** - เกิน rate limit

### Error Response Format:

\`\`\`json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Invalid token"
}
\`\`\`

---

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Passport.js](http://www.passportjs.org/)
- [JWT.io](https://jwt.io/)
- [OWASP Security Guidelines](https://owasp.org/)

---

## 🎯 Next Steps

1. เชื่อมต่อกับ Database (PostgreSQL, MongoDB, etc.)
2. เพิ่ม Email Verification
3. เพิ่ม Password Reset
4. เพิ่ม Two-Factor Authentication (2FA)
5. เพิ่ม OAuth2 (Google, Facebook, etc.)
6. เพิ่ม Audit Logging
7. เพิ่ม Session Management

---

## 💡 Tips

- ใช้ environment variables สำหรับ sensitive data
- อย่า commit secrets ลง git
- ใช้ strong passwords
- อัพเดท dependencies เป็นประจำ
- ทำ security audit เป็นระยะ

---

**Created by:** Backend Team  
**Last Updated:** 2025  
**Version:** 1.0.0

