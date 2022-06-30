import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {addProduct} from "./services/db-client";

export const createProduct = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(`createProduct: ${JSON.stringify(event)}`);

    if (event.body) {
        try {
            const product  = await addProduct(JSON.parse(event.body))

            return {
                statusCode: 200,
                body: JSON.stringify(product),
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            }
        } catch (error) {
            return {
                statusCode: error.statusCode || 500,
                body: JSON.stringify(error.message),
            };
        }

    }
    return {
        statusCode: 400,
        body: JSON.stringify({ error: "product data is invalid"}),
    }

}
