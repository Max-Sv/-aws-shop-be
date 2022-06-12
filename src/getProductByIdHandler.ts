import {APIGatewayProxyHandler} from "aws-lambda";
import {getMockProductItemById$} from "../utils/mock-data";



export const getProductById: APIGatewayProxyHandler = async (event) => {
    const param = event.pathParameters;

    if (param) {
        const item = await getMockProductItemById$(param.productId as string);
        return {
            statusCode: 200,
            body: JSON.stringify(item)
        }
    }

    return {
        statusCode: 404,
        body: JSON.stringify({ error: "invalid path parameters"})
    }

}

