"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcryptjs");
var AuthService = /** @class */ (function () {
    function AuthService(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    AuthService.prototype.validateUser = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, passwordHash, result, accessibleModules, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.prisma.user.findFirst({
                                where: {
                                    OR: [{ username: username }, { email: username }],
                                    isActive: true
                                },
                                include: {
                                    role: {
                                        include: {
                                            modulePermissions: {
                                                include: {
                                                    module: true
                                                },
                                                where: {
                                                    canView: true,
                                                    module: {
                                                        isActive: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            })];
                    case 1:
                        user = _b.sent();
                        _a = user;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, bcrypt.compare(password, user.passwordHash)];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        if (_a) {
                            passwordHash = user.passwordHash, result = __rest(user, ["passwordHash"]);
                            accessibleModules = user.role.modulePermissions.map(function (permission) { return ({
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
                                    canDelete: permission.canDelete
                                }
                            }); }).sort(function (a, b) { return a.order - b.order; });
                            return [2 /*return*/, __assign(__assign({}, result), { accessibleModules: accessibleModules })];
                        }
                        return [2 /*return*/, null];
                    case 4:
                        error_1 = _b.sent();
                        throw new common_1.InternalServerErrorException('Authentication service error');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.validateUserById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, passwordHash, result, accessibleModules, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { id: userId, isActive: true },
                                include: {
                                    role: {
                                        include: {
                                            modulePermissions: {
                                                include: {
                                                    module: true
                                                },
                                                where: {
                                                    canView: true,
                                                    module: {
                                                        isActive: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            })];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            passwordHash = user.passwordHash, result = __rest(user, ["passwordHash"]);
                            accessibleModules = user.role.modulePermissions.map(function (permission) { return ({
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
                                    canDelete: permission.canDelete
                                }
                            }); }).sort(function (a, b) { return a.order - b.order; });
                            return [2 /*return*/, __assign(__assign({}, result), { accessibleModules: accessibleModules })];
                        }
                        return [2 /*return*/, null];
                    case 2:
                        error_2 = _a.sent();
                        throw new common_1.InternalServerErrorException('User validation error');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.login = function (loginDto, ipAddress, userAgent) {
        return __awaiter(this, void 0, void 0, function () {
            var user, payload, token, expiresAt, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.validateUser(loginDto.username, loginDto.password)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.UnauthorizedException('Invalid username or password');
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        // Update last login
                        return [4 /*yield*/, this.prisma.user.update({
                                where: { id: user.id },
                                data: { lastLogin: new Date() }
                            })];
                    case 3:
                        // Update last login
                        _a.sent();
                        payload = {
                            sub: user.id,
                            username: user.username,
                            role: user.role.name
                        };
                        token = this.jwtService.sign(payload, {
                            secret: this.configService.get('jwt.secret'),
                            expiresIn: this.configService.get('jwt.expiresIn')
                        });
                        expiresAt = new Date();
                        expiresAt.setHours(expiresAt.getHours() + 24);
                        return [4 /*yield*/, this.prisma.userSession.create({
                                data: {
                                    userId: user.id,
                                    token: token,
                                    expiresAt: expiresAt,
                                    ipAddress: ipAddress,
                                    userAgent: userAgent
                                }
                            })];
                    case 4:
                        _a.sent();
                        // Audit log
                        return [4 /*yield*/, this.prisma.auditLog.create({
                                data: {
                                    userId: user.id,
                                    action: 'LOGIN',
                                    resource: 'AUTH',
                                    ipAddress: ipAddress,
                                    userAgent: userAgent,
                                    details: { loginMethod: 'username_password' }
                                }
                            })];
                    case 5:
                        // Audit log
                        _a.sent();
                        return [2 /*return*/, {
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
                                    accessibleModules: user.accessibleModules
                                }
                            }];
                    case 6:
                        error_3 = _a.sent();
                        throw new common_1.InternalServerErrorException('Login processing error');
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.register = function (registerDto) {
        return __awaiter(this, void 0, void 0, function () {
            var existingUser, role, passwordHash, user, _, result, accessibleModules, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.user.findFirst({
                            where: {
                                OR: [
                                    { username: registerDto.username },
                                    { email: registerDto.email },
                                ]
                            }
                        })];
                    case 1:
                        existingUser = _a.sent();
                        if (existingUser) {
                            throw new common_1.ConflictException('Username or email already exists');
                        }
                        return [4 /*yield*/, this.prisma.role.findUnique({
                                where: { id: registerDto.roleId }
                            })];
                    case 2:
                        role = _a.sent();
                        if (!role) {
                            throw new common_1.BadRequestException('Invalid role ID');
                        }
                        if (role.isSystem && ['super_admin', 'admin'].includes(role.name)) {
                            throw new common_1.BadRequestException('Cannot register with system admin role');
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 7, , 8]);
                        return [4 /*yield*/, bcrypt.hash(registerDto.password, this.configService.get('bcrypt.rounds'))];
                    case 4:
                        passwordHash = _a.sent();
                        return [4 /*yield*/, this.prisma.user.create({
                                data: {
                                    username: registerDto.username,
                                    email: registerDto.email,
                                    passwordHash: passwordHash,
                                    firstName: registerDto.firstName,
                                    lastName: registerDto.lastName,
                                    phone: registerDto.phone,
                                    roleId: registerDto.roleId
                                },
                                include: {
                                    role: {
                                        include: {
                                            modulePermissions: {
                                                include: {
                                                    module: true
                                                },
                                                where: {
                                                    canView: true,
                                                    module: {
                                                        isActive: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            })];
                    case 5:
                        user = _a.sent();
                        _ = user.passwordHash, result = __rest(user, ["passwordHash"]);
                        accessibleModules = user.role.modulePermissions.map(function (permission) { return ({
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
                                canDelete: permission.canDelete
                            }
                        }); }).sort(function (a, b) { return a.order - b.order; });
                        // Audit log
                        return [4 /*yield*/, this.prisma.auditLog.create({
                                data: {
                                    userId: user.id,
                                    action: 'CREATE',
                                    resource: 'USER',
                                    resourceId: user.id,
                                    details: {
                                        action: 'USER_REGISTRATION',
                                        registeredBy: 'self'
                                    }
                                }
                            })];
                    case 6:
                        // Audit log
                        _a.sent();
                        return [2 /*return*/, {
                                message: 'User registered successfully',
                                user: __assign(__assign({}, result), { accessibleModules: accessibleModules })
                            }];
                    case 7:
                        error_4 = _a.sent();
                        throw new common_1.InternalServerErrorException('User registration failed');
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.getProfile = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, passwordHash, result, accessibleModules, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { id: userId, isActive: true },
                                include: {
                                    role: {
                                        include: {
                                            modulePermissions: {
                                                include: {
                                                    module: true
                                                },
                                                where: {
                                                    canView: true,
                                                    module: {
                                                        isActive: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException('User not found');
                        }
                        passwordHash = user.passwordHash, result = __rest(user, ["passwordHash"]);
                        accessibleModules = user.role.modulePermissions.map(function (permission) { return ({
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
                                canDelete: permission.canDelete
                            }
                        }); }).sort(function (a, b) { return a.order - b.order; });
                        return [2 /*return*/, __assign(__assign({}, result), { accessibleModules: accessibleModules })];
                    case 2:
                        error_5 = _a.sent();
                        throw new common_1.InternalServerErrorException('Profile retrieval failed');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.updateProfile = function (userId, updateProfileDto) {
        return __awaiter(this, void 0, void 0, function () {
            var existingUser, user, passwordHash, result, accessibleModules, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!updateProfileDto.email) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.prisma.user.findFirst({
                                where: {
                                    email: updateProfileDto.email,
                                    id: { not: userId }
                                }
                            })];
                    case 1:
                        existingUser = _a.sent();
                        if (existingUser) {
                            throw new common_1.ConflictException('Email already taken by another user');
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.prisma.user.update({
                                where: { id: userId },
                                data: updateProfileDto,
                                include: {
                                    role: {
                                        include: {
                                            modulePermissions: {
                                                include: {
                                                    module: true
                                                },
                                                where: {
                                                    canView: true,
                                                    module: {
                                                        isActive: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            })];
                    case 3:
                        user = _a.sent();
                        passwordHash = user.passwordHash, result = __rest(user, ["passwordHash"]);
                        accessibleModules = user.role.modulePermissions.map(function (permission) { return ({
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
                                canDelete: permission.canDelete
                            }
                        }); }).sort(function (a, b) { return a.order - b.order; });
                        // Audit log
                        return [4 /*yield*/, this.prisma.auditLog.create({
                                data: {
                                    userId: userId,
                                    action: 'UPDATE',
                                    resource: 'PROFILE',
                                    resourceId: userId,
                                    details: { updatedFields: Object.keys(updateProfileDto) }
                                }
                            })];
                    case 4:
                        // Audit log
                        _a.sent();
                        return [2 /*return*/, {
                                message: 'Profile updated successfully',
                                user: __assign(__assign({}, result), { accessibleModules: accessibleModules })
                            }];
                    case 5:
                        error_6 = _a.sent();
                        throw new common_1.InternalServerErrorException('Profile update failed');
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.changePassword = function (userId, changePasswordDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isCurrentPasswordValid, newPasswordHash, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                            where: { id: userId }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException('User not found');
                        }
                        return [4 /*yield*/, bcrypt.compare(changePasswordDto.currentPassword, user.passwordHash)];
                    case 2:
                        isCurrentPasswordValid = _a.sent();
                        if (!isCurrentPasswordValid) {
                            throw new common_1.UnauthorizedException('Current password is incorrect');
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 8, , 9]);
                        return [4 /*yield*/, bcrypt.hash(changePasswordDto.newPassword, this.configService.get('bcrypt.rounds'))];
                    case 4:
                        newPasswordHash = _a.sent();
                        // Update password
                        return [4 /*yield*/, this.prisma.user.update({
                                where: { id: userId },
                                data: { passwordHash: newPasswordHash }
                            })];
                    case 5:
                        // Update password
                        _a.sent();
                        // Invalidate all sessions except current
                        return [4 /*yield*/, this.prisma.userSession.updateMany({
                                where: {
                                    userId: userId,
                                    isActive: true
                                },
                                data: { isActive: false }
                            })];
                    case 6:
                        // Invalidate all sessions except current
                        _a.sent();
                        // Audit log
                        return [4 /*yield*/, this.prisma.auditLog.create({
                                data: {
                                    userId: userId,
                                    action: 'UPDATE',
                                    resource: 'PASSWORD',
                                    resourceId: userId
                                }
                            })];
                    case 7:
                        // Audit log
                        _a.sent();
                        return [2 /*return*/, { message: 'Password changed successfully' }];
                    case 8:
                        error_7 = _a.sent();
                        throw new common_1.InternalServerErrorException('Password change failed');
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.logout = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.prisma.userSession.updateMany({
                                where: { token: token },
                                data: { isActive: false }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { message: 'Logged out successfully' }];
                    case 2:
                        error_8 = _a.sent();
                        throw new common_1.InternalServerErrorException('Logout failed');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.logoutAll = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.prisma.userSession.updateMany({
                                where: { userId: userId, isActive: true },
                                data: { isActive: false }
                            })];
                    case 1:
                        _a.sent();
                        // Audit log
                        return [4 /*yield*/, this.prisma.auditLog.create({
                                data: {
                                    userId: userId,
                                    action: 'LOGOUT',
                                    resource: 'ALL_SESSIONS',
                                    resourceId: userId
                                }
                            })];
                    case 2:
                        // Audit log
                        _a.sent();
                        return [2 /*return*/, { message: 'Logged out from all devices' }];
                    case 3:
                        error_9 = _a.sent();
                        throw new common_1.InternalServerErrorException('Logout all failed');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.deleteUser = function (userId, currentUserId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (userId === currentUserId) {
                            throw new common_1.BadRequestException('You cannot delete your own account');
                        }
                        return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { id: userId },
                                include: { role: true }
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException('User not found');
                        }
                        // Prevent deletion of system admin users
                        if (user.role.isSystem && ['super_admin', 'admin'].includes(user.role.name)) {
                            throw new common_1.BadRequestException('Cannot delete system administrator accounts');
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        // Soft delete user
                        return [4 /*yield*/, this.prisma.user.update({
                                where: { id: userId },
                                data: { isActive: false }
                            })];
                    case 3:
                        // Soft delete user
                        _a.sent();
                        // Invalidate all sessions
                        return [4 /*yield*/, this.prisma.userSession.updateMany({
                                where: { userId: userId },
                                data: { isActive: false }
                            })];
                    case 4:
                        // Invalidate all sessions
                        _a.sent();
                        // Audit log
                        return [4 /*yield*/, this.prisma.auditLog.create({
                                data: {
                                    userId: currentUserId,
                                    action: 'DELETE',
                                    resource: 'USER',
                                    resourceId: userId,
                                    details: { deletedBy: currentUserId }
                                }
                            })];
                    case 5:
                        // Audit log
                        _a.sent();
                        return [2 /*return*/, { message: 'User deleted successfully' }];
                    case 6:
                        error_10 = _a.sent();
                        throw new common_1.InternalServerErrorException('User deletion failed');
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.getActiveSessions = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var sessions, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.prisma.userSession.findMany({
                                where: {
                                    userId: userId,
                                    isActive: true,
                                    expiresAt: { gt: new Date() }
                                },
                                orderBy: { createdAt: 'desc' }
                            })];
                    case 1:
                        sessions = _a.sent();
                        return [2 /*return*/, sessions];
                    case 2:
                        error_11 = _a.sent();
                        throw new common_1.InternalServerErrorException('Sessions retrieval failed');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.refreshToken = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, payload, token, expiresAt, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.validateUserById(userId)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.UnauthorizedException('User not found');
                        }
                        payload = {
                            sub: user.id,
                            username: user.username,
                            role: user.role.name
                        };
                        token = this.jwtService.sign(payload, {
                            secret: this.configService.get('jwt.secret'),
                            expiresIn: this.configService.get('jwt.expiresIn')
                        });
                        expiresAt = new Date();
                        expiresAt.setHours(expiresAt.getHours() + 24);
                        return [4 /*yield*/, this.prisma.userSession.updateMany({
                                where: { userId: userId, isActive: true },
                                data: { token: token, expiresAt: expiresAt }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                access_token: token,
                                token_type: 'Bearer',
                                expires_in: this.configService.get('jwt.expiresIn')
                            }];
                    case 3:
                        error_12 = _a.sent();
                        throw new common_1.InternalServerErrorException('Token refresh failed');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthService = __decorate([
        (0, common_1.Injectable)()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
