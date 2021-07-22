import React, { useState, useCallback, Fragment, useEffect } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Input } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useReferrals } from 'state/hooks'
import { useWallet } from '@binance-chain/bsc-use-wallet'

const ReferralCountCard = styled(Card)`
  background-color: #27262c;
  min-height: 376px;
  display: flex;
  justify-content: center;
`

const Actions = styled.div`
  margin-top: 12px;
`

const ReferralCount = () => {
    const { account } = useWallet()
    const TranslateString = useI18n()
    const referrals = useReferrals(account)
    const [totalReferrals, setTotalReferrals] = useState<number>(0)
    const [totalReferralCommisions, setTotalReferralCommisions] = useState<number>(Number(0))

    useEffect(() => {
      setTotalReferrals(referrals.totalReferrals)
      setTotalReferralCommisions(referrals.totalReferralCommissions)
    }, [referrals])
  
    
    return (
        <ReferralCountCard>
            <CardBody>
                <Heading size="l" mb="24px">
                    {TranslateString(850, 'Total Referrals')}
                </Heading>
                <Input type="text" value={totalReferrals} isSuccess />
                <Heading size="l" mb="24px" style={{marginTop:'12px'}}>
                    Total commissions
                </Heading>
                <Input type="text" value={totalReferralCommisions} isSuccess />
            </CardBody>
        </ReferralCountCard>
    )
}

export default ReferralCount
