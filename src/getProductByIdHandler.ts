import {APIGatewayProxyEvent, APIGatewayProxyHandler} from "aws-lambda";
import { Client, ClientConfig } from "pg";


export const getProductById: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const param = event.pathParameters;
    const client = new Client(dbOptions);
    await client.connect();

    if (param) {
        try {
            const { rows: product } = await client.query(`SELECT * FROM products WHERE id='${param.productId}'`)
            console.log("=>(getProductByIdHandler.ts:26) product", product);

            return {
                statusCode: 200,
                body: JSON.stringify(product),
                headers: {
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            }
        } catch (e) {
            return {
                statusCode: 500,
                body: JSON.stringify(e.message),
                headers: {
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            }
        }
    }

    return {
        statusCode: 404,
        body: JSON.stringify({ error: "invalid path parameters"})
    }

}

