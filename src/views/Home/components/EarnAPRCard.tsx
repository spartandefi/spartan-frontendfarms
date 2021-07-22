import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton } from '@pancakeswap-libs/uikit'
import max from 'lodash/max'
import { NavLink } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { QuoteToken } from 'config/constants/types'
import { useFarms, usePriceBnbBusd, usePriceCakeBusd } from 'state/hooks'

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }

  transition: opacity 200ms;
  &:hover {
    opacity: 0.65;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
`
const EarnAPRCard = () => {
    const farms = useFarms()
    const cakePrice = usePriceCakeBusd()
    const bnbPrice = usePriceBnbBusd()

    const highestApr = useMemo(() => {
        const aprs = farms
            // Filter inactive farms, because their theoretical APR is super high. In practice, it's 0.
            .filter((farm) => farm.multiplier !== '0X')
            .map((farm) => {
                if (farm.lpTotalInQuoteToken) {
                    const BLOCKS_PER_YEAR = new BigNumber(15768000)
                    const orcaRewardPerBlock = new BigNumber(farm.goblinPerBlock || 0.3).times(new BigNumber(farm.poolWeight)).div(new BigNumber(10).pow(18))
                    const orcaRewardPerYear = orcaRewardPerBlock.times(BLOCKS_PER_YEAR)

                    let apy = cakePrice.times(orcaRewardPerYear);
                    let totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0);

                    // console.log("EarnAPRCard", farm.tokenSymbol, farm.lpSymbol, "\n\napy", apy.toString(), "\n\ntotalValue", totalValue.toString())

                    if (farm.quoteTokenSymbol === QuoteToken.BNB) {
                        totalValue = totalValue.times(bnbPrice);
                        // console.log("EarnAPRCard", "\n\ntotalValueUpdated_WMATIC", totalValue.toString())
                    }

                    if (totalValue.comparedTo(0) > 0) {
                        apy = apy.div(totalValue);
                        // console.log("EarnAPRCard", "\n\nadjsutedAPY", apy.toString())
                    }
                    return { apy }
                }
                return null
            })
        const maxApr = max(aprs)
        return maxApr
    }, [cakePrice, bnbPrice, farms])

    return (
        <StyledFarmStakingCard>
            <NavLink exact activeClassName="active" to="/farms" id="farm-apr-cta">
                <CardBody>
                    <Heading color="contrast" size="lg">
                        Earn up to
                    </Heading>
                    <CardMidContent color="secondary">
                        {highestApr ? `${Number(highestApr.apy.toNumber() * 100).toFixed(2)}% ${'APR'}` : <Skeleton animation="pulse" variant="rect" height="44px" />}
                    </CardMidContent>
                    <Flex justifyContent="space-between">
                        <Heading color="contrast" size="lg">
                            in Farms
                        </Heading>
                        <ArrowForwardIcon mt={30} color="primary" />
                    </Flex>
                </CardBody>
            </NavLink>
        </StyledFarmStakingCard>
    )
}

export default EarnAPRCard
