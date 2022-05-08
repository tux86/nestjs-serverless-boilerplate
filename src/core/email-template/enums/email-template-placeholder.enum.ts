export enum EmailTemplatePlaceholderName {
  // organization data
  OrganizationName = '{{{organization_name}}}',
  // user data
  UserGivenName = '{{{user_given_name}}}',
  UserFamilyName = '{{{user_family_name}}}',
  UserEmail = '{{{user_email}}}',
  PlainPassword = '{{{plain_password}}}',
}

//
// registerEnumType(EmailTemplatePlaceholderName, {
//   name: 'EmailTemplatePlaceholderName',
// });
