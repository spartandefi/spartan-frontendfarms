import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Countdown, { zeroPad } from 'react-countdown'
import { Card, CardBody, Heading, Text, CardFooter, Button, Tag, Skeleton } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import CircleTimer from 'components/CircleTimer'
import DigitTimer from 'components/DigitTimer'

const Glow = keyframes`
  from {
    box-shadow:0px 0px 5px 2px #ffc42e;
  }
  to {
    box-shadow:0px 0px 15px 10px #ffc42e;
  }
`

const StyledCountDownCard = styled(Card)`
  display: flex;
  flex-direction: column;
  animation: ${Glow} 1s infinite alternate;
`

const CountDownCard = () => {
    const [presaleCountdownDate, setPresaleCountdownDate] = useState(0)
    const [farmCountdownDate, setFarmCountdownDate] = useState(0)
    const [launchCountdownDate, setLaunchCountdownDate] = useState(0)
    const [loading, setLoading] = useState(true);
    const REACT_BSC_API_KEY = "M9EPE6TRSEAEYSE1D1XY8QKN2B6QIVGD1C"
    const PRESALE_BLOCKNUMBER = 8948888
    const FARMING_BLOCKNUMBER = 9266133
    const getPresaleTime = () => {
        fetch(`https://api.bscscan.com/api?module=block&action=getblockcountdown&blockno=${PRESALE_BLOCKNUMBER}&apikey=${REACT_BSC_API_KEY}`)
            .then(res => res.json().then(data =>
                setPresaleCountdownDate(Number(Date.now() + data.result.EstimateTimeInSec * (10 ** 3)
                ))))
    }

    const getFarmTime = () => {
        fetch(`https://api.bscscan.com/api?module=block&action=getblockcountdown&blockno=${FARMING_BLOCKNUMBER}&apikey=${REACT_BSC_API_KEY}`)
            .then(res => res.json().then(data =>
                setFarmCountdownDate(Number(Date.now() + data.result.EstimateTimeInSec * (10 ** 3)
                ))))
    }
    useEffect(() => {
        getFarmTime()
        getPresaleTime()
        setLaunchCountdownDate(1626051600000)
    }, [])

    // tochange timings and block number
    // tochange remove manually when end

    useEffect(() => {
        if (presaleCountdownDate !== 0 && launchCountdownDate !== 0 && farmCountdownDate !== 0) {
            setLoading(false)
        }
    }, [presaleCountdownDate, launchCountdownDate, farmCountdownDate])

    return (
        !loading ?
            <div style={{ marginBottom: "48px" }}>
                <StyledCountDownCard>
                    <CardBody>
                        <Heading size="xl" mb="24px">
                            Schedules
                        </Heading>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                            <div>
                                <Tag>Coming up next </Tag>
                                <div style={{ display: "flex", paddingTop: "20px" }}>
                                    {/* <CircleTimer endTime={presaleCountdownDate * 10 ** (-3)} baseColor="#f6ffed" activeColor="#ffc42e" title="Start of Presale!" /> */}
                                    <DigitTimer heading='Harvest ready in ' text='You can harvest now' timeStamp={farmCountdownDate} />
                                </div>
                                <a href="/presale"><Button>Join our presale NOW!</Button></a>
                            </div>
                            {/* <div style={{ marginLeft: "20%" }}>
                                <Tag>Other timings </Tag>
                                <div style={{ display: "flex", flexDirection: "column", paddingTop: "20px" }}>
                                    <DigitTimer heading='Farming Start' text='Farming has started!' timeStamp={farmCountdownDate} />
                                </div>
                            </div> */}
                        </div>
                    </CardBody>
                    <CardFooter>
                        <a href="https://t.me/Spartan_Finance"><Button>Join our channel for latest updates</Button></a>
                    </CardFooter>
                </StyledCountDownCard>
            </div>
            :
            <div style={{ marginBottom: "48px" }}>
                <StyledCountDownCard>
                    <CardBody>
                        <Text>Give us a minute...</Text>
                    </CardBody>
                </StyledCountDownCard>
            </div>
    )
}

export default CountDownCard
