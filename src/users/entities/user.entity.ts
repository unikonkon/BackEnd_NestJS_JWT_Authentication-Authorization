import { Role } from '../../common/enums/role.enum';

export class User {
  id: string;
  email: string;
  password: string;
  username: string;
  firstName?: string;
  lastName?: string;
  roles: Role[];
  isActive: boolean;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

