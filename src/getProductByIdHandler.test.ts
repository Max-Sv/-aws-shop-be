import {APIGatewayProxyEvent} from "aws-lambda";import
{ mockProductItems} from "./mocks/mock-data";
import {getMockProductItemById$} from "./mocks/helpers";
import {getProductById} from "./getProductByIdHandler";


jest.mock("../utils/helpers", () => {
    const originalModule = jest.requireActual('../utils/helpers');

    return {
        __esModule: true,
        ...originalModule,
        getMockProductItemById$: jest.fn(async () => Promise.resolve(mockProductItems[0])),
    };
})

describe('getProductById:', () => {
    it('should return object', async () => {
        const mockEvent = {
            pathParameters : {
                productId : "34"
            }
        }
        const mockArr = await getMockProductItemById$("34")
        expect(mockArr).toEqual(mockProductItems[0]);
        expect(getMockProductItemById$).toHaveBeenCalledWith("34");

        const test = await getProductById(mockEvent as unknown as APIGatewayProxyEvent )
        expect(test).toEqual({
            statusCode: 200,
            body: JSON.stringify(mockProductItems[0])
        })

    });

    it('should set error', async () => {
        const mockEvent = {};

        const test = await getProductById(mockEvent as unknown as APIGatewayProxyEvent )
        expect(test).toEqual({
            statusCode: 404,
            body: JSON.stringify({ error: "invalid path parameters"})
        })

    });

    // it('should return mock array', async () => {
    //     const result = await getMockProductItems$();
    //     expect(result).toEqual(mockProductItems)
    // });
});
