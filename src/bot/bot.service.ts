import { Injectable, OnModuleInit, Logger } from '@nestjs/common'
import fetch from 'node-fetch';
import { ConfigService } from '@nestjs/config'
import PostsService from "../posts/posts.service";
// import SharesService from "../shares/shares.service"
import { Console } from 'console';
const axios = require('axios').default;

@Injectable()
export default class BotService implements OnModuleInit {
  private readonly logger = new Logger(BotService.name)
  public orderlist : any
  constructor(
    private configService: ConfigService,
    private postsService: PostsService
  ) {}

  onModuleInit(): void {
    this.logger.log(`INITIALIZING ${BotService.name}`)
    this.run()
  }

  getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
 
  async run(): Promise<void> {
    
    this.logger.log('TRADING BOT SERVER IS INITIALIZED...');

    //------------------------------------------------------------------------------------------------------------ SET GLOBAL VARIABLES
    let firsttradeparameter: any = await this.postsService.getPostById(1);
    let dynamic_is_started = false;
    let bot_start_flag = false;
    let SUFFICIENT_PRICE_RATE = 0.5, dynamic_start_progress  = 10 ,dinamic_end_progress = 15 ,Y =200;
    let testcounter = 0;
    if (firsttradeparameter!=false)
    {
      SUFFICIENT_PRICE_RATE = firsttradeparameter.price_rate;
      dynamic_start_progress = firsttradeparameter.stime;
      dinamic_end_progress = firsttradeparameter.etime;
      Y = firsttradeparameter.ytime;
      dynamic_is_started = firsttradeparameter.startflag;
    } 
    let bids = [], asks = [], totalBid = 0, totalAsk = 0, bidAmount = 0, askAmount = 0, pair_id = "", buy_price = 0, ask_price = 0, pair_data,
        // trade_last_price = 0,
        main_counter = 0,
        dynamic_increase_counter = 0, 
        dynamic_decrease_counter = 0,
        is_ask_order_filled = false,
        is_bid_order_filled = false,
        rand_increase = Math.floor(this.getRandom(dynamic_start_progress, dinamic_end_progress)),
        rand_decrease = Math.floor(this.getRandom(dynamic_start_progress, dinamic_end_progress) * Y/100);

    //------------------------------------------------------------------------------------------------------- SET PRIVATE AND PUBLIC KEYS
    const fs = require('fs');
    // const fileKey = __dirname + '/private.pem';
    const orderPrKey = __dirname + '/orderPrKey.pem';
    const addOrderPrKey = __dirname + '/addOrderPrKey.pem';
    const cancelAllOrderPrKey = __dirname + '/cancelAllOrderPrKey.pem';

    let  KEY_TDEADE = "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgbhZPblby4fbFQETU\nkBZCXndUD5jDVi5EitmzLWrwfxuhRANCAASqoelOmrbPRneq5O1lcj6BalLiDpq4\nUfWX5BrxhSC5e4KqknQG2ii21oSSKrdAwVhkutKWPNdaQvOfXuWs+Ih9\n-----END PRIVATE KEY-----";
    let  PR_KEY_ORDER ="-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgRlOk122yZUclC2dr\nxqYV7c2npZj+2tvxwprCNkRWKlKhRANCAAQy3Cn0h7BEsflowwy4tz3qex6Jfxlb\nH/xNMqPrjsa3PrFKoWWzymKkl9xr+ceECflRVVd918V+HaSPhLCUdnT0\n-----END PRIVATE KEY-----";
    let  PR_KEY_ADD_ORDER = "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgNBWsoxQPHZOguIMR\nmPF7+SY60sd8yPBG6jaxAF+1WMihRANCAATy8CH2yMQG3TdbYwlLUnPtCv5qI8sN\nqD9AWdPuCHqih+Mdjxe8GNRb4yjS3sff5FYSVx9Ws+QP8ugjZJtKdGu9\n-----END PRIVATE KEY-----";
    let  PR_KEY_CANCEL_ORDER = "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgVfDhXnv9eSUd/WRx\nHwSJwJAAMZyLE27BWosGgcwa2xuhRANCAAS3V2gWQCLprSXq/iVaeDxfB6/W18vA\nBbe4QfqyMk1iPpJqeKd4Wepx8lr+F76YEK3Y68DGomU4fO0YreReKABu\n-----END PRIVATE KEY-----";
    let  PR_KEY_CANCEL_ALL_ORDERS = "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQge6YxbEYJ+q2L3O8r\ncdHRTxjAECydrsY64784MX4uKA+hRANCAARYTjl1j0e4BtM+6HdrgP6hI7+08eZk\nSPcHoe3WBBSjUkgZQ9fJ6DCdsCqwYXSK50HHTEvyv+15OnD5LUQ2QSLi\n-----END PRIVATE KEY-----";
    let  PR_KEY_BALANCE = "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgq703ua7sguhvupkL\nIxlIy8kcKDa31h6bdeT8yOt/unGhRANCAARGP3kcYVh/PeSw7XmDGxpyP+QR9n4R\ndbpJugACGs2pCtdI1Y2hNa95IePZAYpFcZzAENQWoF5lgWPsl0Tw00x7\n-----END PRIVATE KEY-----";

    const afileKey = __dirname + '/public.pem';
    const orderPbKey = __dirname + '/orderPbKey.pem';
    const addOrderPbKey = __dirname + '/addOrderPbKey.pem';
    const cancelAllOrderPbKey = __dirname + '/cancelAllOrderPbKey.pem';

    let  API_KEY_TRADE = '3f4cb8f1-aa2f-48aa-bba6-dc50a370cfcf'
    let  PB_KEY_ORDER = 'ae45a8fc-d7fa-4e7c-acde-74a35f54e751';
    let  PB_KEY_ADD_ORDER = 'bb379fb9-8d64-4414-9387-edeaec1ad067';
    let  PB_KEY_CANCEL_ORDER = 'e257b01c-3c16-45e8-a046-962c7dcdd3ff';
    let  PB_KEY_CANCEL_ALL_ORDERS = '6344b106-3976-4b9f-8bfc-2513e89ed3e3';
    let  PB_KEY_BALANCE = "ea33d81d-2df5-44c8-8a60-0e221b76d4a8";

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

        testcounter = testcounter + 1;
        
        this.logger.log('Trade Bot Time Count');

        // if(main_counter >= 10) { testDynamic = true; }
        
        let tradeparameter: any = await this.postsService.getPostById(1);
        
          //------------------------------------------------------------------------------------------------------------ GET TRADING STATUS
          if (tradeparameter!=false && tradeparameter.botstartflag == true) {
            bot_start_flag = tradeparameter.botstartflag;
            dynamic_is_started = tradeparameter.startflag;
            SUFFICIENT_PRICE_RATE = tradeparameter.price_rate;
            dynamic_start_progress = tradeparameter.stime;
            dinamic_end_progress = tradeparameter.etime;
            Y = tradeparameter.ytime;
            
            do {
        
              //----------------------------------------------------------------------------------------- GET TRADE PARAMETER FROM DATABASE
              if( main_counter>=3 || dynamic_increase_counter >=rand_increase || dynamic_decrease_counter >= rand_decrease ) {
                let response;
                try {
                  response = await axios.get('https://limitlex.com/api/public/currencies');
                } 
                catch (error) {
                  console.log('[ERROR][MEMBER][FETCH]: ', error);
                }
                let point_error = response.data.error
              // console.log("response= ", response.data.error);

              //------------------------------------------------------------ If the point is run out, then bot will immediately be sleeping
              
              if ( point_error != undefined && response.data.error.message == "rate limit exceeded") {

                bot_start_flag = false;
                await setTimeout(botSleeping, 120000);

                function botSleeping() {
                  bot_start_flag = true;
                }
                continue;
              }
              
              // ----------------------------------------------------------------------------------------------------------------- GET PAIR_ID
                cryptodata = response.data.result.data; 
                
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
                pairdata = response.data.result.data;

                pairdata.map((item: any, index) => {
                  if((item.currency_id_1 == fromid && item.currency_id_2 == toid) || (item.currency_id_1 == toid && item.currency_id_2 == fromid))
                  {
                    pair_id = item.id;
                    pair_data = item;
                  }
                })
              }

              //############################################################################################# REGULAR ORDERING SET INTERVAL
              
              if (main_counter >= 3) {
                main_counter = 0;
                //---------------------------------------------------------------------------------------------------------- GET TRADE DATA
                
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
                const tjson = await responses.json();
                // console.log(tjson);
                // Done!

                //----------------------------------------------------------------------------------------------------------ADD ORDER "BID"
                let params_add_bid_order;
                
                if( ask_price != 0 && askAmount != 0 ) {
                    params_add_bid_order = {
                    nonce: Date.now().toString(),
                    pair_id: pair_id,
                    order_direction: "buy",
                    order_type: "limit",
                    price: buy_price,
                    amount_1: bidAmount.toString(),
                  };
                }

                if(bids.length < 25) {
                  const addOrderUrlEncodedParams = new URLSearchParams(params_add_bid_order).toString();
                  const addOrderMessageToSign = endpoint_add_order + addOrderUrlEncodedParams;
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
                  
                  // console.log('BID ORDER: ', addOrderJson);
                }

                //----------------------------------------------------------------------------------------------------------ADD ORDER "ASK"
                let params_add_ask_order;
                
                if( buy_price != 0 && bidAmount != 0 ) {
                    params_add_ask_order = {
                    nonce: Date.now().toString(),
                    pair_id: pair_id,
                    order_direction: "sell",
                    order_type: "limit",
                    price: ask_price,
                    amount_1: askAmount.toString(),
                  };
                }

                if(asks.length < 25) {
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
                  // console.log('ASK ORDER: ', addAskOrderJson);
                }

                //-------------------------------------------------------------------------------------------------------------- GET ORDERS
                const params_order = {
                  nonce: Date.now().toString(),
                  pair_id: pair_id,
                };
                
                const orderUrlEncodedParams = new URLSearchParams(params_order).toString();
                const orderMessageToSign = endpoint_order + orderUrlEncodedParams;
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
                this.orderlist = orderJson;
                // console.log("orderJson= ", orderJson);
                
                // ------------------------------------------------------------------------------------------------------ Write on Database
                // Get all IDs of order in DB
                let orders = orderJson.result.data;
                this.postsService.updatePost(1, {"orders": JSON.stringify(orders)});
                
                // orders.map(async (item: any, index)=> {
                //   await this.sharesService.createShares(item);
                // });

                //------------------------------------------------------------------------------- SET CONDITION RELATIVE "PRICE" & "AMOUNT" 

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
    console.log("totalBid=", totalBid);
    console.log("totalAsk=", totalAsk);

                //---------------------------------------------------------------------------------------------------------------- GET BALANCE
                const params_balance = {
                  nonce: Date.now().toString(),
                  pair_id: pair_id,
                };

                const balanceUrlEncodedParams = new URLSearchParams(params_balance).toString();
                const balanceMessageToSign = endpoint_balance + balanceUrlEncodedParams;
                // Use built-in module 'crypto' to create ECDSA signature with SHA512
                const balanceSignature = crypto.sign("sha512", Buffer.from(balanceMessageToSign), PR_KEY_BALANCE);
                
                const balanceResponses = await fetch('https://limitlex.com/api' + endpoint_balance, {
                  method: 'POST',
                  headers: {
                    'API-Key': PB_KEY_BALANCE, // Your public api-key
                    'API-Sign': balanceSignature.toString('base64'), // Signature in base-64 format
                  },
                  body: balanceUrlEncodedParams, // Parameters in body of the request
                });
                const balanceJson = await balanceResponses.json();

                if( totalBid == 0 ) {
                  buy_price = tradeparameter.bidprice.toString();
                  bidAmount = tradeparameter.bidamount;
                } else {
                  buy_price = parseFloat((bids[totalBid - 1].price * (1 - this.getRandom(tradeparameter.startbidprogres, tradeparameter.endbidprogress)/100)).toFixed(4));
                  balanceJson.result.data.map((item: any) => {
                    if(item.currency_id == fromid) {
                      let amount_available_bid = parseFloat(item.amount_available) * this.getRandom(2, 7)/100;
                      let temp = amount_available_bid/buy_price;
                      bidAmount = parseFloat(temp.toFixed(pair_data.decimals));
                    }
                  });
                }
                
                if( totalAsk == 0 ) {
                  ask_price = tradeparameter.askprice.toString();
                  askAmount = tradeparameter.askamount;
                } else {
                  ask_price = parseFloat((asks[totalAsk - 1].price * (1 + this.getRandom(tradeparameter.startaskprogres, tradeparameter.endaskprogress)/100)).toFixed(4));
                  balanceJson.result.data.map((item: any) => {
                    if(item.currency_id == toid) {
                      let amount_available_ask = parseFloat(item.amount_available) * this.getRandom(2, 7)/100;
                      askAmount = parseFloat(amount_available_ask.toFixed(pair_data.decimals));
                    }
                  })
                }

                if( totalBid >=25 ) { is_bid_order_filled = true; }
                if( totalAsk >=25 ) { is_ask_order_filled = true; }
                
                // this.logger.log(ask_price,'ASK PRICE');
                // this.logger.log(buy_price,'BID PRICE');
                // this.logger.log(bidAmount.toString(),'ASK AMOUNT');
                // this.logger.log(askAmount.toString(),'BID AMOUNT');

              }

              //########################################################################################################## DYNAMIC ORDERING
              let response_ticker, current_price, lowest_ask_price, highest_bid_price;
              // if(dynamic_is_started == true && ( dynamic_increase_counter >=rand_increase || dynamic_decrease_counter >= rand_decrease))
              // {
              //   //------------------------------------------------------------------------------------------------------- GET "LAST PRICE"
              //   try {
              //     response_ticker = await axios.get('https://limitlex.com/api/public/ticker');
              //   } catch (error) {
              //     console.log('[ERROR][MEMBER][FETCH]: ', error);
              //   }
              //   response_ticker.data.result.map((item: any) => {
              //     if(item.pair_id == pair_id) {
              //       current_price = parseFloat(item.last_price);
              //     }
              //   });
              //   this.logger.log(current_price,"CURRENT PRICE");
              // }

              console.log("dynamic flag= ",dynamic_is_started);
              console.log("test counter= ",testcounter);
              console.log("dynamic_decrease_counter= ",dynamic_decrease_counter);
              console.log("rand decrease= ",rand_decrease);

              if( dynamic_is_started == true ) {
                if( dynamic_increase_counter >= rand_increase ) {

                  dynamic_increase_counter = 0;
                  rand_increase = Math.floor(this.getRandom(dynamic_start_progress, dinamic_end_progress));
                  //----------------------------------------------------------------------------------------------------- GET "LAST PRICE"
                  // try {
                  //   response_ticker = await axios.get('https://limitlex.com/api/public/ticker');
                  // } catch (error) {
                  //   return;
                  //   console.log('[ERROR][MEMBER][FETCH]: ', error);
                  // }
                  // response_ticker.data.result.map((item: any) => {
                  //   if(item.pair_id == pair_id) {
                  //     current_price = parseFloat(item.last_price);
                  //   }
                  // });
                  
                  // this.logger.log(current_price,"CURRENT PRICE");
                  // this.logger.log(trade_last_price,"LAST PRICE");
                  //------------------------------------------------------------------------------------ ACTION ON INCREASE "MARKET PRICE"
                  // if( trade_last_price < current_price ) {
                  // if( testDynamic == true ) {

                    console.log("arrive1");
                    //-------------------------------------------------------------------------------------------------- CANCEL LOWEST ASK
                    
                    // SEEK OUT THE ORDER_ID OF LOWEST ASK PRICE
                    let ask_prices = asks.map((item: any) => {
                      return parseFloat(item.price);
                    });
                    
                    ask_prices.sort(function(a, b){return a-b});
                    lowest_ask_price = ask_prices[0];
                    // console.log("important!!!!!");
                    // console.log("lowest_ask_price= ", lowest_ask_price);
                    // console.log("ask_prices= ",ask_prices);
                    
                    let lowest_ask_id;
                    asks.map((item: any) => {
                      if( parseFloat(item.price) == lowest_ask_price ){
                        return lowest_ask_id = item.order_id;
                      }
                    });

                    // CANCEL THE ASK ORDER ON THE LOWEST PRICE
                    let params_cancel_spec_orders = {
                      nonce: Date.now().toString(),
                      pair_id: pair_id,
                      order_id: lowest_ask_id,
                    };
          
                    const cancelOrderUrlEncodedParams = new URLSearchParams(params_cancel_spec_orders).toString();
                    const cancelOrderMessageToSign = endpoint_cancel_order + cancelOrderUrlEncodedParams;
                    const cancelOrderSignature = crypto.sign("sha512", Buffer.from(cancelOrderMessageToSign), PR_KEY_CANCEL_ORDER);
                    const cancelOrderResponses = await fetch('https://limitlex.com/api' + endpoint_cancel_order, {
                      method: 'POST',
                      headers: {
                        'API-Key': PB_KEY_CANCEL_ORDER, // Your public api-key
                        'API-Sign': cancelOrderSignature.toString('base64'), // Signature in base-64 format
                      },
                      body: cancelOrderUrlEncodedParams, // Parameters in body of the request
                    });
                    const cancelOrderJson = await cancelOrderResponses.json();

                    // console.log("cancelOrderJson!!! : ",cancelOrderJson);

                    //------------------------------------------------------------------------------------------ Remove canceled ask on DB

                    
                    // console.log("addNewOrderJson:",addNewOrderJson);

                    //--------------------------------------------------------------------------------- CANCEL ALL BIDS EXCEPT HIGHEST BID
                    // SEEK OUT THE ORDER_ID, PRICE, AMOUNT OF HIGHEST BID PRICE
                    // let bid_prices = bids.map((item: any) => {
                    //   return parseFloat(item.price);
                    // });
                    
                    // bid_prices.sort(function(a, b){return b-a});
                    // highest_bid_price = bid_prices[0];

                    // let highest_bid_amount;
                    // bids.map((item: any) => {
                    //   if( parseFloat(item.price) == highest_bid_price ){
                    //       highest_bid_amount = item.amount_initial;
                    //   }
                    // });
                    // console.log("highest!!!!");
                    // console.log(highest_bid_price);
                    // console.log(highest_bid_amount);

                    // CANCEL ALL BID ORDERS
                    for (const item of bids) {

                      let params_cancel_spec_orders = {
                        nonce: Date.now().toString(),
                        pair_id: pair_id,
                        order_id: item.order_id,
                      };
            
                      const cancelOrderUrlEncodedParams = new URLSearchParams(params_cancel_spec_orders).toString();
                      const cancelOrderMessageToSign = endpoint_cancel_order + cancelOrderUrlEncodedParams;
                      const cancelOrderSignature = crypto.sign("sha512", Buffer.from(cancelOrderMessageToSign), PR_KEY_CANCEL_ORDER);
                      const cancelOrderResponses = await fetch('https://limitlex.com/api' + endpoint_cancel_order, {
                        method: 'POST',
                        headers: {
                          'API-Key': PB_KEY_CANCEL_ORDER, // Your public api-key
                          'API-Sign': cancelOrderSignature.toString('base64'), // Signature in base-64 format
                        },
                        body: cancelOrderUrlEncodedParams, // Parameters in body of the request
                      });
                      const cancelOrderJson = await cancelOrderResponses.json();
      
                      console.log("cancelOrderJson!!! : ",cancelOrderJson);
                    }
                    

                    // let params_cancel_bid_orders = {
                    //   nonce: Date.now().toString(),
                    //   pair_id: pair_id,
                    //   direction: 'buy'
                    // };

                    // console.log("cancel all buy!!!!");
                    // console.log(params_cancel_bid_orders);
                    // const cancelAllOrderUrlEncodedParams = new URLSearchParams(params_cancel_bid_orders).toString();
                    // const cancelAllOrderMessageToSign = endpoint_cancel_orders + cancelAllOrderUrlEncodedParams;
                    // const cancelAllOrderSignature = crypto.sign("sha512", Buffer.from(cancelAllOrderMessageToSign), PR_KEY_CANCEL_ALL_ORDERS);
                    // const cancelAllOrderResponses = await fetch('https://limitlex.com/api' + endpoint_cancel_orders, {
                    //   method: 'POST',
                    //   headers: {
                    //     'API-Key': PB_KEY_CANCEL_ALL_ORDERS, // Your public api-key
                    //     'API-Sign': cancelAllOrderSignature.toString('base64'), // Signature in base-64 format
                    //   },
                    //   body: cancelAllOrderUrlEncodedParams, // Parameters in body of the request
                    // });

                    // console.log("cancelAllOrderResponses= ",cancelAllOrderResponses.headers);
                    // const cancelAllOrderJson = await cancelAllOrderResponses.json();
                    // console.log("cancelAllOrderJson!!!: ",cancelAllOrderJson);

                    // ADD A NEW BID WITH HIGHEST PRICE AND AMOUNT
                    //----------------------------------------------------------------------- ADD A NEW BID WITH THE PRICE OF CANCELED ASK
                    let params_with_canceled_ask_price = {
                      nonce: Date.now().toString(),
                      pair_id: pair_id,
                      order_direction: "buy",
                      order_type: "limit",
                      price: lowest_ask_price,
                      amount_1: bidAmount.toString(),
                    };
                    // console.log("A NEW BID!!!!!");
                    // console.log(params_with_canceled_ask_price);
                    const addNewOrderUrlEncodedParams = new URLSearchParams(params_with_canceled_ask_price).toString();
                    const addNewOrderMessageToSign = endpoint_add_order + addNewOrderUrlEncodedParams;
                    const addNewOrderSignature = crypto.sign("sha512", Buffer.from(addNewOrderMessageToSign), PR_KEY_ADD_ORDER);
                    const addNewOrderResponses = await fetch('https://limitlex.com/api' + endpoint_add_order, {
                      method: 'POST',
                      headers: {
                        'API-Key': PB_KEY_ADD_ORDER, // Your public api-key
                        'API-Sign': addNewOrderSignature.toString('base64'), // Signature in base-64 format
                      },
                      body: addNewOrderUrlEncodedParams, // Parameters in body of the request
                    });

                    // const addNewOrderJson = await addNewOrderResponses.json();
                    // console.log("addNewOrderJson!!!: ",addNewOrderJson);
                    // console.log("addHighestBidOrderJson:",addHighestBidOrderJson);

                    // ADD A NEW ASK WITH REGULAR PRICE AND AMOUNT
                    // let params_add_ask_order = {
                    //   nonce: Date.now().toString(),
                    //   pair_id: pair_id,
                    //   order_direction: "sell",
                    //   order_type: "limit",
                    //   price: ask_price.toString(),
                    //   amount_1: askAmount.toString(),
                    // };

                    // const addAskOrderUrlEncodedParams = new URLSearchParams(params_add_ask_order).toString();
                    // const addAskOrderMessageToSign = endpoint_add_order + addAskOrderUrlEncodedParams;
                    // const addAskOrderSignature = crypto.sign("sha512", Buffer.from(addAskOrderMessageToSign), PR_KEY_ADD_ORDER);
                    // const addAskOrderResponses = await fetch('https://limitlex.com/api' + endpoint_add_order, {
                    //   method: 'POST',
                    //   headers: {
                    //     'API-Key': PB_KEY_ADD_ORDER, // Your public api-key
                    //     'API-Sign': addAskOrderSignature.toString('base64'), // Signature in base-64 format
                    //   },
                    //   body: addAskOrderUrlEncodedParams, // Parameters in body of the request
                    // });
                    // const addAskOrderJson = await addAskOrderResponses.json();
                    // console.log("addAskOrderJson:", addAskOrderJson);

                    

                  

                  // trade_last_price = current_price;
                  //-------------------------------------------------------------------------------------------RECHECK FULL FILLED ORDERS
                  // const params_order = {
                  //   nonce: Date.now().toString(),
                  //   pair_id: pair_id,
                  // };
                  
                  // const orderUrlEncodedParams = new URLSearchParams(params_order).toString();
                  // const orderMessageToSign = endpoint_order + orderUrlEncodedParams;
                  // const orderSignature = crypto.sign("sha512", Buffer.from(orderMessageToSign), PR_KEY_ORDER);
                  
                  // const orderResponses = await fetch('https://limitlex.com/api' + endpoint_order, {
                  //   method: 'POST',
                  //   headers: {
                  //     'API-Key': PB_KEY_ORDER, // Your public api-key
                  //     'API-Sign': orderSignature.toString('base64'), // Signature in base-64 format
                  //   },
                  //   body: orderUrlEncodedParams, // Parameters in body of the request
                  // });
                  // const orderJson = await orderResponses.json();
                  // this.orderlist = orderJson;
                  // bids = orderJson.result.data.filter((item: any, index) => {
                  //   if (item.order_direction == "buy") {
                  //     return item;
                  //   }
                  // })

                  // if( bids.length >= 25 ) { is_bid_order_filled = true; }

                }
                if( dynamic_decrease_counter >= rand_decrease ) {

                  dynamic_decrease_counter = 0;
                  rand_decrease = Math.floor(this.getRandom(dynamic_start_progress, dinamic_end_progress) * Y/100);
                  //----------------------------------------------------------------------------------- ACTION ON DECREASE "MARKET PRICE"
                  //---------------------------------------------------------------------------------------------------- GET "LAST PRICE"
                  // try {
                  //   response_ticker = await axios.get('https://limitlex.com/api/public/ticker');
                  // } catch (error) {                    
                  //   console.log('[ERROR][MEMBER][FETCH]: ', error);
                  //   return;
                  // }
                  // response_ticker.data.result.map((item: any) => {
                  //   if(item.pair_id == pair_id) {
                  //     current_price = parseFloat(item.last_price);
                  //   }
                  // });
                  // if(testcounter >=30)
                  // {
                  //   testcounter = 0;
                  //   current_price = 0.3;
                  // }
                  // this.logger.log(current_price,"CURRENT PRICE");
                  // if( trade_last_price > current_price ) { 
                    console.log("arrive2");
                    //------------------------------------------------------------------------------------------------ CANCEL HIGHEST BID
                    // SEEK OUT THE ORDER_ID OF HIGHEST BID PRICE
                    let bid_prices = bids.map((item: any) => {
                      return parseFloat(item.price);
                    });
      
                    bid_prices.sort(function(a, b){return b-a});
                    highest_bid_price = bid_prices[0];

    console.log("bid_prices===================", bid_prices);    
    console.log("Highest bid_prices===================", highest_bid_price);                 
                    let highest_bid_id;
                    bids.map((item: any) => {
                      if( parseFloat(item.price) == highest_bid_price ){
                        return highest_bid_id = item.order_id;
                      }
                    });
                      
                    // CANCEL THE BID ORDER ON THE HIGHEST PRICE
                    let params_cancel_spec_order = {
                      nonce: Date.now().toString(),
                      pair_id: pair_id,
                      order_id: highest_bid_id,
                    };
          
                    const cancelOrderUrlEncodedParams = new URLSearchParams(params_cancel_spec_order).toString();
                    const cancelOrderMessageToSign = endpoint_cancel_order + cancelOrderUrlEncodedParams;
                    const cancelOrderSignature = crypto.sign("sha512", Buffer.from(cancelOrderMessageToSign), PR_KEY_CANCEL_ORDER);
                    const cancelOrderResponses = await fetch('https://limitlex.com/api' + endpoint_cancel_order, {
                      method: 'POST',
                      headers: {
                        'API-Key': PB_KEY_CANCEL_ORDER, // Your public api-key
                        'API-Sign': cancelOrderSignature.toString('base64'), // Signature in base-64 format
                      },
                      body: cancelOrderUrlEncodedParams, // Parameters in body of the request
                    });
                    const cancelOrderJson = await cancelOrderResponses.json();
                    console.log("cancelOrderJson: ",cancelOrderJson);
      
                    
                    // console.log("addNewOrderJson:",addNewOrderJson);
      
                    //--------------------------------------------------------------------------------- CLOSE ALL ASKS EXCEPT LOWEST ASK
                    // SEEK OUT THE ORDER_ID, PRICE, AMOUNT OF LOWEST ASK PRICE
                    // let ask_prices = asks.map((item: any) => {
                    //   return parseFloat(item.price);
                    // });
                    
                    // ask_prices.sort(function(a, b){return a-b});
                    // lowest_ask_price = ask_prices[0];
      
                    // let lowest_ask_amount;
                    // asks.map((item: any) => {
                    //   if( parseFloat(item.price) == lowest_ask_price ){
                    //       lowest_ask_amount = item.amount_initial;
                    //   }
                    // });
                    // console.log("low ask");
                    // console.log(lowest_ask_amount);
                    // console.log(lowest_ask_price);


                    // CANCEL ALL ASK ORDERS
                    for (const item of asks) {

                      let params_cancel_spec_orders = {
                        nonce: Date.now().toString(),
                        pair_id: pair_id,
                        order_id: item.order_id,
                      };

                      const cancelOrderUrlEncodedParams = new URLSearchParams(params_cancel_spec_orders).toString();
                      const cancelOrderMessageToSign = endpoint_cancel_order + cancelOrderUrlEncodedParams;
                      const cancelOrderSignature = crypto.sign("sha512", Buffer.from(cancelOrderMessageToSign), PR_KEY_CANCEL_ORDER);
                      const cancelOrderResponses = await fetch('https://limitlex.com/api' + endpoint_cancel_order, {
                        method: 'POST',
                        headers: {
                          'API-Key': PB_KEY_CANCEL_ORDER, // Your public api-key
                          'API-Sign': cancelOrderSignature.toString('base64'), // Signature in base-64 format
                        },
                        body: cancelOrderUrlEncodedParams, // Parameters in body of the request
                      });
                      const cancelOrderJson = await cancelOrderResponses.json();

                      console.log("cancelOrderJson!!! : ",cancelOrderJson);
                    }



                    // CANCEL ALL ASK ORDERS
                    // let params_cancel_ask_orders = {
                    //   nonce: Date.now().toString(),
                    //   pair_id: pair_id,
                    //   direction: "sell",
                    // };
          
                    // const cancelAllOrderUrlEncodedParams = new URLSearchParams(params_cancel_ask_orders).toString();
                    // const cancelAllOrderMessageToSign = endpoint_cancel_orders + cancelAllOrderUrlEncodedParams;
                    // const cancelAllOrderSignature = crypto.sign("sha512", Buffer.from(cancelAllOrderMessageToSign), PR_KEY_CANCEL_ALL_ORDERS);
                    // const cancelAllOrderResponses = await fetch('https://limitlex.com/api' + endpoint_cancel_orders, {
                    //   method: 'POST',
                    //   headers: {
                    //     'API-Key': PB_KEY_CANCEL_ALL_ORDERS, // Your public api-key
                    //     'API-Sign': cancelAllOrderSignature.toString('base64'), // Signature in base-64 format
                    //   },
                    //   body: cancelAllOrderUrlEncodedParams, // Parameters in body of the request
                    // });
                    // const cancelAllOrderJson = await cancelAllOrderResponses.json();
                    // // console.log("cancelAllOrderJson: ",cancelAllOrderJson);
      
                    // //------------------------------------------------------------------------ ADD A NEW ASK WITH THE PRIC OF HIGHEST BID
                    let params_with_canceled_bid_price = {
                      nonce: Date.now().toString(),
                      pair_id: pair_id,
                      order_direction: "sell",
                      order_type: "limit",
                      price: highest_bid_price,
                      amount_1: askAmount.toString(),
                    };
                    const addNewOrderUrlEncodedParams = new URLSearchParams(params_with_canceled_bid_price).toString();
                    const addNewOrderMessageToSign = endpoint_add_order + addNewOrderUrlEncodedParams;
                    const addNewOrderSignature = crypto.sign("sha512", Buffer.from(addNewOrderMessageToSign), PR_KEY_ADD_ORDER);
                    const addNewOrderResponses = await fetch('https://limitlex.com/api' + endpoint_add_order, {
                      method: 'POST',
                      headers: {
                        'API-Key': PB_KEY_ADD_ORDER, // Your public api-key
                        'API-Sign': addNewOrderSignature.toString('base64'), // Signature in base-64 format
                      },
                      body: addNewOrderUrlEncodedParams, // Parameters in body of the request
                    });
                    const addNewOrderJson = await addNewOrderResponses.json();
                    console.log("addHighestBidOrderJson:",addNewOrderJson);
      
















                    // ADD A NEW BID WITH REGULAR PRICE AND AMOUNT
                    // let params_add_bid_order = {
                    //   nonce: Date.now().toString(),
                    //   pair_id: pair_id,
                    //   order_direction: "buy",
                    //   order_type: "limit",
                    //   price: buy_price.toString(),
                    //   amount_1: bidAmount.toString(),
                    // };
      
                    // const addBidOrderUrlEncodedParams = new URLSearchParams(params_add_bid_order).toString();
                    // const addBidOrderMessageToSign = endpoint_add_order + addBidOrderUrlEncodedParams;
                    // const addBidOrderSignature = crypto.sign("sha512", Buffer.from(addBidOrderMessageToSign), PR_KEY_ADD_ORDER);
                    // const addBidOrderResponses = await fetch('https://limitlex.com/api' + endpoint_add_order, {
                    //   method: 'POST',
                    //   headers: {
                    //     'API-Key': PB_KEY_ADD_ORDER, // Your public api-key
                    //     'API-Sign': addBidOrderSignature.toString('base64'), // Signature in base-64 format
                    //   },
                    //   body: addBidOrderUrlEncodedParams, // Parameters in body of the request
                    // });
                    // const addBidOrderJson = await addBidOrderResponses.json();
                    // console.log("addBidOrderJson:", addBidOrderJson);
                    
                    // SET LAST_PRICE BY CURRENT_PRICE
                    // trade_last_price = current_price;
                    
                    // //-------------------------------------------------------------------------------------------RECHECK FULL FILLED ORDERS
                    // const params_order = {
                    //   nonce: Date.now().toString(),
                    //   pair_id: pair_id,
                    // };
      
                    // const orderUrlEncodedParams = new URLSearchParams(params_order).toString();
                    // const orderMessageToSign = endpoint_order + orderUrlEncodedParams;
                    // const orderSignature = crypto.sign("sha512", Buffer.from(orderMessageToSign), PR_KEY_ORDER);
      
                    // const orderResponses = await fetch('https://limitlex.com/api' + endpoint_order, {
                    //   method: 'POST',
                    //   headers: {
                    //     'API-Key': PB_KEY_ORDER, // Your public api-key
                    //     'API-Sign': orderSignature.toString('base64'), // Signature in base-64 format
                    //   },
                    //   body: orderUrlEncodedParams, // Parameters in body of the request
                    // });
                    // const orderJson = await orderResponses.json();
                    // this.orderlist = orderJson;
                    // asks = orderJson.result.data.filter((item: any, index) => {
                    //   if (item.order_direction == "sell") {
                    //     return item;
                    //   }
                    // })
      
                    // if( asks.length >=25 ) { is_ask_order_filled = true; }
      
                  
                  // trade_last_price = current_price;
                  
                }
              } 
            
              //######################################################################################################## FULL FILLED ORDERING

              //------------------------------------------------------------------------------------------------------- BID ORDER FULL FILLED 

              if(is_bid_order_filled == true && totalBid < 25) {

                // SEEK OUT THE ORDER_ID OF LATEST "BID"
                let sufficient_ask_price, last_bid_amount;
                let bid_dates = bids.map((item: any) => {
                  return parseFloat(item.date_created);
                });
                bid_dates.sort(function(a, b){return b-a});
                let last_bid_date = bid_dates[0];
                let last_bid;
                bids.map((item: any) => {
                  if(item.date_created == last_bid_date) {
                    last_bid =  item;
                  }
                });
                sufficient_ask_price = (parseFloat(last_bid.price) * ( 1 + SUFFICIENT_PRICE_RATE/100)).toFixed(4);
                last_bid_amount = last_bid.amount_initial;
              
              //--------------------------------------------------------------------------------------------------- ADD A SUPPLEMENTAL ORDER
              
                let params_add_ask_order = {
                  nonce: Date.now().toString(),
                  pair_id: pair_id,
                  order_direction: "sell",
                  order_type: "limit",
                  price: sufficient_ask_price.toString(),
                  amount_1: last_bid_amount
                };
                console.log(params_add_ask_order);
                const addOrderUrlEncodedParams = new URLSearchParams(params_add_ask_order).toString();
                const addOrderMessageToSign = endpoint_add_order + addOrderUrlEncodedParams;
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
                console.log("SUFFICIENT ASK ORDER: ", addOrderJson);
                is_bid_order_filled = false;
                
              }

              //------------------------------------------------------------------------------------------------------- ASK ORDER FULL FILLED
              if(is_ask_order_filled == true && totalBid < 25) {

                // SEEK OUT THE ORDER_ID OF LATEST "BID"
                let sufficient_bid_price, last_ask_amount;

                let ask_dates = asks.map((item: any) => {
                  return parseFloat(item.date_created);
                });
                ask_dates.sort(function(a, b){return b-a});
                let last_ask_date = ask_dates[0];
                let last_ask;
                asks.map((item: any) => {
                  if(item.date_created == last_ask_date) {
                    last_ask =  item;
                  }
                });
                sufficient_bid_price = (parseFloat(last_ask.price) * ( 1 - SUFFICIENT_PRICE_RATE/100)).toFixed(4);
                last_ask_amount = last_ask.amount_initial;
                
                //--------------------------------------------------------------------------------------------------- ADD A SUPPLEMENTAL ASK ORDER
              
                let params_add_bid_order = {
                  nonce: Date.now().toString(),
                  pair_id: pair_id,
                  order_direction: "buy",
                  order_type: "limit",
                  price: sufficient_bid_price.toString(),
                  amount_1: last_ask_amount,
                };

                const addOrderUrlEncodedParams = new URLSearchParams(params_add_bid_order).toString();
                const addOrderMessageToSign = endpoint_add_order + addOrderUrlEncodedParams;
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
                
                this.logger.log('SUFFICIENT BID ORDER: ', addOrderJson);
                is_ask_order_filled = false;
                
              }
            } while (false);
          }
          else if(tradeparameter==false)
          {
            this.postsService.createPost({
              "fromcurrency": "USDT",
              "tocurrency": "XRP",
              "bidprice": 0.4,
              "bidamount": 5,
              "startbidprogres": 0.1,
              "endbidprogress": 0.2,
              "askprice": 0.41,
              "askamount": 5,
              "startaskprogres": 0.1,
              "endaskprogress": 0.2,
              "botstartflag": true,
            });
          }
        
          main_counter = main_counter + 1;
          dynamic_increase_counter = dynamic_increase_counter + 1;
          dynamic_decrease_counter = dynamic_decrease_counter + 1;
      }, 1000)
    })
  
  }
}
