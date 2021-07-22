import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout, Card } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import Countdown, { zeroPad } from 'react-countdown'
import FarmStakingCard from './components/FarmStakingCard'
import CakeStats from './components/CakeStats'
import TotalValueLockedCard from './components/TotalValueLockedCard'
import TwitterCard from './components/TwitterCard'
import CountDownCard from './components/CountDownCard'
import AddTokenCard from './components/AddTokenCard'
import EarnAssetCard from './components/EarnAssetCard'
import EarnAPRCard from './components/EarnAPRCard'
import WinCard from './components/WinCard'

const Hero = styled.div`
  align-items: center;
  background-position: center;
  background-image: url(/images/websitebanner.gif);
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
  background-size: cover;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-position: center;
    background-image: url(/images/websitebanner.gif);
    background-size: 100%;
    height: 220px;
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

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 24px;
  grid-gap: 24px;
  & > div {
    grid-column: span 6;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 32px;
    grid-gap: 32px;
    & > div {
      grid-column: span 4;
    }
  }
`

const Home: React.FC = () => {

  return (
    <Page>
      <Hero />
      <div>
      <CountDownCard />
        <Cards>
          <FarmStakingCard />
          <AddTokenCard/>
        </Cards>
        <CTACards>
          <EarnAPRCard />
          <WinCard />
          <EarnAssetCard />
        </CTACards>
        <Cards>
          <CakeStats />
          <TotalValueLockedCard />
        </Cards>
        <TwitterCard />
      </div>
    </Page>
  )
}

export default Home
