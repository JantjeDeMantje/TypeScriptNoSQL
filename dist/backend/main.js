/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const app_controller_1 = __webpack_require__(7);
const app_service_1 = __webpack_require__(8);
const modules_module_1 = __webpack_require__(9);
const auth_module_1 = __webpack_require__(19);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [modules_module_1.ModulesModule, auth_module_1.AuthModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const app_service_1 = __webpack_require__(8);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
exports.AppController = AppController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
exports.AppController = AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
let AppService = class AppService {
    getData() {
        return { message: 'Hello API' };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModulesModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const module_service_1 = __webpack_require__(10);
const module_controller_1 = __webpack_require__(14);
const module_mongo_repository_1 = __webpack_require__(17);
const tokens_1 = __webpack_require__(13);
let ModulesModule = class ModulesModule {
};
exports.ModulesModule = ModulesModule;
exports.ModulesModule = ModulesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [
            module_service_1.ModuleService,
            module_mongo_repository_1.ModuleMongoRepository,
            { provide: tokens_1.MODULE_REPO, useExisting: module_mongo_repository_1.ModuleMongoRepository },
        ],
        controllers: [module_controller_1.ModuleController],
        exports: [module_service_1.ModuleService],
    })
], ModulesModule);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModuleService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const module_repository_1 = __webpack_require__(11);
const module_entity_1 = __webpack_require__(12);
const tokens_1 = __webpack_require__(13);
let ModuleService = class ModuleService {
    constructor(repo) {
        this.repo = repo;
    }
    list(filter) {
        return this.repo.findAll(filter);
    }
    get(code) {
        return this.repo.findByCode(code);
    }
    create(dto) {
        return this.repo.create(module_entity_1.Module.create(dto));
    }
    update(code, patch) {
        return this.repo.update(code, patch);
    }
    async ensure(code) {
        const m = await this.get(code);
        if (!m)
            throw new common_1.NotFoundException('Module not found');
        return m;
    }
    async delete(code) {
        const deleted = await this.repo.delete(code);
        if (!deleted)
            throw new common_1.NotFoundException('Module not found');
        return deleted;
    }
};
exports.ModuleService = ModuleService;
exports.ModuleService = ModuleService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(tokens_1.MODULE_REPO)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof module_repository_1.ModuleRepository !== "undefined" && module_repository_1.ModuleRepository) === "function" ? _a : Object])
], ModuleService);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Module = void 0;
class Module {
    constructor(props) {
        this.props = props;
    }
    static create(props) {
        return new Module(props);
    }
    toJSON() {
        return { ...this.props };
    }
}
exports.Module = Module;


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MODULE_REPO = void 0;
exports.MODULE_REPO = 'ModuleRepository';


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModuleController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const common_2 = __webpack_require__(2);
const module_service_1 = __webpack_require__(10);
const module_dto_1 = __webpack_require__(15);
const module_repository_1 = __webpack_require__(11);
let ModuleController = class ModuleController {
    constructor(service) {
        this.service = service;
    }
    // Helper normalization (legacy string description -> object)
    normalizeOut(m) {
        const out = { ...m };
        if (typeof out.description === 'string') {
            out.description = { en: out.description, nl: out.description };
        }
        return out;
    }
    async list(q) {
        const filters = {
            ...q,
            ec: q?.ec !== undefined && q.ec !== '' ? Number(q.ec) : undefined,
        };
        const modules = await this.service.list(filters);
        return modules.map((m) => this.normalizeOut(m.toJSON()));
    }
    async get(code) {
        const m = await this.service.get(code);
        return m ? this.normalizeOut(m.toJSON()) : null;
    }
    async create(dto) {
        return this.normalizeOut((await this.service.create(dto)).toJSON());
    }
    async update(code, dto) {
        const m = await this.service.update(code, dto);
        return m ? this.normalizeOut(m.toJSON()) : null;
    }
    async delete(code) {
        await this.service.delete(code);
        return { success: true };
    }
};
exports.ModuleController = ModuleController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof module_repository_1.ModuleFilter !== "undefined" && module_repository_1.ModuleFilter) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ModuleController.prototype, "list", null);
tslib_1.__decorate([
    (0, common_1.Get)(':code'),
    tslib_1.__param(0, (0, common_1.Param)('code')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ModuleController.prototype, "get", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof module_dto_1.CreateModuleDto !== "undefined" && module_dto_1.CreateModuleDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ModuleController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Put)(':code'),
    tslib_1.__param(0, (0, common_1.Param)('code')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_d = typeof module_dto_1.UpdateModuleDto !== "undefined" && module_dto_1.UpdateModuleDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ModuleController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_2.Delete)(':code'),
    tslib_1.__param(0, (0, common_1.Param)('code')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ModuleController.prototype, "delete", null);
exports.ModuleController = ModuleController = tslib_1.__decorate([
    (0, common_1.Controller)('modules'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof module_service_1.ModuleService !== "undefined" && module_service_1.ModuleService) === "function" ? _a : Object])
], ModuleController);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateModuleDto = exports.CreateModuleDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(16);
class CreateModuleDto {
}
exports.CreateModuleDto = CreateModuleDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateModuleDto.prototype, "code", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateModuleDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateModuleDto.prototype, "ec", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsIn)(['NLQF-5', 'NLQF-6']),
    tslib_1.__metadata("design:type", String)
], CreateModuleDto.prototype, "level", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateModuleDto.prototype, "theme", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Object)
], CreateModuleDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], CreateModuleDto.prototype, "keywords", void 0);
class UpdateModuleDto {
}
exports.UpdateModuleDto = UpdateModuleDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateModuleDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], UpdateModuleDto.prototype, "ec", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['NLQF-5', 'NLQF-6']),
    tslib_1.__metadata("design:type", String)
], UpdateModuleDto.prototype, "level", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateModuleDto.prototype, "theme", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Object)
], UpdateModuleDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], UpdateModuleDto.prototype, "keywords", void 0);


