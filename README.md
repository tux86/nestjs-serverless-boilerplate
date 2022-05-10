# Multi-tenant Service NestJS Boilerplate 

Serverless Multi-tenant monolithic backend app made with NestJS 8 + Serverless Framework

## Features: 

### Nest
* NestJS 8 + Fastify
* NestJS/Graphql - multiple endpoints (public, management, internal)
* Includes Buniness logic Exceptions with namespaced codes
* Using Exception filters and logging
* custom validators
### IAC Serverless Framework (AWS)
* Serverless Framework 3
* serverless-offline (full working local envrionnement with aws services mocking)
* single Lambda function aka. mono-lambda
* lambda funtion URLs
* Custom domain (Route53+Cloudfront)
* arm64 architecture for lambda
* using 100% aws-sdk (v3)
* SQS producer/consumer (use of NestJS Standalone application for consumer)
* AWS Cognito JWT token validation with AuthGuard

### Other topics
* Semantic Versioning
  [https://github.com/0xb4lamx/nestjs-boilerplate-microservice/blob/master/docs/guidelines.md]

    
## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
