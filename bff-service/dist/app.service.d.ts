import { Cache } from "cache-manager";
export interface IProductItem {
    count: number;
    description: string;
    id: string;
    price: number;
    title: string;
}
export declare class AppService {
    private cacheManager;
    constructor(cacheManager: Cache);
    setCache(data: any): void;
    getCache(): Promise<IProductItem[]>;
}
