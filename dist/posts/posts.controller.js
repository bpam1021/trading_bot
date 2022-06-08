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
const common_1 = require("@nestjs/common");
const axios = require('axios').default;
const posts_service_1 = require("./posts.service");
const updateSetAskParam_dto_1 = require("./dto/updateSetAskParam.dto");
const updateSetBidParam_dto_1 = require("./dto/updateSetBidParam.dto");
const updateSetCurrency_dto_1 = require("./dto/updateSetCurrency.dto");
const updateSetStartParam_dto_1 = require("./dto/updateSetStartParam.dto");
const swagger_1 = require("@nestjs/swagger");
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    getAllPosts() {
        return this.postsService.getAllPosts();
    }
    async createPost(post) {
        let oldpost = await this.getAllPosts();
        let newpost;
        if (oldpost.length == 0)
            newpost = this.postsService.createPost(post);
        else
            newpost = this.postsService.updatePost(1, post);
        return newpost;
    }
    async setBid(biddata) {
        return this.postsService.updatePost(1, biddata);
    }
    async setAsk(askdata) {
        return this.postsService.updatePost(1, askdata);
    }
    async setStartandStop(startdata) {
        return this.postsService.updatePost(1, startdata);
    }
    async getEnableCurrencies() {
        let response;
        try {
            response = await axios.get('https://limitlex.com/api/public/currencies');
        }
        catch (error) {
            console.log('[ERROR][MEMBER][FETCH]: ', error);
            return false;
        }
        return response.data;
    }
    async cancelallorders() {
        return true;
    }
    async getEnableOrders() {
        let API_KEY = "d248b83e-00b6-42c8-aef5-c1fb6a8deef4";
        let Private_Key = `-----BEGIN PRIVATE KEY-----
    MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQggroaxL9bfLZNMzSQ
    j1YCH2deNneNdYgCyGvZYZmlNfmhRANCAAQa63I59jtSCkH5lFaAdLGrrss2I22M
    IDqb2as76C0yUYXbDtcUG9HLu/sFqaxp7xTgpNFWjroYgWZcVFD5OFu0
    -----END PRIVATE KEY-----`;
        let ellipticcurve = require("starkbank-ecdsa");
        let Ecdsa = ellipticcurve.Ecdsa;
        let PrivateKey = ellipticcurve.PrivateKey;
        let privateKey = PrivateKey.fromPem(Private_Key);
        const endpoint = '/private/open_orders';
        const params = {
            nonce: Date.now().toString(),
            pair_id: 'ab651a43-1fc9-4163-a31b-74e5f537e82f:bfd04d06-b97c-4287-8bb0-c18f2eb19157',
        };
        const urlEncodedParams = new URLSearchParams(params).toString();
        const messageToSign = endpoint + urlEncodedParams;
        let signature = Ecdsa.sign(messageToSign, privateKey);
        let response = await axios.post('https://limitlex.com/api' + endpoint, {
            headers: {
                'API-Key': API_KEY,
                'API-Sign': signature.toString('base64'),
            },
            body: urlEncodedParams,
        });
        console.log(response);
        return response;
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: "Get all posts" }),
    swagger_1.ApiResponse({ status: 200, description: "[]" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getAllPosts", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: "Set Exchage Crypto" }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateSetCurrency_dto_1.default]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "createPost", null);
__decorate([
    common_1.Post("SetBid"),
    swagger_1.ApiOperation({ summary: "Set Bid Params" }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateSetBidParam_dto_1.default]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "setBid", null);
__decorate([
    common_1.Post("SetAsk"),
    swagger_1.ApiOperation({ summary: "Set Ask Params" }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateSetAskParam_dto_1.default]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "setAsk", null);
__decorate([
    common_1.Post("action"),
    swagger_1.ApiOperation({ summary: "Set Start Flag" }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateSetStartParam_dto_1.default]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "setStartandStop", null);
__decorate([
    common_1.Post("curryencies"),
    swagger_1.ApiOperation({ summary: "Set Start Flag" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getEnableCurrencies", null);
__decorate([
    common_1.Post("cancel"),
    swagger_1.ApiOperation({ summary: "Set Start Flag" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "cancelallorders", null);
__decorate([
    common_1.Post("orders"),
    swagger_1.ApiOperation({ summary: "Set Start Flag" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getEnableOrders", null);
PostsController = __decorate([
    swagger_1.ApiBasicAuth(),
    swagger_1.ApiTags("Posts"),
    common_1.Controller("posts"),
    __metadata("design:paramtypes", [posts_service_1.default])
], PostsController);
exports.default = PostsController;
//# sourceMappingURL=posts.controller.js.map