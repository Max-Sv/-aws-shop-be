import AWS from 'aws-sdk';
import csv from 'csv-parser';
import {REGION,  BUCKET} from './constants';
import {FileOperationError, ParseFileError} from "./utils/errors";

const getFileStreams = async (records: any) => {
  const awsS3 = new AWS.S3({ region: REGION });

  return records.map((record) => {
    const params = {
      Bucket: BUCKET,
      Key: record.s3.object.key
    };
    return awsS3.getObject(params).createReadStream();
  });
};

const getParsedStreams = async (streams: any[]): Promise<any> => {
  const chunkStreams = [];

  return streams.map(stream => {
    return new Promise((result, reject) => {
      stream
          .pipe(csv())
          .on('data', (data) => chunkStreams.push(data))
          .on('end', () => {
            result(chunkStreams);
          })
          .on('error', (error) => {
            reject(error);
          });
    });
  })

};

const getParsedRecords = async (records: any): Promise<any> => {
  return records.map(async (record) => {
    const bucketName = record.s3.bucket.name;
    const { key } = record.s3.object;
    const awsS3 = new AWS.S3({ region: REGION });

    await awsS3.copyObject({
      Bucket:  bucketName,
      CopySource: `${ bucketName}/${key}`,
      Key: key.replace('uploaded', 'parsed'),
    }).promise();

    await awsS3.deleteObject({
      Bucket: bucketName,
      Key: `${key}`,
    }).promise();
  });
};

const throwParseFileError = (error: Error) => {
  throw new ParseFileError(error.message);
}
const throwFileOperationError = (error: Error) => {
  throw new FileOperationError(error.message);
}

export const importFileParser = async (event: any) => {
  console.log("=>(importFileParser.ts:149) event", event);
  try {
    const records = event.Records;
    const streams$ = await getFileStreams(records);
    let parsedStreams;

    try {
      parsedStreams = await Promise.all(await getParsedStreams(streams$));
      console.log("=>(importFileParser.ts:124) parsedStreams", parsedStreams);
    } catch (error) {
      throwParseFileError(error);
    }

    try {
      const parsedRecords$ = await getParsedRecords(records)
      await Promise.all(parsedRecords$);
    } catch (error) {
      throwFileOperationError(error.message);
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(parsedStreams),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify(error.message),
    };
  }
};

