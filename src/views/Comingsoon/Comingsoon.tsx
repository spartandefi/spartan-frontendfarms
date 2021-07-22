
import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'



const Hero = styled.div`
  align-items: center;
  background-color: #27262c;
  background-position: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
  border-radius: 16px;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-color: #27262c;
    background-position: center;
    height: 165px;
    padding-top: 0;
  }
`



const Comingsoon: React.FC = () => {
    return (
        <Page>
            <Hero>
                <Heading as="h1" size="xl" mb="24px" color="secondary">
                    {"Will be available after farm starts "}
                </Heading>
                <Text>Stay tune to our social media channels for exact details</Text>
            </Hero>
        </Page>
    )
}

export default Comingsoon
