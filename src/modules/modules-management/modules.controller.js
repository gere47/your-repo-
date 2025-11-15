"use strict";
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
exports.ModulesController = void 0;
var openapi = require("@nestjs/swagger");
// import { Controller, Get, Put, Body, Param, UseGuards, Req } from '@nestjs/common';
// import { ModulesService } from './modules.service';
// import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
// import { RolesGuard } from '../../common/guards/roles.guard';
// import { Roles } from '../../common/decorators/roles.decorator';
// import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiParam } from '@nestjs/swagger';
// @ApiTags('Modules Management')
// @ApiBearerAuth('JWT-auth')
// @Controller('modules')
// @UseGuards(JwtAuthGuard)
// export class ModulesController {
//   constructor(private readonly modulesService: ModulesService) {}
//   @Get('my-modules')
//   @ApiOperation({ 
//     summary: 'Get user accessible modules', 
//     description: 'Get all modules that the current user has permission to access with their specific permissions.' 
//   })
//   @ApiResponse({ 
//     status: 200, 
//     description: 'User modules retrieved successfully',
//     schema: {
//       example: {
//         data: [
//           {
//             id: 1,
//             name: 'Dashboard',
//             description: 'System dashboard and overview',
//             path: '/dashboard',
//             icon: 'mdi-view-dashboard',
//             order: 1,
//             permissions: {
//               canView: true,
//               canCreate: false,
//               canEdit: false,
//               canDelete: false
//             }
//           },
//           {
//             id: 4,
//             name: 'Attendance Management',
//             description: 'Student and staff attendance tracking system',
//             path: '/attendance',
//             icon: 'mdi-calendar-check',
//             order: 4,
//             permissions: {
//               canView: true,
//               canCreate: true,
//               canEdit: true,
//               canDelete: false
//             }
//           }
//         ]
//       }
//     }
//   })
//   async getUserModules(@Req() req: any) {
//     const modules = await this.modulesService.getUserModules(req.user.id);
//     return {
//       data: modules,
//       total: modules.length,
//     };
//   }
//   @Get()
//   @UseGuards(RolesGuard)
//   @Roles('super_admin', 'admin')
//   @ApiOperation({ 
//     summary: 'Get all modules (Admin only)', 
//     description: 'Get all system modules with their permissions for each role. Requires admin privileges.' 
//   })
//   @ApiResponse({ 
//     status: 200, 
//     description: 'Modules retrieved successfully',
//     schema: {
//       example: {
//         data: [
//           {
//             id: 1,
//             name: 'Dashboard',
//             description: 'System dashboard and overview',
//             path: '/dashboard',
//             icon: 'mdi-view-dashboard',
//             order: 1,
//             isActive: true,
//             isSystem: true,
//             permissions: [
//               {
//                 roleId: 1,
//                 canView: true,
//                 canCreate: true,
//                 canEdit: true,
//                 canDelete: true,
//                 role: {
//                   id: 1,
//                   name: 'super_admin',
//                   description: 'Full system access with all permissions'
//                 }
//               }
//             ]
//           }
//         ],
//         total: 12
//       }
//     }
//   })
//   async getAllModules() {
//     return this.modulesService.getAllModules();
//   }
//   @Get('system')
//   @UseGuards(RolesGuard)
//   @Roles('super_admin', 'admin')
//   @ApiOperation({ 
//     summary: 'Get system modules (Admin only)', 
//     description: 'Get all system modules (non-customizable core modules)' 
//   })
//   @ApiResponse({ 
//     status: 200, 
//     description: 'System modules retrieved successfully' 
//   })
//   async getSystemModules() {
//     return this.modulesService.getSystemModules();
//   }
//   @Get('role/:roleId')
//   @UseGuards(RolesGuard)
//   @Roles('super_admin', 'admin')
//   @ApiOperation({ 
//     summary: 'Get modules for specific role', 
//     description: 'Get all modules and their permissions for a specific role' 
//   })
//   @ApiParam({ 
//     name: 'roleId', 
//     description: 'Role ID',
//     type: Number,
//     example: 3 
//   })
//   @ApiResponse({ 
//     status: 200, 
//     description: 'Role modules retrieved successfully' 
//   })
//   async getRoleModules(@Param('roleId') roleId: string) {
//     return this.modulesService.getRoleModules(parseInt(roleId));
//   }
//   @Get('summary')
//   @UseGuards(RolesGuard)
//   @Roles('super_admin', 'admin')
//   @ApiOperation({ 
//     summary: 'Get modules summary statistics', 
//     description: 'Get summary statistics about modules and permissions' 
//   })
//   @ApiResponse({ 
//     status: 200, 
//     description: 'Modules summary retrieved successfully',
//     schema: {
//       example: {
//         totalModules: 12,
//         systemModules: 12,
//         customModules: 0,
//         permissionStats: [
//           {
//             moduleId: 1,
//             moduleName: 'Dashboard',
//             roleCount: 7
//           }
//         ]
//       }
//     }
//   })
//   async getModulesSummary() {
//     return this.modulesService.getModulesSummary();
//   }
//   @Get(':id')
//   @UseGuards(RolesGuard)
//   @Roles('super_admin', 'admin')
//   @ApiOperation({ 
//     summary: 'Get module by ID', 
//     description: 'Get detailed information about a specific module including all role permissions' 
//   })
//   @ApiParam({ 
//     name: 'id', 
//     description: 'Module ID',
//     type: Number,
//     example: 1 
//   })
//   @ApiResponse({ 
//     status: 200, 
//     description: 'Module retrieved successfully' 
//   })
//   @ApiResponse({ 
//     status: 404, 
//     description: 'Module not found' 
//   })
//   async getModuleById(@Param('id') id: string) {
//     return this.modulesService.getModuleById(parseInt(id));
//   }
//   @Get(':id/permissions')
//   @UseGuards(RolesGuard)
//   @Roles('super_admin', 'admin')
//   @ApiOperation({ 
//     summary: 'Get module permissions', 
//     description: 'Get all permissions for a specific module across all roles' 
//   })
//   @ApiParam({ 
//     name: 'id', 
//     description: 'Module ID',
//     type: Number,
//     example: 1 
//   })
//   @ApiResponse({ 
//     status: 200, 
//     description: 'Module permissions retrieved successfully' 
//   })
//   async getModulePermissions(@Param('id') id: string) {
//     return this.modulesService.getModulePermissions(parseInt(id));
//   }
//   @Put(':id/permissions')
//   @UseGuards(RolesGuard)
//   @Roles('super_admin')
//   @ApiOperation({ 
//     summary: 'Update module permissions (Super Admin only)', 
//     description: 'Update permissions for a specific module across all roles. Only super admin can modify permissions.' 
//   })
//   @ApiParam({ 
//     name: 'id', 
//     description: 'Module ID',
//     type: Number,
//     example: 1 
//   })
//   @ApiResponse({ 
//     status: 200, 
//     description: 'Module permissions updated successfully',
//     schema: {
//       example: {
//         message: 'Module permissions updated successfully',
//         data: [
//           {
//             roleId: 3,
//             canView: true,
//             canCreate: true,
//             canEdit: true,
//             canDelete: false
//           }
//         ]
//       }
//     }
//   })
//   async updateModulePermissions(
//     @Param('id') id: string,
//     @Body() permissions: any[],
//   ) {
//     return this.modulesService.updateModulePermissions(parseInt(id), permissions);
//   }
// }
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
var roles_guard_1 = require("../../common/guards/roles.guard");
var roles_decorator_1 = require("../../common/decorators/roles.decorator");
var swagger_1 = require("@nestjs/swagger");
var ModulesController = /** @class */ (function () {
    function ModulesController(modulesService) {
        this.modulesService = modulesService;
    }
    ModulesController.prototype.getUserModules = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var modules;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modulesService.getUserModules(req.user.id)];
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
    ModulesController.prototype.getAllModules = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.modulesService.getAllModules()];
            });
        });
    };
    ModulesController.prototype.getSystemModules = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.modulesService.getSystemModules()];
            });
        });
    };
    ModulesController.prototype.getRoleModules = function (roleId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.modulesService.getRoleModules(parseInt(roleId))];
            });
        });
    };
    ModulesController.prototype.getModulesSummary = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.modulesService.getModulesSummary()];
            });
        });
    };
    ModulesController.prototype.getModuleById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.modulesService.getModuleById(parseInt(id))];
            });
        });
    };
    ModulesController.prototype.getModulePermissions = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.modulesService.getModulePermissions(parseInt(id))];
            });
        });
    };
    ModulesController.prototype.updateModulePermissions = function (id, permissions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.modulesService.updateModulePermissions(parseInt(id), permissions)];
            });
        });
    };
    __decorate([
        (0, common_1.Get)('my-modules'),
        (0, swagger_1.ApiOperation)({
            summary: 'Get user accessible modules',
            description: 'Get all modules that the current user has permission to access with their specific permissions.'
        }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'User modules retrieved successfully',
            schema: {
                example: {
                    data: [
                        {
                            id: 1,
                            name: 'Dashboard',
                            description: 'System dashboard and overview',
                            path: '/dashboard',
                            icon: 'mdi-view-dashboard',
                            order: 1,
                            permissions: {
                                canView: true,
                                canCreate: false,
                                canEdit: false,
                                canDelete: false
                            }
                        }
                    ]
                }
            }
        }),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, common_1.Req)())
    ], ModulesController.prototype, "getUserModules");
    __decorate([
        (0, common_1.Get)(),
        (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
        (0, roles_decorator_1.Roles)('super_admin', 'admin'),
        (0, swagger_1.ApiOperation)({
            summary: 'Get all modules (Admin only)',
            description: 'Get all system modules with their permissions for each role. Requires admin privileges.'
        }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Modules retrieved successfully'
        }),
        openapi.ApiResponse({ status: 200 })
    ], ModulesController.prototype, "getAllModules");
    __decorate([
        (0, common_1.Get)('system'),
        (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
        (0, roles_decorator_1.Roles)('super_admin', 'admin'),
        (0, swagger_1.ApiOperation)({
            summary: 'Get system modules (Admin only)',
            description: 'Get all system modules (non-customizable core modules)'
        }),
        openapi.ApiResponse({ status: 200 })
    ], ModulesController.prototype, "getSystemModules");
    __decorate([
        (0, common_1.Get)('role/:roleId'),
        (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
        (0, roles_decorator_1.Roles)('super_admin', 'admin'),
        (0, swagger_1.ApiOperation)({
            summary: 'Get modules for specific role',
            description: 'Get all modules and their permissions for a specific role'
        }),
        (0, swagger_1.ApiParam)({
            name: 'roleId',
            description: 'Role ID',
            type: Number,
            example: 3
        }),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, common_1.Param)('roleId'))
    ], ModulesController.prototype, "getRoleModules");
    __decorate([
        (0, common_1.Get)('summary'),
        (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
        (0, roles_decorator_1.Roles)('super_admin', 'admin'),
        (0, swagger_1.ApiOperation)({
            summary: 'Get modules summary statistics',
            description: 'Get summary statistics about modules and permissions'
        }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Modules summary retrieved successfully'
        }),
        openapi.ApiResponse({ status: 200 })
    ], ModulesController.prototype, "getModulesSummary");
    __decorate([
        (0, common_1.Get)(':id'),
        (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
        (0, roles_decorator_1.Roles)('super_admin', 'admin'),
        (0, swagger_1.ApiOperation)({
            summary: 'Get module by ID',
            description: 'Get detailed information about a specific module'
        }),
        (0, swagger_1.ApiParam)({
            name: 'id',
            description: 'Module ID',
            type: Number,
            example: 1
        }),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, common_1.Param)('id'))
    ], ModulesController.prototype, "getModuleById");
    __decorate([
        (0, common_1.Get)(':id/permissions'),
        (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
        (0, roles_decorator_1.Roles)('super_admin', 'admin'),
        (0, swagger_1.ApiOperation)({
            summary: 'Get module permissions',
            description: 'Get all permissions for a specific module across all roles'
        }),
        (0, swagger_1.ApiParam)({
            name: 'id',
            description: 'Module ID',
            type: Number,
            example: 1
        }),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, common_1.Param)('id'))
    ], ModulesController.prototype, "getModulePermissions");
    __decorate([
        (0, common_1.Put)(':id/permissions'),
        (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
        (0, roles_decorator_1.Roles)('super_admin'),
        (0, swagger_1.ApiOperation)({
            summary: 'Update module permissions (Super Admin only)',
            description: 'Update permissions for a specific module across all roles'
        }),
        (0, swagger_1.ApiParam)({
            name: 'id',
            description: 'Module ID',
            type: Number,
            example: 1
        }),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], ModulesController.prototype, "updateModulePermissions");
    ModulesController = __decorate([
        (0, swagger_1.ApiTags)('Modules Management'),
        (0, swagger_1.ApiBearerAuth)('JWT-auth'),
        (0, common_1.Controller)('modules'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)
    ], ModulesController);
    return ModulesController;
}());
exports.ModulesController = ModulesController;
