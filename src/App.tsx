import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import PageLoader from './components/PageLoader'
import NftGlobalNotification from './views/Nft/components/NftGlobalNotification'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const Referrals = lazy(() => import('./views/Referrals'))
const NotFound = lazy(() => import('./views/NotFound'))
const ComingSoon = lazy(() => import('./views/Comingsoon'))
const Presale = lazy(() => import('./views/Presale'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const { account, connect } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])
  const referrer = new URLSearchParams(window.location.search).get('ref')
  if (referrer != null) {
    window.localStorage.setItem('referrer', new URLSearchParams(window.location.search).get('ref'));
  }
  useFetchPublicData()

  return (
    <Router>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/presale">
              <Presale />
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/comingsoon">
              <ComingSoon/>
            </Route>
            <Route path="/nests">
              <Farms tokenMode />
            </Route>
            <Route path="/referrals">
              <Referrals />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Menu>
      <NftGlobalNotification />
    </Router>
  )
}

export default React.memo(App)
