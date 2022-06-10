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
        this.logger.log(`INITIALIZING ${BotService_1.name}`);
        this.run();
    }
    getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
    async run() {
        this.logger.log('TRADING BOT SERVER IS INITIALIZED...');
        let firsttradeparameter = await this.postsService.getPostById(1);
        let dynamic_is_started = false;
        let SUFFICIENT_PRICE_RATE = 0.5, dynamic_start_progress = 10, dinamic_end_progress = 15, Y = 200;
        if (firsttradeparameter != false) {
            SUFFICIENT_PRICE_RATE = firsttradeparameter.price_rate;
            dynamic_start_progress = firsttradeparameter.stime;
            dinamic_end_progress = firsttradeparameter.etime;
            Y = firsttradeparameter.ytime;
            dynamic_is_started = firsttradeparameter.startflag;
        }
        let bids, asks, totalBid, totalAsk, bidAmount = 0, askAmount = 0, pair_id = "", buy_price, ask_price, pair_data, trade_last_price = 0, main_counter = 0, dynamic_increase_counter = 0, dynamic_decrease_counter = 0, is_ask_order_filled = false, is_bid_order_filled = false, rand_increase = Math.floor(this.getRandom(dynamic_start_progress, dinamic_end_progress)), rand_decrease = Math.floor(this.getRandom(dynamic_start_progress, dinamic_end_progress) * Y / 100);
        const fs = require('fs');
        const orderPrKey = __dirname + '/orderPrKey.pem';
        const addOrderPrKey = __dirname + '/addOrderPrKey.pem';
        const cancelAllOrderPrKey = __dirname + '/cancelAllOrderPrKey.pem';
        let KEY_TDEADE = "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgbhZPblby4fbFQETU\nkBZCXndUD5jDVi5EitmzLWrwfxuhRANCAASqoelOmrbPRneq5O1lcj6BalLiDpq4\nUfWX5BrxhSC5e4KqknQG2ii21oSSKrdAwVhkutKWPNdaQvOfXuWs+Ih9\n-----END PRIVATE KEY-----";
        let PR_KEY_ORDER = "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgRlOk122yZUclC2dr\nxqYV7c2npZj+2tvxwprCNkRWKlKhRANCAAQy3Cn0h7BEsflowwy4tz3qex6Jfxlb\nH/xNMqPrjsa3PrFKoWWzymKkl9xr+ceECflRVVd918V+HaSPhLCUdnT0\n-----END PRIVATE KEY-----";
        let PR_KEY_ADD_ORDER = "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgNBWsoxQPHZOguIMR\nmPF7+SY60sd8yPBG6jaxAF+1WMihRANCAATy8CH2yMQG3TdbYwlLUnPtCv5qI8sN\nqD9AWdPuCHqih+Mdjxe8GNRb4yjS3sff5FYSVx9Ws+QP8ugjZJtKdGu9\n-----END PRIVATE KEY-----";
        let PR_KEY_CANCEL_ORDER = "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgVfDhXnv9eSUd/WRx\nHwSJwJAAMZyLE27BWosGgcwa2xuhRANCAAS3V2gWQCLprSXq/iVaeDxfB6/W18vA\nBbe4QfqyMk1iPpJqeKd4Wepx8lr+F76YEK3Y68DGomU4fO0YreReKABu\n-----END PRIVATE KEY-----";
        let PR_KEY_CANCEL_ALL_ORDERS = "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQge6YxbEYJ+q2L3O8r\ncdHRTxjAECydrsY64784MX4uKA+hRANCAARYTjl1j0e4BtM+6HdrgP6hI7+08eZk\nSPcHoe3WBBSjUkgZQ9fJ6DCdsCqwYXSK50HHTEvyv+15OnD5LUQ2QSLi\n-----END PRIVATE KEY-----";
        let PR_KEY_BALANCE = "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgq703ua7sguhvupkL\nIxlIy8kcKDa31h6bdeT8yOt/unGhRANCAARGP3kcYVh/PeSw7XmDGxpyP+QR9n4R\ndbpJugACGs2pCtdI1Y2hNa95IePZAYpFcZzAENQWoF5lgWPsl0Tw00x7\n-----END PRIVATE KEY-----";
        const afileKey = __dirname + '/public.pem';
        const orderPbKey = __dirname + '/orderPbKey.pem';
        const addOrderPbKey = __dirname + '/addOrderPbKey.pem';
        const cancelAllOrderPbKey = __dirname + '/cancelAllOrderPbKey.pem';
        let API_KEY_TRADE = '3f4cb8f1-aa2f-48aa-bba6-dc50a370cfcf';
        let PB_KEY_ORDER = 'ae45a8fc-d7fa-4e7c-acde-74a35f54e751';
        let PB_KEY_ADD_ORDER = 'bb379fb9-8d64-4414-9387-edeaec1ad067';
        let PB_KEY_CANCEL_ORDER = 'e257b01c-3c16-45e8-a046-962c7dcdd3ff';
        let PB_KEY_CANCEL_ALL_ORDERS = '6344b106-3976-4b9f-8bfc-2513e89ed3e3';
        let PB_KEY_BALANCE = "ea33d81d-2df5-44c8-8a60-0e221b76d4a8";
        const crypto = require("crypto");
        const endpoint = '/private/trades';
        const endpoint_order = '/private/open_orders';
        const endpoint_add_order = '/private/add_order';
        const endpoint_balance = '/private/balance';
        const endpoint_cancel_order = '/private/cancel_order';
        const endpoint_cancel_orders = '/private/cancel_all_orders';
        let fromid, toid;
        let pairdata;
        let cryptodata;
        const promBars = new Promise((resolve, reject) => {
            const barChecker = setInterval(async () => {
                let tradeparameter = await this.postsService.getPostById(1);
                if (tradeparameter != false) {
                    this.logger.log('Trade Bot Time Count');
                    if (main_counter >= 10 || dynamic_increase_counter >= rand_increase || dynamic_decrease_counter >= rand_decrease) {
                        let response;
                        try {
                            response = await axios.get('https://limitlex.com/api/public/currencies');
                        }
                        catch (error) {
                            response.data.result.data = [];
                            console.log('[ERROR][MEMBER][FETCH]: ', error);
                        }
                        cryptodata = response.data.result.data;
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
                            response.data.result.data = [];
                            console.log('[ERROR][MEMBER][FETCH]: ', error);
                        }
                        pairdata = response.data.result.data;
                        pairdata.map((item, index) => {
                            if ((item.currency_id_1 == fromid && item.currency_id_2 == toid) || (item.currency_id_1 == toid && item.currency_id_2 == fromid)) {
                                pair_id = item.id;
                                pair_data = item;
                            }
                        });
                    }
                    if (main_counter >= 10) {
                        main_counter = 0;
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
                        const params_balance = {
                            nonce: Date.now().toString(),
                            pair_id: pair_id,
                        };
                        const balanceUrlEncodedParams = new URLSearchParams(params_balance).toString();
                        const balanceMessageToSign = endpoint_balance + balanceUrlEncodedParams;
                        const balanceSignature = crypto.sign("sha512", Buffer.from(balanceMessageToSign), PR_KEY_BALANCE);
                        const balanceResponses = await node_fetch_1.default('https://limitlex.com/api' + endpoint_balance, {
                            method: 'POST',
                            headers: {
                                'API-Key': PB_KEY_BALANCE,
                                'API-Sign': balanceSignature.toString('base64'),
                            },
                            body: balanceUrlEncodedParams,
                        });
                        const balanceJson = await balanceResponses.json();
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
                        if (totalBid == 25) {
                            is_bid_order_filled = true;
                        }
                        if (totalAsk == 25) {
                            is_ask_order_filled = true;
                        }
                        if (totalBid == 0) {
                            buy_price = tradeparameter.bidprice.toString();
                        }
                        else {
                            buy_price = (bids[totalBid - 1].price * (1 - this.getRandom(tradeparameter.startbidprogres, tradeparameter.endbidprogress) / 100)).toFixed(4);
                        }
                        if (totalAsk == 0) {
                            ask_price = tradeparameter.askprice.toString();
                        }
                        else {
                            ask_price = (asks[totalAsk - 1].price * (1 + this.getRandom(tradeparameter.startaskprogres, tradeparameter.endaskprogress) / 100)).toFixed(4);
                        }
                        this.logger.log(ask_price, 'ASK PRICE');
                        this.logger.log(buy_price, 'BID PRICE');
                        balanceJson.result.data.map((item) => {
                            if (item.currency_id == fromid) {
                                let amount_available_bid = parseFloat(item.amount_available) * this.getRandom(2, 10) / 100;
                                let temp = amount_available_bid / parseFloat(buy_price);
                                bidAmount = parseFloat(temp.toFixed(pair_data.decimals));
                            }
                            if (item.currency_id == toid) {
                                let amount_available_ask = parseFloat(item.amount_available) * this.getRandom(2, 10) / 100;
                                askAmount = parseFloat(amount_available_ask.toFixed(pair_data.decimals));
                            }
                        });
                        this.logger.log(bidAmount.toString(), 'ASK AMOUNT');
                        this.logger.log(askAmount.toString(), 'BID AMOUNT');
                        let params_add_bid_order = {
                            nonce: Date.now().toString(),
                            pair_id: pair_id,
                            order_direction: "buy",
                            order_type: "limit",
                            price: buy_price,
                            amount_1: bidAmount.toString(),
                        };
                        if (bids.length < 25) {
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
                            console.log('BID ORDER: ', addOrderJson);
                        }
                        let params_add_ask_order = {
                            nonce: Date.now().toString(),
                            pair_id: pair_id,
                            order_direction: "sell",
                            order_type: "limit",
                            price: ask_price,
                            amount_1: askAmount.toString(),
                        };
                        if (asks.length < 25) {
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
                            console.log('ASK ORDER: ', addAskOrderJson);
                        }
                    }
                    let response_ticker, current_price, lowest_ask_price, highest_bid_price;
                    if (dynamic_is_started == true) {
                        if (trade_last_price != 0) {
                            if (dynamic_increase_counter >= rand_increase) {
                                dynamic_increase_counter = 0;
                                rand_increase = Math.floor(this.getRandom(dynamic_start_progress, dinamic_end_progress));
                                try {
                                    response_ticker = await axios.get('https://limitlex.com/api/public/ticker');
                                }
                                catch (error) {
                                    response_ticker.data.result.data = [];
                                    console.log('[ERROR][MEMBER][FETCH]: ', error);
                                }
                                response_ticker.data.result.map((item) => {
                                    if (item.pair_id == pair_id) {
                                        current_price = parseFloat(item.last_price);
                                    }
                                });
                                this.logger.log(current_price, "CURRENT PRICE");
                                this.logger.log(trade_last_price, "LAST PRICE");
                                if (trade_last_price < current_price) {
                                    console.log("arrive1");
                                    let ask_prices = asks.map((item) => {
                                        return parseFloat(item.price);
                                    });
                                    ask_prices.sort(function (a, b) { return a - b; });
                                    lowest_ask_price = ask_prices[0];
                                    let lowest_ask_id;
                                    asks.map((item) => {
                                        if (parseFloat(item.price) == lowest_ask_price) {
                                            return lowest_ask_id = item.order_id;
                                        }
                                    });
                                    let params_cancel_spec_orders = {
                                        nonce: Date.now().toString(),
                                        pair_id: pair_id,
                                        order_id: lowest_ask_id,
                                    };
                                    const cancelOrderUrlEncodedParams = new URLSearchParams(params_cancel_spec_orders).toString();
                                    const cancelOrderMessageToSign = endpoint_cancel_order + cancelOrderUrlEncodedParams;
                                    const cancelOrderSignature = crypto.sign("sha512", Buffer.from(cancelOrderMessageToSign), PR_KEY_CANCEL_ORDER);
                                    const cancelOrderResponses = await node_fetch_1.default('https://limitlex.com/api' + endpoint_cancel_order, {
                                        method: 'POST',
                                        headers: {
                                            'API-Key': PB_KEY_CANCEL_ORDER,
                                            'API-Sign': cancelOrderSignature.toString('base64'),
                                        },
                                        body: cancelOrderUrlEncodedParams,
                                    });
                                    const cancelOrderJson = await cancelOrderResponses.json();
                                    console.log("cancelAllOrderJson: ", cancelOrderJson);
                                    let params_with_canceled_ask_price = {
                                        nonce: Date.now().toString(),
                                        pair_id: pair_id,
                                        order_direction: "buy",
                                        order_type: "limit",
                                        price: lowest_ask_price,
                                        amount_1: bidAmount.toString(),
                                    };
                                    const addNewOrderUrlEncodedParams = new URLSearchParams(params_with_canceled_ask_price).toString();
                                    const addNewOrderMessageToSign = endpoint_add_order + addNewOrderUrlEncodedParams;
                                    const addNewOrderSignature = crypto.sign("sha512", Buffer.from(addNewOrderMessageToSign), PR_KEY_ADD_ORDER);
                                    const addNewOrderResponses = await node_fetch_1.default('https://limitlex.com/api' + endpoint_add_order, {
                                        method: 'POST',
                                        headers: {
                                            'API-Key': PB_KEY_ADD_ORDER,
                                            'API-Sign': addNewOrderSignature.toString('base64'),
                                        },
                                        body: addNewOrderUrlEncodedParams,
                                    });
                                    const addNewOrderJson = await addNewOrderResponses.json();
                                    console.log("addNewOrderJson:", addNewOrderJson);
                                    let bid_prices = bids.map((item) => {
                                        return parseFloat(item.price);
                                    });
                                    bid_prices.sort(function (a, b) { return b - a; });
                                    highest_bid_price = bid_prices[0];
                                    let highest_bid_amount;
                                    bids.map((item) => {
                                        if (parseFloat(item.price) == highest_bid_price) {
                                            highest_bid_amount = item.amount_initial;
                                        }
                                    });
                                    let params_cancel_bid_orders = {
                                        nonce: Date.now().toString(),
                                        pair_id: pair_id,
                                        direction: "buy",
                                    };
                                    const cancelAllOrderUrlEncodedParams = new URLSearchParams(params_cancel_bid_orders).toString();
                                    const cancelAllOrderMessageToSign = endpoint_cancel_orders + cancelAllOrderUrlEncodedParams;
                                    const cancelAllOrderSignature = crypto.sign("sha512", Buffer.from(cancelAllOrderMessageToSign), PR_KEY_CANCEL_ALL_ORDERS);
                                    const cancelAllOrderResponses = await node_fetch_1.default('https://limitlex.com/api' + endpoint_cancel_orders, {
                                        method: 'POST',
                                        headers: {
                                            'API-Key': PB_KEY_CANCEL_ALL_ORDERS,
                                            'API-Sign': cancelAllOrderSignature.toString('base64'),
                                        },
                                        body: cancelAllOrderUrlEncodedParams,
                                    });
                                    const cancelAllOrderJson = await cancelAllOrderResponses.json();
                                    console.log("cancelAllOrderJson: ", cancelAllOrderJson);
                                    let params_add_highest_bid_order = {
                                        nonce: Date.now().toString(),
                                        pair_id: pair_id,
                                        order_direction: "buy",
                                        order_type: "limit",
                                        price: highest_bid_price.toString(),
                                        amount_1: highest_bid_amount,
                                    };
                                    const addHighestBidUrlEncodedParams = new URLSearchParams(params_add_highest_bid_order).toString();
                                    const addHighestOrderMessageToSign = endpoint_add_order + addHighestBidUrlEncodedParams;
                                    const addHighestBidOrderSignature = crypto.sign("sha512", Buffer.from(addHighestOrderMessageToSign), PR_KEY_ADD_ORDER);
                                    const addHighestBidOrderResponses = await node_fetch_1.default('https://limitlex.com/api' + endpoint_add_order, {
                                        method: 'POST',
                                        headers: {
                                            'API-Key': PB_KEY_ADD_ORDER,
                                            'API-Sign': addHighestBidOrderSignature.toString('base64'),
                                        },
                                        body: addHighestBidUrlEncodedParams,
                                    });
                                    const addHighestBidOrderJson = await addHighestBidOrderResponses.json();
                                    console.log("addHighestBidOrderJson:", addHighestBidOrderJson);
                                    let params_add_ask_order = {
                                        nonce: Date.now().toString(),
                                        pair_id: pair_id,
                                        order_direction: "sell",
                                        order_type: "limit",
                                        price: ask_price,
                                        amount_1: askAmount.toString(),
                                    };
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
                                }
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
                                bids = orderJson.result.data.filter((item, index) => {
                                    if (item.order_direction == "buy") {
                                        return item;
                                    }
                                });
                                if (bids.length == 25) {
                                    is_bid_order_filled = true;
                                }
                            }
                            if (dynamic_decrease_counter >= rand_decrease) {
                                dynamic_decrease_counter = 0;
                                rand_decrease = Math.floor(this.getRandom(dynamic_start_progress, dinamic_end_progress) * Y / 100);
                                try {
                                    response_ticker = await axios.get('https://limitlex.com/api/public/ticker');
                                }
                                catch (error) {
                                    console.log('[ERROR][MEMBER][FETCH]: ', error);
                                    return;
                                }
                                response_ticker.data.result.map((item) => {
                                    if (item.pair_id == pair_id) {
                                        current_price = parseFloat(item.last_price);
                                    }
                                });
                                this.logger.log(current_price, "CURRENT PRICE");
                                if (trade_last_price > current_price) {
                                    console.log("arrive2");
                                    let bid_prices = bids.map((item) => {
                                        return parseFloat(item.price);
                                    });
                                    bid_prices.sort(function (a, b) { return b - a; });
                                    highest_bid_price = bid_prices[0];
                                    let highest_bid_id;
                                    bids.map((item) => {
                                        if (parseFloat(item.price) == highest_bid_price) {
                                            return highest_bid_id = item.order_id;
                                        }
                                    });
                                    let params_cancel_spec_order = {
                                        nonce: Date.now().toString(),
                                        pair_id: pair_id,
                                        order_id: highest_bid_id,
                                    };
                                    const cancelOrderUrlEncodedParams = new URLSearchParams(params_cancel_spec_order).toString();
                                    const cancelOrderMessageToSign = endpoint_cancel_order + cancelOrderUrlEncodedParams;
                                    const cancelOrderSignature = crypto.sign("sha512", Buffer.from(cancelOrderMessageToSign), PR_KEY_CANCEL_ORDER);
                                    const cancelOrderResponses = await node_fetch_1.default('https://limitlex.com/api' + endpoint_cancel_order, {
                                        method: 'POST',
                                        headers: {
                                            'API-Key': PB_KEY_CANCEL_ORDER,
                                            'API-Sign': cancelOrderSignature.toString('base64'),
                                        },
                                        body: cancelOrderUrlEncodedParams,
                                    });
                                    const cancelOrderJson = await cancelOrderResponses.json();
                                    console.log("cancelOrderJson: ", cancelOrderJson);
                                    let params_with_canceled_bid_price = {
                                        nonce: Date.now().toString(),
                                        pair_id: pair_id,
                                        order_direction: "ask",
                                        order_type: "limit",
                                        price: highest_bid_price,
                                        amount_1: bidAmount.toString(),
                                    };
                                    const addNewOrderUrlEncodedParams = new URLSearchParams(params_with_canceled_bid_price).toString();
                                    const addNewOrderMessageToSign = endpoint_add_order + addNewOrderUrlEncodedParams;
                                    const addNewOrderSignature = crypto.sign("sha512", Buffer.from(addNewOrderMessageToSign), PR_KEY_ADD_ORDER);
                                    const addNewOrderResponses = await node_fetch_1.default('https://limitlex.com/api' + endpoint_add_order, {
                                        method: 'POST',
                                        headers: {
                                            'API-Key': PB_KEY_ADD_ORDER,
                                            'API-Sign': addNewOrderSignature.toString('base64'),
                                        },
                                        body: addNewOrderUrlEncodedParams,
                                    });
                                    const addNewOrderJson = await addNewOrderResponses.json();
                                    console.log("addNewOrderJson:", addNewOrderJson);
                                    let ask_prices = asks.map((item) => {
                                        return parseFloat(item.price);
                                    });
                                    ask_prices.sort(function (a, b) { return a - b; });
                                    lowest_ask_price = ask_prices[0];
                                    let lowest_ask_amount;
                                    asks.map((item) => {
                                        if (parseFloat(item.price) == lowest_ask_price) {
                                            lowest_ask_amount = item.amount_initial;
                                        }
                                    });
                                    let params_cancel_ask_orders = {
                                        nonce: Date.now().toString(),
                                        pair_id: pair_id,
                                        direction: "ask",
                                    };
                                    const cancelAllOrderUrlEncodedParams = new URLSearchParams(params_cancel_ask_orders).toString();
                                    const cancelAllOrderMessageToSign = endpoint_cancel_orders + cancelAllOrderUrlEncodedParams;
                                    const cancelAllOrderSignature = crypto.sign("sha512", Buffer.from(cancelAllOrderMessageToSign), PR_KEY_CANCEL_ALL_ORDERS);
                                    const cancelAllOrderResponses = await node_fetch_1.default('https://limitlex.com/api' + endpoint_cancel_orders, {
                                        method: 'POST',
                                        headers: {
                                            'API-Key': PB_KEY_CANCEL_ALL_ORDERS,
                                            'API-Sign': cancelAllOrderSignature.toString('base64'),
                                        },
                                        body: cancelAllOrderUrlEncodedParams,
                                    });
                                    const cancelAllOrderJson = await cancelAllOrderResponses.json();
                                    console.log("cancelAllOrderJson: ", cancelAllOrderJson);
                                    let params_add_lowest_ask_order = {
                                        nonce: Date.now().toString(),
                                        pair_id: pair_id,
                                        order_direction: "buy",
                                        order_type: "limit",
                                        price: lowest_ask_price.toString(),
                                        amount_1: lowest_ask_amount,
                                    };
                                    const addLowestAskUrlEncodedParams = new URLSearchParams(params_add_lowest_ask_order).toString();
                                    const addLowestAskOrderMessageToSign = endpoint_add_order + addLowestAskUrlEncodedParams;
                                    const addLowestAskOrderSignature = crypto.sign("sha512", Buffer.from(addLowestAskOrderMessageToSign), PR_KEY_ADD_ORDER);
                                    const addLowestAskOrderResponses = await node_fetch_1.default('https://limitlex.com/api' + endpoint_add_order, {
                                        method: 'POST',
                                        headers: {
                                            'API-Key': PB_KEY_ADD_ORDER,
                                            'API-Sign': addLowestAskOrderSignature.toString('base64'),
                                        },
                                        body: addLowestAskUrlEncodedParams,
                                    });
                                    const addLowestAskOrderJson = await addLowestAskOrderResponses.json();
                                    console.log("addHighestBidOrderJson:", addLowestAskOrderJson);
                                    let params_add_bid_order = {
                                        nonce: Date.now().toString(),
                                        pair_id: pair_id,
                                        order_direction: "buy",
                                        order_type: "limit",
                                        price: buy_price,
                                        amount_1: bidAmount.toString(),
                                    };
                                    const addBidOrderUrlEncodedParams = new URLSearchParams(params_add_bid_order).toString();
                                    const addBidOrderMessageToSign = endpoint_add_order + addBidOrderUrlEncodedParams;
                                    const addBidOrderSignature = crypto.sign("sha512", Buffer.from(addBidOrderMessageToSign), PR_KEY_ADD_ORDER);
                                    const addBidOrderResponses = await node_fetch_1.default('https://limitlex.com/api' + endpoint_add_order, {
                                        method: 'POST',
                                        headers: {
                                            'API-Key': PB_KEY_ADD_ORDER,
                                            'API-Sign': addBidOrderSignature.toString('base64'),
                                        },
                                        body: addBidOrderUrlEncodedParams,
                                    });
                                    const addBidOrderJson = await addBidOrderResponses.json();
                                    trade_last_price = current_price;
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
                                    asks = orderJson.result.data.filter((item, index) => {
                                        if (item.order_direction == "sell") {
                                            return item;
                                        }
                                    });
                                    if (asks.length == 25) {
                                        is_ask_order_filled = true;
                                    }
                                }
                            }
                        }
                        else {
                            trade_last_price = current_price;
                        }
                    }
                }
                if (is_bid_order_filled == true) {
                    let highest_ask_price, highest_ask_amount;
                    console.log(asks);
                    let ask_prices = asks.map((item) => {
                        return parseFloat(item.price);
                    });
                    ask_prices.sort(function (a, b) { return b - a; });
                    highest_ask_price = ask_prices[0] * (1 - SUFFICIENT_PRICE_RATE / 100);
                    asks.map((item) => {
                        if (parseFloat(item.price) == highest_ask_price) {
                            highest_ask_amount = item.amount_initial;
                        }
                    });
                    let params_add_bid_order = {
                        nonce: Date.now().toString(),
                        pair_id: pair_id,
                        order_direction: "buy",
                        order_type: "limit",
                        price: highest_ask_price.toString(),
                        amount_1: highest_ask_amount,
                    };
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
                    this.logger.log('SUFFICIENT BID ORDER: ', addOrderJson);
                    is_bid_order_filled = false;
                }
                if (is_ask_order_filled == true) {
                    let lowest_bid_price, lowest_bid_amount;
                    let bid_prices = bids.map((item) => {
                        return parseFloat(item.price);
                    });
                    bid_prices.sort(function (a, b) { return a - b; });
                    lowest_bid_price = bid_prices[0] * (1 + SUFFICIENT_PRICE_RATE / 100);
                    bids.map((item) => {
                        if (parseFloat(item.price) == lowest_bid_price) {
                            let lowest_bid_amount = item.amount_initial;
                        }
                    });
                    let params_add_ask_order = {
                        nonce: Date.now().toString(),
                        pair_id: pair_id,
                        order_direction: "sell",
                        order_type: "limit",
                        price: lowest_bid_price.toString(),
                        amount_1: lowest_bid_amount
                    };
                    const addOrderUrlEncodedParams = new URLSearchParams(params_add_ask_order).toString();
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
                    console.log("SUFFICIENT ASK ORDER: ", addOrderJson);
                    is_ask_order_filled = false;
                }
                main_counter = main_counter + 1;
                dynamic_increase_counter = dynamic_increase_counter + 1;
                dynamic_decrease_counter = dynamic_decrease_counter + 1;
            }, 1000);
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