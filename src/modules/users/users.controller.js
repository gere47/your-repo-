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
exports.UsersController = void 0;
var openapi = require("@nestjs/swagger");
// // import { 
// //   Controller, 
// //   Get, 
// //   Put, 
// //   Param, 
// //   Body, 
// //   Query, 
// //   UseGuards, 
// //   Delete, 
// //   Post,
// //   Req 
// // } from '@nestjs/common';
// // import { UsersService } from './users.service';
// // import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
// // import { RolesGuard } from '../../common/guards/roles.guard';
// // import { Roles } from '../../common/decorators/roles.decorator';
// // import { Permissions } from '../../common/decorators/roles.decorator';
// // import { 
// //   ApiTags, 
// //   ApiOperation, 
// //   ApiBearerAuth, 
// //   ApiResponse, 
// //   ApiQuery,
// //   ApiParam 
// // } from '@nestjs/swagger';
// // @ApiTags('Users Management')
// // @ApiBearerAuth('JWT-auth')
// // @Controller('users')
// // @UseGuards(JwtAuthGuard, RolesGuard)
// // @Roles('super_admin', 'admin')
// // export class UsersController {
// //   constructor(private readonly usersService: UsersService) {}
// //   @Get()
// //   @Permissions('users:read')
// //   @ApiOperation({ 
// //     summary: 'Get all users (Paginated)', 
// //     description: 'Get paginated list of all active users with search and filter capabilities. Requires admin privileges.' 
// //   })
// //   @ApiQuery({ 
// //     name: 'page', 
// //     required: false, 
// //     type: Number, 
// //     description: 'Page number (default: 1)',
// //     example: 1 
// //   })
// //   @ApiQuery({ 
// //     name: 'limit', 
// //     required: false, 
// //     type: Number, 
// //     description: 'Number of items per page (default: 10, max: 100)',
// //     example: 10 
// //   })
// //   @ApiQuery({ 
// //     name: 'search', 
// //     required: false, 
// //     type: String, 
// //     description: 'Search term for username, email, first name, last name, or phone',
// //     example: 'john' 
// //   })
// //   @ApiQuery({ 
// //     name: 'roleId', 
// //     required: false, 
// //     type: Number, 
// //     description: 'Filter by role ID',
// //     example: 3 
// //   })
// //   @ApiResponse({ 
// //     status: 200, 
// //     description: 'Users retrieved successfully',
// //     schema: {
// //       example: {
// //         data: [
// //           {
// //             id: 1,
// //             username: 'superadmin',
// //             email: 'superadmin@school.edu',
// //             firstName: 'Super',
// //             lastName: 'Admin',
// //             phone: '+1234567890',
// //             roleId: 1,
// //             isActive: true,
// //             lastLogin: '2023-10-01T12:00:00.000Z',
// //             createdAt: '2023-10-01T10:00:00.000Z',
// //             updatedAt: '2023-10-01T12:00:00.000Z',
// //             role: {
// //               id: 1,
// //               name: 'super_admin',
// //               description: 'Full system access with all permissions',
// //               isSystem: true
// //             }
// //           }
// //         ],
// //         meta: {
// //           page: 1,
// //           limit: 10,
// //           total: 1,
// //           pages: 1
// //         }
// //       }
// //     }
// //   })
// //   async findAll(
// //     @Query('page') page: number = 1,
// //     @Query('limit') limit: number = 10,
// //     @Query('search') search: string = '',
// //     @Query('roleId') roleId?: number,
// //   ) {
// //     // Limit maximum page size
// //     const pageSize = Math.min(limit, 100);
// //     return this.usersService.findAll(page, pageSize, search, roleId ? parseInt(roleId.toString()) : undefined);
// //   }
// //   @Get('roles')
// //   @Permissions('users:read')
// //   @ApiOperation({ 
// //     summary: 'Get all roles', 
// //     description: 'Get list of all available roles in the system' 
// //   })
// //   @ApiResponse({ 
// //     status: 200, 
// //     description: 'Roles retrieved successfully',
// //     schema: {
// //       example: {
// //         data: [
// //           {
// //             id: 1,
// //             name: 'super_admin',
// //             description: 'Full system access with all permissions',
// //             permissions: { '*': ['create', 'read', 'update', 'delete', 'manage'] },
// //             isSystem: true,
// //             createdAt: '2023-10-01T10:00:00.000Z',
// //             updatedAt: '2023-10-01T10:00:00.000Z'
// //           },
// //           {
// //             id: 2,
// //             name: 'admin',
// //             description: 'Administrative access for school management',
// //             permissions: {
// //               users: ['create', 'read', 'update', 'delete'],
// //               students: ['create', 'read', 'update', 'delete']
// //             },
// //             isSystem: true,
// //             createdAt: '2023-10-01T10:00:00.000Z',
// //             updatedAt: '2023-10-01T10:00:00.000Z'
// //           }
// //         ],
// //         total: 7
// //       }
// //     }
// //   })
// //   async getRoles() {
// //     return this.usersService.getRoles();
// //   }
// //   @Get('stats')
// //   @Permissions('users:read')
// //   @ApiOperation({ 
// //     summary: 'Get user statistics', 
// //     description: 'Get user statistics including total users, distribution by role, and recent registrations' 
// //   })
// //   @ApiResponse({ 
// //     status: 200, 
// //     description: 'Statistics retrieved successfully',
// //     schema: {
// //       example: {
// //         totalUsers: 150,
// //         roleStats: [
// //           { roleId: 3, roleName: 'teacher', count: 45 },
// //           { roleId: 4, roleName: 'student', count: 95 },
// //           { roleId: 2, roleName: 'admin', count: 5 },
// //           { roleId: 1, roleName: 'super_admin', count: 1 }
// //         ],
// //         recentUsers: [
// //           {
// //             id: 150,
// //             username: 'newstudent',
// //             email: 'newstudent@school.edu',
// //             firstName: 'New',
// //             lastName: 'Student',
// //             createdAt: '2023-10-01T14:00:00.000Z',
// //             role: { name: 'student' }
// //           }
// //         ]
// //       }
// //     }
// //   })
// //   async getUserStats() {
// //     return this.usersService.getUserStats();
// //   }
// //   @Get(':id')
// //   @Permissions('users:read')
// //   @ApiOperation({ 
// //     summary: 'Get user by ID', 
// //     description: 'Get detailed information about a specific user including role and module permissions' 
// //   })
// //   @ApiParam({ 
// //     name: 'id', 
// //     description: 'User ID',
// //     type: Number,
// //     example: 1 
// //   })
// //   @ApiResponse({ 
// //     status: 200, 
// //     description: 'User retrieved successfully',
// //     schema: {
// //       example: {
// //         id: 1,
// //         username: 'superadmin',
// //         email: 'superadmin@school.edu',
// //         firstName: 'Super',
// //         lastName: 'Admin',
// //         phone: '+1234567890',
// //         roleId: 1,
// //         isActive: true,
// //         lastLogin: '2023-10-01T12:00:00.000Z',
// //         createdAt: '2023-10-01T10:00:00.000Z',
// //         updatedAt: '2023-10-01T12:00:00.000Z',
// //         role: {
// //           id: 1,
// //           name: 'super_admin',
// //           description: 'Full system access with all permissions',
// //           permissions: { '*': ['create', 'read', 'update', 'delete', 'manage'] },
// //           isSystem: true,
// //           createdAt: '2023-10-01T10:00:00.000Z',
// //           updatedAt: '2023-10-01T10:00:00.000Z'
// //         },
// //         accessibleModules: [
// //           {
// //             id: 1,
// //             name: 'Dashboard',
// //             description: 'System dashboard and overview',
// //             path: '/dashboard',
// //             icon: 'mdi-view-dashboard',
// //             order: 1,
// //             permissions: {
// //               canView: true,
// //               canCreate: true,
// //               canEdit: true,
// //               canDelete: true
// //             }
// //           }
// //         ]
// //       }
// //     }
// //   })
// //   @ApiResponse({ 
// //     status: 404, 
// //     description: 'User not found'
// //   })
// //   async findOne(@Param('id') id: string) {
// //     return this.usersService.findOne(+id);
// //   }
// //   @Put(':id')
// //   @Permissions('users:update')
// //   @ApiOperation({ 
// //     summary: 'Update user', 
// //     description: 'Update user information. Email must be unique. Role changes are restricted based on permissions.' 
// //   })
// //   @ApiParam({ 
// //     name: 'id', 
// //     description: 'User ID to update',
// //     type: Number,
// //     example: 2 
// //   })
// //   @ApiResponse({ 
// //     status: 200, 
// //     description: 'User updated successfully'
// //   })
// //   @ApiResponse({ 
// //     status: 403, 
// //     description: 'Insufficient permissions to modify this user'
// //   })
// //   async update(@Param('id') id: string, @Body() updateUserDto: any, @Req() req: any) {
// //     return this.usersService.update(+id, updateUserDto, req.user.id);
// //   }
// //   @Delete(':id/deactivate')
// //   @Permissions('users:delete')
// //   @ApiOperation({ 
// //     summary: 'Deactivate user', 
// //     description: 'Deactivate user account (soft delete). User cannot login after deactivation. Cannot deactivate your own account or system admin accounts.' 
// //   })
// //   @ApiParam({ 
// //     name: 'id', 
// //     description: 'User ID to deactivate',
// //     type: Number,
// //     example: 2 
// //   })
// //   @ApiQuery({ 
// //     name: 'reason', 
// //     required: false, 
// //     type: String, 
// //     description: 'Reason for deactivation',
// //     example: 'Left the institution' 
// //   })
// //   @ApiResponse({ 
// //     status: 200, 
// //     description: 'User deactivated successfully'
// //   })
// //   @ApiResponse({ 
// //     status: 400, 
// //     description: 'Cannot deactivate your own account or system admin'
// //   })
// //   async deactivate(
// //     @Param('id') id: string, 
// //     @Query('reason') reason: string = 'No reason provided',
// //     @Req() req: any
// //   ) {
// //     return this.usersService.deactivate(+id, reason, req.user.id);
// //   }
// //   @Post(':id/activate')
// //   @Permissions('users:update')
// //   @ApiOperation({ 
// //     summary: 'Activate user', 
// //     description: 'Activate a previously deactivated user account.' 
// //   })
// //   @ApiParam({ 
// //     name: 'id', 
// //     description: 'User ID to activate',
// //     type: Number,
// //     example: 2 
// //   })
// //   @ApiResponse({ 
// //     status: 200, 
// //     description: 'User activated successfully'
// //   })
// //   async activate(@Param('id') id: string, @Req() req: any) {
// //     return this.usersService.activate(+id, req.user.id);
// //   }
// // }
// import { Controller, Get, Put, Param, Body, Query, UseGuards, Delete, Post, Req } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
// import { RolesGuard } from '../../common/guards/roles.guard';
// import { Roles } from '../../common/decorators/roles.decorator';
// import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiParam } from '@nestjs/swagger';
// @ApiTags('Users Management')
// @ApiBearerAuth('JWT-auth')
// @Controller('users')
// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles('super_admin', 'admin')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}
//   @Get()
//   @ApiOperation({ 
//     summary: 'Get all users (Paginated)', 
//     description: 'Get paginated list of all active users with search and filter capabilities. Requires admin privileges.' 
//   })
//   @ApiResponse({ 
//     status: 200, 
//     description: 'Users retrieved successfully'
//   })
//   async findAll(
//     @Query('page') page: number = 1,
//     @Query('limit') limit: number = 10,
//     @Query('search') search: string = '',
//     @Query('roleId') roleId?: number,
//   ) {
//     const pageSize = Math.min(limit, 100);
//     return this.usersService.findAll(page, pageSize, search, roleId ? parseInt(roleId.toString()) : undefined);
//   }
//   @Get('roles')
//   @ApiOperation({ 
//     summary: 'Get all roles', 
//     description: 'Get list of all available roles in the system' 
//   })
//   @ApiResponse({ 
//     status: 200, 
//     description: 'Roles retrieved successfully'
//   })
//   async getRoles() {
//     return this.usersService.getRoles();
//   }
//   @Get('stats')
//   @ApiOperation({ 
//     summary: 'Get user statistics', 
//     description: 'Get user statistics including total users, distribution by role, and recent registrations' 
//   })
//   @ApiResponse({ 
//     status: 200, 
//     description: 'Statistics retrieved successfully'
//   })
//   async getUserStats() {
//     return this.usersService.getUserStats();
//   }
//   @Get(':id')
//   @ApiOperation({ 
//     summary: 'Get user by ID', 
//     description: 'Get detailed information about a specific user including role and module permissions' 
//   })
//   @ApiParam({ 
//     name: 'id', 
//     description: 'User ID',
//     type: Number,
//     example: 1 
//   })
//   @ApiResponse({ 
//     status: 200, 
//     description: 'User retrieved successfully'
//   })
//   async findOne(@Param('id') id: string) {
//     return this.usersService.findOne(+id);
//   }
//   @Put(':id')
//   @ApiOperation({ 
//     summary: 'Update user', 
//     description: 'Update user information. Email must be unique. Role changes are restricted based on permissions.' 
//   })
//   @ApiParam({ 
//     name: 'id', 
//     description: 'User ID to update',
//     type: Number,
//     example: 2 
//   })
//   @ApiResponse({ 
//     status: 200, 
//     description: 'User updated successfully'
//   })
//   async update(@Param('id') id: string, @Body() updateUserDto: any, @Req() req: any) {
//     return this.usersService.update(+id, updateUserDto, req.user.id);
//   }
//   @Delete(':id/deactivate')
//   @ApiOperation({ 
//     summary: 'Deactivate user', 
//     description: 'Deactivate user account (soft delete). User cannot login after deactivation. Cannot deactivate your own account or system admin accounts.' 
//   })
//   @ApiParam({ 
//     name: 'id', 
//     description: 'User ID to deactivate',
//     type: Number,
//     example: 2 
//   })
//   @ApiResponse({ 
//     status: 200, 
//     description: 'User deactivated successfully'
//   })
//   async deactivate(
//     @Param('id') id: string, 
//     @Query('reason') reason: string = 'No reason provided',
//     @Req() req: any
//   ) {
//     return this.usersService.deactivate(+id, reason, req.user.id);
//   }
//   @Post(':id/activate')
//   @ApiOperation({ 
//     summary: 'Activate user', 
//     description: 'Activate a previously deactivated user account.' 
//   })
//   @ApiParam({ 
//     name: 'id', 
//     description: 'User ID to activate',
//     type: Number,
//     example: 2 
//   })
//   @ApiResponse({ 
//     status: 200, 
//     description: 'User activated successfully'
//   })
//   async activate(@Param('id') id: string, @Req() req: any) {
//     return this.usersService.activate(+id, req.user.id);
//   }
// }
// src/modules/users/users.controller.ts
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var UsersController = /** @class */ (function () {
    function UsersController() {
    }
    UsersController.prototype.findAll = function (page, limit, search, roleId) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        if (search === void 0) { search = ''; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    UsersController.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    UsersController.prototype.update = function (id, updateUserDto, req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        (0, common_1.Get)(),
        (0, swagger_1.ApiOperation)({
            summary: 'Get all users (Paginated)',
            description: 'Get paginated list of all active users with search and filter capabilities. Requires admin privileges.'
        }),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, common_1.Query)('page')),
        __param(1, (0, common_1.Query)('limit')),
        __param(2, (0, common_1.Query)('search')),
        __param(3, (0, common_1.Query)('roleId'))
    ], UsersController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':id'),
        (0, swagger_1.ApiOperation)({
            summary: 'Get user by ID',
            description: 'Get detailed information about a specific user including role and module permissions'
        }),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, common_1.Param)('id'))
    ], UsersController.prototype, "findOne");
    __decorate([
        (0, common_1.Put)(':id'),
        (0, swagger_1.ApiOperation)({
            summary: 'Update user',
            description: 'Update user information. Email must be unique. Role changes are restricted based on permissions.'
        }),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)()),
        __param(2, (0, common_1.Req)())
    ], UsersController.prototype, "update");
    UsersController = __decorate([
        (0, common_1.Controller)('users'),
        (0, swagger_1.ApiTags)('users')
    ], UsersController);
    return UsersController;
}());
exports.UsersController = UsersController;
