import { Client } from "pg"
import {IProductItem} from "../models/product";
import {NotFoundError, ServerError, ValidationError} from "../utils/errors";

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



export const findAllProducts = async (): Promise<IProductItem[]> => {
    const client = new Client(dbOptions);

    try {
        await client.connect();
        const { rows: products } = await client.query<IProductItem>(`select products.id, products.title, products.description, products.price, stocks.count  from products left join stocks on products.id = stocks.product_id`)

        return products;
    } catch (e) {
        throw new ServerError(e.message);
    } finally {
        await client.end();
    }
};

const productValidator = (product:IProductItem[]) => {
    if (!product.length) throw new NotFoundError(`Product not found`);
}

export const findProductById  = async (id: string): Promise<IProductItem[]> => {
    const client = new Client(dbOptions);

    try {
        await client.connect();
        const { rows: product } = await client.query(`SELECT * FROM products WHERE id='${id}'`)
        productValidator(product);

        return product;
    } catch (error) {
        throw new ServerError(error.message);
    } finally {
        await client.end();
    }
};

const createProductValidator = (title: string, description: string, price: number) => {
    if (!title || !description || !price) throw new ValidationError(`Product data is invalid`);
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

        return {...createdProduct, count: stock.rows[0].count };
    } catch (error) {
        await client.query(`ROLLBACK`);
        throw new ServerError(error.message);

    } finally {
        await client.end();
    }
};


