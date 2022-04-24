import { registerEnumType } from "@nestjs/graphql";

export enum EmailTemplatePlaceholder {
  // organization data
  OrganizationName = "{{{organization_name}}}",
  // user data
  UserGivenName = "{{{user_given_name}}}",
  UserFamilyName = "{{{user_family_name}}}",
  UserEmail = "{{{user_email}}}",
  PlainPassword = "{{{plain_password}}}",
}

registerEnumType(EmailTemplatePlaceholder, {
  name: "EmailTemplatePlaceholder"
});
