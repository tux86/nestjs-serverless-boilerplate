/**
 * Remember to encrypt sensitive data of the JWT payload as the payload can be
 * seen in plain-text when decoded with a JWT library.
 */
export interface JwtTokenPayload {
  /**
   * this field will contain the unique user name.
   *
   * I don't use the users email here because it might change over time which
   * must be then considered in the token strategy. I also don't use the
   * database uuid here, as I also don't consider it to be stable since it is
   * an auto-generated value and at some point the might be a data migration
   * which requires to change the uuid for the user. The unique user name is
   * considered to be stable over the lifetime of the user data record.
   */
  sub: string;
}
