import { Client } from "pg"
import { ServerError } from "../../../product-service/src/utils/errors";
import {ParameterError} from "@/utils/errors";

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const dbOptions: any = {
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 5000,
};

const createProductValidator = (title: string, description: string, price: number) => {
    if (!title || !description || !price) throw new ParameterError(`Product data is invalid`);
}

export const addProduct  = async (params: any): Promise<any> => {
    const client = new Client(dbOptions);

    try {
        const { title, description, price, count } =  params;

        createProductValidator(title, description, price)

        await client.connect();
        await client.query('BEGIN');
        const createdProduct = await client.query(`
            insert into products (title, description, price) 
            values ('${title}', '${description}', ${price})
            returning *
            `);
        const { id } = createdProduct.rows[0];
        const productCount = count || 0;
        const stock = await client.query(`
            insert into stocks (product_id, count)
            values ('${id}', '${productCount}')
            returning *
            `);
        await client.query(`COMMIT`);

        return {...createdProduct.rows[0], count: stock.rows[0].count };
    } catch (error) {
        await client.query(`ROLLBACK`);
        throw new ServerError(error.message);

    } finally {
        await client.end();
    }
};
