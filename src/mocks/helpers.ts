import {MockProductItem, mockProductItems} from "./mock-data";

export function getMockProductItems$(): Promise<MockProductItem[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockProductItems);
        }, 0);
    });

}

export function getMockProductItemById$(id: string): Promise<MockProductItem> | Promise<any>  {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const item = mockProductItems.find(item => item.id === id)
            if (item) {
                resolve(mockProductItems.find(item => item.id === id));
            } else {
                reject(new Error("Product not found"))
            }
        }, 0);
    });

}