/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModuleMongoRepository = void 0;
const module_entity_1 = __webpack_require__(12);
const module_schema_1 = __webpack_require__(18);
class ModuleMongoRepository {
    async findAll(filter = {}) {
        const query = {};
        if (filter.ec !== undefined)
            query.ec = filter.ec;
        if (filter.level)
            query.level = filter.level;
        if (filter.theme)
            query.theme = filter.theme;
        if (filter.q) {
            const r = new RegExp(filter.q, 'i');
            // When description is object, search both en/nl fields
            query.$or = [
                { name: r },
                { description: r },
                { 'description.en': r },
                { 'description.nl': r },
                { keywords: r },
                { code: r },
            ];
        }
        const docs = await module_schema_1.ModuleModel.find(query).lean();
        return docs.map((d) => module_entity_1.Module.create(this.normalizeDoc(d)));
    }
    async findByCode(code) {
        const doc = await module_schema_1.ModuleModel.findOne({ code }).lean();
        return doc ? module_entity_1.Module.create(this.normalizeDoc(doc)) : null;
    }
    async create(module) {
        const data = this.normalizeDoc(module.toJSON());
        await module_schema_1.ModuleModel.create(data);
        return module;
    }
    async update(code, patch) {
        const normalized = this.normalizeDoc(patch);
        const doc = await module_schema_1.ModuleModel.findOneAndUpdate({ code }, normalized, { new: true }).lean();
        return doc ? module_entity_1.Module.create(this.normalizeDoc(doc)) : null;
    }
    async delete(code) {
        const res = await module_schema_1.ModuleModel.deleteOne({ code });
        return res.deletedCount > 0;
    }
    normalizeDoc(d) {
        const out = { ...d };
        // If description is a string, keep as-is (legacy). If object, ensure only en/nl keys and strings.
        if (out && out.description !== undefined && out.description !== null) {
            if (typeof out.description === 'object' && !Array.isArray(out.description)) {
                const en = typeof out.description.en === 'string' ? out.description.en : undefined;
                const nl = typeof out.description.nl === 'string' ? out.description.nl : undefined;
                out.description = { ...(en ? { en } : {}), ...(nl ? { nl } : {}) };
                // If both missing (bad input), drop description
                if (Object.keys(out.description).length === 0)
                    delete out.description;
            }
            // strings are fine; arrays or other types are dropped
            if (Array.isArray(out.description))
                delete out.description;
        }
        return out;
    }
}
exports.ModuleMongoRepository = ModuleMongoRepository;


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModuleModel = void 0;
const mongoose_1 = __webpack_require__(3);
const ModuleSchema = new mongoose_1.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    ec: { type: Number, required: true },
    level: { type: String, required: true },
    theme: String,
    // Allow description to be either a string (legacy) or an object with language keys
    description: mongoose_1.Schema.Types.Mixed,
    keywords: [String],
}, { timestamps: true });
exports.ModuleModel = (0, mongoose_1.model)('Module', ModuleSchema);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(20);
const passport_1 = __webpack_require__(21);
const auth_controller_1 = __webpack_require__(22);
const favorite_controller_1 = __webpack_require__(29);
const auth_service_1 = __webpack_require__(23);
const favorite_service_1 = __webpack_require__(31);
const jwt_strategy_1 = __webpack_require__(34);
const user_mongo_repository_1 = __webpack_require__(36);
const favorite_mongo_repository_1 = __webpack_require__(38);
const tokens_1 = __webpack_require__(27);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'secret',
                signOptions: { expiresIn: '7d' },
            }),
        ],
        controllers: [auth_controller_1.AuthController, favorite_controller_1.FavoriteController],
        providers: [
            auth_service_1.AuthService,
            favorite_service_1.FavoriteService,
            jwt_strategy_1.JwtStrategy,
            {
                provide: tokens_1.USER_REPO,
                useClass: user_mongo_repository_1.UserMongoRepository,
            },
            {
                provide: tokens_1.FAVORITE_REPO,
                useClass: favorite_mongo_repository_1.FavoriteMongoRepository,
            },
        ],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const auth_service_1 = __webpack_require__(23);
