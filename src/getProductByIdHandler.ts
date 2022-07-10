import {APIGatewayProxyHandler} from "aws-lambda";
import {getMockProductItemById$} from "../utils/helpers";


export const getProductById: APIGatewayProxyHandler = async (event) => {
    const param = event.pathParameters;

    if (param) {
        try {
            const item = await getMockProductItemById$(param.productId as string);
            return {
                statusCode: 200,
                body: JSON.stringify(item),
                headers: {
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            }
        } catch (e) {
            return {
                statusCode: 404,
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

