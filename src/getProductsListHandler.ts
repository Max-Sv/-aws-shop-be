import {APIGatewayProxyHandler} from "aws-lambda";
import { getMockProductItems$ } from "../utils/helpers";

export const getProductsList: APIGatewayProxyHandler = async () => {
    const items = await getMockProductItems$();
    return {
        statusCode: 200,
        body: JSON.stringify(items)
    }
}
