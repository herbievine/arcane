import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { WalletModule } from './wallet/wallet.module'

@Module({
  imports: [WalletModule, ConfigModule.forRoot()],
})
export class AppModule {}
