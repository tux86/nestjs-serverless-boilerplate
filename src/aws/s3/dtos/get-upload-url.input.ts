export interface GetUploadUrlInput {
  bucketName: string;
  baseDir: string;
  fileName: string;
  contentType: string;
  expiresIn: number;
  metadata?: {
    [key: string]: string;
  };
}
