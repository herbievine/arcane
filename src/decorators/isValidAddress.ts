import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator'
import { supportedChains } from 'src/utils/supportedChains'

export const IsValidAddress = (
  property: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: 'isValidAddress',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(address: string, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          const relatedValue = (args.object as any)[relatedPropertyName]

          const currentChain = supportedChains.find(
            (chain) => chain.path === relatedValue,
          )

          if (currentChain) {
            return currentChain.validation.test(address)
          }

          return false
        },
      },
    })
  }
}
