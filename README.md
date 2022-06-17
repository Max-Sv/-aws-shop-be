# Shop Angular Cloudfront Beck-end

## For task-3:

endpoints:
- GET - https://0rzafcr3yh.execute-api.eu-west-1.amazonaws.com/dev/products
- GET - https://0rzafcr3yh.execute-api.eu-west-1.amazonaws.com/dev/products/{productId}

Mock data for testing: ./utils/mock-data.ts

link on for FE PR: https://github.com/Max-Sv/shop-angular-cloudfront/pull/2/files
link on FE: https://d2sqr7ze13s3vc.cloudfront.net/

### Example: 

get: https://nb4n80eqq2.execute-api.eu-west-1.amazonaws.com/dev/products/7567ec4b-b10c-48c5-9445-fc73c48a80a2

should return : {
"count": 2,
"description": "The Xbox One is a home video game console developed by Microsoft. Announced in May 2013, it is the successor to Xbox 360 and the third base console in the Xbox series of video game consoles. It was first released in North America, parts of Europe, Australia, and South America in November 2013 and in Japan, China, and other European countries in September 2014.",
"id": "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
"price": 200,
"title": "Xbox One S"
}