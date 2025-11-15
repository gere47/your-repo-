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
import { Controller, Get, Put, Delete, Post, Param, Body, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  
  @Get()
  @ApiOperation({
    summary: 'Get all users (Paginated)',
    description: 'Get paginated list of all active users with search and filter capabilities. Requires admin privileges.'
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
    @Query('roleId') roleId?: number
  ) {
    // Your implementation
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Get detailed information about a specific user including role and module permissions'
  })
  async findOne(@Param('id') id: string) {
    // Your implementation
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update user',
    description: 'Update user information. Email must be unique. Role changes are restricted based on permissions.'
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: any,
    @Req() req: any
  ) {
    // Your implementation
  }
}