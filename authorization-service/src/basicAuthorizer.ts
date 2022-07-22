import { ALLOW, DENY, UNAUTHORIZED, TOKEN } from './constants';

export const basicAuthorizer = (event: any, _: any, cb: any) => {
  console.log('Authorizer event', JSON.stringify(event, null, 2));

  // const authorizationToken = event.authorizationToken;
  //
  // if (event.type !== TOKEN || !token) {
  //   cb(UNAUTHORIZED, TOKEN_ERROR_MESSAGE);
  // }

  if (event.type !== TOKEN) {
    cb(UNAUTHORIZED);
  }

  try {
    const authorizationToken = event.authorizationToken;
    const encodedCreds = authorizationToken.split(' ')[1];
    const buff = Buffer.from(encodedCreds, 'base64');
    const plainCreds = buff.toString('utf-8').split(':');
    const [userName, password] = plainCreds
    console.log("=>(basicAuthorizer.ts:23) password", password);
    console.log("=>(basicAuthorizer.ts:23) userName", userName);
    const storedUserPassword = process.env[userName];
    const effect = !storedUserPassword || storedUserPassword !== password ? DENY : ALLOW;
    const policy = generatePolicy(encodedCreds, effect, event.methodArn);
    cb(null, policy);
  } catch (error) {
    console.log("=>(basicAuthorizer.ts:42) error", error);

    cb(UNAUTHORIZED, error.message);
  }


  // const [userName, password] = decodeToken(token);
  // console.log(`User name: ${userName} Password: ${password}`);
  // const isValid = userName && password && process.env[userName] === password;
  //
  // const effect = isValid ? ALLOW : DENY;
  // const policy = generatePolicy(userName, effect, event.methodArn);
  //
  // return cb(null, policy);
};

const generatePolicy = (principalId: string, effect: string = ALLOW, resource: string) => {
  return  {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };
};

