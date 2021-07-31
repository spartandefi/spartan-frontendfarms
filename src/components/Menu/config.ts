import { MenuEntry } from '@pancakeswap-libs/uikit'
import { getCakeAddress } from 'utils/addressHelpers'

const tokenAddress = getCakeAddress()
const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Presale',
    icon: 'TicketIcon',
    href: '/presale',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: `https://exchange.pancakeswap.finance/#/swap?outputCurrency=${tokenAddress}`,// toChange
      },
      {
        label: 'Liquidity',
        href: 'https://exchange.pancakeswap.finance/#/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms'
  },
  {
    label: 'Nests',
    icon: 'PoolIcon',
    href: '/nests'
  },
  {
    label: 'Price Chart (Available at Launch)',
    icon: 'InfoIcon',
    href: `https://poocoin.app/tokens/${tokenAddress}`
  },
  {
    label: 'Features',
    icon: 'HamburgerIcon',
    items: [
      {
        label: 'Tax Free on Native Staking',
        href: ''
      },
      {
        label: 'Transfer Tax Automatic Liquidity',
        href: '',
      },
      {
        label: 'Emission Reduction',
        href: '',
      },
      {
        label: 'Layered Farming',
        href: '',
      },
      {
        label: 'NFT',
        href: '',
      }
    ],
  },
  {
    label: 'Roadmap',
    icon: 'RoadmapIcon',
    href: ''
  },
  {
    label: 'Reviews & Audits',
    icon: 'AuditIcon',
    href: ''
  },
  {
    label: 'Read More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Docs',
        href: '',
      },
    ],
  }
]

export default config
