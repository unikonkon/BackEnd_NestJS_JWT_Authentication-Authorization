# 📚 API Documentation Index - Test Cannabis Backend

## ยินดีต้อนรับสู่เอกสาร API

เอกสารนี้รวบรวมทุกอย่างที่คุณต้องการสำหรับการใช้งาน Test Cannabis Backend API

---

## 🚀 เริ่มต้นใช้งาน

### สำหรับผู้เริ่มต้น
1. **[QUICK_START.md](./QUICK_START.md)** - เริ่มต้นใช้งานภายใน 5 นาที
   - การติดตั้ง
   - การตั้งค่า
   - ตัวอย่างการใช้งานพื้นฐาน

### สำหรับ Developer
2. **[API_QUICK_REFERENCE.md](./API_QUICK_REFERENCE.md)** - เอกสารอ้างอิงรวดเร็ว
   - Endpoint ทั้งหมดในหน้าเดียว
   - ตัวอย่าง cURL, JavaScript, Python
   - Status codes และ Error handling

3. **[API_USAGE_GUIDE.md](./API_USAGE_GUIDE.md)** - คู่มือการใช้งาน API แบบละเอียด
   - รายละเอียดทุก endpoint
   - Request/Response examples
   - Error handling
   - Best practices
   - Postman collection

---

## 📖 เอกสารเชิงลึก

### Authentication & Authorization
4. **[AUTH_DOCUMENTATION.md](./AUTH_DOCUMENTATION.md)** - เอกสารระบบ Authentication ฉบับสมบูรณ์
   - JWT Authentication
   - Role-Based Access Control
   - Security Features
   - Token Management
   - Custom Decorators

### Architecture
5. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - สถาปัตยกรรมระบบ
   - System Architecture Diagrams
   - Authentication Flow
   - Module Dependencies
   - Security Layers
   - Deployment Architecture

### Implementation
6. **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - สรุปการพัฒนา
   - ฟีเจอร์ที่สร้าง
   - ไฟล์ที่สร้างทั้งหมด
   - ผลการทดสอบ
   - Statistics

---

## 🛠️ เครื่องมือช่วยพัฒนา

### Testing Tools
7. **[test-auth.http](./test-auth.http)** - REST Client Test File
   - ทดสอบ API ด้วย VS Code REST Client
   - ครบทุก endpoints
   - Test cases สำหรับ validation

8. **[Test-Cannabis-API.postman_collection.json](./Test-Cannabis-API.postman_collection.json)** - Postman Collection
   - Import ลง Postman ได้เลย
   - Auto-save tokens
   - Test scripts
   - Environment variables

---

## 📋 Quick Links

### 🔥 Most Used

| เอกสาร | สำหรับ | เวลาอ่าน |
|--------|--------|----------|
| [API Quick Reference](./API_QUICK_REFERENCE.md) | ดู endpoint รวดเร็ว | 2 นาที |
| [Quick Start](./QUICK_START.md) | เริ่มใช้งานครั้งแรก | 5 นาที |
| [API Usage Guide](./API_USAGE_GUIDE.md) | ศึกษาการใช้งานละเอียด | 15 นาที |

### 📚 Complete Documentation

| เอกสาร | สำหรับ | เวลาอ่าน |
|--------|--------|----------|
| [Auth Documentation](./AUTH_DOCUMENTATION.md) | เข้าใจระบบ Auth | 20 นาที |
| [Architecture](./ARCHITECTURE.md) | เข้าใจสถาปัตยกรรม | 15 นาที |
| [Implementation Summary](./IMPLEMENTATION_SUMMARY.md) | ดูสรุปการพัฒนา | 10 นาที |

---

## 🎯 เลือกเอกสารตามความต้องการ

### ฉันต้องการ...

#### 🚀 เริ่มใช้งานเร็วที่สุด
→ [QUICK_START.md](./QUICK_START.md)

#### 📝 ดู API Endpoints ทั้งหมด
→ [API_QUICK_REFERENCE.md](./API_QUICK_REFERENCE.md)

#### 🔍 ศึกษารายละเอียดแต่ละ Endpoint
→ [API_USAGE_GUIDE.md](./API_USAGE_GUIDE.md)

#### 🔐 เข้าใจระบบ Authentication
→ [AUTH_DOCUMENTATION.md](./AUTH_DOCUMENTATION.md)

#### 🏗️ เข้าใจสถาปัตยกรรมระบบ
→ [ARCHITECTURE.md](./ARCHITECTURE.md)

#### 🧪 ทดสอบ API
→ [test-auth.http](./test-auth.http) หรือ [Postman Collection](./Test-Cannabis-API.postman_collection.json)

#### 📊 ดูสรุปการพัฒนา
→ [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)

