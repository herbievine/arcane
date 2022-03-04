import { Controller, Get, Param } from '@nestjs/common'
import { WalletDto } from './wallet.dto'
import { WalletService } from './wallet.service'

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('/:network/:address')
  async balance(@Param() payload: WalletDto) {
    return {
      data: await this.walletService.getBalance(payload),
    }
  }

  @Get('/chains')
  async chains() {
    return {
      data: this.walletService.getChains(),
    }
  }
}
