FROM public.ecr.aws/lambda/nodejs:14-arm64

COPY  dist ${LAMBDA_TASK_ROOT}/dist
COPY  node_modules ${LAMBDA_TASK_ROOT}/node_modules

# CMD [ "handler.main" ]
