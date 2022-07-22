import AWS from 'aws-sdk';
import { ParameterError } from './utils/errors';
import { REGION, BUCKET } from './constants';

const validationFileName = (name) => {
  if (!name) {
    throw new ParameterError('Incorrect parameter in file name');
  }
}


export const importProductsFile = async (event: any) => {
  console.log("=>(importProductsFile.ts:55) event", event);

  try {
    const s3 = new AWS.S3({ region: REGION });
    const { name } = event.queryStringParameters;

    validationFileName(name);

    const params = {
      Bucket: BUCKET,
      Key: `uploaded/${name}`,
      Expires: 1000,
      ContentType: 'text/csv',
    };
    console.log("=>(importProductsFile.ts:27) params", params);

    const signedUrl = await new Promise((resolve, reject) => {
      s3.getSignedUrl('putObject', params, (err, url) => {
        if (err) {
          console.log("=>(importProductsFile.ts:30) err", err);

          reject(err)
        }

        resolve(url);
      });
    });
    console.log("=>(importProductsFile.ts:40) signedUrl", signedUrl);

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(signedUrl),
    };
  } catch (error) {
    console.log("=>(importProductsFile.ts:59) error", error);

    return {
      statusCode: error.statusCode || 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(error.message),
    };
  }
};
