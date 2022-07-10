import { mockProductItems} from "./mock-data";
import {getMockProductItemById$, getMockProductItems$} from "./helpers";

describe('getMockProductItems$:', () => {
    it('should not crash', async () => {
        await getMockProductItems$();
    });

    it('should return mock array', async () => {
        const result = await getMockProductItems$();
        expect(result).toEqual(mockProductItems)
    });
});

describe('getMockProductItemById$:', () => {
    it('should not crash', async () => {
        await getMockProductItemById$("7567ec4b-b10c-48c5-9345-fc73c48a80aa");
    });

    it('should return mock data', async () => {
        const result = await getMockProductItemById$("7567ec4b-b10c-48c5-9345-fc73c48a80aa");
        expect(result).toEqual(mockProductItems[0])
    });

    it('should return error', async () => {
        try {
            await getMockProductItemById$("0c-48c5-9345-fc73c48a80aa");

        } catch (e) {
            expect(e.message).toBe("Product not found");
        }

    });
});