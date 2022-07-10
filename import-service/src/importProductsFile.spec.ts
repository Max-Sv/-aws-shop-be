import { importProductsFile } from './importProductsFile';
import AWS from 'aws-sdk-mock';

const mockEvent = {
  resource: '/import',
  path: '/import',
  httpMethod: 'GET',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en,ru;q=0.9,en-US;q=0.8',
    'CloudFront-Forwarded-Proto': 'https',
    'CloudFront-Is-Desktop-Viewer': 'true',
    'CloudFront-Is-Mobile-Viewer': 'false',
    'CloudFront-Is-SmartTV-Viewer': 'false',
    'CloudFront-Is-Tablet-Viewer': 'false',
    'CloudFront-Viewer-Country': 'PL',
    Host: '0xcdezs5t3.execute-api.eu-west-1.amazonaws.com',
    origin: 'http://localhost:4200',
    Referer: 'http://localhost:4200/',
    'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
    Via: '2.0 aa9873ca0eff886ad72852b2bde57830.cloudfront.net (CloudFront)',
    'X-Amz-Cf-Id': 'E_JBqJ6JQhXHkIaFPk4XXQDt9MTUB2OO2LsWVRftXxtd6DvxF2i5fA==',
    'X-Amzn-Trace-Id': 'Root=1-62c9e322-564a79fc6f9311733a52b8df',
    'X-Forwarded-For': '87.99.44.62, 54.239.171.118',
    'X-Forwarded-Port': '443',
    'X-Forwarded-Proto': 'https'
  },
  multiValueHeaders: {
    Accept: [ 'application/json, text/plain, */*' ],
    'Accept-Encoding': [ 'gzip, deflate, br' ],
    'Accept-Language': [ 'en,ru;q=0.9,en-US;q=0.8' ],
    'CloudFront-Forwarded-Proto': [ 'https' ],
    'CloudFront-Is-Desktop-Viewer': [ 'true' ],
    'CloudFront-Is-Mobile-Viewer': [ 'false' ],
    'CloudFront-Is-SmartTV-Viewer': [ 'false' ],
    'CloudFront-Is-Tablet-Viewer': [ 'false' ],
    'CloudFront-Viewer-Country': [ 'PL' ],
    Host: [ '0xcdezs5t3.execute-api.eu-west-1.amazonaws.com' ],
    origin: [ 'http://localhost:4200' ],
    Referer: [ 'http://localhost:4200/' ],
    'sec-ch-ua': [
      '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"'
    ],
    'sec-ch-ua-mobile': [ '?0' ],
    'sec-ch-ua-platform': [ '"Windows"' ],
    'sec-fetch-dest': [ 'empty' ],
    'sec-fetch-mode': [ 'cors' ],
    'sec-fetch-site': [ 'cross-site' ],
    'User-Agent': [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
    ],
    Via: [
      '2.0 aa9873ca0eff886ad72852b2bde57830.cloudfront.net (CloudFront)'
    ],
    'X-Amz-Cf-Id': [ 'E_JBqJ6JQhXHkIaFPk4XXQDt9MTUB2OO2LsWVRftXxtd6DvxF2i5fA==' ],
    'X-Amzn-Trace-Id': [ 'Root=1-62c9e322-564a79fc6f9311733a52b8df' ],
    'X-Forwarded-For': [ '87.99.44.62, 54.239.171.118' ],
    'X-Forwarded-Port': [ '443' ],
    'X-Forwarded-Proto': [ 'https' ]
  },
  queryStringParameters: { name: 'test.csv' },
  multiValueQueryStringParameters: { name: [ 'test.csv' ] },
  pathParameters: null,
  stageVariables: null,
  requestContext: {
    resourceId: 'npwd05',
    resourcePath: '/import',
    httpMethod: 'GET',
    extendedRequestId: 'VBBtWGxwDoEFj3g=',
    requestTime: '09/Jul/2022:20:20:50 +0000',
    path: '/dev/import',
    accountId: '499107229445',
    protocol: 'HTTP/1.1',
    stage: 'dev',
    domainPrefix: '0xcdezs5t3',
    requestTimeEpoch: 1657398050026,
    requestId: 'bfb1f2cc-30e4-4430-a7bb-a37f5349782a',
    identity: {
      cognitoIdentityPoolId: null,
      accountId: null,
      cognitoIdentityId: null,
      caller: null,
      sourceIp: '87.99.44.62',
      principalOrgId: null,
      accessKey: null,
      cognitoAuthenticationType: null,
      cognitoAuthenticationProvider: null,
      userArn: null,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
      user: null
    },
    domainName: '0xcdezs5t3.execute-api.eu-west-1.amazonaws.com',
    apiId: '0xcdezs5t3'
  },
  body: null,
  isBase64Encoded: false
}

