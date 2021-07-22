import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Timer from 'components/CircleTimer'

const StyledCountDownCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
`
const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`
// tochange

const LaunchCountDownCard = () => {
    const TranslateString = useI18n()

    return (
        <StyledCountDownCard>
            <CardBody>
                <Heading size="xl" mb="24px">
                    Launch Countdown
      </Heading>
                <Row>
                    <Text fontSize="14px">Tuesday, June 16, 2021 4:00:00 PM GMT</Text>
                </Row>
                <Row>
                    <Timer endTime={1623859200} activeColor='#ff7875' baseColor='#ffccc7'/>
                </Row>
            </CardBody>
        </StyledCountDownCard>
    )
}

export default LaunchCountDownCard
