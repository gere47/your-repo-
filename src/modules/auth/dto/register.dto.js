"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterDto = void 0;
var openapi = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var RegisterDto = /** @class */ (function () {
    function RegisterDto() {
    }
    RegisterDto._OPENAPI_METADATA_FACTORY = function () {
        return { username: { required: true, type: function () { return String; }, pattern: "/^[a-zA-Z0-9_]+$/" }, email: { required: true, type: function () { return String; } }, password: { required: true, type: function () { return String; }, minLength: 8, pattern: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]/" }, firstName: { required: true, type: function () { return String; } }, lastName: { required: true, type: function () { return String; } }, phone: { required: false, type: function () { return String; } }, roleId: { required: true, type: function () { return Number; } } };
    };
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: 'john.doe',
            description: 'Unique username'
        }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.Matches)(/^[a-zA-Z0-9_]+$/, { message: 'Username can only contain letters, numbers and underscores' })
    ], RegisterDto.prototype, "username");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: 'john.doe@school.edu',
            description: 'Valid email address'
        }),
        (0, class_validator_1.IsEmail)(),
        (0, class_validator_1.IsNotEmpty)()
    ], RegisterDto.prototype, "email");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: 'SecurePassword123!',
            description: 'Strong password (min 8 characters with uppercase, lowercase, number and special character)'
        }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.MinLength)(8),
        (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
        })
    ], RegisterDto.prototype, "password");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: 'John',
            description: 'First name'
        }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], RegisterDto.prototype, "firstName");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: 'Doe',
            description: 'Last name'
        }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], RegisterDto.prototype, "lastName");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: '+1234567890',
            description: 'Phone number',
            required: false
        }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)()
    ], RegisterDto.prototype, "phone");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: 3,
            description: 'Role ID (2=admin, 3=teacher, 4=student, etc.)'
        }),
        (0, class_validator_1.IsInt)(),
        (0, class_validator_1.IsNotEmpty)()
    ], RegisterDto.prototype, "roleId");
    return RegisterDto;
}());
exports.RegisterDto = RegisterDto;
