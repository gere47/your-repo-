"use strict";
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
var core_1 = require("@nestjs/core");
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var helmet_1 = require("helmet");
var compression_1 = require("compression");
var express_rate_limit_1 = require("express-rate-limit");
var app_module_1 = require("./app.module");
var swagger_config_1 = require("./config/swagger.config");
var jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        var logger, app, configService, reflector, frontendUrl, globalPrefix, port;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger = new common_1.Logger('Bootstrap');
                    return [4 /*yield*/, core_1.NestFactory.create(app_module_1.AppModule, {
                            logger: ['log', 'error', 'warn', 'debug', 'verbose'],
                            cors: true
                        })];
                case 1:
                    app = _a.sent();
                    configService = app.get(config_1.ConfigService);
                    reflector = app.get(core_1.Reflector);
                    // Security Middleware
                    app.use((0, helmet_1["default"])({
                        crossOriginResourcePolicy: { policy: "cross-origin" }
                    }));
                    app.use((0, compression_1["default"])());
                    // Rate Limiting
                    app.use((0, express_rate_limit_1["default"])({
                        windowMs: 15 * 60 * 1000,
                        max: 1000,
                        message: {
                            statusCode: 429,
                            message: 'Too many requests from this IP, please try again later.',
                            error: 'Too Many Requests'
                        }
                    }));
                    // Global Validation
                    app.useGlobalPipes(new common_1.ValidationPipe({
                        whitelist: true,
                        forbidNonWhitelisted: true,
                        transform: true,
                        transformOptions: {
                            enableImplicitConversion: true
                        },
                        validationError: {
                            target: false,
                            value: false
                        }
                    }));
                    // Global Guards
                    app.useGlobalGuards(new jwt_auth_guard_1.JwtAuthGuard(reflector));
                    frontendUrl = configService.get('frontend.url');
                    app.enableCors({
                        origin: [
                            frontendUrl,
                            'http://localhost:3000',
                            'http://localhost:3001',
                            'https://your-frontend.onrender.com',
                        ],
                        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
                        allowedHeaders: [
                            'Content-Type',
                            'Authorization',
                            'X-Requested-With',
                            'Accept',
                            'Origin',
                            'Access-Control-Allow-Headers',
                            'Access-Control-Request-Method',
                            'Access-Control-Request-Headers',
                        ],
                        credentials: true,
                        preflightContinue: false,
                        optionsSuccessStatus: 204
                    });
                    globalPrefix = configService.get('apiPrefix') || '/api/v1';
                    app.setGlobalPrefix(globalPrefix);
                    // Swagger Documentation
                    if (configService.get('environment') !== 'production') {
                        (0, swagger_config_1.setupSwagger)(app);
                    }
                    port = configService.get('port') || 5000;
                    return [4 /*yield*/, app.listen(port)];
                case 2:
                    _a.sent();
                    // Startup Logging
                    logger.log("\uD83D\uDE80 Application is running on: http://localhost:".concat(port));
                    logger.log("\uD83C\uDF10 Environment: ".concat(configService.get('environment')));
                    logger.log("\uD83D\uDCDA API Documentation: http://localhost:".concat(port, "/api/docs"));
                    logger.log("\uD83D\uDD10 API Base URL: http://localhost:".concat(port).concat(globalPrefix));
                    logger.log("\uD83D\uDCCA Database: ".concat(configService.get('database.url') ? 'Connected' : 'Disconnected'));
                    // Graceful shutdown
                    process.on('SIGINT', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    logger.log('🛑 Received SIGINT, shutting down gracefully...');
                                    return [4 /*yield*/, app.close()];
                                case 1:
                                    _a.sent();
                                    process.exit(0);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    process.on('SIGTERM', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    logger.log('🛑 Received SIGTERM, shutting down gracefully...');
                                    return [4 /*yield*/, app.close()];
                                case 1:
                                    _a.sent();
                                    process.exit(0);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
}
bootstrap()["catch"](function (error) {
    common_1.Logger.error('❌ Failed to start application', error);
    process.exit(1);
});
