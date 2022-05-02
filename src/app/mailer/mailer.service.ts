// import { Injectable } from '@nestjs/core';
// import { SESService } from '../aws/ses/ses.service';
// import { EmailTemplateName } from '../email-template/enums/email-template-name.enum';
// import { EmailTemplatePlaceholder } from '../email-template/enums/email-template-placeholder.enum';
// import Mustache from "mustache";
//
// interface MailerSendEmailParameters {
//   templateName: EmailTemplateName;
//   from: string;
//   destination: {
//     cc?: string[];
//     bcc?: string[];
//     to: string[];
//   };
//   subject: string;
//   variables?: {
//     name: EmailTemplatePlaceholder;
//     value: string | number;
//   }[];
// }
// @Injectable()
// export class MailerService {
//   constructor(private sesService: SESService) {}
//
//   async sendEmail(parameters: MailerSendEmailParameters): Promise<void> {
//     const { templateName, from, subject, destination, variables } = parameters;
//
//
//     const subjectRendered = Mustache.render(subject, variables || {})
//
//     await this.sesService.sendEmail({
//       from,
//       destination,
//       subject,
//       bodyText,
//       bodyHtml,
//     });
//   }
// }
