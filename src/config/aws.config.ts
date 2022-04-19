export default {
  accountId: process.env.AWS_ACCOUNT_ID,
  region: process.env.AWS_REGION,
  cognito: {
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    clientId: process.env.COGNITO_CLIENT_ID,
    authority: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
  },
  sqs: {
    elasticMQEndpoint: process.env.EMQ_ENDPOINT,
    emailQueueName: process.env.EMAIL_QUEUE_NAME,
  },
};
