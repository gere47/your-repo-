"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppController = void 0;
var openapi = require("@nestjs/swagger");
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var public_decorator_1 = require("./common/decorators/public.decorator");
var AppController = /** @class */ (function () {
    function AppController() {
    }
    AppController.prototype.getRoot = function () {
        return {
            message: 'ERP School Management System API',
            version: process.env.npm_package_version || '1.0.0',
            status: 'operational',
            timestamp: new Date().toISOString(),
            documentation: '/api/docs',
            support: 'support@sophor-tech.com'
        };
    };
    AppController.prototype.getStatus = function () {
        var memoryUsage = process.memoryUsage();
        return {
            status: 'ok',
            environment: process.env.NODE_ENV || 'development',
            version: process.env.npm_package_version || '1.0.0',
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
            memory: {
                used: "".concat(Math.round(memoryUsage.heapUsed / 1024 / 1024), " MB"),
                total: "".concat(Math.round(memoryUsage.heapTotal / 1024 / 1024), " MB"),
                usage: "".concat(Math.round((memoryUsage.heapUsed / memoryUsage.heapTotal) * 100), "%")
            },
            node: process.version
        };
    };
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.Get)(),
        (0, swagger_1.ApiOperation)({
            summary: 'API Root',
            description: 'Root endpoint returning API information and status'
        }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'API information',
            schema: {
                example: {
                    message: 'ERP School Management System API',
                    version: '1.0.0',
                    status: 'operational',
                    timestamp: '2023-10-01T12:00:00.000Z',
                    documentation: '/api/docs'
                }
            }
        }),
        openapi.ApiResponse({ status: 200 })
    ], AppController.prototype, "getRoot");
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.Get)('status'),
        (0, swagger_1.ApiOperation)({
            summary: 'API Status',
            description: 'Detailed API status and health information'
        }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'API status details',
            schema: {
                example: {
                    status: 'ok',
                    environment: 'production',
                    version: '1.0.0',
                    uptime: 3600.25,
                    timestamp: '2023-10-01T12:00:00.000Z',
                    memory: {
                        used: '45.2 MB',
                        total: '512 MB',
                        usage: '8.8%'
                    },
                    node: 'v18.17.1'
                }
            }
        }),
        openapi.ApiResponse({ status: 200 })
    ], AppController.prototype, "getStatus");
    AppController = __decorate([
        (0, swagger_1.ApiTags)('Application'),
        (0, common_1.Controller)()
    ], AppController);
    return AppController;
}());
exports.AppController = AppController;
