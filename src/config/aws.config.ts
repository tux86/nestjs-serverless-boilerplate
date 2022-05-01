export default {
  accountId: process.env.AWS_ACCOUNT_ID,
  region: process.env.AWS_REGION,
  cognito: {
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    clientId: process.env.COGNITO_CLIENT_ID,
    authority: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
  },
  s3: {
    bucketName: process.env.S3_BUCKET_NAME,
  },
  sqs: {
    localBrokerEndpoint: process.env.LOCAL_BROKER_ENDPOINT,
    queueNames: {
      emailQueue: process.env.EMAIL_QUEUE_NAME,
    },
  },
  ses: {
    defaultSenderAddress: process.env.DEFAULT_SENDER_ADDRESS,
    mailHog: {
      enabled: process.env.MAILHOG_ENABLED === 'true',
      host: process.env.MAILHOG_HOST,
      smtpPort: process.env.MAILHOG_SMTP_PORT,
      uiPort: process.env.MAILHOG_UI_PORT,
    },
  },
};
