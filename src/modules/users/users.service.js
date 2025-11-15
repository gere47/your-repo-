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
exports.UsersService = void 0;
var common_1 = require("@nestjs/common");
var UsersService = /** @class */ (function () {
    function UsersService(prisma) {
        this.prisma = prisma;
    }
    UsersService.prototype.findAll = function (page, limit, search, roleId) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        if (search === void 0) { search = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var skip, where, _a, users, total, usersWithoutPassword;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        skip = (page - 1) * limit;
                        where = {
                            isActive: true
                        };
                        if (search) {
                            where.OR = [
                                { username: { contains: search, mode: 'insensitive' } },
                                { email: { contains: search, mode: 'insensitive' } },
                                { firstName: { contains: search, mode: 'insensitive' } },
                                { lastName: { contains: search, mode: 'insensitive' } },
                                { phone: { contains: search, mode: 'insensitive' } },
                            ];
                        }
                        if (roleId) {
                            where.roleId = roleId;
                        }
                        return [4 /*yield*/, Promise.all([
                                this.prisma.user.findMany({
                                    where: where,
                                    skip: skip,
                                    take: limit,
                                    include: {
                                        role: {
                                            select: {
                                                id: true,
                                                name: true,
                                                description: true,
                                                isSystem: true
                                            }
                                        }
                                    },
                                    orderBy: { createdAt: 'desc' }
                                }),
                                this.prisma.user.count({ where: where }),
                            ])];
                    case 1:
                        _a = _b.sent(), users = _a[0], total = _a[1];
                        usersWithoutPassword = users.map(function (user) {
                            var passwordHash = user.passwordHash, userWithoutPassword = __rest(user, ["passwordHash"]);
                            return userWithoutPassword;
                        });
                        return [2 /*return*/, {
                                data: usersWithoutPassword,
                                meta: {
                                    page: page,
                                    limit: limit,
                                    total: total,
                                    pages: Math.ceil(total / limit)
                                }
                            }];
                }
            });
        });
    };
    UsersService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, passwordHash, userWithoutPassword, accessibleModules;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                            where: { id: id },
                            include: {
                                role: {
                                    include: {
                                        modulePermissions: {
                                            include: {
                                                module: true
                                            }
                                        }
                                    }
                                }
                            }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException("User with ID ".concat(id, " not found"));
                        }
                        passwordHash = user.passwordHash, userWithoutPassword = __rest(user, ["passwordHash"]);
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
                        return [2 /*return*/, __assign(__assign({}, userWithoutPassword), { accessibleModules: accessibleModules })];
                }
            });
        });
    };
    UsersService.prototype.update = function (id, updateUserDto, currentUserId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, currentUser, existingUser, newRole, updatedUser, passwordHash, userWithoutPassword, accessibleModules;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                            where: { id: id },
                            include: { role: true }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException("User with ID ".concat(id, " not found"));
                        }
                        return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { id: currentUserId },
                                include: { role: true }
                            })];
                    case 2:
                        currentUser = _a.sent();
                        if (user.role.isSystem && ['super_admin', 'admin'].includes(user.role.name)) {
                            if (currentUser.role.name !== 'super_admin') {
                                throw new common_1.ForbiddenException('Only super admin can modify system administrator accounts');
                            }
                        }
                        if (!updateUserDto.email) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.prisma.user.findFirst({
                                where: {
                                    email: updateUserDto.email,
                                    id: { not: id }
                                }
                            })];
                    case 3:
                        existingUser = _a.sent();
                        if (existingUser) {
                            throw new common_1.BadRequestException('Email already taken by another user');
                        }
                        _a.label = 4;
                    case 4:
                        if (!updateUserDto.roleId) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.prisma.role.findUnique({
                                where: { id: updateUserDto.roleId }
                            })];
                    case 5:
                        newRole = _a.sent();
                        if (newRole.isSystem && ['super_admin', 'admin'].includes(newRole.name)) {
                            if (currentUser.role.name !== 'super_admin') {
                                throw new common_1.ForbiddenException('Only super admin can assign system administrator roles');
                            }
                        }
                        _a.label = 6;
                    case 6: return [4 /*yield*/, this.prisma.user.update({
                            where: { id: id },
                            data: updateUserDto,
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
                    case 7:
                        updatedUser = _a.sent();
                        passwordHash = updatedUser.passwordHash, userWithoutPassword = __rest(updatedUser, ["passwordHash"]);
                        accessibleModules = updatedUser.role.modulePermissions.map(function (permission) { return ({
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
                                    userId: currentUserId,
                                    action: 'UPDATE',
                                    resource: 'USER',
                                    resourceId: id,
                                    details: { updatedFields: Object.keys(updateUserDto) }
                                }
                            })];
                    case 8:
                        // Audit log
                        _a.sent();
                        return [2 /*return*/, {
                                message: 'User updated successfully',
                                user: __assign(__assign({}, userWithoutPassword), { accessibleModules: accessibleModules })
                            }];
                }
            });
        });
    };
    UsersService.prototype.deactivate = function (id, reason, currentUserId) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (id === currentUserId) {
                            throw new common_1.BadRequestException('You cannot deactivate your own account');
                        }
                        return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { id: id },
                                include: { role: true }
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException("User with ID ".concat(id, " not found"));
                        }
                        // Prevent deactivation of system admin users
                        if (user.role.isSystem && ['super_admin', 'admin'].includes(user.role.name)) {
                            throw new common_1.BadRequestException('Cannot deactivate system administrator accounts');
                        }
                        return [4 /*yield*/, this.prisma.user.update({
                                where: { id: id },
                                data: { isActive: false }
                            })];
                    case 2:
                        _a.sent();
                        // Invalidate all sessions
                        return [4 /*yield*/, this.prisma.userSession.updateMany({
                                where: { userId: id },
                                data: { isActive: false }
                            })];
                    case 3:
                        // Invalidate all sessions
                        _a.sent();
                        // Audit log
                        return [4 /*yield*/, this.prisma.auditLog.create({
                                data: {
                                    userId: currentUserId,
                                    action: 'DEACTIVATE',
                                    resource: 'USER',
                                    resourceId: id,
                                    details: { reason: reason }
                                }
                            })];
                    case 4:
                        // Audit log
                        _a.sent();
                        return [2 /*return*/, { message: 'User deactivated successfully' }];
                }
            });
        });
    };
    UsersService.prototype.activate = function (id, currentUserId) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                            where: { id: id }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException("User with ID ".concat(id, " not found"));
                        }
                        return [4 /*yield*/, this.prisma.user.update({
                                where: { id: id },
                                data: { isActive: true }
                            })];
                    case 2:
                        _a.sent();
                        // Audit log
                        return [4 /*yield*/, this.prisma.auditLog.create({
                                data: {
                                    userId: currentUserId,
                                    action: 'ACTIVATE',
                                    resource: 'USER',
                                    resourceId: id
                                }
                            })];
                    case 3:
                        // Audit log
                        _a.sent();
                        return [2 /*return*/, { message: 'User activated successfully' }];
                }
            });
        });
    };
    UsersService.prototype.getRoles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var roles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.role.findMany({
                            orderBy: { id: 'asc' }
                        })];
                    case 1:
                        roles = _a.sent();
                        return [2 /*return*/, {
                                data: roles,
                                total: roles.length
                            }];
                }
            });
        });
    };
    UsersService.prototype.getUserStats = function () {
        return __awaiter(this, void 0, void 0, function () {
            var totalUsers, usersByRole, roles, roleStats, recentUsers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.user.count({
                            where: { isActive: true }
                        })];
                    case 1:
                        totalUsers = _a.sent();
                        return [4 /*yield*/, this.prisma.user.groupBy({
                                by: ['roleId'],
                                where: { isActive: true },
                                _count: {
                                    id: true
                                }
                            })];
                    case 2:
                        usersByRole = _a.sent();
                        return [4 /*yield*/, this.prisma.role.findMany({
                                where: { id: { "in": usersByRole.map(function (u) { return u.roleId; }) } }
                            })];
                    case 3:
                        roles = _a.sent();
                        roleStats = usersByRole.map(function (stat) {
                            var role = roles.find(function (r) { return r.id === stat.roleId; });
                            return {
                                roleId: stat.roleId,
                                roleName: (role === null || role === void 0 ? void 0 : role.name) || 'Unknown',
                                count: stat._count.id
                            };
                        });
                        return [4 /*yield*/, this.prisma.user.findMany({
                                where: { isActive: true },
                                orderBy: { createdAt: 'desc' },
                                take: 5,
                                select: {
                                    id: true,
                                    username: true,
                                    email: true,
                                    firstName: true,
                                    lastName: true,
                                    createdAt: true,
                                    role: {
                                        select: {
                                            name: true
                                        }
                                    }
                                }
                            })];
                    case 4:
                        recentUsers = _a.sent();
                        return [2 /*return*/, {
                                totalUsers: totalUsers,
                                roleStats: roleStats,
                                recentUsers: recentUsers
                            }];
                }
            });
        });
    };
    UsersService = __decorate([
        (0, common_1.Injectable)()
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
