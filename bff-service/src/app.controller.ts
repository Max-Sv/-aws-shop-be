import {
  All,
  BadGatewayException,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Query,
  Req,
  Res,
  Inject,
  CACHE_MANAGER
} from '@nestjs/common';
import { AppService } from './app.service';
import {HttpService} from "@nestjs/axios";
import { Request, Response } from 'express';
import { Cache } from 'cache-manager';

const BAD_REQ = 'Cannot process request';
const ID = 'id';
export const PRODUCT_REQ = 'products';


@Controller("*")
export class AppController {
  constructor(private readonly appService: AppService, private readonly httpService: HttpService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @All()
  async bff(@Req() req: Request, @Res() res: Response, @Query(ID) productId: string) {
    const reqUrl = req.url.split('/')[1]
    const recipient = productId ? reqUrl.split("?")[0] : reqUrl;
    console.log("-> recipient", recipient);

    const recipientURL = process.env[recipient];

    if (!recipientURL) {
      throw new BadGatewayException(BAD_REQ);
    }

    const  {method, body} = req;
    const url = productId &&  recipient === PRODUCT_REQ ? `${recipientURL}/${recipient}/${productId}` : `${recipientURL}/${recipient}`;
    const config = {
      url,
      method,
      ...(Object.keys(body || {}).length > 0 && {data: body}),
    };

    try {
      let cacheData = null;
      if (recipient === PRODUCT_REQ && method === 'GET' && !productId) {
        cacheData = await this.appService.getCache();
      }

      if (cacheData) {
        return res.status(HttpStatus.OK).json(cacheData);
      }

      const { status, data } = await this.httpService.axiosRef(config);

      if (recipient === PRODUCT_REQ && method === 'GET' && !productId) {
        this.appService.setCache(data)
      }

      return res.status(status).json(data);
    } catch (error) {

      if (error.response) {
        const { status, data } = error.response;

        return res.status(status).json(data);
      }
      throw new InternalServerErrorException(error.message);
    }

  }

}
