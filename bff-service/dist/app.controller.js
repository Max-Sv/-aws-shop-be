"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = exports.PRODUCT_REQ = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const axios_1 = require("@nestjs/axios");
const BAD_REQ = 'Cannot process request';
const ID = 'id';
exports.PRODUCT_REQ = 'products';
let AppController = class AppController {
    constructor(appService, httpService, cacheManager) {
        this.appService = appService;
        this.httpService = httpService;
        this.cacheManager = cacheManager;
    }
    async bff(req, res, productId) {
        const reqUrl = req.url.split('/')[1];
        const recipient = productId ? reqUrl.split("?")[0] : reqUrl;
        console.log("-> recipient", recipient);
        const recipientURL = process.env[recipient];
        if (!recipientURL) {
            throw new common_1.BadGatewayException(BAD_REQ);
        }
        const { method, body } = req;
        const url = productId && recipient === exports.PRODUCT_REQ ? `${recipientURL}/${recipient}/${productId}` : `${recipientURL}/${recipient}`;
        const config = Object.assign({ url,
            method }, (Object.keys(body || {}).length > 0 && { data: body }));
        try {
            let cacheData = null;
            if (recipient === exports.PRODUCT_REQ && method === 'GET' && !productId) {
                cacheData = await this.appService.getCache();
            }
            if (cacheData) {
                return res.status(common_1.HttpStatus.OK).json(cacheData);
            }
            const { status, data } = await this.httpService.axiosRef(config);
            if (recipient === exports.PRODUCT_REQ && method === 'GET' && !productId) {
                this.appService.setCache(data);
            }
            return res.status(status).json(data);
        }
        catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                return res.status(status).json(data);
            }
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
__decorate([
    (0, common_1.All)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)(ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "bff", null);
AppController = __decorate([
    (0, common_1.Controller)("*"),
    __param(2, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [app_service_1.AppService, axios_1.HttpService, Object])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map