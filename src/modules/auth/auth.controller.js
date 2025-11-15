"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthController = void 0;
var openapi = require("@nestjs/swagger");
// import { 
//   Controller, 
//   Post, 
//   Body, 
//   UseGuards, 
//   Req, 
//   Get, 
//   Put, 
//   Delete, 
//   Param,
//   HttpCode,
//   HttpStatus,
//   Query,
//   Patch
// } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { LoginDto } from './dto/login.dto';
// import { RegisterDto } from './dto/register.dto';
// import { UpdateProfileDto } from './dto/update-profile.dto';
// import { ChangePasswordDto } from './dto/change-password.dto';
// import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
// import { RolesGuard } from '../../common/guards/roles.guard';
// import { Public } from '../../common/decorators/public.decorator';
// import { Roles } from '../../common/decorators/roles.decorator';
// import { 
//   ApiTags, 
//   ApiOperation, 
//   ApiResponse, 
//   ApiBearerAuth, 
//   ApiBody,
//   ApiParam,
//   ApiQuery,
//   ApiHeader 
// } from '@nestjs/swagger';
// @ApiTags('Authentication & Authorization')
// @ApiBearerAuth('JWT-auth')
// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}
//   @Public()
//   @Post('login')
//   @HttpCode(HttpStatus.OK)
//   @ApiOperation({ 
//     summary: 'User login', 
//     description: 'Authenticate user with username/email and password. Returns JWT token and user information with accessible modules.' 
//   })
//   @ApiBody({ type: LoginDto })
//   @ApiResponse({ 
//     status: HttpStatus.OK, 
//     description: 'Login successful',
//     schema: {
//       example: {
//         access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
//         token_type: 'Bearer',
//         expires_in: '24h',
//         user: {
//           id: 1,
//           username: 'superadmin',
//           email: 'superadmin@school.edu',
//           firstName: 'Super',
//           lastName: 'Admin',
//           phone: '+1234567890',
//           role: 'super_admin',
//           permissions: { '*': ['create', 'read', 'update', 'delete', 'manage'] },
//           lastLogin: '2023-10-01T12:00:00.000Z',
//           accessibleModules: [
//             {
//               id: 1,
//               name: 'Dashboard',
//               description: 'System dashboard and overview',
//               path: '/dashboard',
//               icon: 'mdi-view-dashboard',
//               order: 1,
//               permissions: {
//                 canView: true,
//                 canCreate: true,
//                 canEdit: true,
//                 canDelete: true
//               }
//             }
//           ]
//         }
//       }
//     }
//   })
//   @ApiResponse({ 
//     status: HttpStatus.UNAUTHORIZED, 
//     description: 'Invalid credentials',
//     schema: {
//       example: {
//         statusCode: 401,
//         message: 'Invalid username or password',
//         error: 'Unauthorized'
//       }
//     }
//   })
//   @ApiResponse({ 
//     status: HttpStatus.TOO_MANY_REQUESTS, 
//     description: 'Too many login attempts'
//   })
//   async login(@Body() loginDto: LoginDto, @Req() req: any) {
//     const ipAddress = req.ip;
//     const userAgent = req.get('User-Agent');
//     return this.authService.login(loginDto, ipAddress, userAgent);
//   }
//   @Public()
//   @Post('register')
//   @ApiOperation({ 
//     summary: 'Register new user', 
//     description: 'Create a new user account. Role ID must be provided (3=teacher, 4=student, 5=parent, 6=accountant, 7=librarian). System admin roles cannot be assigned during registration.' 
//   })
//   @ApiBody({ type: RegisterDto })
//   @ApiResponse({ 
//     status: HttpStatus.CREATED, 
//     description: 'User registered successfully',
//     schema: {
//       example: {
//         message: 'User registered successfully',
//         user: {
//           id: 2,
//           username: 'teacher1',
//           email: 'teacher1@school.edu',
//           firstName: 'John',
//           lastName: 'Doe',
//           phone: '+1234567890',
//           roleId: 3,
//           isActive: true,
//           lastLogin: null,
//           createdAt: '2023-10-01T12:00:00.000Z',
//           updatedAt: '2023-10-01T12:00:00.000Z',
//           role: {
//             id: 3,
//             name: 'teacher',
//             description: 'Teacher access for academic activities',
//             permissions: {
//               students: ['read'],
//               attendance: ['create', 'read', 'update'],
//               grades: ['create', 'read', 'update']
//             }
//           },
//           accessibleModules: [
//             {
//               id: 1,
//               name: 'Dashboard',
//               path: '/dashboard',
//               icon: 'mdi-view-dashboard',
//               permissions: { canView: true, canCreate: false, canEdit: false, canDelete: false }
//             },
//             {
//               id: 4,
//               name: 'Attendance Management',
//               path: '/attendance',
//               icon: 'mdi-calendar-check',
//               permissions: { canView: true, canCreate: true, canEdit: true, canDelete: false }
//             }
//           ]
//         }
//       }
//     }
//   })
//   @ApiResponse({ 
//     status: HttpStatus.CONFLICT, 
//     description: 'Username or email already exists'
//   })
//   @ApiResponse({ 
//     status: HttpStatus.BAD_REQUEST, 
//     description: 'Invalid role ID or validation error'
//   })
//   async register(@Body() registerDto: RegisterDto) {
//     return this.authService.register(registerDto);
//   }
//   @Get('profile')
//   @UseGuards(JwtAuthGuard)
//   @ApiOperation({ 
//     summary: 'Get user profile', 
//     description: 'Get current authenticated user profile with role information and accessible modules.' 
//   })
//   @ApiResponse({ 
//     status: HttpStatus.OK, 
//     description: 'Profile retrieved successfully',
//     schema: {
//       example: {
//         id: 1,
//         username: 'superadmin',
//         email: 'superadmin@school.edu',
//         firstName: 'Super',
//         lastName: 'Admin',
//         phone: '+1234567890',
//         avatar: null,
//         roleId: 1,
//         isActive: true,
//         lastLogin: '2023-10-01T12:00:00.000Z',
//         createdAt: '2023-10-01T10:00:00.000Z',
//         updatedAt: '2023-10-01T12:00:00.000Z',
//         role: {
//           id: 1,
//           name: 'super_admin',
//           description: 'Full system access with all permissions',
//           permissions: { '*': ['create', 'read', 'update', 'delete', 'manage'] },
//           isSystem: true,
//           createdAt: '2023-10-01T10:00:00.000Z',
//           updatedAt: '2023-10-01T10:00:00.000Z'
//         },
//         accessibleModules: [
//           {
//             id: 1,
//             name: 'Dashboard',
//             description: 'System dashboard and overview',
//             path: '/dashboard',
//             icon: 'mdi-view-dashboard',
//             order: 1,
//             permissions: {
//               canView: true,
//               canCreate: true,
//               canEdit: true,
//               canDelete: true
//             }
//           }
//         ]
//       }
//     }
//   })
//   @ApiResponse({ 
//     status: HttpStatus.UNAUTHORIZED, 
//     description: 'Invalid or expired token'
//   })
//   async getProfile(@Req() req: any) {
//     return this.authService.getProfile(req.user.id);
//   }
//   @Put('profile')
//   @UseGuards(JwtAuthGuard)
//   @ApiOperation({ 
//     summary: 'Update user profile', 
//     description: 'Update current user profile information. Email must be unique across the system.' 
//   })
//   @ApiBody({ type: UpdateProfileDto })
//   @ApiResponse({ 
//     status: HttpStatus.OK, 
//     description: 'Profile updated successfully',
//     schema: {
//       example: {
//         message: 'Profile updated successfully',
//         user: {
//           id: 1,
//           username: 'superadmin',
//           email: 'updated@school.edu',
//           firstName: 'Updated',
//           lastName: 'Name',
//           phone: '+1234567890',
//           roleId: 1,
//           isActive: true,
//           lastLogin: '2023-10-01T12:00:00.000Z',
//           createdAt: '2023-10-01T10:00:00.000Z',
//           updatedAt: '2023-10-01T12:30:00.000Z',
//           role: {
//             id: 1,
//             name: 'super_admin',
//             description: 'Full system access with all permissions',
//             permissions: { '*': ['create', 'read', 'update', 'delete', 'manage'] }
//           },
//           accessibleModules: [...]
//         }
//       }
//     }
//   })
//   @ApiResponse({ 
//     status: HttpStatus.CONFLICT, 
//     description: 'Email already taken by another user'
//   })
//   async updateProfile(@Req() req: any, @Body() updateProfileDto: UpdateProfileDto) {
//     return this.authService.updateProfile(req.user.id, updateProfileDto);
//   }
//   @Put('change-password')
//   @UseGuards(JwtAuthGuard)
//   @ApiOperation({ 
//     summary: 'Change user password', 
//     description: 'Change current user password. Requires current password verification. All active sessions will be invalidated for security.' 
//   })
//   @ApiBody({ type: ChangePasswordDto })
//   @ApiResponse({ 
//     status: HttpStatus.OK, 
//     description: 'Password changed successfully',
//     schema: {
//       example: {
//         message: 'Password changed successfully'
//       }
//     }
//   })
//   @ApiResponse({ 
//     status: HttpStatus.UNAUTHORIZED, 
//     description: 'Current password is incorrect'
//   })
//   @ApiResponse({ 
//     status: HttpStatus.BAD_REQUEST, 
//     description: 'New password does not meet security requirements'
//   })
//   async changePassword(@Req() req: any, @Body() changePasswordDto: ChangePasswordDto) {
//     return this.authService.changePassword(req.user.id, changePasswordDto);
//   }
//   @Post('logout')
//   @UseGuards(JwtAuthGuard)
//   @ApiOperation({ 
//     summary: 'Logout user', 
//     description: 'Invalidate current session token. User will need to login again to access protected routes.' 
//   })
//   @ApiResponse({ 
//     status: HttpStatus.OK, 
//     description: 'Logout successful',
//     schema: {
//       example: {
//         message: 'Logged out successfully'
//       }
//     }
//   })
//   async logout(@Req() req: any) {
//     const token = req.headers.authorization?.replace('Bearer ', '');
//     return this.authService.logout(token);
//   }
//   @Post('logout-all')
//   @UseGuards(JwtAuthGuard)
//   @ApiOperation({ 
//     summary: 'Logout from all devices', 
//     description: 'Invalidate all active sessions for the current user across all devices.' 
//   })
//   @ApiResponse({ 
//     status: HttpStatus.OK, 
//     description: 'Logged out from all devices',
//     schema: {
//       example: {
//         message: 'Logged out from all devices'
//       }
//     }
//   })
//   async logoutAll(@Req() req: any) {
//     return this.authService.logoutAll(req.user.id);
//   }
//   @Get('sessions')
//   @UseGuards(JwtAuthGuard)
//   @ApiOperation({ 
//     summary: 'Get active sessions', 
//     description: 'Get all active sessions for the current user with device and location information.' 
//   })
//   @ApiResponse({ 
//     status: HttpStatus.OK, 
//     description: 'Sessions retrieved successfully',
//     schema: {
//       example: {
//         data: [
//           {
//             id: 1,
//             userId: 1,
//             token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
//             expiresAt: '2023-10-02T12:00:00.000Z',
//             isActive: true,
//             ipAddress: '192.168.1.100',
//             userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
//             createdAt: '2023-10-01T12:00:00.000Z'
//           }
//         ]
//       }
//     }
//   })
//   async getSessions(@Req() req: any) {
//     return this.authService.getActiveSessions(req.user.id);
//   }
//   @Post('refresh-token')
//   @UseGuards(JwtAuthGuard)
//   @ApiOperation({ 
//     summary: 'Refresh JWT token', 
//     description: 'Refresh the current JWT token to extend session validity.' 
//   })
//   @ApiResponse({ 
//     status: HttpStatus.OK, 
//     description: 'Token refreshed successfully',
//     schema: {
//       example: {
//         access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
//         token_type: 'Bearer',
//         expires_in: '24h'
//       }
//     }
//   })
//   async refreshToken(@Req() req: any) {
//     return this.authService.refreshToken(req.user.id);
//   }
//   @Delete('users/:id')
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles('super_admin', 'admin')
//   @ApiOperation({ 
//     summary: 'Delete user account', 
//     description: 'Permanently delete a user account. Cannot delete your own account or system administrator accounts.' 
//   })
//   @ApiParam({ 
//     name: 'id', 
//     description: 'User ID to delete',
//     type: Number,
//     example: 2 
//   })
//   @ApiResponse({ 
//     status: HttpStatus.OK, 
//     description: 'User deleted successfully',
//     schema: {
//       example: {
//         message: 'User deleted successfully'
//       }
//     }
//   })
//   @ApiResponse({ 
//     status: HttpStatus.BAD_REQUEST, 
//     description: 'Cannot delete your own account or system admin'
//   })
//   @ApiResponse({ 
//     status: HttpStatus.NOT_FOUND, 
//     description: 'User not found'
//   })
//   @ApiResponse({ 
//     status: HttpStatus.FORBIDDEN, 
//     description: 'Insufficient permissions'
//   })
//   async deleteUser(@Param('id') id: string, @Req() req: any) {
//     return this.authService.deleteUser(parseInt(id), req.user.id);
//   }
//   @Public()
//   @Get('health')
//   @ApiOperation({ 
//     summary: 'API Health Check', 
//     description: 'Check API health status and database connectivity' 
//   })
//   @ApiResponse({ 
//     status: HttpStatus.OK, 
//     description: 'API is healthy',
//     schema: {
//       example: {
//         status: 'ok',
//         timestamp: '2023-10-01T12:00:00.000Z',
//         uptime: 3600.25,
//         database: 'connected',
//         environment: 'production',
//         version: '1.0.0'
//       }
//     }
//   })
//   async healthCheck() {
//     // Check database connection
//     let dbStatus = 'disconnected';
//     try {
//       await this.authService['prisma'].$queryRaw`SELECT 1`;
//       dbStatus = 'connected';
//     } catch (error) {
//       dbStatus = 'error';
//     }
//     return {
//       status: 'ok',
//       timestamp: new Date().toISOString(),
//       uptime: process.uptime(),
//       database: dbStatus,
//       environment: process.env.NODE_ENV || 'development',
//       version: process.env.npm_package_version || '1.0.0',
//     };
//   }
// }
var common_1 = require("@nestjs/common");
var login_dto_1 = require("./dto/login.dto");
var register_dto_1 = require("./dto/register.dto");
var update_profile_dto_1 = require("./dto/update-profile.dto");
var change_password_dto_1 = require("./dto/change-password.dto");
// FIXED IMPORT PATHS - Use relative paths from auth module
var jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
var roles_guard_1 = require("../../common/guards/roles.guard");
var public_decorator_1 = require("../../common/decorators/public.decorator");
var roles_decorator_1 = require("../../common/decorators/roles.decorator");
var swagger_1 = require("@nestjs/swagger");
var AuthController = /** @class */ (function () {
    function AuthController(authService) {
        this.authService = authService;
    }
    AuthController.prototype.login = function (loginDto, req) {
        return __awaiter(this, void 0, void 0, function () {
            var ipAddress, userAgent;
            return __generator(this, function (_a) {
                ipAddress = req.ip;
                userAgent = req.get('User-Agent');
                return [2 /*return*/, this.authService.login(loginDto, ipAddress, userAgent)];
            });
        });
    };
    AuthController.prototype.register = function (registerDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.authService.register(registerDto)];
            });
        });
    };
    AuthController.prototype.getProfile = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.authService.getProfile(req.user.id)];
            });
        });
    };
    AuthController.prototype.updateProfile = function (req, updateProfileDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.authService.updateProfile(req.user.id, updateProfileDto)];
            });
        });
    };
    AuthController.prototype.changePassword = function (req, changePasswordDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.authService.changePassword(req.user.id, changePasswordDto)];
            });
        });
    };
    AuthController.prototype.logout = function (req) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_b) {
                token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
                return [2 /*return*/, this.authService.logout(token)];
            });
        });
    };
    AuthController.prototype.logoutAll = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.authService.logoutAll(req.user.id)];
            });
        });
    };
    AuthController.prototype.getSessions = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.authService.getActiveSessions(req.user.id)];
            });
        });
    };
    AuthController.prototype.refreshToken = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.authService.refreshToken(req.user.id)];
            });
        });
    };
    AuthController.prototype.deleteUser = function (id, req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.authService.deleteUser(parseInt(id), req.user.id)];
            });
        });
    };
    AuthController.prototype.healthCheck = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dbStatus, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbStatus = 'disconnected';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.authService['prisma'].$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT 1"], ["SELECT 1"])))];
                    case 2:
                        _a.sent();
                        dbStatus = 'connected';
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        dbStatus = 'error';
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, {
                            status: 'ok',
                            timestamp: new Date().toISOString(),
                            uptime: process.uptime(),
                            database: dbStatus,
                            environment: process.env.NODE_ENV || 'development',
                            version: process.env.npm_package_version || '1.0.0'
                        }];
                }
            });
        });
    };
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.Post)('login'),
        (0, common_1.HttpCode)(common_1.HttpStatus.OK),
        (0, swagger_1.ApiOperation)({
            summary: 'User login',
            description: 'Authenticate user with username/email and password. Returns JWT token and user information with accessible modules.'
        }),
        (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDto }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.OK,
            description: 'Login successful',
            schema: {
                example: {
                    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    token_type: 'Bearer',
                    expires_in: '24h',
                    user: {
                        id: 1,
                        username: 'superadmin',
                        email: 'superadmin@school.edu',
                        firstName: 'Super',
                        lastName: 'Admin',
                        phone: '+1234567890',
                        role: 'super_admin',
                        permissions: { '*': ['create', 'read', 'update', 'delete', 'manage'] },
                        lastLogin: '2023-10-01T12:00:00.000Z',
                        accessibleModules: [
                            {
                                id: 1,
                                name: 'Dashboard',
                                description: 'System dashboard and overview',
                                path: '/dashboard',
                                icon: 'mdi-view-dashboard',
                                order: 1,
                                permissions: {
                                    canView: true,
                                    canCreate: true,
                                    canEdit: true,
                                    canDelete: true
                                }
                            },
                            {
                                id: 2,
                                name: 'User Management',
                                description: 'User authentication and management system',
                                path: '/users',
                                icon: 'mdi-account-cog',
                                order: 2,
                                permissions: {
                                    canView: true,
                                    canCreate: true,
                                    canEdit: true,
                                    canDelete: true
                                }
                            }
                        ]
                    }
                }
            }
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.UNAUTHORIZED,
            description: 'Invalid credentials',
            schema: {
                example: {
                    statusCode: 401,
                    message: 'Invalid username or password',
                    error: 'Unauthorized'
                }
            }
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.TOO_MANY_REQUESTS,
            description: 'Too many login attempts'
        }),
        openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Req)())
    ], AuthController.prototype, "login");
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.Post)('register'),
        (0, swagger_1.ApiOperation)({
            summary: 'Register new user',
            description: 'Create a new user account. Role ID must be provided (3=teacher, 4=student, 5=parent, 6=accountant, 7=librarian). System admin roles cannot be assigned during registration.'
        }),
        (0, swagger_1.ApiBody)({ type: register_dto_1.RegisterDto }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.CREATED,
            description: 'User registered successfully',
            schema: {
                example: {
                    message: 'User registered successfully',
                    user: {
                        id: 2,
                        username: 'teacher1',
                        email: 'teacher1@school.edu',
                        firstName: 'John',
                        lastName: 'Doe',
                        phone: '+1234567890',
                        roleId: 3,
                        isActive: true,
                        lastLogin: null,
                        createdAt: '2023-10-01T12:00:00.000Z',
                        updatedAt: '2023-10-01T12:00:00.000Z',
                        role: {
                            id: 3,
                            name: 'teacher',
                            description: 'Teacher access for academic activities',
                            permissions: {
                                students: ['read'],
                                attendance: ['create', 'read', 'update'],
                                grades: ['create', 'read', 'update']
                            }
                        },
                        accessibleModules: [
                            {
                                id: 1,
                                name: 'Dashboard',
                                path: '/dashboard',
                                icon: 'mdi-view-dashboard',
                                permissions: { canView: true, canCreate: false, canEdit: false, canDelete: false }
                            },
                            {
                                id: 4,
                                name: 'Attendance Management',
                                path: '/attendance',
                                icon: 'mdi-calendar-check',
                                permissions: { canView: true, canCreate: true, canEdit: true, canDelete: false }
                            }
                        ]
                    }
                }
            }
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.CONFLICT,
            description: 'Username or email already exists'
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.BAD_REQUEST,
            description: 'Invalid role ID or validation error'
        }),
        openapi.ApiResponse({ status: 201 }),
        __param(0, (0, common_1.Body)())
    ], AuthController.prototype, "register");
    __decorate([
        (0, common_1.Get)('profile'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, swagger_1.ApiOperation)({
            summary: 'Get user profile',
            description: 'Get current authenticated user profile with role information and accessible modules.'
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.OK,
            description: 'Profile retrieved successfully',
            schema: {
                example: {
                    id: 1,
                    username: 'superadmin',
                    email: 'superadmin@school.edu',
                    firstName: 'Super',
                    lastName: 'Admin',
                    phone: '+1234567890',
                    avatar: null,
                    roleId: 1,
                    isActive: true,
                    lastLogin: '2023-10-01T12:00:00.000Z',
                    createdAt: '2023-10-01T10:00:00.000Z',
                    updatedAt: '2023-10-01T12:00:00.000Z',
                    role: {
                        id: 1,
                        name: 'super_admin',
                        description: 'Full system access with all permissions',
                        permissions: { '*': ['create', 'read', 'update', 'delete', 'manage'] },
                        isSystem: true,
                        createdAt: '2023-10-01T10:00:00.000Z',
                        updatedAt: '2023-10-01T10:00:00.000Z'
                    },
                    accessibleModules: [
                        {
                            id: 1,
                            name: 'Dashboard',
                            description: 'System dashboard and overview',
                            path: '/dashboard',
                            icon: 'mdi-view-dashboard',
                            order: 1,
                            permissions: {
                                canView: true,
                                canCreate: true,
                                canEdit: true,
                                canDelete: true
                            }
                        },
                        {
                            id: 2,
                            name: 'User Management',
                            description: 'User authentication and management system',
                            path: '/users',
                            icon: 'mdi-account-cog',
                            order: 2,
                            permissions: {
                                canView: true,
                                canCreate: true,
                                canEdit: true,
                                canDelete: true
                            }
                        }
                    ]
                }
            }
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.UNAUTHORIZED,
            description: 'Invalid or expired token'
        }),
        openapi.ApiResponse({ status: 200, type: Object }),
        __param(0, (0, common_1.Req)())
    ], AuthController.prototype, "getProfile");
    __decorate([
        (0, common_1.Put)('profile'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, swagger_1.ApiOperation)({
            summary: 'Update user profile',
            description: 'Update current user profile information. Email must be unique across the system.'
        }),
        (0, swagger_1.ApiBody)({ type: update_profile_dto_1.UpdateProfileDto }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.OK,
            description: 'Profile updated successfully',
            schema: {
                example: {
                    message: 'Profile updated successfully',
                    user: {
                        id: 1,
                        username: 'superadmin',
                        email: 'updated@school.edu',
                        firstName: 'Updated',
                        lastName: 'Name',
                        phone: '+1234567890',
                        roleId: 1,
                        isActive: true,
                        lastLogin: '2023-10-01T12:00:00.000Z',
                        createdAt: '2023-10-01T10:00:00.000Z',
                        updatedAt: '2023-10-01T12:30:00.000Z',
                        role: {
                            id: 1,
                            name: 'super_admin',
                            description: 'Full system access with all permissions',
                            permissions: { '*': ['create', 'read', 'update', 'delete', 'manage'] }
                        },
                        accessibleModules: [
                            {
                                id: 1,
                                name: 'Dashboard',
                                description: 'System dashboard and overview',
                                path: '/dashboard',
                                icon: 'mdi-view-dashboard',
                                order: 1,
                                permissions: {
                                    canView: true,
                                    canCreate: true,
                                    canEdit: true,
                                    canDelete: true
                                }
                            }
                        ]
                    }
                }
            }
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.CONFLICT,
            description: 'Email already taken by another user'
        }),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Body)())
    ], AuthController.prototype, "updateProfile");
    __decorate([
        (0, common_1.Put)('change-password'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, swagger_1.ApiOperation)({
            summary: 'Change user password',
            description: 'Change current user password. Requires current password verification. All active sessions will be invalidated for security.'
        }),
        (0, swagger_1.ApiBody)({ type: change_password_dto_1.ChangePasswordDto }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.OK,
            description: 'Password changed successfully',
            schema: {
                example: {
                    message: 'Password changed successfully'
                }
            }
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.UNAUTHORIZED,
            description: 'Current password is incorrect'
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.BAD_REQUEST,
            description: 'New password does not meet security requirements'
        }),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Body)())
    ], AuthController.prototype, "changePassword");
    __decorate([
        (0, common_1.Post)('logout'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, swagger_1.ApiOperation)({
            summary: 'Logout user',
            description: 'Invalidate current session token. User will need to login again to access protected routes.'
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.OK,
            description: 'Logout successful',
            schema: {
                example: {
                    message: 'Logged out successfully'
                }
            }
        }),
        openapi.ApiResponse({ status: 201 }),
        __param(0, (0, common_1.Req)())
    ], AuthController.prototype, "logout");
    __decorate([
        (0, common_1.Post)('logout-all'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, swagger_1.ApiOperation)({
            summary: 'Logout from all devices',
            description: 'Invalidate all active sessions for the current user across all devices.'
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.OK,
            description: 'Logged out from all devices',
            schema: {
                example: {
                    message: 'Logged out from all devices'
                }
            }
        }),
        openapi.ApiResponse({ status: 201 }),
        __param(0, (0, common_1.Req)())
    ], AuthController.prototype, "logoutAll");
    __decorate([
        (0, common_1.Get)('sessions'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, swagger_1.ApiOperation)({
            summary: 'Get active sessions',
            description: 'Get all active sessions for the current user with device and location information.'
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.OK,
            description: 'Sessions retrieved successfully',
            schema: {
                example: {
                    data: [
                        {
                            id: 1,
                            userId: 1,
                            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                            expiresAt: '2023-10-02T12:00:00.000Z',
                            isActive: true,
                            ipAddress: '192.168.1.100',
                            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                            createdAt: '2023-10-01T12:00:00.000Z'
                        }
                    ]
                }
            }
        }),
        openapi.ApiResponse({ status: 200, type: Object }),
        __param(0, (0, common_1.Req)())
    ], AuthController.prototype, "getSessions");
    __decorate([
        (0, common_1.Post)('refresh-token'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, swagger_1.ApiOperation)({
            summary: 'Refresh JWT token',
            description: 'Refresh the current JWT token to extend session validity.'
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.OK,
            description: 'Token refreshed successfully',
            schema: {
                example: {
                    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    token_type: 'Bearer',
                    expires_in: '24h'
                }
            }
        }),
        openapi.ApiResponse({ status: 201 }),
        __param(0, (0, common_1.Req)())
    ], AuthController.prototype, "refreshToken");
    __decorate([
        (0, common_1.Delete)('users/:id'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        (0, roles_decorator_1.Roles)('super_admin', 'admin'),
        (0, swagger_1.ApiOperation)({
            summary: 'Delete user account',
            description: 'Permanently delete a user account. Cannot delete your own account or system administrator accounts.'
        }),
        (0, swagger_1.ApiParam)({
            name: 'id',
            description: 'User ID to delete',
            type: Number,
            example: 2
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.OK,
            description: 'User deleted successfully',
            schema: {
                example: {
                    message: 'User deleted successfully'
                }
            }
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.BAD_REQUEST,
            description: 'Cannot delete your own account or system admin'
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.NOT_FOUND,
            description: 'User not found'
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.FORBIDDEN,
            description: 'Insufficient permissions'
        }),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Req)())
    ], AuthController.prototype, "deleteUser");
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.Get)('health'),
        (0, swagger_1.ApiOperation)({
            summary: 'API Health Check',
            description: 'Check API health status and database connectivity'
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.OK,
            description: 'API is healthy',
            schema: {
                example: {
                    status: 'ok',
                    timestamp: '2023-10-01T12:00:00.000Z',
                    uptime: 3600.25,
                    database: 'connected',
                    environment: 'production',
                    version: '1.0.0'
                }
            }
        }),
        openapi.ApiResponse({ status: 200 })
    ], AuthController.prototype, "healthCheck");
    AuthController = __decorate([
        (0, swagger_1.ApiTags)('Authentication & Authorization'),
        (0, swagger_1.ApiBearerAuth)('JWT-auth'),
        (0, common_1.Controller)('auth')
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
var templateObject_1;
