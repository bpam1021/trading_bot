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
var BotService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const node_fetch_1 = require("node-fetch");
const config_1 = require("@nestjs/config");
const posts_service_1 = require("../posts/posts.service");
const axios = require('axios').default;
let BotService = BotService_1 = class BotService {
    constructor(configService, postsService) {
        this.configService = configService;
        this.postsService = postsService;
        this.logger = new common_1.Logger(BotService_1.name);
    }
    onModuleInit() {
        this.logger.log(`Initializing ${BotService_1.name}`);
        this.run();
    }
    getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
    async run() {
        this.logger.log('Initializing Trade Bot');
        const promBars = new Promise((resolve, reject) => {
            const barChecker = setInterval(async () => {
                let tradeparameter = await this.postsService.getPostById(1);
                if (tradeparameter != false && tradeparameter.startflag == true) {
                    this.logger.log('Trade Bot Time Count');
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
                    const addOrderPrKey = __dirname + '/addOrderPrKey.pem';
                    const cancelAllOrderPrKey = __dirname + '/cancelAllOrderPrKey.pem';
                    let KEY_TDEADE = "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgbhZPblby4fbFQETU\nkBZCXndUD5jDVi5EitmzLWrwfxuhRANCAASqoelOmrbPRneq5O1lcj6BalLiDpq4\nUfWX5BrxhSC5e4KqknQG2ii21oSSKrdAwVhkutKWPNdaQvOfXuWs+Ih9\n-----END PRIVATE KEY-----";
                    let PR_KEY_ORDER = "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgRlOk122yZUclC2dr\nxqYV7c2npZj+2tvxwprCNkRWKlKhRANCAAQy3Cn0h7BEsflowwy4tz3qex6Jfxlb\nH/xNMqPrjsa3PrFKoWWzymKkl9xr+ceECflRVVd918V+HaSPhLCUdnT0\n-----END PRIVATE KEY-----";
                    let PR_KEY_ADD_ORDER = "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgNBWsoxQPHZOguIMR\nmPF7+SY60sd8yPBG6jaxAF+1WMihRANCAATy8CH2yMQG3TdbYwlLUnPtCv5qI8sN\nqD9AWdPuCHqih+Mdjxe8GNRb4yjS3sff5FYSVx9Ws+QP8ugjZJtKdGu9\n-----END PRIVATE KEY-----";
                    let PR_KEY_CANCEL_ORDER = "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgUEujiWQ5uNpernfe\n1B0cc66hnF4W3IyGndgz8UocJnuhRANCAARZC/LjUwb5jwAPxWBxLKBhcF7E2uvW\n/pOyWBu0IX0IVPtyH9EUIqkgvtDKQGdFxbEoMMX1fzrVfYmzQKDpL6PX\n-----END PRIVATE KEY-----";
                    const afileKey = __dirname + '/public.pem';
                    const orderPbKey = __dirname + '/orderPbKey.pem';
                    const addOrderPbKey = __dirname + '/addOrderPbKey.pem';
                    const cancelAllOrderPbKey = __dirname + '/cancelAllOrderPbKey.pem';
                    let API_KEY_TRADE = '3f4cb8f1-aa2f-48aa-bba6-dc50a370cfcf';
                    let PB_KEY_ORDER = 'ae45a8fc-d7fa-4e7c-acde-74a35f54e751';
                    let PB_KEY_ADD_ORDER = 'bb379fb9-8d64-4414-9387-edeaec1ad067';
                    let PB_KEY_CANCEL_ORDER = '5a71182e-f4b7-46bd-8b02-4b523e775a23';
                    const crypto = require("crypto");
                    const endpoint = '/private/trades';
                    const endpoint_order = '/private/open_orders';
                    const endpoint_add_order = '/private/add_order';
                    const endpoint_cancel_all_orders = '/private/cancel_all_orders';
                    const params = {
                        nonce: Date.now().toString(),
                        pair_id: pair_id,
                    };
                    const urlEncodedParams = new URLSearchParams(params).toString();
                    const messageToSign = endpoint + urlEncodedParams;
                    const signature = crypto.sign("sha512", Buffer.from(messageToSign), KEY_TDEADE);
                    const responses = await node_fetch_1.default('https://limitlex.com/api' + endpoint, {
                        method: 'POST',
                        headers: {
                            'API-Key': API_KEY_TRADE,
                            'API-Sign': signature.toString('base64'),
                        },
                        body: urlEncodedParams,
                    });
                    const tjson = await responses.json();
                    console.log(tjson);
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
                    let bids, asks, totalBid, totalAsk;
                    bids = orderJson.result.data.filter((item, index) => {
                        if (item.order_direction == "buy") {
                            return item;
                        }
                    });
                    asks = orderJson.result.data.filter((item, index) => {
                        if (item.order_direction == "sell") {
                            return item;
                        }
                    });
                    totalBid = bids.length;
                    totalAsk = asks.length;
                    let buy_price, buy_amount_1;
                    if (totalBid == 0) {
                        buy_price = tradeparameter.bidprice.toString();
                        buy_amount_1 = tradeparameter.bidamount.toString();
                    }
                    else {
                        buy_price = (bids[totalBid - 1].price * (1 - this.getRandom(tradeparameter.startbidprogres, tradeparameter.endbidprogress) / 100)).toFixed(4);
                        buy_amount_1 = this.getRandom(5, tradeparameter.bidamount).toFixed(6);
                    }
                    let params_add_bid_order = {
                        nonce: Date.now().toString(),
                        pair_id: pair_id,
                        order_direction: "buy",
                        order_type: "limit",
                        price: buy_price,
                        amount_1: buy_amount_1.toString()
                    };
                    let ask_price, ask_amount_1;
                    if (totalAsk == 0) {
                        ask_price = tradeparameter.askprice.toString();
                        ask_amount_1 = tradeparameter.askamount.toString();
                    }
                    else {
                        ask_price = (asks[totalAsk - 1].price * (1 + this.getRandom(tradeparameter.startaskprogres, tradeparameter.endaskprogress) / 100)).toFixed(4);
                        ask_amount_1 = this.getRandom(5, tradeparameter.askamount).toFixed(6);
                    }
                    if (bids.length <= 25) {
                        const addOrderUrlEncodedParams = new URLSearchParams(params_add_bid_order).toString();
                        const addOrderMessageToSign = endpoint_add_order + addOrderUrlEncodedParams;
                        const addOrderSignature = crypto.sign("sha512", Buffer.from(addOrderMessageToSign), PR_KEY_ADD_ORDER);
                        const addOrderResponses = await node_fetch_1.default('https://limitlex.com/api' + endpoint_add_order, {
                            method: 'POST',
                            headers: {
                                'API-Key': PB_KEY_ADD_ORDER,
                                'API-Sign': addOrderSignature.toString('base64'),
                            },
                            body: addOrderUrlEncodedParams,
                        });
                        const addOrderJson = await addOrderResponses.json();
                        console.log("addOrderJson:", addOrderJson);
                    }
                    let params_add_ask_order = {
                        nonce: Date.now().toString(),
                        pair_id: pair_id,
                        order_direction: "sell",
                        order_type: "limit",
                        price: ask_price,
                        amount_1: ask_amount_1
                    };
                    if (asks.length <= 25) {
                        const addAskOrderUrlEncodedParams = new URLSearchParams(params_add_ask_order).toString();
                        const addAskOrderMessageToSign = endpoint_add_order + addAskOrderUrlEncodedParams;
                        const addAskOrderSignature = crypto.sign("sha512", Buffer.from(addAskOrderMessageToSign), PR_KEY_ADD_ORDER);
                        const addAskOrderResponses = await node_fetch_1.default('https://limitlex.com/api' + endpoint_add_order, {
                            method: 'POST',
                            headers: {
                                'API-Key': PB_KEY_ADD_ORDER,
                                'API-Sign': addAskOrderSignature.toString('base64'),
                            },
                            body: addAskOrderUrlEncodedParams,
                        });
                        const addAskOrderJson = await addAskOrderResponses.json();
                        console.log("addAskOrderJson:", addAskOrderJson);
                    }
                }
            }, 10000);
        });
    }
};
BotService = BotService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        posts_service_1.default])
], BotService);
exports.BotService = BotService;
//# sourceMappingURL=bot.service.js.map