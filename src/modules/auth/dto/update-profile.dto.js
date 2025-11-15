"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateProfileDto = void 0;
var openapi = require("@nestjs/swagger");
// import { IsString, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';
// export class UpdateProfileDto {
//   @ApiProperty({ 
//     example: 'john.doe@newschool.edu', 
//     required: false 
//   })
//   @IsEmail()
//   @IsOptional()
//   email?: string;
//   @ApiProperty({ 
//     example: 'John', 
//     required: false 
//   })
//   @IsString()
//   @IsOptional()
//   firstName?: string;
//   @ApiProperty({ 
//     example: 'Doe', 
//     required: false 
//   })
//   @IsString()
//   @IsOptional()
//   lastName?: string;
//   @ApiProperty({ 
//     example: '+1234567890', 
//     required: false 
//   })
//   @IsString()
//   @IsOptional()
//   phone?: string;
//   @ApiProperty({ 
//     example: 'avatar.png', 
//     required: false 
//   })
//   @IsString()
//   @IsOptional()
//   avatar?: string;
// }
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var UpdateProfileDto = /** @class */ (function () {
    function UpdateProfileDto() {
    }
    UpdateProfileDto._OPENAPI_METADATA_FACTORY = function () {
        return { email: { required: false, type: function () { return String; } }, firstName: { required: false, type: function () { return String; } }, lastName: { required: false, type: function () { return String; } }, phone: { required: false, type: function () { return String; } }, avatar: { required: false, type: function () { return String; } } };
    };
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: 'john.doe@newschool.edu',
            required: false
        }),
        (0, class_validator_1.IsEmail)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateProfileDto.prototype, "email");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: 'John',
            required: false
        }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateProfileDto.prototype, "firstName");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: 'Doe',
            required: false
        }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateProfileDto.prototype, "lastName");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: '+1234567890',
            required: false
        }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateProfileDto.prototype, "phone");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: 'avatar.png',
            required: false
        }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateProfileDto.prototype, "avatar");
    return UpdateProfileDto;
}());
exports.UpdateProfileDto = UpdateProfileDto;
