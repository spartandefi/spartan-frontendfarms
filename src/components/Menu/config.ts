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
    label: 'Referral',
    icon: 'GroupsIcon',
    href: '/referrals',
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
        label: 'Harvest Lockup',
        href: 'https://docs.goblinfinance.com/features/automatic-harvest-lock',
      },
      {
        label: 'Tax Free on Native Staking',
        href: 'https://docs.goblinfinance.com/features/new-transfer-tax'
      },
      {
        label: 'Transfer Tax Automatic Liquidity',
        href: 'https://docs.goblinfinance.com/features/automatic-liquidity',
      },
      {
        label: 'Emission Reduction',
        href: 'https://docs.goblinfinance.com/features/automatic-emission-reduction',
      },
      {
        label: 'Layered Farming',
        href: 'https://docs.goblinfinance.com/features/layered-farming',
      },
      {
        label: 'NFT',
        href: 'https://docs.goblinfinance.com/features/nft',
      }
    ],
  },
  {
    label: 'Roadmap',
    icon: 'RoadmapIcon',
    href: 'https://docs.goblinfinance.com/roadmap'
  },
  {
    label: 'How are we SAFU?',
    icon: 'AuditIcon',
    href: "https://docs.goblinfinance.com/code-security"
  },
  {
    label: 'Read More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/GoblinFinance',
      },
      {
        label: 'Docs',
        href: 'https://docs.goblinfinance.com/',
      },
    ],
  }
]

export default config
