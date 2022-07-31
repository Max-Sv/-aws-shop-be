import { ALLOW, DENY, UNAUTHORIZED } from './constants';

export const basicAuthorizer = (event: any, _: any, cb: any) => {
  console.log("event", event);

  if (event.type !== 'TOKEN') {
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

