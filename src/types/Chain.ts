export interface Chain {
  name: string
  internalName: string
  path: SupportedPaths
  symbol: string
  validation: RegExp
}

export type SupportedPaths =
  | 'ethereum'
  | 'bsc'
  | 'avalanche'
  | 'polygon'
  | 'fantom'
