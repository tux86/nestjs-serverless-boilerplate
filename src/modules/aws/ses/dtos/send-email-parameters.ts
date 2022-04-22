export interface SendEmailParameters {
  from: string;
  cc?: string[];
  bcc?: string[];
  to: string[];
  subject: string;
  html: string;
  text: string;
}
