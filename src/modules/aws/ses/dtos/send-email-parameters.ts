export interface SendEmailParameters {
  from: string;
  destination: {
    cc?: string[];
    bcc?: string[];
    to: string[];
  };
  subject: string;
  bodyHtml: string;
  bodyText: string;
}
