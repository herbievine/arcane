import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { utils } from 'ethers'
import { Chain } from 'src/types/Chain'
import { supportedChains } from 'src/utils/supportedChains'
import { WalletDto } from './wallet.dto'
import { supportedTokens } from '../utils/supportedTokens'

@Injectable()
export class WalletService {
  constructor(private readonly httpService: HttpService) {}

  public async getBalance({ address, network }: WalletDto) {
    const { validation, internalName, ...chain } = supportedChains.find(
      ({ path }) => path === network,
    )

    try {
      const balance: string = await new Promise((resolve) => {
        let nativeBalance: string

        this.httpService
          .get<{ balance: string }>(
            `https://deep-index.moralis.io/api/v2/${address}/balance?chain=${internalName}`,
            {
              headers: {
                Accept: 'application/json',
                'X-Api-Key': process.env.MORALIS_API_KEY,
              },
            },
          )
          .subscribe({
            next: (data) => {
              nativeBalance = utils.formatEther(data?.data?.balance)
            },
            complete: () => {
              resolve(nativeBalance)
            },
          })
      })

      const erc20Balances = await new Promise(async (resolve) => {
        const tokensForChain = Object.values(supportedTokens).filter(
          ({ addresses }) => !!addresses[chain.path],
        )

        resolve(
          await new Promise((resolve) => {
            const tokenBalances = []

            this.httpService
              .get<{ token_address: string; balance: string }[]>(
                `https://deep-index.moralis.io/api/v2/${address}/erc20?chain=${internalName}`,
                {
                  headers: {
                    Accept: 'application/json',
                    'X-Api-Key': process.env.MORALIS_API_KEY,
                  },
                },
              )
              .subscribe({
                next: (data) => {
                  data?.data?.forEach(({ token_address, balance }) => {
                    tokensForChain.forEach(
                      (token) =>
                        token.addresses[chain.path].toLowerCase() ===
                          token_address &&
                        tokenBalances.push({
                          ...token,
                          balance: utils.formatEther(balance),
                        }),
                    )
                  })
                },
                complete: () => {
                  resolve(tokenBalances)
                },
              })
          }),
        )
      })

      return {
        chain,
        nativeBalance: balance,
        tokens: erc20Balances,
      }
    } catch (error) {
      // TODO handle error
    }
  }

  public getChains(): Omit<Chain, 'validation' | 'internalName'>[] {
    return supportedChains.map(
      ({ validation, internalName, ...chain }) => chain,
    )
  }
}
