import { Chain } from 'src/types/Chain'

const supportedChains: Chain[] = [
  {
    name: 'Ethereum',
    internalName: 'eth',
    path: 'ethereum',
    symbol: 'ETH',
    validation: /^0x[a-fA-F0-9]{40}$/,
  },
  {
    name: 'Avalanche',
    internalName: 'avalanche',
    path: 'avalanche',
    symbol: 'AVAX',
    validation: /^0x[a-fA-F0-9]{40}$/,
  },
  {
    name: 'Polygon',
    internalName: 'polygon',
    path: 'polygon',
    symbol: 'MATIC',
    validation: /^0x[a-fA-F0-9]{40}$/,
  },
  {
    name: 'Binance Smart Chain',
    internalName: 'bsc',
    path: 'bsc',
    symbol: 'BNB',
    validation: /^0x[a-fA-F0-9]{40}$/,
  },
  {
    name: 'Fantom',
    internalName: 'fantom',
    path: 'fantom',
    symbol: 'FTM',
    validation: /^0x[a-fA-F0-9]{40}$/,
  },
]

export { supportedChains }
