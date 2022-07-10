import {getProductsList} from "./getProductsListHandler";
import {APIGatewayProxyEvent,  Context, Callback} from "aws-lambda";import
{ mockProductItems} from "../utils/mock-data";
import {getMockProductItems$} from "../utils/helpers";


let mockEvent: APIGatewayProxyEvent;
let mockContext: Context;
let mockCallback: Callback;

jest.mock("../utils/helpers", () => {
    const originalModule = jest.requireActual('../utils/helpers');

    return {
        __esModule: true,
        ...originalModule,
        getMockProductItems$: jest.fn(async () => Promise.resolve(mockProductItems)),
    };
})

describe('getProductsList:', () => {
    it('should return objects', async () => {
        const mockArr = await getMockProductItems$()
        expect(mockArr).toEqual(mockProductItems);
        expect(getMockProductItems$).toHaveBeenCalled();

        const test = await getProductsList(mockEvent, mockContext, mockCallback )
        expect(test).toEqual({
            statusCode: 200,
            body: JSON.stringify(mockProductItems)
        })

    });

});
