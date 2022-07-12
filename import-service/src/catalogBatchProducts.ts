import { REGION } from "./constants";
import AWS from 'aws-sdk';
import { addProduct } from "./services/db-client";
import { IProductItem } from "./models/product";

export const notifyAddProducts = async (postedProducts: IProductItem[]) => {
  const sns = new AWS.SNS({ region: REGION });

  const promises = postedProducts.map(product => {
    return sns.publish({
      TopicArn: process.env.SNS_TOPIC_ARN,
      Subject: `Product added: ${product.title}(id: ${ product.id })`,
      Message: `Product with title "${ product.title }"(id: ${ product.id }) added successfully`,
      MessageAttributes: {
        title: {
          DataType: 'String',
          StringValue: product.title,
        },
        errorMail: {
          DataType: 'String',
          StringValue: 'false',
        },
      },
    }).promise();
  });

  return Promise.all(promises);
};

export const notifyErrorAddProducts = async (error) => {
  const sns = new AWS.SNS({ region: REGION });

  await sns.publish({
    TopicArn: process.env.SNS_TOPIC_ARN,
    Subject: `Product added Error: ${error.message}`,
    Message: `Products added unsuccessfully`,
    MessageAttributes: {
      errorMail: {
        DataType: 'String',
        StringValue: 'true',
      },
    },
  })
};

export const catalogBatchProducts = async (event: any) => {
  console.log("=>(catalogBatchProducts.ts:89) event", event);
  const resultProducts = [];

  try {
    for (const record of event.Records) {
      const newProduct = JSON.parse(record.body) as unknown as any[];

      // throw Error("test")

      const result = newProduct.map(async (product) => await addProduct(product));
      resultProducts.push(result)

      await notifyAddProducts(newProduct);
    }

    return {
      statusCode: 201,
      headers: { 'Access-Control-Allow-Origin': '*' },

      body: JSON.stringify(resultProducts),
    };
  } catch (error) {
    await notifyErrorAddProducts(error)

    return {
      statusCode: error.statusCode || 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(error.message),
    };
  }
};

