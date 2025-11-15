"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var client_1 = require("@prisma/client");
var bcrypt = require("bcryptjs");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var roles, modules, allRoles, allModules, _i, allRoles_1, role, _a, allModules_1, module_1, permissions, superAdmin, _b, _c, adminUser, _d, _e, teacherUser, _f, _g;
        var _h, _j, _k, _l, _m, _o;
        return __generator(this, function (_p) {
            switch (_p.label) {
                case 0:
                    console.log('🌱 Starting database seeding...');
                    if (!(process.env.NODE_ENV === 'development')) return [3 /*break*/, 7];
                    console.log('🧹 Clearing existing data...');
                    return [4 /*yield*/, prisma.auditLog.deleteMany()];
                case 1:
                    _p.sent();
                    return [4 /*yield*/, prisma.userSession.deleteMany()];
                case 2:
                    _p.sent();
                    return [4 /*yield*/, prisma.modulePermission.deleteMany()];
                case 3:
                    _p.sent();
                    return [4 /*yield*/, prisma.user.deleteMany()];
                case 4:
                    _p.sent();
                    return [4 /*yield*/, prisma.module.deleteMany()];
                case 5:
                    _p.sent();
                    return [4 /*yield*/, prisma.role.deleteMany()];
                case 6:
                    _p.sent();
                    _p.label = 7;
                case 7:
                    // Create system roles
                    console.log('👥 Creating system roles...');
                    return [4 /*yield*/, prisma.role.createMany({
                            data: [
                                {
                                    name: 'super_admin',
                                    description: 'Full system access with all permissions',
                                    permissions: {
                                        '*': ['create', 'read', 'update', 'delete', 'manage', 'export']
                                    },
                                    isSystem: true
                                },
                                {
                                    name: 'admin',
                                    description: 'Administrative access for school management',
                                    permissions: {
                                        users: ['create', 'read', 'update', 'delete'],
                                        students: ['create', 'read', 'update', 'delete'],
                                        teachers: ['create', 'read', 'update', 'delete'],
                                        courses: ['create', 'read', 'update', 'delete'],
                                        attendance: ['create', 'read', 'update', 'delete'],
                                        grades: ['create', 'read', 'update', 'delete'],
                                        fees: ['create', 'read', 'update', 'delete'],
                                        library: ['create', 'read', 'update', 'delete'],
                                        inventory: ['create', 'read', 'update', 'delete'],
                                        reports: ['create', 'read', 'update', 'delete', 'export']
                                    },
                                    isSystem: true
                                },
                                {
                                    name: 'teacher',
                                    description: 'Teacher access for academic activities',
                                    permissions: {
                                        students: ['read'],
                                        attendance: ['create', 'read', 'update'],
                                        grades: ['create', 'read', 'update'],
                                        library: ['read'],
                                        timetable: ['read', 'update'],
                                        communication: ['create', 'read']
                                    },
                                    isSystem: true
                                },
                                {
                                    name: 'student',
                                    description: 'Student access for personal information',
                                    permissions: {
                                        profile: ['read', 'update'],
                                        grades: ['read'],
                                        attendance: ['read'],
                                        timetable: ['read'],
                                        fees: ['read'],
                                        library: ['read']
                                    },
                                    isSystem: true
                                },
                                {
                                    name: 'parent',
                                    description: 'Parent access for student monitoring',
                                    permissions: {
                                        student_profile: ['read'],
                                        grades: ['read'],
                                        attendance: ['read'],
                                        fees: ['read'],
                                        communication: ['create', 'read']
                                    },
                                    isSystem: true
                                },
                                {
                                    name: 'accountant',
                                    description: 'Financial management access',
                                    permissions: {
                                        fees: ['create', 'read', 'update', 'delete', 'export'],
                                        payroll: ['create', 'read', 'update', 'delete'],
                                        reports: ['read', 'export']
                                    },
                                    isSystem: true
                                },
                                {
                                    name: 'librarian',
                                    description: 'Library management access',
                                    permissions: {
                                        library: ['create', 'read', 'update', 'delete'],
                                        inventory: ['read', 'update']
                                    },
                                    isSystem: true
                                },
                            ],
                            skipDuplicates: true
                        })];
                case 8:
                    roles = _p.sent();
                    // Create system modules
                    console.log('📦 Creating system modules...');
                    return [4 /*yield*/, prisma.module.createMany({
                            data: [
                                {
                                    name: 'Dashboard',
                                    description: 'System dashboard and overview',
                                    path: '/dashboard',
                                    icon: 'mdi-view-dashboard',
                                    order: 1,
                                    isSystem: true
                                },
                                {
                                    name: 'User Management',
                                    description: 'User authentication and management system',
                                    path: '/users',
                                    icon: 'mdi-account-cog',
                                    order: 2,
                                    isSystem: true
                                },
                                {
                                    name: 'Student Admission',
                                    description: 'Student admission and registration management',
                                    path: '/students/admission',
                                    icon: 'mdi-account-school',
                                    order: 3,
                                    isSystem: true
                                },
                                {
                                    name: 'Attendance Management',
                                    description: 'Student and staff attendance tracking system',
                                    path: '/attendance',
                                    icon: 'mdi-calendar-check',
                                    order: 4,
                                    isSystem: true
                                },
                                {
                                    name: 'Grade Management',
                                    description: 'Examination and grading management system',
                                    path: '/grades',
                                    icon: 'mdi-certificate',
                                    order: 5,
                                    isSystem: true
                                },
                                {
                                    name: 'HR & Payroll',
                                    description: 'Human resources and payroll management',
                                    path: '/hr-payroll',
                                    icon: 'mdi-account-tie',
                                    order: 6,
                                    isSystem: true
                                },
                                {
                                    name: 'Fee Management',
                                    description: 'Fee collection and accounting system',
                                    path: '/fees',
                                    icon: 'mdi-cash-multiple',
                                    order: 7,
                                    isSystem: true
                                },
                                {
                                    name: 'Library Management',
                                    description: 'Library books and resources management',
                                    path: '/library',
                                    icon: 'mdi-library',
                                    order: 8,
                                    isSystem: true
                                },
                                {
                                    name: 'Timetable Management',
                                    description: 'Class and teacher scheduling system',
                                    path: '/timetable',
                                    icon: 'mdi-timetable',
                                    order: 9,
                                    isSystem: true
                                },
                                {
                                    name: 'Communication Portal',
                                    description: 'Messaging and notification system',
                                    path: '/communication',
                                    icon: 'mdi-message-text',
                                    order: 10,
                                    isSystem: true
                                },
                                {
                                    name: 'Inventory Management',
                                    description: 'School assets and inventory tracking',
                                    path: '/inventory',
                                    icon: 'mdi-warehouse',
                                    order: 11,
                                    isSystem: true
                                },
                                {
                                    name: 'Reports & Analytics',
                                    description: 'Data analysis and reporting dashboard',
                                    path: '/reports',
                                    icon: 'mdi-chart-bar',
                                    order: 12,
                                    isSystem: true
                                },
                            ],
                            skipDuplicates: true
                        })];
                case 9:
                    modules = _p.sent();
                    return [4 /*yield*/, prisma.role.findMany()];
                case 10:
                    allRoles = _p.sent();
                    return [4 /*yield*/, prisma.module.findMany()];
                case 11:
                    allModules = _p.sent();
                    // Create module permissions for each role
                    console.log('🔐 Creating module permissions...');
                    _i = 0, allRoles_1 = allRoles;
                    _p.label = 12;
                case 12:
                    if (!(_i < allRoles_1.length)) return [3 /*break*/, 17];
                    role = allRoles_1[_i];
                    _a = 0, allModules_1 = allModules;
                    _p.label = 13;
                case 13:
                    if (!(_a < allModules_1.length)) return [3 /*break*/, 16];
                    module_1 = allModules_1[_a];
                    permissions = {
                        canView: false,
                        canCreate: false,
                        canEdit: false,
                        canDelete: false
                    };
                    // Set permissions based on role
                    switch (role.name) {
                        case 'super_admin':
                            permissions = { canView: true, canCreate: true, canEdit: true, canDelete: true };
                            break;
                        case 'admin':
                            if (['Dashboard', 'User Management', 'Student Admission', 'Attendance Management',
                                'Grade Management', 'HR & Payroll', 'Fee Management', 'Library Management',
                                'Timetable Management', 'Inventory Management', 'Reports & Analytics'].includes(module_1.name)) {
                                permissions = { canView: true, canCreate: true, canEdit: true, canDelete: true };
                            }
                            break;
                        case 'teacher':
                            if (['Dashboard', 'Attendance Management', 'Grade Management', 'Timetable Management', 'Communication Portal'].includes(module_1.name)) {
                                permissions = { canView: true, canCreate: true, canEdit: true, canDelete: false };
                            }
                            break;
                        case 'student':
                            if (['Dashboard', 'Grade Management', 'Attendance Management', 'Timetable Management', 'Fee Management', 'Library Management'].includes(module_1.name)) {
                                permissions = { canView: true, canCreate: false, canEdit: false, canDelete: false };
                            }
                            break;
                        case 'parent':
                            if (['Dashboard', 'Grade Management', 'Attendance Management', 'Fee Management', 'Communication Portal'].includes(module_1.name)) {
                                permissions = { canView: true, canCreate: false, canEdit: false, canDelete: false };
                            }
                            break;
                        case 'accountant':
                            if (['Dashboard', 'Fee Management', 'HR & Payroll', 'Reports & Analytics'].includes(module_1.name)) {
                                permissions = { canView: true, canCreate: true, canEdit: true, canDelete: false };
                            }
                            break;
                        case 'librarian':
                            if (['Dashboard', 'Library Management', 'Inventory Management'].includes(module_1.name)) {
                                permissions = { canView: true, canCreate: true, canEdit: true, canDelete: true };
                            }
                            break;
                    }
                    return [4 /*yield*/, prisma.modulePermission.upsert({
                            where: {
                                moduleId_roleId: {
                                    moduleId: module_1.id,
                                    roleId: role.id
                                }
                            },
                            update: permissions,
                            create: __assign({ moduleId: module_1.id, roleId: role.id }, permissions)
                        })];
                case 14:
                    _p.sent();
                    _p.label = 15;
                case 15:
                    _a++;
                    return [3 /*break*/, 13];
                case 16:
                    _i++;
                    return [3 /*break*/, 12];
                case 17:
                    // Create super admin user
                    console.log('👑 Creating super admin user...');
                    _c = (_b = prisma.user).upsert;
                    _h = {
                        where: { username: 'superadmin' },
                        update: {}
                    };
                    _j = {
                        username: 'superadmin',
                        email: 'superadmin@school.edu'
                    };
                    return [4 /*yield*/, bcrypt.hash('Admin123!', 12)];
                case 18: return [4 /*yield*/, _c.apply(_b, [(_h.create = (_j.passwordHash = _p.sent(),
                            _j.firstName = 'Super',
                            _j.lastName = 'Admin',
                            _j.phone = '+1234567890',
                            _j.roleId = allRoles.find(function (r) { return r.name === 'super_admin'; }).id,
                            _j),
                            _h)])];
                case 19:
                    superAdmin = _p.sent();
                    // Create admin user
                    console.log('💼 Creating admin user...');
                    _e = (_d = prisma.user).upsert;
                    _k = {
                        where: { username: 'admin' },
                        update: {}
                    };
                    _l = {
                        username: 'admin',
                        email: 'admin@school.edu'
                    };
                    return [4 /*yield*/, bcrypt.hash('Admin123!', 12)];
                case 20: return [4 /*yield*/, _e.apply(_d, [(_k.create = (_l.passwordHash = _p.sent(),
                            _l.firstName = 'School',
                            _l.lastName = 'Administrator',
                            _l.phone = '+1234567891',
                            _l.roleId = allRoles.find(function (r) { return r.name === 'admin'; }).id,
                            _l),
                            _k)])];
                case 21:
                    adminUser = _p.sent();
                    // Create sample teacher
                    console.log('👨‍🏫 Creating sample teacher...');
                    _g = (_f = prisma.user).upsert;
                    _m = {
                        where: { username: 'teacher1' },
                        update: {}
                    };
                    _o = {
                        username: 'teacher1',
                        email: 'teacher1@school.edu'
                    };
                    return [4 /*yield*/, bcrypt.hash('Teacher123!', 12)];
                case 22: return [4 /*yield*/, _g.apply(_f, [(_m.create = (_o.passwordHash = _p.sent(),
                            _o.firstName = 'John',
                            _o.lastName = 'Smith',
                            _o.phone = '+1234567892',
                            _o.roleId = allRoles.find(function (r) { return r.name === 'teacher'; }).id,
                            _o),
                            _m)])];
                case 23:
                    teacherUser = _p.sent();
                    console.log('\n🎉 Database seeded successfully!');
                    console.log('📊 Statistics:');
                    console.log("   \uD83D\uDC65 Roles: ".concat(allRoles.length, " system roles created"));
                    console.log("   \uD83D\uDCE6 Modules: ".concat(allModules.length, " system modules created"));
                    console.log("   \uD83D\uDD10 Permissions: ".concat(allRoles.length * allModules.length, " module permissions configured"));
                    console.log('\n🔑 Default Login Credentials:');
                    console.log('   Super Admin: superadmin / Admin123!');
                    console.log('   Admin: admin / Admin123!');
                    console.log('   Teacher: teacher1 / Teacher123!');
                    console.log('\n🚀 Your ERP system is ready!');
                    return [2 /*return*/];
            }
        });
    });
}
main()["catch"](function (e) {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
})["finally"](function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
