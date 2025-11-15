"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RolesGuard = void 0;
var common_1 = require("@nestjs/common");
var roles_decorator_1 = require("../decorators/roles.decorator");
var RolesGuard = /** @class */ (function () {
    function RolesGuard(reflector) {
        this.reflector = reflector;
    }
    RolesGuard.prototype.canActivate = function (context) {
        var requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        var requiredPermissions = this.reflector.getAllAndOverride(roles_decorator_1.PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        var requiredModules = this.reflector.getAllAndOverride(roles_decorator_1.MODULES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        // If no restrictions, allow access
        if (!requiredRoles && !requiredPermissions && !requiredModules) {
            return true;
        }
        var user = context.switchToHttp().getRequest().user;
        if (!user) {
            throw new common_1.ForbiddenException('Authentication required');
        }
        // Check roles
        if (requiredRoles && requiredRoles.length > 0) {
            if (!requiredRoles.includes(user.role.name)) {
                throw new common_1.ForbiddenException("Required roles: ".concat(requiredRoles.join(', '), ". Your role: ").concat(user.role.name));
            }
        }
        // Super admin has all permissions
        if (user.role.name === 'super_admin') {
            return true;
        }
        // Check permissions
        if (requiredPermissions && requiredPermissions.length > 0) {
            var userPermissions_1 = user.role.permissions || {};
            var hasPermission = requiredPermissions.every(function (permission) {
                var _a, _b;
                var _c = permission.split(':'), resource = _c[0], action = _c[1];
                // Check wildcard permission
                if ((_a = userPermissions_1['*']) === null || _a === void 0 ? void 0 : _a.includes(action)) {
                    return true;
                }
                return (_b = userPermissions_1[resource]) === null || _b === void 0 ? void 0 : _b.includes(action);
            });
            if (!hasPermission) {
                throw new common_1.ForbiddenException("Insufficient permissions. Required: ".concat(requiredPermissions.join(', ')));
            }
        }
        // Check module access
        if (requiredModules && requiredModules.length > 0) {
            var userModules = user.accessibleModules || [];
            var userModuleNames_1 = userModules.map(function (module) { return module.name; });
            var hasModuleAccess = requiredModules.every(function (module) {
                return userModuleNames_1.includes(module);
            });
            if (!hasModuleAccess) {
                throw new common_1.ForbiddenException("Module access required: ".concat(requiredModules.join(', ')));
            }
        }
        return true;
    };
    RolesGuard = __decorate([
        (0, common_1.Injectable)()
    ], RolesGuard);
    return RolesGuard;
}());
exports.RolesGuard = RolesGuard;
