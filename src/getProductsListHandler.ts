import {APIGatewayProxyHandler} from "aws-lambda";
import { getMockProductItems$ } from "../utils/helpers";

export const getProductsList: APIGatewayProxyHandler = async () => {
    const items = await getMockProductItems$();
    return {
        statusCode: 200,
        body: JSON.stringify(items),
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
    }
}
