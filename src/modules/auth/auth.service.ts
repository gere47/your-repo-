import { 
  Injectable, 
  UnauthorizedException, 
  ConflictException, 
  NotFoundException,
  BadRequestException,
  InternalServerErrorException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../database/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          OR: [{ username }, { email: username }],
          isActive: true,
        },
        include: {
          role: {
            include: {
              modulePermissions: {
                include: {
                  module: true,
                },
                where: {
                  canView: true,
                  module: {
                    isActive: true,
                  },
                },
              },
            },
          },
        },
      });

      if (user && (await bcrypt.compare(password, user.passwordHash))) {
        const { passwordHash, ...result } = user;
        
        // Format accessible modules
        const accessibleModules = user.role.modulePermissions.map((permission) => ({
          id: permission.module.id,
          name: permission.module.name,
          description: permission.module.description,
          path: permission.module.path,
          icon: permission.module.icon,
          order: permission.module.order,
          permissions: {
            canView: permission.canView,
            canCreate: permission.canCreate,
            canEdit: permission.canEdit,
            canDelete: permission.canDelete,
          },
        })).sort((a, b) => a.order - b.order);

        return {
          ...result,
          accessibleModules,
        };
      }
      return null;
    } catch (error) {
      throw new InternalServerErrorException('Authentication service error');
    }
  }

  async validateUserById(userId: number): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId, isActive: true },
        include: {
          role: {
            include: {
              modulePermissions: {
                include: {
                  module: true,
                },
                where: {
                  canView: true,
                  module: {
                    isActive: true,
                  },
                },
              },
            },
          },
        },
      });

      if (user) {
        const { passwordHash, ...result } = user;
        
        // Format accessible modules
        const accessibleModules = user.role.modulePermissions.map((permission) => ({
          id: permission.module.id,
          name: permission.module.name,
          description: permission.module.description,
          path: permission.module.path,
          icon: permission.module.icon,
          order: permission.module.order,
          permissions: {
            canView: permission.canView,
            canCreate: permission.canCreate,
            canEdit: permission.canEdit,
            canDelete: permission.canDelete,
          },
        })).sort((a, b) => a.order - b.order);

        return {
          ...result,
          accessibleModules,
        };
      }
      return null;
    } catch (error) {
      throw new InternalServerErrorException('User validation error');
    }
  }

  async login(loginDto: LoginDto, ipAddress?: string, userAgent?: string) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    try {
      // Update last login
      await this.prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      });

      // Generate JWT token
      const payload: JwtPayload = { 
        sub: user.id, 
        username: user.username,
        role: user.role.name,
      };

      const token = this.jwtService.sign(payload, {
        secret: this.configService.get('jwt.secret'),
        expiresIn: this.configService.get('jwt.expiresIn'),
      });

      // Create session
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      await this.prisma.userSession.create({
        data: {
          userId: user.id,
          token,
          expiresAt,
          ipAddress,
          userAgent,
        },
      });

      // Audit log
      await this.prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'LOGIN',
          resource: 'AUTH',
          ipAddress,
          userAgent,
          details: { loginMethod: 'username_password' },
        },
      });

      return {
        access_token: token,
        token_type: 'Bearer',
        expires_in: this.configService.get('jwt.expiresIn'),
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          avatar: user.avatar,
          role: user.role.name,
          permissions: user.role.permissions,
          lastLogin: user.lastLogin,
          accessibleModules: user.accessibleModules,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException('Login processing error');
    }
  }

  async register(registerDto: RegisterDto) {
    // Check if user exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { username: registerDto.username },
          { email: registerDto.email },
        ],
      },
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    // Verify role exists and is not system role
    const role = await this.prisma.role.findUnique({
      where: { id: registerDto.roleId },
    });

    if (!role) {
      throw new BadRequestException('Invalid role ID');
    }

    if (role.isSystem && ['super_admin', 'admin'].includes(role.name)) {
      throw new BadRequestException('Cannot register with system admin role');
    }

    try {
      // Hash password
      const passwordHash = await bcrypt.hash(
        registerDto.password,
        this.configService.get('bcrypt.rounds'),
      );

      // Create user
      const user = await this.prisma.user.create({
        data: {
          username: registerDto.username,
          email: registerDto.email,
          passwordHash,
          firstName: registerDto.firstName,
          lastName: registerDto.lastName,
          phone: registerDto.phone,
          roleId: registerDto.roleId,
        },
        include: {
          role: {
            include: {
              modulePermissions: {
                include: {
                  module: true,
                },
                where: {
                  canView: true,
                  module: {
                    isActive: true,
                  },
                },
              },
            },
          },
        },
      });

      const { passwordHash: _, ...result } = user;

      // Format accessible modules
      const accessibleModules = user.role.modulePermissions.map((permission) => ({
        id: permission.module.id,
        name: permission.module.name,
        description: permission.module.description,
        path: permission.module.path,
        icon: permission.module.icon,
        order: permission.module.order,
        permissions: {
          canView: permission.canView,
          canCreate: permission.canCreate,
          canEdit: permission.canEdit,
          canDelete: permission.canDelete,
        },
      })).sort((a, b) => a.order - b.order);

      // Audit log
      await this.prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'CREATE',
          resource: 'USER',
          resourceId: user.id,
          details: { 
            action: 'USER_REGISTRATION',
            registeredBy: 'self',
          },
        },
      });

      return {
        message: 'User registered successfully',
        user: {
          ...result,
          accessibleModules,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException('User registration failed');
    }
  }

  async getProfile(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId, isActive: true },
        include: {
          role: {
            include: {
              modulePermissions: {
                include: {
                  module: true,
                },
                where: {
                  canView: true,
                  module: {
                    isActive: true,
                  },
                },
              },
            },
          },
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const { passwordHash, ...result } = user;

      // Format accessible modules
      const accessibleModules = user.role.modulePermissions.map((permission) => ({
        id: permission.module.id,
        name: permission.module.name,
        description: permission.module.description,
        path: permission.module.path,
        icon: permission.module.icon,
        order: permission.module.order,
        permissions: {
          canView: permission.canView,
          canCreate: permission.canCreate,
          canEdit: permission.canEdit,
          canDelete: permission.canDelete,
        },
      })).sort((a, b) => a.order - b.order);

      return {
        ...result,
        accessibleModules,
      };
    } catch (error) {
      throw new InternalServerErrorException('Profile retrieval failed');
    }
  }

  async updateProfile(userId: number, updateProfileDto: UpdateProfileDto) {
    // Check if email is taken by another user
    if (updateProfileDto.email) {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          email: updateProfileDto.email,
          id: { not: userId },
        },
      });

      if (existingUser) {
        throw new ConflictException('Email already taken by another user');
      }
    }

    try {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: updateProfileDto,
        include: {
          role: {
            include: {
              modulePermissions: {
                include: {
                  module: true,
                },
                where: {
                  canView: true,
                  module: {
                    isActive: true,
                  },
                },
              },
            },
          },
        },
      });

      const { passwordHash, ...result } = user;

      // Format accessible modules
      const accessibleModules = user.role.modulePermissions.map((permission) => ({
        id: permission.module.id,
        name: permission.module.name,
        description: permission.module.description,
        path: permission.module.path,
        icon: permission.module.icon,
        order: permission.module.order,
        permissions: {
          canView: permission.canView,
          canCreate: permission.canCreate,
          canEdit: permission.canEdit,
          canDelete: permission.canDelete,
        },
      })).sort((a, b) => a.order - b.order);

      // Audit log
      await this.prisma.auditLog.create({
        data: {
          userId,
          action: 'UPDATE',
          resource: 'PROFILE',
          resourceId: userId,
          details: { updatedFields: Object.keys(updateProfileDto) },
        },
      });

      return {
        message: 'Profile updated successfully',
        user: {
          ...result,
          accessibleModules,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException('Profile update failed');
    }
  }

  async changePassword(userId: number, changePasswordDto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.passwordHash,
    );

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    try {
      // Hash new password
      const newPasswordHash = await bcrypt.hash(
        changePasswordDto.newPassword,
        this.configService.get('bcrypt.rounds'),
      );

      // Update password
      await this.prisma.user.update({
        where: { id: userId },
        data: { passwordHash: newPasswordHash },
      });

      // Invalidate all sessions except current
      await this.prisma.userSession.updateMany({
        where: {
          userId,
          isActive: true,
        },
        data: { isActive: false },
      });

      // Audit log
      await this.prisma.auditLog.create({
        data: {
          userId,
          action: 'UPDATE',
          resource: 'PASSWORD',
          resourceId: userId,
        },
      });

      return { message: 'Password changed successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Password change failed');
    }
  }

  async logout(token: string) {
    try {
      await this.prisma.userSession.updateMany({
        where: { token },
        data: { isActive: false },
      });

      return { message: 'Logged out successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Logout failed');
    }
  }

  async logoutAll(userId: number) {
    try {
      await this.prisma.userSession.updateMany({
        where: { userId, isActive: true },
        data: { isActive: false },
      });

      // Audit log
      await this.prisma.auditLog.create({
        data: {
          userId,
          action: 'LOGOUT',
          resource: 'ALL_SESSIONS',
          resourceId: userId,
        },
      });

      return { message: 'Logged out from all devices' };
    } catch (error) {
      throw new InternalServerErrorException('Logout all failed');
    }
  }

  async deleteUser(userId: number, currentUserId: number) {
    if (userId === currentUserId) {
      throw new BadRequestException('You cannot delete your own account');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { role: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Prevent deletion of system admin users
    if (user.role.isSystem && ['super_admin', 'admin'].includes(user.role.name)) {
      throw new BadRequestException('Cannot delete system administrator accounts');
    }

    try {
      // Soft delete user
      await this.prisma.user.update({
        where: { id: userId },
        data: { isActive: false },
      });

      // Invalidate all sessions
      await this.prisma.userSession.updateMany({
        where: { userId },
        data: { isActive: false },
      });

      // Audit log
      await this.prisma.auditLog.create({
        data: {
          userId: currentUserId,
          action: 'DELETE',
          resource: 'USER',
          resourceId: userId,
          details: { deletedBy: currentUserId },
        },
      });

      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('User deletion failed');
    }
  }

  async getActiveSessions(userId: number) {
    try {
      const sessions = await this.prisma.userSession.findMany({
        where: {
          userId,
          isActive: true,
          expiresAt: { gt: new Date() },
        },
        orderBy: { createdAt: 'desc' },
      });

      return sessions;
    } catch (error) {
      throw new InternalServerErrorException('Sessions retrieval failed');
    }
  }

  async refreshToken(userId: number) {
    try {
      const user = await this.validateUserById(userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const payload: JwtPayload = { 
        sub: user.id, 
        username: user.username,
        role: user.role.name,
      };

      const token = this.jwtService.sign(payload, {
        secret: this.configService.get('jwt.secret'),
        expiresIn: this.configService.get('jwt.expiresIn'),
      });

      // Update session
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      await this.prisma.userSession.updateMany({
        where: { userId, isActive: true },
        data: { token, expiresAt },
      });

      return {
        access_token: token,
        token_type: 'Bearer',
        expires_in: this.configService.get('jwt.expiresIn'),
      };
    } catch (error) {
      throw new InternalServerErrorException('Token refresh failed');
    }
  }
}