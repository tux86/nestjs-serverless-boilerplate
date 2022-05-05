/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateEmailTemplateInput {
  bodyHtml?: Nullable<string>;
  bodyText?: Nullable<string>;
  name: string;
  subject: string;
}

export class CreateUserInput {
  age?: Nullable<number>;
  name?: Nullable<string>;
}

export class EmailTemplate {
  bodyHtml?: Nullable<string>;
  bodyText?: Nullable<string>;
  createdAt?: Nullable<string>;
  deletedAt?: Nullable<string>;
  emailTemplateId: string;
  name: string;
  orgId: string;
  subject: string;
  updatedAt?: Nullable<string>;
}

export class EmailTemplatePlaceholder {
  name: string;
  value?: Nullable<string>;
}

export abstract class IMutation {
  abstract createEmailTemplate(
    input?: Nullable<CreateEmailTemplateInput>,
  ): Nullable<EmailTemplate> | Promise<Nullable<EmailTemplate>>;

  abstract createUser(
    createUserInput?: Nullable<CreateUserInput>,
  ): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IQuery {
  abstract emailTemplatePlaceholders():
    | Nullable<Nullable<EmailTemplatePlaceholder>[]>
    | Promise<Nullable<Nullable<EmailTemplatePlaceholder>[]>>;

  abstract emailTemplates():
    | Nullable<Nullable<EmailTemplate>[]>
    | Promise<Nullable<Nullable<EmailTemplate>[]>>;

  abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

  abstract users():
    | Nullable<Nullable<User>[]>
    | Promise<Nullable<Nullable<User>[]>>;
}

export abstract class ISubscription {
  abstract userCreated(): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
  age?: Nullable<number>;
  id?: Nullable<number>;
  name?: Nullable<string>;
}

type Nullable<T> = T | null;