---

## 🌟 Highlights

### ✅ ฟีเจอร์หลัก

- **JWT Authentication** - Access & Refresh tokens
- **Global Guards** - Protected by default
- **Role-Based Access Control** - 4 roles (USER, ADMIN, MODERATOR, SUPER_ADMIN)
- **Security Features** - bcrypt, helmet, rate limiting, CORS
- **Input Validation** - Automatic DTO validation
- **Custom Decorators** - @Public(), @Roles(), @CurrentUser()

### 📊 API Endpoints

| Category | Endpoints | Access |
|----------|-----------|--------|
| Authentication | 5 | Public/Protected |
| User Management | 5 | Protected/Admin |
| Health Check | 1 | Public |
| **Total** | **11** | - |

### 🛡️ Security

- Password hashing with bcrypt (10 rounds)
- JWT tokens with expiration
- Rate limiting (10 req/60s)
- Security headers (Helmet)
- CORS configuration
- Input validation

---

## 📖 การอ่านเอกสาร

### สำหรับผู้เริ่มต้น (Beginner)

1. อ่าน [QUICK_START.md](./QUICK_START.md) - เข้าใจพื้นฐาน
2. ลองใช้ [test-auth.http](./test-auth.http) - ทดสอบ API
3. อ่าน [API_QUICK_REFERENCE.md](./API_QUICK_REFERENCE.md) - จำ endpoints

### สำหรับ Developer (Intermediate)

1. อ่าน [API_USAGE_GUIDE.md](./API_USAGE_GUIDE.md) - เข้าใจรายละเอียด
2. อ่าน [AUTH_DOCUMENTATION.md](./AUTH_DOCUMENTATION.md) - เข้าใจ Auth
3. ใช้ [Postman Collection](./Test-Cannabis-API.postman_collection.json) - พัฒนา

### สำหรับ Architect/Senior (Advanced)

1. อ่าน [ARCHITECTURE.md](./ARCHITECTURE.md) - เข้าใจสถาปัตยกรรม
2. อ่าน [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - ดูรายละเอียด
3. ศึกษา source code - เข้าใจการทำงาน

---

## 🔄 API Workflow

```
1. Register/Login
   ↓
2. Get Tokens (accessToken, refreshToken)
   ↓
3. Use accessToken in Authorization header
   ↓
4. Call Protected APIs
   ↓
5. When accessToken expires
   ↓
6. Use refreshToken to get new tokens
   ↓
7. Continue using APIs
   ↓
8. Logout when done
```

---

## 💡 Tips & Best Practices

### การจัดการ Tokens
- เก็บ accessToken ใน memory
- เก็บ refreshToken ใน httpOnly cookie
- Refresh token อัตโนมัติเมื่อหมดอายุ
- Clear tokens เมื่อ logout

### Error Handling
- ตรวจสอบ HTTP status codes
- Handle 401 (redirect to login)
- Handle 403 (show permission denied)
- Handle 429 (rate limit exceeded)

### Security
- ใช้ HTTPS ใน production
- อย่า commit secrets
- Validate input ทุกครั้ง
- Log security events

---

## 🎓 Learning Path

### Level 1: Basic (1-2 ชั่วโมง)
- [ ] อ่าน Quick Start
- [ ] ทดสอบ Register/Login
- [ ] เรียก Protected API
- [ ] ทดสอบ Logout

### Level 2: Intermediate (3-4 ชั่วโมง)
- [ ] อ่าน API Usage Guide
- [ ] ทดสอบทุก endpoints
- [ ] เข้าใจ Error handling
- [ ] ใช้ Postman Collection

### Level 3: Advanced (5+ ชั่วโมง)
- [ ] อ่าน Architecture
- [ ] เข้าใจ Authentication flow
- [ ] ศึกษา Security features
- [ ] Implement ใน project จริง

---

## 📞 Support & Resources

### Documentation
- README.md - Overview
- All documentation files listed above

### Testing
- test-auth.http - REST Client
- Postman Collection - Postman

### Code
- src/ - Source code
- Check inline comments

---

## 🔄 Updates

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Nov 13, 2025 | Initial release |

---

## 📝 Feedback

หากพบปัญหาหรือมีข้อเสนอแนะ:
1. ตรวจสอบเอกสารที่เกี่ยวข้อง
2. ดู error messages
3. ตรวจสอบ logs
4. ติดต่อทีมพัฒนา

---

## 🎉 Ready to Start!

เลือกเอกสารที่เหมาะกับคุณและเริ่มต้นใช้งาน Test Cannabis API กันเลย!

**Happy Coding! 🚀**

---

**Created by:** Test Cannabis Backend Team  
**Version:** 1.0.0  
**Last Updated:** November 13, 2025

