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
import UpdateSetCurrencyDto from "./dto/updateSetCurrency.dto";
import UpdateSetStartParamDto from "./dto/updateSetStartParam.dto";
import FindOneParams from "../utils/findOneParams";
import RequestWithUser from "../auth/interface/requestWithUser";
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
  constructor(private readonly postsService: PostsService) {}

  @Get()
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
    const orderPrKey = __dirname + '/orderPrKey.pem';

    const cancelAllOrderPrKey = __dirname + '/cancelAllOrderPrKey.pem';

    let  PR_KEY_ORDER = fs.readFileSync(orderPrKey,  "utf8" );
    let  PR_KEY_CANCEL_ORDER = fs.readFileSync(cancelAllOrderPrKey,  "utf8" );

    const orderPbKey = __dirname + '/orderPbKey.pem';
    const cancelAllOrderPbKey = __dirname + '/cancelAllOrderPbKey.pem';

    let  PB_KEY_ORDER = fs.readFileSync(orderPbKey,  "utf8" );
    let  PB_KEY_CANCEL_ORDER = fs.readFileSync(cancelAllOrderPbKey,  "utf8" );
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
  @ApiOperation({ summary: "Set Start Flag" })
  async getEnableOrders(){

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
    const orderPrKey = __dirname + '/orderPrKey.pem';

    const cancelAllOrderPrKey = __dirname + '/cancelAllOrderPrKey.pem';

    let  PR_KEY_ORDER = fs.readFileSync(orderPrKey,  "utf8" );
    let  PR_KEY_CANCEL_ORDER = fs.readFileSync(cancelAllOrderPrKey,  "utf8" );

    const orderPbKey = __dirname + '/orderPbKey.pem';
    const cancelAllOrderPbKey = __dirname + '/cancelAllOrderPbKey.pem';

    let  PB_KEY_ORDER = fs.readFileSync(orderPbKey,  "utf8" );
    let  PB_KEY_CANCEL_ORDER = fs.readFileSync(cancelAllOrderPbKey,  "utf8" );
    const crypto = require("crypto");
    const endpoint_order = '/private/open_orders';
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
    return orderJson;
    
  }

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
  // }
}
