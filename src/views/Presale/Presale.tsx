import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Image, Heading, BaseLayout, Card, CardBody, CardFooter, Text } from '@pancakeswap-libs/uikit'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Countdown, { zeroPad } from 'react-countdown'
import Page from 'components/layout/Page'
import { usePresaleData } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchUserTokensUnclaimedDataAsync, fetchTokensLeftDataAsync, fetchUserPresaleAllowanceDataAsync, fetchUserBalanceDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import UnlockButton from 'components/UnlockButton'
import { getBalanceNumber } from 'utils/formatBalance'
import CircleTimer from 'components/CircleTimer'
import DigitTimer from 'components/DigitTimer'
import UnlockWalletCard from './components/UnlockWalletCard'
import BuyCard from './components/BuyCard'
import styles from './styles/presale.module.css'

export interface PresaleProps {
  tokenMode?: boolean
}

const Glow = keyframes`
  from {
    box-shadow:0px 0px 5px 2px #52c41a;
  }
  to {
    box-shadow:0px 0px 15px 10px #52c41a;
  }
`

const PresaleCountDownCard = styled(Card)`
  animation: ${Glow} 1s infinite alternate;
`

const Header = styled.div`
  align-items: center;
  background-image: url('/images/presalebanner.gif');
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: auto;
  padding-top: 20px;
  text-align: center;
  background-size: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-position: center;
    background-image: url(/images/presalebanner.gif);
    background-size: 100%;
    height: 220px;
    padding-top: 0;
  }
  
`

const PresaleCard = styled.div`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`

const CountdownText = styled.span`
  font-size: 16px;
  color: #d2691e;
  background: ${(props) => props.theme.card.background};;
  padding: 16px;
  border-radius: 16px;
  width: 230px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-right: auto;
    margin-left: 32px;
    margin-bottom: 32px;
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

const Presale: React.FC = () => {
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const presale = usePresaleData()

  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    if (account) {
      dispatch(fetchUserTokensUnclaimedDataAsync(account))
      dispatch(fetchUserPresaleAllowanceDataAsync(account))
      dispatch(fetchUserBalanceDataAsync(account))
    }
    dispatch(fetchTokensLeftDataAsync())
  }, [account, dispatch, slowRefresh])
  // tochange block number and launch timestamp, rmb change the busdPerToken
  // tochange to launch timer when presale ends
  const REACT_BSC_API_KEY = "M9EPE6TRSEAEYSE1D1XY8QKN2B6QIVGD1C"
  const PRESALE_BLOCKNUMBER = 8948888
  const [presaleCountdownDate, setPresaleCountdownDate] = useState(0)
  // const [launchCountdownDate, setLaunchCountdownDate] = useState(1625014800000)
  const [loading, setLoading] = useState(true);
  const [launchCountdownDate, setLaunchCountdownDate] = useState(0)

  useEffect(() => {
    fetch(`https://api.bscscan.com/api?module=block&action=getblockcountdown&blockno=${PRESALE_BLOCKNUMBER}&apikey=${REACT_BSC_API_KEY}`)
      .then(res => res.json().then(data =>
        setPresaleCountdownDate(Number(Date.now() + data.result.EstimateTimeInSec * (10 ** 3)
        ))))
    setLaunchCountdownDate(1626051600000)
  }, [])

  useEffect(() => {
    if (presaleCountdownDate !== 0) {
      setLoading(false)
    }
  }, [presaleCountdownDate])

  return (
    <Page>
      <Header />
      <div style={{ margin: '32px' }}>
        <PresaleCountDownCard>
          <CardBody>
            {!loading ?
              <div style={{ display: "table", marginLeft: "auto", marginRight: "auto" }}>
                <Heading>Presale has ended!</Heading>
                {/* <CircleTimer endTime={launchCountdownDate * 10 ** (-3)} baseColor="#f6ffed" activeColor="#52c41a" title=""/> */}
                {/* <DigitTimer heading='Presale-End/Launch Countdown' text='Presale ended!' timeStamp={launchCountdownDate} /> */}
              </div>
              :
              <Text>Connecting to BSC! Give us a minute...</Text>
            }
          </CardBody>
        </PresaleCountDownCard>
        <br />
        {/* <Card>
          <CardBody>What will your funding be used for</CardBody>
          <CardFooter>
            - 25% goes to providing liquditiy
            - 50% goes to marketing
            - 25% goes to the dev funds
          </CardFooter>
        </Card> */}
        <br />
        <Cards>
          <Card className={styles.card}>
            <CardBody>Presale Information</CardBody>
            <CardFooter>
              <div className={styles.flex}>
                {/* <div className={styles.item}>Number of Presale Tokens remaining: <span className={styles.colored}>{Math.floor(getBalanceNumber(presale.tokensLeft))}</span></div>
                <div className={styles.item}>Number of Tokens Sold: <span className={styles.colored}>{100000 - Math.floor(getBalanceNumber(presale.tokensLeft))}</span></div> */}
                <div>Presale ended</div>
              </div>
            </CardFooter>
          </Card>
          <Card className={styles.card}>
            <CardBody>Your Presale SPARTAN</CardBody>
            <CardFooter>{!account ? <UnlockButton mt="8px" fullWidth /> :
              <div className={styles.flex}>
                <div className={styles.item}>SPARTAN unclaimed: <span className={styles.colored}>{getBalanceNumber(presale.tokensUnclaimed)}</span></div>
                <div className={styles.item}>SPARTAN in wallet: <span className={styles.colored}>{getBalanceNumber(presale.cakeBalance)}</span></div>
              </div>
            }</CardFooter>
          </Card>
        </Cards>
        <BuyCard account={account} ethereum={ethereum} allowance={presale.userAllowance} busdBalance={presale.busdBalance} tokensUnclaimed={presale.tokensUnclaimed} tokenBalance={presale.cakeBalance} tokensLeft={presale.tokensLeft} />
      </div>
    </Page>
  )
}

export default Presale
