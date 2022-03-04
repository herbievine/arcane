import { SupportedPaths } from './Chain'

export interface Tokens {
  [x: string]: Token
}

export type Token = {
  name: string
  symbol: string
  image: string
  addresses: {
    [E in SupportedPaths]?: string
  }
}
