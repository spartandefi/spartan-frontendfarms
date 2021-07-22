import React, { useState } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, Input } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'

const ReferralLinkCard = styled(Card)`
background-color: #27262c;
min-height: 376px;
display: flex;
justify-content: center;
`

const Actions = styled.div`
  margin-top: 12px;
`

const ReferralLink = (props) => {
    const TranslateString = useI18n()
    const [copied, setCopyState] = useState(false)
    const {account} = props
    const copyLink = () => {
        navigator.clipboard.writeText(`https://www.goblinfinance.com/?ref=${account}`)
        setCopyState(true)
    }
    return (
        <ReferralLinkCard>
            <CardBody>
                <Heading size="l" mb="24px">
                    {TranslateString(838, 'Your unique Referral Link')}
                </Heading>
                <Input type="text" value={`https://www.goblinfinance.com/?ref=${account}`} isWarning />
                <Actions>
                    <Button
                        onClick={copyLink}
                        fullWidth
                    >
                        {copied ? TranslateString(848, 'Copied') : TranslateString(840, 'Copy')}
                    </Button>
                </Actions>
            </CardBody>
        </ReferralLinkCard>
    )
}

export default ReferralLink
