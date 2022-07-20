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

    const signedUrl = await new Promise((resolve, reject) => {
      s3.getSignedUrl('putObject', params, (err, url) => {
        if (err) {
          reject(err)
        }

        resolve(url);
      });
    });

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': 'https://d2sqr7ze13s3vc.cloudfront.net',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(signedUrl),
    };
  } catch (error) {

    return {
      statusCode: error.statusCode || 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(error.message),
    };
  }
};
