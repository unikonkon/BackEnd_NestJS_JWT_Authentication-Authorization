import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from '../common/enums/role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  // In-memory storage (replace with database in production)
  private users: User[] = [];
  private idCounter = 1;

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if user already exists
    const existingUser = this.users.find(
      (user) =>
        user.email === createUserDto.email ||
        user.username === createUserDto.username,
    );

    if (existingUser) {
      throw new ConflictException(
        'ผู้ใช้ที่มีอีเมลหรือชื่อผู้ใช้นี้มีอยู่แล้ว',
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user: User = {
      id: String(this.idCounter++),
      email: createUserDto.email,
      password: hashedPassword,
      username: createUserDto.username,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      roles: createUserDto.roles || [Role.USER],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);
    return this.sanitizeUser(user);
  }

  async findAll(): Promise<User[]> {
    return this.users.map((user) => this.sanitizeUser(user));
  }

  async findOne(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`ไม่พบผู้ใช้ที่มี ID: ${id}`);
    }
    return this.sanitizeUser(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`ไม่พบผู้ใช้ที่มี ID: ${id}`);
    }

    // If password is being updated, hash it
    const updateData: any = { ...updateUserDto };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateData,
      updatedAt: new Date(),
    };

    return this.sanitizeUser(this.users[userIndex]);
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string | null,
  ): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === userId);
    if (userIndex !== -1) {
      this.users[userIndex].refreshToken = refreshToken
        ? await bcrypt.hash(refreshToken, 10)
        : undefined;
      this.users[userIndex].updatedAt = new Date();
    }
  }

  async remove(id: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`ไม่พบผู้ใช้ที่มี ID: ${id}`);
    }
    this.users.splice(userIndex, 1);
  }

  // Helper method to remove sensitive data
  private sanitizeUser(user: User): User {
    const { password, refreshToken, ...sanitized } = user;
    return sanitized as User;
  }
}

