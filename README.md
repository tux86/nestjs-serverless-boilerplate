# Serverless Multi-tenant NestJS backend "Boilerplate" 

Serverless Multi-tenant monolithic backend app made with NestJS 8 + Serverless Framework

## Features: 
testing  


sdfdsf
dsfdsf
### NestJS:
* NestJS 8 + Fastify + TypeORM
* NestJS/Graphql - multiple endpoints (public, management, internal)
* Pagination, sort, search and filtering for Rest & Graphql APIs
* Includes Buniness logic Exceptions with namespaced codes
* Using Exception filters and logging
* custom validators

### IAC Serverless Framework (AWS):
* Serverless Framework 3
* serverless-offline (full working local envrionnement with aws services mocking)
* single Lambda function aka. mono-lambda
* use of Lambda function URLs instead of Lambda + Api Gateway
* Custom domain endpoints (Route53 → Cloudfront → Lambda)
* arm64 architecture for lambda
* using 100% aws-sdk (v3)
* AWS Cognito JWT token validation with AuthGuard

### Core modules:

#### AWS Modules:

* Cognito module
* SQS module: SQS producer/consumer (use of NestJS Standalone application for consumer)
* SES module (inspired by **@ssut/nestjs-sqs**) https://www.npmjs.com/package/@ssut/nestjs-sqs
* S3 module
* SecretsManager module: used by database module to load db credentials

### Other topics
* Semantic Versioning: https://github.com/0xb4lamx/nestjs-boilerplate-microservice/blob/master/docs/guidelines.md

    
## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:{app-name}:dev

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
