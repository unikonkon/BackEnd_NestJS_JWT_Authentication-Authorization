<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

DTAM Cannabis Backend API - A secure NestJS application with complete JWT Authentication & Authorization system.

## 🔐 Authentication System

This project includes a **production-ready** authentication and authorization system with:

- ✅ **JWT Authentication** - Access & Refresh tokens
- ✅ **Global Guards** - All routes protected by default
- ✅ **Role-Based Access Control** - USER, ADMIN, MODERATOR, SUPER_ADMIN
- ✅ **Security Features** - bcrypt, helmet, rate limiting, CORS
- ✅ **Input Validation** - class-validator with DTO validation
- ✅ **Custom Decorators** - @Public(), @Roles(), @CurrentUser()

### 📚 Documentation

**📖 [API Documentation Index](./API_DOCUMENTATION_INDEX.md)** - เริ่มต้นที่นี่!

#### Quick Access
- **[QUICK_START.md](./QUICK_START.md)** - Quick start guide (ภาษาไทย)
- **[API_QUICK_REFERENCE.md](./API_QUICK_REFERENCE.md)** - เอกสารอ้างอิงรวดเร็ว

#### API Documentation
- **[API_USAGE_GUIDE.md](./API_USAGE_GUIDE.md)** - คู่มือการใช้งาน API แบบละเอียด
- **[DTAM-Cannabis-API.postman_collection.json](./DTAM-Cannabis-API.postman_collection.json)** - Postman Collection
- **[test-auth.http](./test-auth.http)** - REST Client test file

#### System Documentation
- **[AUTH_DOCUMENTATION.md](./AUTH_DOCUMENTATION.md)** - Complete authentication docs (ภาษาไทย)
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture diagrams
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Implementation details

### 🚀 Quick Start

1. **Install dependencies**
```bash
npm install
```

2. **Create .env file**
```env
PORT=3000
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key
```

3. **Run the application**
```bash
npm run start:dev
```

4. **Test the API**
```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","username":"testuser"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"usernameOrEmail":"test@example.com","password":"password123"}'
```

### 🔑 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api` | Health check | Public |
| POST | `/api/auth/register` | Register user | Public |
| POST | `/api/auth/login` | Login user | Public |
| POST | `/api/auth/logout` | Logout user | Protected |
| POST | `/api/auth/refresh` | Refresh tokens | Public |
| GET | `/api/auth/me` | Get profile | Protected |
| GET | `/api/users` | Get all users | Admin only |
| POST | `/api/users` | Create user | Admin only |

### 🛡️ Security Features

- **Password Hashing** - bcrypt with 10 rounds
- **JWT Tokens** - Access (15min) & Refresh (7 days)
- **Rate Limiting** - 10 requests per 60 seconds
- **Security Headers** - Helmet middleware
- **CORS** - Configurable origins
- **Input Validation** - Automatic DTO validation

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
