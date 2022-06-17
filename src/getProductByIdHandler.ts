import {APIGatewayProxyHandler} from "aws-lambda";
import {getMockProductItemById$} from "../utils/helpers";


export const getProductById: APIGatewayProxyHandler = async (event) => {
    const param = event.pathParameters;

    if (param) {
        try {
            const item = await getMockProductItemById$(param.productId as string);
            return {
                statusCode: 200,
                body: JSON.stringify(item)
            }
        } catch (e) {
            return {
                statusCode: 404,
                body: JSON.stringify(e.message)
            }
        }
    }

    return {
        statusCode: 404,
        body: JSON.stringify({ error: "invalid path parameters"})
    }

}

