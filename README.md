# Nestjs serverless poc

## Description

Features: 

    * NestJS 8
    * NestJS/Apollo Graphql Server (replacement of AppSync Service)
    * serverless framework (switch to version 3)
    * serverless-offline (full working local envrionnement with aws services mocking) 
    * architecture arm64 + Docker container image arm64
    * aws-sdk v3
    * SQS integration with NestJS Standalone applications
    * AWS Cognito JWT token validation with AuthGuard
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
