import { IsSupportedChain } from 'src/decorators/isSupportedChain'
import { IsValidAddress } from 'src/decorators/isValidAddress'

export class WalletDto {
  @IsSupportedChain({ message: 'Chain unsupported' })
  network: string

  @IsValidAddress('network', {
    message: 'Address does not match the given network',
  })
  address: string
}
