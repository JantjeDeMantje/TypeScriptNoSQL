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
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [modules_module_1.ModulesModule],
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
const module_controller_1 = __webpack_require__(13);
const module_mongo_repository_1 = __webpack_require__(16);
let ModulesModule = class ModulesModule {
};
exports.ModulesModule = ModulesModule;
exports.ModulesModule = ModulesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [
            module_service_1.ModuleService,
            module_mongo_repository_1.ModuleMongoRepository,
            { provide: 'ModuleRepository', useExisting: module_mongo_repository_1.ModuleMongoRepository },
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
};
exports.ModuleService = ModuleService;
exports.ModuleService = ModuleService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)('ModuleRepository')),
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModuleController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const module_service_1 = __webpack_require__(10);
const module_dto_1 = __webpack_require__(14);
const module_repository_1 = __webpack_require__(11);
let ModuleController = class ModuleController {
    constructor(service) {
        this.service = service;
    }
    async list(q) {
        const modules = await this.service.list(q);
        return modules.map((m) => m.toJSON());
    }
    async get(code) {
        const m = await this.service.get(code);
        return m?.toJSON();
    }
    async create(dto) {
        return (await this.service.create(dto)).toJSON();
    }
    async update(code, dto) {
        return (await this.service.update(code, dto))?.toJSON();
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
exports.ModuleController = ModuleController = tslib_1.__decorate([
    (0, common_1.Controller)('modules'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof module_service_1.ModuleService !== "undefined" && module_service_1.ModuleService) === "function" ? _a : Object])
], ModuleController);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateModuleDto = exports.CreateModuleDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(15);
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
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
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
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateModuleDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], UpdateModuleDto.prototype, "keywords", void 0);


/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModuleMongoRepository = void 0;
const module_entity_1 = __webpack_require__(12);
const module_schema_1 = __webpack_require__(17);
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
            query.$or = [{ name: r }, { description: r }, { keywords: r }, { code: r }];
        }
        const docs = await module_schema_1.ModuleModel.find(query).lean();
        return docs.map((d) => module_entity_1.Module.create(d));
    }
    async findByCode(code) {
        const doc = await module_schema_1.ModuleModel.findOne({ code }).lean();
        return doc ? module_entity_1.Module.create(doc) : null;
    }
    async create(module) {
        await module_schema_1.ModuleModel.create(module.toJSON());
        return module;
    }
    async update(code, patch) {
        const doc = await module_schema_1.ModuleModel.findOneAndUpdate({ code }, patch, { new: true }).lean();
        return doc ? module_entity_1.Module.create(doc) : null;
    }
}
exports.ModuleMongoRepository = ModuleMongoRepository;


/***/ }),
/* 17 */
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
    description: String,
    keywords: [String],
}, { timestamps: true });
exports.ModuleModel = (0, mongoose_1.model)('Module', ModuleSchema);


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
//# sourceMappingURL=main.js.map