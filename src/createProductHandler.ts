import {Client, ClientConfig} from "pg"
import {APIGatewayProxyEvent, APIGatewayProxyHandler} from "aws-lambda";


export const createProduct: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    if (event.body) {
        let body = JSON.parse(event.body)
        const { title, description, price } =  body;

        if(title && description && price) {
            const client = new Client(dbOptions);
            await client.connect();

            try {
                const {rows: product } = await client.query(`
            insert into products (title, description, price) values
            ('${title}', '${description}', ${price})
            `)
                console.log("=>(createProductHandler.ts:46) product", product);
                return {
                    statusCode: 200,
                    body: JSON.stringify(product),
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

        return {
            statusCode: 400,
            body: JSON.stringify({ error: "product data is invalid"}),
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
        }


    }
    return {
        statusCode: 400,
        body: JSON.stringify({ error: "product data is invalid"}),
    }

}
