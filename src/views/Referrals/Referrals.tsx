import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout, CardBody, Card } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import UnlockButton from 'components/UnlockButton'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import ReferralLink from './components/ReferralLink'
import ReferralCount from './components/ReferralCount'

const Hero = styled.div`
  align-items: center;
  background-color: #27262c;
  background-position: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
  border-radius: 16px;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-color: #27262c;
    background-position: center;
    height: 165px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 48px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const ReferralUnlockCard = styled(Card)`
background-color: #27262c;
min-height: 376px;
display: flex;
justify-content: center;
`

const Actions = styled.div`
  margin-top: 6px;
`

const Referrals: React.FC = () => {
    const TranslateString = useI18n()
    const { account } = useWallet()
    return (
        <Page>
            <Hero>
                <Heading as="h1" size="xl" mb="24px" color="secondary">
                    {TranslateString(820, 'Goblin Finance Referral')}
                </Heading>
                <Text>Share the referral link and earn 7% of your friends earnings</Text>
            </Hero>
            {account
                ?
                <Cards>
                    <ReferralLink account={account} />
                    <ReferralCount/>
                </Cards>
                :
                <ReferralUnlockCard>
                    <CardBody>
                        <Heading size="l" mb="64px">
                            {TranslateString(830, 'Unlock your wallet and recieve a unique referral link')}
                        </Heading>
                        <Actions>
                            <UnlockButton fullWidth />
                        </Actions>
                    </CardBody>
                </ReferralUnlockCard>
            }
        </Page>
    )
}

export default Referrals


