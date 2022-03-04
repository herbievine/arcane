import { Module } from '@nestjs/common'
import { WalletService } from './wallet.service'
import { WalletController } from './wallet.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
  providers: [WalletService],
  controllers: [WalletController],
  imports: [HttpModule],
})
export class WalletModule {}
