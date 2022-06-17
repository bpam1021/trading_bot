import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
} from "@nestjs/common";
const axios = require('axios').default;
import fs from 'fs'
import fetch from 'node-fetch';
import PostsService from "./posts.service";
import CreatePostDto from "./dto/createPost.dto";
import UpdateSetAskParamDto from "./dto/updateSetAskParam.dto";
import UpdateSetBidParamDto from "./dto/updateSetBidParam.dto";
import UpdateSetRangeParamDto from "./dto/updateSetRangeParam.dto";
import UpdateSetCurrencyDto from "./dto/updateSetCurrency.dto";
import UpdateSetStartParamDto from "./dto/updateSetStartParam.dto";
import FindOneParams from "../utils/findOneParams";
import RequestWithUser from "../auth/interface/requestWithUser";
// import SharesService from "src/shares/shares.service";
import {
  ApiBasicAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiBasicAuth()
@ApiTags("Posts")
@Controller("posts")

// @UseInterceptors(ClassSerializerInterceptor)
export default class PostsController {
  constructor(
    private readonly postsService: PostsService,
    // private readonly sharesService: SharesService
  ) {}

  @Get('')
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get all posts" })
  @ApiResponse({ status: 200, description: "[]" })
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  // @Get(":id")
  // @UseGuards(JwtAuthGuard)
  // @ApiResponse({
  //   status: 200,
  //   description: "The found record",
  // })
  // getPostById(@Param() { id }: FindOneParams) {
  //   return this.postsService.getPostById(Number(id));
  // }

  @Post()
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Set Exchage Crypto" })
  async createPost(
    @Body() post: UpdateSetCurrencyDto,
  ): Promise<CreatePostDto> {
    let res = await this.cancelallorders();

    let oldpost = await this.getAllPosts();
    let newpost;
    if(oldpost.length == 0)
      newpost = this.postsService.createPost(post);
    else
      newpost = this.postsService.updatePost(1,post);
    return newpost;
  }

  @Post("SetBid")
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Set Bid Params" })
  async setBid(@Body() biddata: UpdateSetBidParamDto){
    return this.postsService.updatePost(1,biddata);
  }

  @Post("SetRange")
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Set Bid Params" })
  async setRange(@Body() biddata: UpdateSetRangeParamDto){
    return this.postsService.updatePost(1,biddata);
  }


  @Post("SetAsk")
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Set Ask Params" })
  async setAsk(@Body() askdata: UpdateSetAskParamDto){
    return this.postsService.updatePost(1,askdata);
  }

  @Post("action")
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Set Start Flag" })
  async setStartandStop(@Body() startdata: UpdateSetStartParamDto){
    return this.postsService.updatePost(1,startdata);
  }

  @Post("curryencies")
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Set Start Flag" })
  async getEnableCurrencies(){
    let response;
    try {
      response = await axios.get('https://limitlex.com/api/public/currencies');
    } catch (error) {      
      console.log('[ERROR][MEMBER][FETCH]: ', error);
      return false;
    }
    return response.data;
  }
  @Post("cancel")
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Set Start Flag" })
  async cancelallorders(){
    let response;
    try {
      response = await axios.get('https://limitlex.com/api/public/currencies');
    } catch (error) {
      response.data.result.data = [];
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
      response.data.result.data = [];
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
    const orderPrKey = __dirname + '../../../pem/orderPrKey.pem';

    const cancelAllOrderPrKey = __dirname + '../../../pem/cancelAllOrderPrKey.pem';

    let  PR_KEY_ORDER = "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgRlOk122yZUclC2dr\nxqYV7c2npZj+2tvxwprCNkRWKlKhRANCAAQy3Cn0h7BEsflowwy4tz3qex6Jfxlb\nH/xNMqPrjsa3PrFKoWWzymKkl9xr+ceECflRVVd918V+HaSPhLCUdnT0\n-----END PRIVATE KEY-----";
    let  PR_KEY_CANCEL_ORDER = "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQge6YxbEYJ+q2L3O8r\ncdHRTxjAECydrsY64784MX4uKA+hRANCAARYTjl1j0e4BtM+6HdrgP6hI7+08eZk\nSPcHoe3WBBSjUkgZQ9fJ6DCdsCqwYXSK50HHTEvyv+15OnD5LUQ2QSLi\n-----END PRIVATE KEY-----";

    const orderPbKey = __dirname + '../../../pem/orderPbKey.pem';
    const cancelAllOrderPbKey = __dirname + '../../../pem/cancelAllOrderPbKey.pem';

    let  API_KEY_TRADE = '3f4cb8f1-aa2f-48aa-bba6-dc50a370cfcf'
    let  PB_KEY_ORDER = 'ae45a8fc-d7fa-4e7c-acde-74a35f54e751';
    let  PB_KEY_ADD_ORDER = 'bb379fb9-8d64-4414-9387-edeaec1ad067';
    let  PB_KEY_CANCEL_ORDER = '6344b106-3976-4b9f-8bfc-2513e89ed3e3';
    const crypto = require("crypto");
    const endpoint_cancel_all_orders = '/private/cancel_all_orders';
    const endpoint_order = '/private/cancel_all_orders';
    const params_order = {
      nonce: Date.now().toString(),
      pair_id: pair_id,
    };
    

    // Here we are encoding params to application/x-www-form-urlencoded format
    // Using built-in URLSearchParams class
    
    const params_cancel_all_orders = {
      nonce: Date.now().toString(),
      pair_id: pair_id,
    };

    const cAOurlEncodedParams = new URLSearchParams(params_cancel_all_orders).toString();
    const cAOmessageToSign = endpoint_cancel_all_orders + cAOurlEncodedParams;
    const cAOsignature = crypto.sign("sha512", Buffer.from(cAOmessageToSign), PR_KEY_CANCEL_ORDER);
    const cAOresponses = await fetch('https://limitlex.com/api' + endpoint_cancel_all_orders, {
      method: 'POST',
      headers: {
        'API-Key': PB_KEY_CANCEL_ORDER, // Your public api-key
        'API-Sign': cAOsignature.toString('base64'), // Signature in base-64 format
      },
      body: cAOurlEncodedParams, // Parameters in body of the request
    });
  }
  @Post("orders")
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get all order info" })
  async getEnableOrders(){

    const db_data: any = await this.postsService.getPostById(1);
    const db_orders = db_data.orders;
    const orders = JSON.parse(db_orders);
    
    return orders;
    // console.log("testONPost: ", testONPost.length);
    // const testONPost = await this.sharesService.getSharesById(1);
  //   let response;
  //   try {
  //     response = await axios.get('https://limitlex.com/api/public/currencies');
  //   } catch (error) {
  //     response.data.result.data = [];
  //     console.log('[ERROR][MEMBER][FETCH]: ', error);
  //   }
  //   // console.log(response.data);
  //   // this.logger.log(response.data);
  //   let fromid,toid;
  //   let cryptodata = response.data.result.data;
  //   cryptodata.map((item: any, index) => {
  //     if(item.code == "USDT")
  //       fromid = item.id;
  //     if(item.code == "XRP")
  //       toid = item.id;
  //   })
  //   try {
  //     response = await axios.get('https://limitlex.com/api/public/pairs');
  //   } catch (error) {
  //     response.data.result.data = [];
  //     console.log('[ERROR][MEMBER][FETCH]: ', error);
  //   }
  //   let pairdata = response.data.result.data;
  //   let pair_id = "";
  //   // this.logger.log(response.data);
  //   pairdata.map((item: any, index) => {
  //     if((item.currency_id_1 == fromid && item.currency_id_2 == toid) || (item.currency_id_1 == toid && item.currency_id_2 == fromid))
  //       pair_id = item.id;
  //   })

  //   const fs = require('fs');
  //   const orderPrKey = __dirname + '/orderPrKey.pem';

  //   const cancelAllOrderPrKey = __dirname + '/cancelAllOrderPrKey.pem';

  //   let  KEY_TDEADE = "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgbhZPblby4fbFQETU\nkBZCXndUD5jDVi5EitmzLWrwfxuhRANCAASqoelOmrbPRneq5O1lcj6BalLiDpq4\nUfWX5BrxhSC5e4KqknQG2ii21oSSKrdAwVhkutKWPNdaQvOfXuWs+Ih9\n-----END PRIVATE KEY-----";
  //         let  PR_KEY_ORDER ="-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgRlOk122yZUclC2dr\nxqYV7c2npZj+2tvxwprCNkRWKlKhRANCAAQy3Cn0h7BEsflowwy4tz3qex6Jfxlb\nH/xNMqPrjsa3PrFKoWWzymKkl9xr+ceECflRVVd918V+HaSPhLCUdnT0\n-----END PRIVATE KEY-----";
  //         let  PR_KEY_ADD_ORDER = "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgNBWsoxQPHZOguIMR\nmPF7+SY60sd8yPBG6jaxAF+1WMihRANCAATy8CH2yMQG3TdbYwlLUnPtCv5qI8sN\nqD9AWdPuCHqih+Mdjxe8GNRb4yjS3sff5FYSVx9Ws+QP8ugjZJtKdGu9\n-----END PRIVATE KEY-----";
  //         let  PR_KEY_CANCEL_ORDER = "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgUEujiWQ5uNpernfe\n1B0cc66hnF4W3IyGndgz8UocJnuhRANCAARZC/LjUwb5jwAPxWBxLKBhcF7E2uvW\n/pOyWBu0IX0IVPtyH9EUIqkgvtDKQGdFxbEoMMX1fzrVfYmzQKDpL6PX\n-----END PRIVATE KEY-----";

  //   const orderPbKey = __dirname + '/orderPbKey.pem';
  //   const cancelAllOrderPbKey = __dirname + '/cancelAllOrderPbKey.pem';

  //   let  API_KEY_TRADE = '3f4cb8f1-aa2f-48aa-bba6-dc50a370cfcf'
  //   let  PB_KEY_ORDER = 'ae45a8fc-d7fa-4e7c-acde-74a35f54e751';
  //   let  PB_KEY_ADD_ORDER = 'bb379fb9-8d64-4414-9387-edeaec1ad067';
  //   let  PB_KEY_CANCEL_ORDER = '5a71182e-f4b7-46bd-8b02-4b523e775a23';
  //   const crypto = require("crypto");
  //   const endpoint_order = '/private/open_orders';
  //   const params_order = {
  //     nonce: Date.now().toString(),
  //     pair_id: pair_id,
  //   };
    

  //   // Here we are encoding params to application/x-www-form-urlencoded format
  //   // Using built-in URLSearchParams class
    
  //   const orderUrlEncodedParams = new URLSearchParams(params_order).toString();
  //   // console.log(Buffer.from(API_SECRET).toString('base64'));
  //   // We concatenate api function with params string in order to create signature
  //   const orderMessageToSign = endpoint_order + orderUrlEncodedParams;
  //   // const messageToSign = endpoint;
  //   // Use built-in module 'crypto' to create ECDSA signature with SHA512
  //   const orderSignature = crypto.sign("sha512", Buffer.from(orderMessageToSign), PR_KEY_ORDER);
    
  //   const orderResponses = await fetch('https://limitlex.com/api' + endpoint_order, {
  //     method: 'POST',
  //     headers: {
  //       'API-Key': PB_KEY_ORDER, // Your public api-key
  //       'API-Sign': orderSignature.toString('base64'), // Signature in base-64 format
  //     },
  //     body: orderUrlEncodedParams, // Parameters in body of the request
  //   });
  //   const orderJson = await orderResponses.json();
  //   return orderJson;
    
  // }

  // @Patch(":id")
  // @UseGuards(JwtAuthGuard)
  // async updatePost(
  //   @Param() { id }: FindOneParams,
  //   @Body() post: UpdatePostDto
  // ) {
  //   return this.postsService.updatePost(Number(id), post);
  // }

  // @Delete(":id")
  // @UseGuards(JwtAuthGuard)
  // async deletePost(@Param() { id }: FindOneParams) {
  //   return this.postsService.deletePost(Number(id));
  }
}
