import { GetObjectCommandInput } from '@aws-sdk/client-s3';
import { PutObjectCommandInput } from '@aws-sdk/client-s3/dist-types/commands/PutObjectCommand';
import { GetObjectOutput } from '@aws-sdk/client-s3/dist-types/models/models_0';

// get object types
export type GetObjectInput = Omit<GetObjectCommandInput, 'Bucket'>;
export type GetObjectResponse = GetObjectOutput;

// put object types
export type PutObjectInput = Omit<PutObjectCommandInput, 'Bucket'>;
