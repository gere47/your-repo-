"use strict";
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
exports.__esModule = true;
exports.ModulesService = void 0;
var common_1 = require("@nestjs/common");
var ModulesService = /** @class */ (function () {
    function ModulesService(prisma) {
        this.prisma = prisma;
    }
    ModulesService.prototype.getUserModules = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, modules;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                            where: { id: userId },
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
                            return [2 /*return*/, []];
                        }
                        modules = user.role.modulePermissions.map(function (permission) { return ({
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
                        }); });
                        // Sort by order
                        return [2 /*return*/, modules.sort(function (a, b) { return a.order - b.order; })];
                }
            });
        });
    };
    ModulesService.prototype.getAllModules = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modules;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.module.findMany({
                            where: { isActive: true },
                            include: {
                                permissions: {
                                    include: {
                                        role: {
                                            select: {
                                                id: true,
                                                name: true,
                                                description: true
                                            }
                                        }
                                    }
                                }
                            },
                            orderBy: { order: 'asc' }
                        })];
                    case 1:
                        modules = _a.sent();
                        return [2 /*return*/, {
                                data: modules,
                                total: modules.length
                            }];
                }
            });
        });
    };
    ModulesService.prototype.getModuleById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var module;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.module.findUnique({
                            where: { id: id },
                            include: {
                                permissions: {
                                    include: {
                                        role: {
                                            select: {
                                                id: true,
                                                name: true,
                                                description: true
                                            }
                                        }
                                    }
                                }
                            }
                        })];
                    case 1:
                        module = _a.sent();
                        if (!module) {
                            throw new common_1.NotFoundException("Module with ID ".concat(id, " not found"));
                        }
                        return [2 /*return*/, {
                                data: module
                            }];
                }
            });
        });
    };
    ModulesService.prototype.getModulePermissions = function (moduleId) {
        return __awaiter(this, void 0, void 0, function () {
            var module;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.module.findUnique({
                            where: { id: moduleId },
                            include: {
                                permissions: {
                                    include: {
                                        role: {
                                            select: {
                                                id: true,
                                                name: true,
                                                description: true
                                            }
                                        }
                                    }
                                }
                            }
                        })];
                    case 1:
                        module = _a.sent();
                        if (!module) {
                            throw new common_1.NotFoundException("Module with ID ".concat(moduleId, " not found"));
                        }
                        return [2 /*return*/, {
                                data: module.permissions,
                                total: module.permissions.length
                            }];
                }
            });
        });
    };
    ModulesService.prototype.updateModulePermissions = function (moduleId, permissions) {
        return __awaiter(this, void 0, void 0, function () {
            var module, transaction;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.module.findUnique({
                            where: { id: moduleId }
                        })];
                    case 1:
                        module = _a.sent();
                        if (!module) {
                            throw new common_1.NotFoundException("Module with ID ".concat(moduleId, " not found"));
                        }
                        transaction = permissions.map(function (permission) {
                            return _this.prisma.modulePermission.upsert({
                                where: {
                                    moduleId_roleId: {
                                        moduleId: moduleId,
                                        roleId: permission.roleId
                                    }
                                },
                                update: {
                                    canView: permission.canView,
                                    canCreate: permission.canCreate,
                                    canEdit: permission.canEdit,
                                    canDelete: permission.canDelete
                                },
                                create: {
                                    moduleId: moduleId,
                                    roleId: permission.roleId,
                                    canView: permission.canView,
                                    canCreate: permission.canCreate,
                                    canEdit: permission.canEdit,
                                    canDelete: permission.canDelete
                                }
                            });
                        });
                        return [4 /*yield*/, this.prisma.$transaction(transaction)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                message: 'Module permissions updated successfully',
                                data: permissions
                            }];
                }
            });
        });
    };
    ModulesService.prototype.getSystemModules = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modules;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.module.findMany({
                            where: { isSystem: true, isActive: true },
                            orderBy: { order: 'asc' }
                        })];
                    case 1:
                        modules = _a.sent();
                        return [2 /*return*/, {
                                data: modules,
                                total: modules.length
                            }];
                }
            });
        });
    };
    ModulesService.prototype.getRoleModules = function (roleId) {
        return __awaiter(this, void 0, void 0, function () {
            var role, modules;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.role.findUnique({
                            where: { id: roleId },
                            include: {
                                modulePermissions: {
                                    include: {
                                        module: true
                                    }
                                }
                            }
                        })];
                    case 1:
                        role = _a.sent();
                        if (!role) {
                            throw new common_1.NotFoundException("Role with ID ".concat(roleId, " not found"));
                        }
                        modules = role.modulePermissions.map(function (permission) { return ({
                            module: permission.module,
                            permissions: {
                                canView: permission.canView,
                                canCreate: permission.canCreate,
                                canEdit: permission.canEdit,
                                canDelete: permission.canDelete
                            }
                        }); });
                        return [2 /*return*/, {
                                data: modules,
                                total: modules.length
                            }];
                }
            });
        });
    };
    ModulesService.prototype.getModulesSummary = function () {
        return __awaiter(this, void 0, void 0, function () {
            var totalModules, systemModules, modulesByPermission, modules, permissionStats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.module.count({
                            where: { isActive: true }
                        })];
                    case 1:
                        totalModules = _a.sent();
                        return [4 /*yield*/, this.prisma.module.count({
                                where: { isSystem: true, isActive: true }
                            })];
                    case 2:
                        systemModules = _a.sent();
                        return [4 /*yield*/, this.prisma.modulePermission.groupBy({
                                by: ['moduleId'],
                                _count: {
                                    roleId: true
                                }
                            })];
                    case 3:
                        modulesByPermission = _a.sent();
                        return [4 /*yield*/, this.prisma.module.findMany({
                                where: { id: { "in": modulesByPermission.map(function (m) { return m.moduleId; }) } },
                                select: {
                                    id: true,
                                    name: true
                                }
                            })];
                    case 4:
                        modules = _a.sent();
                        permissionStats = modulesByPermission.map(function (stat) {
                            var module = modules.find(function (m) { return m.id === stat.moduleId; });
                            return {
                                moduleId: stat.moduleId,
                                moduleName: (module === null || module === void 0 ? void 0 : module.name) || 'Unknown',
                                roleCount: stat._count.roleId
                            };
                        });
                        return [2 /*return*/, {
                                totalModules: totalModules,
                                systemModules: systemModules,
                                customModules: totalModules - systemModules,
                                permissionStats: permissionStats
                            }];
                }
            });
        });
    };
    ModulesService = __decorate([
        (0, common_1.Injectable)()
    ], ModulesService);
    return ModulesService;
}());
exports.ModulesService = ModulesService;