const auth_dto_1 = __webpack_require__(28);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(dto) {
        return this.authService.register(dto.email, dto.password, dto.firstName, dto.lastName);
    }
    async login(dto) {
        return this.authService.login(dto.email, dto.password);
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate([
    (0, common_1.Post)('register'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof auth_dto_1.RegisterDto !== "undefined" && auth_dto_1.RegisterDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
tslib_1.__decorate([
    (0, common_1.Post)('login'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof auth_dto_1.LoginDto !== "undefined" && auth_dto_1.LoginDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, common_1.Controller)('auth'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(20);
const bcrypt = tslib_1.__importStar(__webpack_require__(24));
const user_repository_1 = __webpack_require__(25);
const user_entity_1 = __webpack_require__(26);
const tokens_1 = __webpack_require__(27);
let AuthService = class AuthService {
    constructor(userRepo, jwtService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
    }
    async register(email, password, firstName, lastName) {
        const existing = await this.userRepo.findByEmail(email);
        if (existing) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = user_entity_1.User.create({ email, passwordHash, firstName, lastName });
        const created = await this.userRepo.create(user);
        const token = this.jwtService.sign({ email: created.email });
        return {
            user: created.toJSON(),
            token,
        };
    }
    async login(email, password) {
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const token = this.jwtService.sign({ email: user.email });
        return {
            user: user.toJSON(),
            token,
        };
    }
    async validateUser(email) {
        return this.userRepo.findByEmail(email);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(tokens_1.USER_REPO)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);


/***/ }),
/* 24 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
class User {
    constructor(props) {
        this.props = props;
    }
    get email() {
        return this.props.email;
    }
    get passwordHash() {
        return this.props.passwordHash;
    }
    get firstName() {
        return this.props.firstName;
    }
    get lastName() {
        return this.props.lastName;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    static create(props) {
        return new User(props);
    }
    toJSON() {
        return {
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            createdAt: this.createdAt,
        };
    }
}
exports.User = User;


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FAVORITE_REPO = exports.USER_REPO = void 0;
exports.USER_REPO = Symbol('USER_REPO');
exports.FAVORITE_REPO = Symbol('FAVORITE_REPO');


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = exports.RegisterDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(16);
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Matches)(/@student\.avans\.nl$/, {
        message: 'Email must be a valid Avans student email (a.lastname@student.avans.nl)',
    }),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' }),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "lastName", void 0);
class LoginDto {
}
exports.LoginDto = LoginDto;
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "password", void 0);


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FavoriteController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const jwt_auth_guard_1 = __webpack_require__(30);
const favorite_service_1 = __webpack_require__(31);
let FavoriteController = class FavoriteController {
    constructor(favoriteService) {
        this.favoriteService = favoriteService;
    }
    async getUserFavorites(req) {
        const userEmail = req.user.email;
        return this.favoriteService.getUserFavorites(userEmail);
    }
    async addFavorite(req, moduleCode) {
        const userEmail = req.user.email;
        await this.favoriteService.addFavorite(userEmail, moduleCode);
        return { message: 'Module added to favorites' };
    }
    async removeFavorite(req, moduleCode) {
        const userEmail = req.user.email;
        await this.favoriteService.removeFavorite(userEmail, moduleCode);
        return { message: 'Module removed from favorites' };
    }
};
exports.FavoriteController = FavoriteController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FavoriteController.prototype, "getUserFavorites", null);
tslib_1.__decorate([
    (0, common_1.Post)(':moduleCode'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Param)('moduleCode')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], FavoriteController.prototype, "addFavorite", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':moduleCode'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Param)('moduleCode')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], FavoriteController.prototype, "removeFavorite", null);
exports.FavoriteController = FavoriteController = tslib_1.__decorate([
    (0, common_1.Controller)('favorites'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof favorite_service_1.FavoriteService !== "undefined" && favorite_service_1.FavoriteService) === "function" ? _a : Object])
], FavoriteController);


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(21);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FavoriteService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const favorite_repository_1 = __webpack_require__(32);
const favorite_entity_1 = __webpack_require__(33);
const tokens_1 = __webpack_require__(27);
let FavoriteService = class FavoriteService {
    constructor(favoriteRepo) {
        this.favoriteRepo = favoriteRepo;
    }
    async getUserFavorites(userEmail) {
        const favorites = await this.favoriteRepo.findByUser(userEmail);
        return favorites.map((f) => f.moduleCode);
    }
    async addFavorite(userEmail, moduleCode) {
        const existing = await this.favoriteRepo.findOne(userEmail, moduleCode);
        if (existing) {
            return; // Already favorited
        }
        const favorite = favorite_entity_1.Favorite.create({ userEmail, moduleCode });
        await this.favoriteRepo.create(favorite);
    }
    async removeFavorite(userEmail, moduleCode) {
        await this.favoriteRepo.delete(userEmail, moduleCode);
    }
    async isFavorited(userEmail, moduleCode) {
        const favorite = await this.favoriteRepo.findOne(userEmail, moduleCode);
        return !!favorite;
    }
};
exports.FavoriteService = FavoriteService;
exports.FavoriteService = FavoriteService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(tokens_1.FAVORITE_REPO)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof favorite_repository_1.FavoriteRepository !== "undefined" && favorite_repository_1.FavoriteRepository) === "function" ? _a : Object])
], FavoriteService);


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Favorite = void 0;
class Favorite {
    constructor(props) {
        this.props = props;
    }
    get userEmail() {
        return this.props.userEmail;
    }
    get moduleCode() {
        return this.props.moduleCode;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    static create(props) {
        return new Favorite(props);
    }
    toJSON() {
        return {
            userEmail: this.userEmail,
            moduleCode: this.moduleCode,
            createdAt: this.createdAt,
        };
    }
}
exports.Favorite = Favorite;


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(21);
const passport_jwt_1 = __webpack_require__(35);
const auth_service_1 = __webpack_require__(23);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(authService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || 'secret',
        });
        this.authService = authService;
    }
    async validate(payload) {
        const user = await this.authService.validateUser(payload.email);
        if (!user) {
            return null;
        }
        return user.toJSON();
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], JwtStrategy);


/***/ }),
/* 35 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserMongoRepository = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const user_entity_1 = __webpack_require__(26);
const user_schema_1 = __webpack_require__(37);
let UserMongoRepository = class UserMongoRepository {
    async findByEmail(email) {
        const doc = await user_schema_1.UserModel.findOne({ email });
        if (!doc)
            return null;
        return user_entity_1.User.create({
            email: doc.email,
            passwordHash: doc.passwordHash,
            firstName: doc.firstName,
            lastName: doc.lastName,
            createdAt: doc.createdAt,
        });
    }
    async create(user) {
        const doc = new user_schema_1.UserModel({
            email: user.email,
            passwordHash: user.passwordHash,
            firstName: user.firstName,
            lastName: user.lastName,
        });
        await doc.save();
        return user_entity_1.User.create({
            email: doc.email,
            passwordHash: doc.passwordHash,
            firstName: doc.firstName,
            lastName: doc.lastName,
            createdAt: doc.createdAt,
        });
    }
};
exports.UserMongoRepository = UserMongoRepository;
exports.UserMongoRepository = UserMongoRepository = tslib_1.__decorate([
    (0, common_1.Injectable)()
], UserMongoRepository);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModel = void 0;
const mongoose_1 = __webpack_require__(3);
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FavoriteMongoRepository = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const favorite_entity_1 = __webpack_require__(33);
const favorite_schema_1 = __webpack_require__(39);
let FavoriteMongoRepository = class FavoriteMongoRepository {
    async findByUser(userEmail) {
        const docs = await favorite_schema_1.FavoriteModel.find({ userEmail }).sort({ createdAt: -1 });
        return docs.map((doc) => favorite_entity_1.Favorite.create({
            userEmail: doc.userEmail,
            moduleCode: doc.moduleCode,
            createdAt: doc.createdAt,
        }));
    }
    async findOne(userEmail, moduleCode) {
        const doc = await favorite_schema_1.FavoriteModel.findOne({ userEmail, moduleCode });
        if (!doc)
            return null;
        return favorite_entity_1.Favorite.create({
            userEmail: doc.userEmail,
            moduleCode: doc.moduleCode,
            createdAt: doc.createdAt,
        });
    }
    async create(favorite) {
        const doc = new favorite_schema_1.FavoriteModel({
            userEmail: favorite.userEmail,
            moduleCode: favorite.moduleCode,
        });
        await doc.save();
        return favorite_entity_1.Favorite.create({
            userEmail: doc.userEmail,
            moduleCode: doc.moduleCode,
            createdAt: doc.createdAt,
        });
    }
    async delete(userEmail, moduleCode) {
        await favorite_schema_1.FavoriteModel.deleteOne({ userEmail, moduleCode });
    }
};
exports.FavoriteMongoRepository = FavoriteMongoRepository;
exports.FavoriteMongoRepository = FavoriteMongoRepository = tslib_1.__decorate([
    (0, common_1.Injectable)()
], FavoriteMongoRepository);


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FavoriteModel = void 0;
const mongoose_1 = __webpack_require__(3);
const FavoriteSchema = new mongoose_1.Schema({
    userEmail: { type: String, required: true },
    moduleCode: { type: String, required: true },
}, { timestamps: true });
// Ensure a user can only favorite a module once
FavoriteSchema.index({ userEmail: 1, moduleCode: 1 }, { unique: true });
exports.FavoriteModel = (0, mongoose_1.model)('Favorite', FavoriteSchema);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const mongoose = tslib_1.__importStar(__webpack_require__(3));
const dotenv = tslib_1.__importStar(__webpack_require__(4));
const common_2 = __webpack_require__(2);
const core_1 = __webpack_require__(5);
const app_module_1 = __webpack_require__(6);
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: {
            origin: process.env.FRONTEND_ORIGIN?.split(',') ?? ['http://localhost:4200'],
            credentials: true,
        },
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    const mongo = process.env.MONGO_URI;
    if (!mongo) {
        throw new Error('MONGO_URI not set');
    }
    await mongoose.connect(mongo);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_2.Logger.log(`🚀 Application is running on: http://localhost:${port}/api`);
}
bootstrap();

})();

/******/ })()
;