const mockURL = `https://app-products-import.s3.eu-west-1.amazonaws.com/uploaded/test.csv?AWSAccessKeyId=
  ASIAXINI354C3YF6JRPA&Content-Type=text%2Fcsv&Expires=1657444886&Signature=uq6zAjmqrHCnEL0FQmMKJCkZCy4%3D&X-
  Amzn-Trace-Id=Root%3D1-62ca99d9-23173794534e2a0410b674b1%3BParent%3D46fdcd115368c178%3BSampled%3D0&x-amz-security-token=
  IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJHMEUCIQDgE9OMiZa3R%2FG9BPwxqqZmCgEV7CxyY%2FSVSH1qXU%2FV
  ggIgehWsbQcMVxYA1yZi6lBfdLy2emiKktXGSN326J0aBSEqnwMIKhAAGgw0OTkxMDcyMjk0NDUiDJowFlxapmPYKDNI7ir8Asm47z8lc2bqL84e5Luh7WT6K
  lwhjOFVfUwuhyQu2KJXMCRsUy38qUT4yAVqzlbE%2FB5IMk8lOwEzioVFUV8UWBH5VyrgVmHmlDyyyxm2WoETLiZNJLvsnEE%2BfuZkKqWClNJVGNgZK5Gp9E
  Sn03uDDMDj9tw6LuBLQvgGclG9miFJ425qd6rXzrZy%2BI8ruP%2F5WRiqsTdcbEoT1peBfoGtgGruBS3MCWrn7d0u0TiRcTSY6%2BVblPjoYULSUrkSBQmXv
  9jQi6kK6h5k6uzdzVPbsOjR3BMD94%2FitqXpvnzyBZSRgrZpg%2B2bkndKU%2B7c%2BeME9Fcet%2BQlbPj6NIda7k%2BF3%2FS4C9SB7l0dQRxnWG33wuo
  OqzHBjDXn%2FZJcpK7l9XtPHyhKRq0CtYirfccLdLdx%2FDhLbIWE5241sd1nmmWrnthAnTio%2FU20N5LKcLOtP8z%2FAldErh1X1tFXE2XBNWP0Kmsb2Ev
  ntfR3liSjQH5SikuA0WrvqagGfIpQb0kaMNmzqpYGOp0BWzbpufZblo2e89nm%2BShwcZiHxxRTa9svkPKkkvHaE%2BAfoHvtrpiLfktQ69icVLCplxrMKK4d
  ZmwROwi81O2gquyU2PPmeXE6XHplMz47FAlLF5QTQNNc1cavZXKroXR4gYdS0nVSB9OfwapJj68bqC7paDykeEi903c0zVCEbqB%2FAwRohlEYWvB%2FyvJCy
  r8le7eHuzPCg%2BzyUtK2xg%3D%3D`

describe('importProductsFile', () => {

    it('Should throw error', async () => {
      AWS.mock('S3', 'getSignedUrl', mockURL);
      const response = await importProductsFile(mockEvent);
      const result = JSON.parse(response.body);
      expect(result).toEqual(mockURL);
    });

  // it('Should return the signed url', async () => {
  //   result = validationFileName(null);
  //   expect(validationFileName).toThrowError();
  // });
});
