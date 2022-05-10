const PASCAL_CASE_REGEX = /^[A-Z][a-z\d]+(?:[A-Z][a-z\d]+)*$/;

export const isPascalCase = (value: unknown): boolean =>
  typeof value === 'string' && value.match(PASCAL_CASE_REGEX) !== null;
