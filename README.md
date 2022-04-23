# Nestjs serverless boilerplate

## Description

Features: 

    * NestJS 8
    * NestJS/Apollo Graphql Server
    * Serverless Framework 3
    * serverless-offline (full working local envrionnement with aws services mocking) 
    * architecture arm64 + Docker container image arm64
    * aws-sdk v3
    * SQS producer/consumer (use of NestJS Standalone application for consumer)
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
