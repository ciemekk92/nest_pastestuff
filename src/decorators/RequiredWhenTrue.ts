import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions
} from 'class-validator';
import { isDefined } from '../utils/isDefined';

export function RequiredWhenTrue(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'requiredWhenDefined',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          console.log({ value, relatedValue, relatedPropertyName });

          return (
            !relatedValue ||
            (isDefined(value) &&
              typeof relatedValue === 'boolean' &&
              Boolean(relatedValue))
          );
        }
      }
    });
  };
}
