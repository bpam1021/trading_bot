import { Injectable, OnModuleInit, Logger } from '@nestjs/common'
import fetch from 'node-fetch';
// import { MeanReversionService } from '../mean-reversion/mean-reversion.service'
// import { LongShortService } from 'src/long-short/long-short.service'
import { ConfigService } from '@nestjs/config'
import PostsService from "../posts/posts.service";
// import * as crypto from 'crypto';
import { BotType } from './bot.types'
import fs from 'fs'
import { BADQUERY } from 'dns';
import { exit } from 'process';
const axios = require('axios').default;
// import { EnvironmentalVariables } from 'src/utils/constants'

@Injectable()
export class BotService implements OnModuleInit {
  private readonly logger = new Logger(BotService.name)
  constructor(
    private configService: ConfigService,
    private readonly postsService: PostsService
  ) {}

  onModuleInit(): void {
    this.logger.log(`Initializing ${BotService.name}`)
    this.run()
  }

  getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
 
  async run(): Promise<void> {
    
    this.logger.log('Initializing Trade Bot')
    
    const promBars = new Promise((resolve, reject) => {
      const barChecker = setInterval(async () => {
        
        let tradeparameter = await this.postsService.getPostById(1);
        
        if (tradeparameter.startflag == true) {
          this.logger.log('Trade Bot Time Count')

          ////get trade parameter from database
          let response;
          try {
            response = await axios.get('https://limitlex.com/api/public/currencies');
          } catch (error) {
            console.log('[ERROR][MEMBER][FETCH]: ', error);
          }
          // console.log(response.data);
          // this.logger.log(response.data);
          let fromid,toid;
          let cryptodata = response.data.result.data;
          cryptodata.map((item: any, index) => {
            if(item.code == "USDT")
              fromid = item.id;
            if(item.code == "XRP")
              toid = item.id;
          })
          try {
            response = await axios.get('https://limitlex.com/api/public/pairs');
          } catch (error) {
            console.log('[ERROR][MEMBER][FETCH]: ', error);
          }
          let pairdata = response.data.result.data;
          let pair_id = "";
          // this.logger.log(response.data);
          pairdata.map((item: any, index) => {
            if((item.currency_id_1 == fromid && item.currency_id_2 == toid) || (item.currency_id_1 == toid && item.currency_id_2 == fromid))
              pair_id = item.id;
          })


          const fs = require('fs');
          const fileKey = __dirname + '/private.pem';
          const orderPrKey = __dirname + '/orderPrKey.pem';
          const addOrderPrKey = __dirname + '/addOrderPrKey.pem';
          const cancelAllOrderPrKey = __dirname + '/cancelAllOrderPrKey.pem';

          let  KEY_TDEADE = fs.readFileSync(fileKey,  "utf8" );
          let  PR_KEY_ORDER = fs.readFileSync(orderPrKey,  "utf8" );
          let  PR_KEY_ADD_ORDER = fs.readFileSync(addOrderPrKey,  "utf8" );
          let  PR_KEY_CANCEL_ORDER = fs.readFileSync(cancelAllOrderPrKey,  "utf8" );

          const afileKey = __dirname + '/public.pem';
          const orderPbKey = __dirname + '/orderPbKey.pem';
          const addOrderPbKey = __dirname + '/addOrderPbKey.pem';
          const cancelAllOrderPbKey = __dirname + '/cancelAllOrderPbKey.pem';

          let  API_KEY_TRADE = fs.readFileSync(afileKey,  "utf8" );
          let  PB_KEY_ORDER = fs.readFileSync(orderPbKey,  "utf8" );
          let  PB_KEY_ADD_ORDER = fs.readFileSync(addOrderPbKey,  "utf8" );
          let  PB_KEY_CANCEL_ORDER = fs.readFileSync(cancelAllOrderPbKey,  "utf8" );

          // console.log(KEY_TDEADE);
          // console.log(API_KEY_TRADE);

          const crypto = require("crypto");
          const endpoint = '/private/trades';
          const endpoint_order = '/private/open_orders';
          const endpoint_add_order = '/private/add_order';
          const endpoint_cancel_all_orders = '/private/cancel_all_orders';

          const params = {
            nonce: Date.now().toString(),
            pair_id: pair_id,
          };

          // Here we are encoding params to application/x-www-form-urlencoded format
          // Using built-in URLSearchParams class
          
          const urlEncodedParams = new URLSearchParams(params).toString();
          // console.log(Buffer.from(API_SECRET).toString('base64'));
          // We concatenate api function with params string in order to create signature
          const messageToSign = endpoint + urlEncodedParams;
          // const messageToSign = endpoint;
          // Use built-in module 'crypto' to create ECDSA signature with SHA512
          const signature = crypto.sign("sha512", Buffer.from(messageToSign), KEY_TDEADE);
          
          const responses = await fetch('https://limitlex.com/api' + endpoint, {
            method: 'POST',
            headers: {
              'API-Key': API_KEY_TRADE, // Your public api-key
              'API-Sign': signature.toString('base64'), // Signature in base-64 format
            },
            body: urlEncodedParams, // Parameters in body of the request
          });
          // console.log(responses);
          // Done!

          //---------------------------------------------------------------------------------------------------------------GET ORDERS
          const params_order = {
            nonce: Date.now().toString(),
            pair_id: pair_id,
          };
          

          // Here we are encoding params to application/x-www-form-urlencoded format
          // Using built-in URLSearchParams class
          
          const orderUrlEncodedParams = new URLSearchParams(params_order).toString();
          // console.log(Buffer.from(API_SECRET).toString('base64'));
          // We concatenate api function with params string in order to create signature
          const orderMessageToSign = endpoint_order + orderUrlEncodedParams;
          // const messageToSign = endpoint;
          // Use built-in module 'crypto' to create ECDSA signature with SHA512
          const orderSignature = crypto.sign("sha512", Buffer.from(orderMessageToSign), PR_KEY_ORDER);
          
          const orderResponses = await fetch('https://limitlex.com/api' + endpoint_order, {
            method: 'POST',
            headers: {
              'API-Key': PB_KEY_ORDER, // Your public api-key
              'API-Sign': orderSignature.toString('base64'), // Signature in base-64 format
            },
            body: orderUrlEncodedParams, // Parameters in body of the request
          });
          const orderJson = await orderResponses.json();

          //------------------------------------------------------------------------------------------------------------------ADD ORDER "BID"
          
          let bids, asks, totalBid, totalAsk;

          bids = orderJson.result.data.filter((item: any, index) => {
            if (item.order_direction == "buy") {
              return item;
            }
          })
        
          asks = orderJson.result.data.filter((item: any, index) => {
            if (item.order_direction == "sell") {
              return item;
            }
          })
        
          totalBid = bids.length;
          totalAsk = asks.length;
          
        // console.log("Total bid: ",totalBid, "Total ask: ",totalAsk);

          let buy_price, buy_amount_1;
          if( totalBid == 0 ) {
            buy_price = tradeparameter.bidprice.toString();
            buy_amount_1 = tradeparameter.bidamount.toString();
          } else {
            buy_price = (bids[totalBid - 1].price * (1 - this.getRandom(tradeparameter.startbidprogres, tradeparameter.endbidprogress)/100)).toFixed(4);
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
          
          if( totalAsk == 0 ) {
            ask_price = tradeparameter.askprice.toString();
            ask_amount_1 = tradeparameter.askamount.toString();
          } else {
            ask_price = (asks[totalAsk - 1].price * (1 + this.getRandom(tradeparameter.startaskprogres, tradeparameter.endaskprogress)/100)).toFixed(4);
            ask_amount_1 = this.getRandom(5, tradeparameter.askamount).toFixed(6);
          }

        if(bids.length <= 25) {
            const addOrderUrlEncodedParams = new URLSearchParams(params_add_bid_order).toString();
            // console.log(Buffer.from(API_SECRET).toString('base64'));
            // We concatenate api function with params string in order to create signature
            const addOrderMessageToSign = endpoint_add_order + addOrderUrlEncodedParams;
            // const messageToSign = endpoint;
            // Use built-in module 'crypto' to create ECDSA signature with SHA512
            const addOrderSignature = crypto.sign("sha512", Buffer.from(addOrderMessageToSign), PR_KEY_ADD_ORDER);
            const addOrderResponses = await fetch('https://limitlex.com/api' + endpoint_add_order, {
              method: 'POST',
              headers: {
                'API-Key': PB_KEY_ADD_ORDER, // Your public api-key
                'API-Sign': addOrderSignature.toString('base64'), // Signature in base-64 format
              },
              body: addOrderUrlEncodedParams, // Parameters in body of the request
            });
            const addOrderJson = await addOrderResponses.json();
            console.log("addOrderJson:",addOrderJson);
          }

          let params_add_ask_order = {
            nonce: Date.now().toString(),
            pair_id: pair_id,
            order_direction: "sell",
            order_type: "limit",
            price: ask_price,
            amount_1: ask_amount_1
          };

          if(asks.length <= 25) {
            const addAskOrderUrlEncodedParams = new URLSearchParams(params_add_ask_order).toString();
            const addAskOrderMessageToSign = endpoint_add_order + addAskOrderUrlEncodedParams;
            const addAskOrderSignature = crypto.sign("sha512", Buffer.from(addAskOrderMessageToSign), PR_KEY_ADD_ORDER);
            const addAskOrderResponses = await fetch('https://limitlex.com/api' + endpoint_add_order, {
              method: 'POST',
              headers: {
                'API-Key': PB_KEY_ADD_ORDER, // Your public api-key
                'API-Sign': addAskOrderSignature.toString('base64'), // Signature in base-64 format
              },
              body: addAskOrderUrlEncodedParams, // Parameters in body of the request
            });
            const addAskOrderJson = await addAskOrderResponses.json();
            console.log("addAskOrderJson:",addAskOrderJson);
          }

          // const params_cancel_all_orders = {
          //   nonce: Date.now().toString(),
          //   pair_id: pair_id,
          // };

          // const cAOurlEncodedParams = new URLSearchParams(params_cancel_all_orders).toString();
          // const cAOmessageToSign = endpoint_cancel_all_orders + cAOurlEncodedParams;
          // const cAOsignature = crypto.sign("sha512", Buffer.from(cAOmessageToSign), PR_KEY_CANCEL_ORDER);
          // const cAOresponses = await fetch('https://limitlex.com/api' + endpoint_cancel_all_orders, {
          //   method: 'POST',
          //   headers: {
          //     'API-Key': PB_KEY_CANCEL_ORDER, // Your public api-key
          //     'API-Sign': cAOsignature.toString('base64'), // Signature in base-64 format
          //   },
          //   body: cAOurlEncodedParams, // Parameters in body of the request
          // });
        }
      }, 10000)
    })
  }
}
