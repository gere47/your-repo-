"use strict";
// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
// import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
// import { MorganInterceptor, MorganModule } from 'nest-morgan';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { PrismaModule } from './database/prisma.module';
// import { AuthModule } from './modules/auth/auth.module';
// import { UsersModule } from './modules/users/users.module';
// import { ModulesModule } from './modules/modules-management/modules.module';
// import configuration from './config/configuration';
// import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
// import { RolesGuard } from './common/guards/roles.guard';
// import { TransformInterceptor } from './common/interceptors/transform.interceptor';
// @Module({
//   imports: [
//     // Configuration
//     ConfigModule.forRoot({
//       isGlobal: true,
//       load: [configuration],
//       cache: true,
//     }),
//     // Rate Limiting
//     ThrottlerModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (config: ConfigService) => [
//         {
//           ttl: config.get('throttler.ttl'),
//           limit: config.get('throttler.limit'),
//         },
//       ],
//     }),
//     // Logging
//     MorganModule,
//     // Database
//     PrismaModule,
//     // Feature Modules
//     AuthModule,
//     UsersModule,
//     ModulesModule,
//   ],
//   controllers: [AppController],
//   providers: [
//     AppService,
//     // Global Guards
//     {
//       provide: APP_GUARD,
//       useClass: JwtAuthGuard,
//     },
//     {
//       provide: APP_GUARD,
//       useClass: RolesGuard,
//     },
//     {
//       provide: APP_GUARD,
//       useClass: ThrottlerGuard,
//     },
//     // Global Interceptors
//     {
//       provide: APP_INTERCEPTOR,
//       useClass: TransformInterceptor,
//     },
//     {
//       provide: APP_INTERCEPTOR,
//       useClass: MorganInterceptor('combined'),
//     },
//   ],
// })
// export class AppModule {}
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var throttler_1 = require("@nestjs/throttler");
var core_1 = require("@nestjs/core");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var prisma_module_1 = require("./database/prisma.module");
var auth_module_1 = require("./modules/auth/auth.module");
var users_module_1 = require("./modules/users/users.module");
// FIXED IMPORT - Choose one of these options:
var modules_module_1 = require("./modules/modules-management/modules.module");
// OR if that doesn't work, try:
// import { ModulesModule } from './modules/modules/modules.module';
var configuration_1 = require("./config/configuration");
var jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
var roles_guard_1 = require("./common/guards/roles.guard");
var transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                // Configuration
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    load: [configuration_1["default"]],
                    cache: true
                }),
                // Rate Limiting
                throttler_1.ThrottlerModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: function (config) { return [
                        {
                            ttl: config.get('throttler.ttl'),
                            limit: config.get('throttler.limit')
                        },
                    ]; }
                }),
                // Database
                prisma_module_1.PrismaModule,
                // Feature Modules
                auth_module_1.AuthModule,
                users_module_1.UsersModule,
                modules_module_1.ModulesService, // Make sure this matches your import
            ],
            controllers: [app_controller_1.AppController],
            providers: [
                app_service_1.AppService,
                // Global Guards
                {
                    provide: core_1.APP_GUARD,
                    useClass: jwt_auth_guard_1.JwtAuthGuard
                },
                {
                    provide: core_1.APP_GUARD,
                    useClass: roles_guard_1.RolesGuard
                },
                {
                    provide: core_1.APP_GUARD,
                    useClass: throttler_1.ThrottlerGuard
                },
                // Global Interceptors
                {
                    provide: core_1.APP_INTERCEPTOR,
                    useClass: transform_interceptor_1.TransformInterceptor
                },
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
