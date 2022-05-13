import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator';
import { isPascalCase } from '../is-pascal-case.validator';

export const IS_PASCAL_CASE = 'isPascalCase';

export function IsPascalCase(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_PASCAL_CASE,
      constraints: [],
      validator: {
        validate: (value, args): boolean => isPascalCase(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property must be PascalCase',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
