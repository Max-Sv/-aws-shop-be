import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {IProductItem} from "./models/product";
import {findProductById} from "./services/db-client";

export const getProductById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(`getProductById: ${JSON.stringify(event)}`);

    const param = event.pathParameters;

    if (param && param.productId) {
        try {
            const product: IProductItem[] = await findProductById(param.productId);

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
        statusCode: 404,
        body: JSON.stringify({ error: "invalid path parameters"})
    }


}

