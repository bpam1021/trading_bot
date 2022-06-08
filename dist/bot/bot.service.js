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
const config_1 = require("@nestjs/config");
const node_fetch_1 = require("node-fetch");
const axios = require('axios').default;
let BotService = BotService_1 = class BotService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(BotService_1.name);
    }
    onModuleInit() {
        this.logger.log(`Initializing ${BotService_1.name}`);
        this.run();
    }
    async run() {
        this.logger.log('Initializing Trade Bot');
        const promBars = new Promise((resolve, reject) => {
            const barChecker = setInterval(async () => {
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
                console.log(fromid);
                console.log(toid);
                try {
                    response = await axios.get('https://limitlex.com/api/public/pairs');
                }
                catch (error) {
                    console.log('[ERROR][MEMBER][FETCH]: ', error);
                }
                let pairdata = response.data.result.data;
                let pair_id = "";
                this.logger.log(response.data);
                pairdata.map((item, index) => {
                    if ((item.currency_id_1 == fromid && item.currency_id_2 == toid) || (item.currency_id_1 == toid && item.currency_id_2 == fromid))
                        pair_id = item.id;
                });
                const fs = require('fs');
                const fileKey = __dirname + '/private.pem';
                let API_SECRET = fs.readFileSync(fileKey, "utf8");
                const afileKey = __dirname + '/public.pem';
                let API_KEY = fs.readFileSync(afileKey, "utf8");
                console.log(API_SECRET);
                console.log(API_KEY);
                const crypto = require("crypto");
                const endpoint = '/private/trades';
                console.log("pair_id   :   ", pair_id);
                const params = {
                    nonce: Date.now().toString(),
                    pair_id: pair_id,
                };
                const urlEncodedParams = new URLSearchParams(params).toString();
                const messageToSign = endpoint + urlEncodedParams;
                const signature = crypto.sign("sha512", Buffer.from(messageToSign), API_SECRET);
                const responses = await node_fetch_1.default('https://limitlex.com/api' + endpoint, {
                    method: 'POST',
                    headers: {
                        'API-Key': API_KEY,
                        'API-Sign': signature.toString('base64'),
                    },
                    body: urlEncodedParams,
                });
                const json = await responses.json();
                console.log(json);
            }, 10000);
        });
    }
};
BotService = BotService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], BotService);
exports.BotService = BotService;
//# sourceMappingURL=bot.service.js.map