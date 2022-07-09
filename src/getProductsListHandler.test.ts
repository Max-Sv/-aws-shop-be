import {getProductsList} from "./getProductsListHandler";
import {APIGatewayProxyEvent} from "aws-lambda";import
{ mockProductItems} from "./mocks/mock-data";
import {getMockProductItems$} from "./mocks/helpers";


let mockEvent: APIGatewayProxyEvent;


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

        const test = await getProductsList(mockEvent )
        expect(test).toEqual({
            statusCode: 200,
            body: JSON.stringify(mockProductItems)
        })

    });

});
