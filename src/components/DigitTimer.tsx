import React, { useState } from 'react'
import useI18n from 'hooks/useI18n'
import Countdown, { zeroPad } from 'react-countdown'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

interface DigitTimerProps {
  heading: string
  text: string
  timeStamp?: any
}

const CountdownText = styled.span`
  font-size: 16px;
  color: #ffffff;
  background: ${(props) => props.theme.card.background};
  border-radius: 16px;
  width: 230px;
  margin-top: 5px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 32px;
  }
`

const TimerModal: React.FC<DigitTimerProps> = ({heading, text, timeStamp }) => {
  const TranslateString = useI18n()
  const dispatch = useDispatch()
  const [countdownDate, setCountdownDate] = useState(timeStamp)

  const CountdownTime = ({days, hours, minutes, seconds, completed }) => {
    return (
        <CountdownText>
        <span>{heading}</span>
        {!completed ?
            <>
                <span style={{ fontSize: '32px', paddingTop: '10px', paddingBottom: '5px', color: '#FFFFFF', fontWeight: 800 }}>{zeroPad(days)} : {zeroPad(hours)} : {zeroPad(minutes)} : {zeroPad(seconds)}</span>
                <span>Days : Hours : Minutes : Seconds</span>
            </>
            :
            <>
                <span>{text}</span>
            </>
        }
    </CountdownText>
    )
  }


  return (
    <Countdown date={countdownDate} zeroPadTime={2} renderer={CountdownTime}/>
  )
}

export default TimerModal
