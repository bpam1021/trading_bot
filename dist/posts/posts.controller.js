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
const node_fetch_1 = require("node-fetch");
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
        let response;
        try {
            response = await axios.get('https://limitlex.com/api/public/currencies');
        }
        catch (error) {
            console.log('[ERROR][MEMBER][FETCH]: ', error);
        }
        let fromid, toid;
        let cryptodata = response.data.result.data;
        cryptodata.map((item, index) => {
            if (item.code == "USDT")
                fromid = item.id;
            if (item.code == "XRP")
                toid = item.id;
        });
        try {
            response = await axios.get('https://limitlex.com/api/public/pairs');
        }
        catch (error) {
            console.log('[ERROR][MEMBER][FETCH]: ', error);
        }
        let pairdata = response.data.result.data;
        let pair_id = "";
        pairdata.map((item, index) => {
            if ((item.currency_id_1 == fromid && item.currency_id_2 == toid) || (item.currency_id_1 == toid && item.currency_id_2 == fromid))
                pair_id = item.id;
        });
        const fs = require('fs');
        const orderPrKey = __dirname + '../../../pem/orderPrKey.pem';
        const cancelAllOrderPrKey = __dirname + '../../../pem/cancelAllOrderPrKey.pem';
        let PR_KEY_ORDER = "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgRlOk122yZUclC2dr\nxqYV7c2npZj+2tvxwprCNkRWKlKhRANCAAQy3Cn0h7BEsflowwy4tz3qex6Jfxlb\nH/xNMqPrjsa3PrFKoWWzymKkl9xr+ceECflRVVd918V+HaSPhLCUdnT0\n-----END PRIVATE KEY-----";
        let PR_KEY_CANCEL_ORDER = "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgUEujiWQ5uNpernfe\n1B0cc66hnF4W3IyGndgz8UocJnuhRANCAARZC/LjUwb5jwAPxWBxLKBhcF7E2uvW\n/pOyWBu0IX0IVPtyH9EUIqkgvtDKQGdFxbEoMMX1fzrVfYmzQKDpL6PX\n-----END PRIVATE KEY-----";
        const orderPbKey = __dirname + '../../../pem/orderPbKey.pem';
        const cancelAllOrderPbKey = __dirname + '../../../pem/cancelAllOrderPbKey.pem';
        let API_KEY_TRADE = '3f4cb8f1-aa2f-48aa-bba6-dc50a370cfcf';
        let PB_KEY_ORDER = 'ae45a8fc-d7fa-4e7c-acde-74a35f54e751';
        let PB_KEY_ADD_ORDER = 'bb379fb9-8d64-4414-9387-edeaec1ad067';
        let PB_KEY_CANCEL_ORDER = '5a71182e-f4b7-46bd-8b02-4b523e775a23';
        const crypto = require("crypto");
        const endpoint_cancel_all_orders = '/private/cancel_all_orders';
        const endpoint_order = '/private/cancel_all_orders';
        const params_order = {
            nonce: Date.now().toString(),
            pair_id: pair_id,
        };
        const params_cancel_all_orders = {
            nonce: Date.now().toString(),
            pair_id: pair_id,
        };
        const cAOurlEncodedParams = new URLSearchParams(params_cancel_all_orders).toString();
        const cAOmessageToSign = endpoint_cancel_all_orders + cAOurlEncodedParams;
        const cAOsignature = crypto.sign("sha512", Buffer.from(cAOmessageToSign), PR_KEY_CANCEL_ORDER);
        const cAOresponses = await node_fetch_1.default('https://limitlex.com/api' + endpoint_cancel_all_orders, {
            method: 'POST',
            headers: {
                'API-Key': PB_KEY_CANCEL_ORDER,
                'API-Sign': cAOsignature.toString('base64'),
            },
            body: cAOurlEncodedParams,
        });
    }
    async getEnableOrders() {
        let response;
        try {
            response = await axios.get('https://limitlex.com/api/public/currencies');
        }
        catch (error) {
            console.log('[ERROR][MEMBER][FETCH]: ', error);
        }
        let fromid, toid;
        let cryptodata = response.data.result.data;
        cryptodata.map((item, index) => {
            if (item.code == "USDT")
                fromid = item.id;
            if (item.code == "XRP")
                toid = item.id;
        });
        try {
            response = await axios.get('https://limitlex.com/api/public/pairs');
        }
        catch (error) {
            console.log('[ERROR][MEMBER][FETCH]: ', error);
        }
        let pairdata = response.data.result.data;
        let pair_id = "";
        pairdata.map((item, index) => {
            if ((item.currency_id_1 == fromid && item.currency_id_2 == toid) || (item.currency_id_1 == toid && item.currency_id_2 == fromid))
                pair_id = item.id;
        });
        const fs = require('fs');
        const orderPrKey = __dirname + '/orderPrKey.pem';
        const cancelAllOrderPrKey = __dirname + '/cancelAllOrderPrKey.pem';
        let PR_KEY_ORDER = fs.readFileSync(orderPrKey, "utf8");
        let PR_KEY_CANCEL_ORDER = fs.readFileSync(cancelAllOrderPrKey, "utf8");
        const orderPbKey = __dirname + '/orderPbKey.pem';
        const cancelAllOrderPbKey = __dirname + '/cancelAllOrderPbKey.pem';
        let PB_KEY_ORDER = fs.readFileSync(orderPbKey, "utf8");
        let PB_KEY_CANCEL_ORDER = fs.readFileSync(cancelAllOrderPbKey, "utf8");
        const crypto = require("crypto");
        const endpoint_order = '/private/open_orders';
        const params_order = {
            nonce: Date.now().toString(),
            pair_id: pair_id,
        };
        const orderUrlEncodedParams = new URLSearchParams(params_order).toString();
        const orderMessageToSign = endpoint_order + orderUrlEncodedParams;
        const orderSignature = crypto.sign("sha512", Buffer.from(orderMessageToSign), PR_KEY_ORDER);
        const orderResponses = await node_fetch_1.default('https://limitlex.com/api' + endpoint_order, {
            method: 'POST',
            headers: {
                'API-Key': PB_KEY_ORDER,
                'API-Sign': orderSignature.toString('base64'),
            },
            body: orderUrlEncodedParams,
        });
        const orderJson = await orderResponses.json();
        return orderJson;
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