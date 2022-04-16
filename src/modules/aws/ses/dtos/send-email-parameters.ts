export interface SendEmailParameters {
  from: string;
  destination: {
    cc?: string[];
    bcc?: string[];
    to: string[];
  };
  subject: string;
  html: string;
  text: string;
}
