import {APIGatewayProxyEvent,  APIGatewayProxyResult} from "aws-lambda";
import {IProductItem} from "./models/product";
import {findAllProducts} from "./services/db-client";

export const getProductsList = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    try {
        console.log(`getProductsList: ${JSON.stringify(event)}`);

        const products: IProductItem[] = await findAllProducts();

        return {
            statusCode: 200,
            body: JSON.stringify(products),
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

