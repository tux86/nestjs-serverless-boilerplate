export interface CreatePreSignedPutUrlInput {
  key: string;
  expiresIn: number;
  metadata?: {
    [key: string]: string;
  };
}
