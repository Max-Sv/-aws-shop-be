import {CACHE_MANAGER, Inject, Injectable} from '@nestjs/common';
import {Cache} from "cache-manager";
import { PRODUCT_REQ } from './app.controller';

export interface IProductItem {
  count: number,
  description: string,
  id: string,
  price: number,
  title: string
}

@Injectable()
export class AppService {
  constructor( @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  setCache(data): void {
    this.cacheManager.set(PRODUCT_REQ, data, { ttl: 120 }).then(() => console.log('Products list saved in cache'));
  }

  async getCache(): Promise<IProductItem[]> {
    return await this.cacheManager.get(PRODUCT_REQ);
  }
}
