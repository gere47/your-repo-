"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChangePasswordDto = void 0;
var openapi = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var ChangePasswordDto = /** @class */ (function () {
    function ChangePasswordDto() {
    }
    ChangePasswordDto._OPENAPI_METADATA_FACTORY = function () {
        return { currentPassword: { required: true, type: function () { return String; } }, newPassword: { required: true, type: function () { return String; }, minLength: 8, pattern: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]/" } };
    };
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: 'OldPassword123!',
            description: 'Current password'
        }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], ChangePasswordDto.prototype, "currentPassword");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: 'NewSecurePassword123!',
            description: 'New password (min 8 characters with uppercase, lowercase, number and special character)'
        }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.MinLength)(8),
        (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
        })
    ], ChangePasswordDto.prototype, "newPassword");
    return ChangePasswordDto;
}());
exports.ChangePasswordDto = ChangePasswordDto;
