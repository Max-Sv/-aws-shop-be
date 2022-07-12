import {catalogBatchProducts, notifyAddProducts} from './catalogBatchProducts';
import {addProduct} from "@/services/db-client";

jest.mock('./services/db-client', () => ({
    addProduct: jest.fn(async () => Promise.resolve(mockProducts[0])),
}));

const mockProducts = [{ count: 2, description: "test1", id: "2", price: "33", title: "test1"}, {count: 3, description: "test2", id: "3", price: "23", title: "test2"}];

const mockEvent = {
    Records: [
        {
            messageId: 'a32fbb93-0d15-4262-9b1b-62cccf6c6b78',
            receiptHandle: 'AQEBRqB0oP53Jz66UOCYWqFrHIWrdgbgYegU1kxep1F0w22x9K+SmwWLRz4gRwFWH4jMrWfVcZ1Zm0/8sf4zlWvUubi69/s2Ww+dBHvBidMTCV3XusQOPw1BAWEwxD1tKPyP4rdq9F7oeT9uDGs5n1TWI5ITmjYivjYvjk+vU18eGhx6bvP6I8/37Y/77Ez1O+IBjp833mFcsTf4bR2yjeoyvq32s7r0jD37W5mMnC7gSMZNQGUJs6T992lCpCKW7W/zQDqPhHlzSQVBDbV5yp/LcWTCSG0DmmNk66TyJjvsfkLyFZWcnpAHHxfX4VWIjphzbFeDD/DfHQvcSpke+94UcxlUG07nlLDHy+1/3lA1wdzizNlliojbim9jTUkrEBG7hmKrarhxTqhCTyCKqSo73g==',
            body: '[{"count":"2","description":"test1","id":"2","price":"33","title":"test1"},{"count":"3","description":"test2","id":"3","price":"23","title":"test2"}]',
            attributes: [Object],
            messageAttributes: {},
            md5OfBody: '50861e74cd84c519b0bb285a12ba893a',
            eventSource: 'aws:sqs',
            eventSourceARN: 'arn:aws:sqs:eu-west-1:499107229445:app-products-queue',
            awsRegion: 'eu-west-1'
        }
    ]
}


describe('catalogBatchProducts', () => {
    it('should not crash', async () => {
        await catalogBatchProducts(mockEvent);
    });

    it('should call addProduct', async () => {
        await catalogBatchProducts(mockEvent);
        expect(addProduct).toBeCalledTimes(mockProducts.length);
    });

    it('should call notifyAboutAddProducts', async () => {
        await catalogBatchProducts(mockEvent);

        expect(notifyAddProducts).toHaveBeenCalledWith(mockProducts);
    });

    it('should return 201 status code', async () => {
        const result = await catalogBatchProducts(mockEvent);

        expect(result.statusCode).toBe(201);
    })
});
