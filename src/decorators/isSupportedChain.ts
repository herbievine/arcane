import { registerDecorator, ValidationOptions } from 'class-validator'
import { supportedChains } from 'src/utils/supportedChains'

export const IsSupportedChain = (validationOptions?: ValidationOptions) => {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: 'isSupportedChain',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          const currentChain = supportedChains.find(
            (chain) => chain.path === value,
          )

          return !!currentChain
        },
      },
    })
  }
}
