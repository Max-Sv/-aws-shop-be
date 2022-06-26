import {APIGatewayProxyHandler} from "aws-lambda";
import { Client, ClientConfig } from "pg";

export const getProductsList: APIGatewayProxyHandler = async () => {
    const client = new Client(dbOptions);
    await client.connect();

    try {
        const { rows: products } = await client.query(`select products.id, products.title, products.description, products.price, stocks.count  from products left join stocks on products.id = stocks.product_id`)
        console.log("=>(getProductsListHandler.ts:22) products", products);

        return {
            statusCode: 200,
            body: JSON.stringify(products),
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err),
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
        }
    } finally {
        await client.end()
    }
}

