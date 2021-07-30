import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon } from '@pancakeswap-libs/uikit'
import { NavLink } from 'react-router-dom'
import { getCakeAddress } from 'utils/addressHelpers'

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
const WinCard = () => {
  //   const { t } = useTranslation()
  const tokenAddress = getCakeAddress()

  return (
    <StyledFarmStakingCard>
      <a href={`https://exchange.pancakeswap.finance/#/swap?outputCurrency=${tokenAddress}`}>
        <CardBody>
          <CardMidContent color="#ffffff">Buy SPARTAN!</CardMidContent>
          <Flex justifyContent="space-between">
            <Heading color="contrast" size="lg" />
            <ArrowForwardIcon mt={30} color="primary" />
          </Flex>
        </CardBody>
      </a>
    </StyledFarmStakingCard>
  )
}

export default WinCard
