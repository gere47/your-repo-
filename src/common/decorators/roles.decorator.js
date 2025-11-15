"use strict";
exports.__esModule = true;
exports.Modules = exports.MODULES_KEY = exports.Permissions = exports.PERMISSIONS_KEY = exports.Roles = exports.ROLES_KEY = void 0;
var common_1 = require("@nestjs/common");
exports.ROLES_KEY = 'roles';
var Roles = function () {
    var roles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roles[_i] = arguments[_i];
    }
    return (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
};
exports.Roles = Roles;
exports.PERMISSIONS_KEY = 'permissions';
var Permissions = function () {
    var permissions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        permissions[_i] = arguments[_i];
    }
    return (0, common_1.SetMetadata)(exports.PERMISSIONS_KEY, permissions);
};
exports.Permissions = Permissions;
exports.MODULES_KEY = 'modules';
var Modules = function () {
    var modules = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        modules[_i] = arguments[_i];
    }
    return (0, common_1.SetMetadata)(exports.MODULES_KEY, modules);
};
exports.Modules = Modules;
