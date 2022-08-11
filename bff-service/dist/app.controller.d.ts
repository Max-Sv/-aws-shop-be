import { AppService } from './app.service';
import { HttpService } from "@nestjs/axios";
import { Request, Response } from 'express';
import { Cache } from 'cache-manager';
export declare const PRODUCT_REQ = "products";
export declare class AppController {
    private readonly appService;
    private readonly httpService;
    private cacheManager;
    constructor(appService: AppService, httpService: HttpService, cacheManager: Cache);
    bff(req: Request, res: Response, productId: string): Promise<Response<any, Record<string, any>>>;
}
