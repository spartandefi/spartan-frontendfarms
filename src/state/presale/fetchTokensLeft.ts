import { AbiItem } from 'web3-utils'
import busdABI from 'config/abi/busd.json'
import { getPresaleAddress, getBusdAddress } from 'utils/addressHelpers'
import { getWeb3 } from 'utils/web3'
import BigNumber from 'bignumber.js'

const web3 = getWeb3()
const busdContract = new web3.eth.Contract(busdABI as unknown as AbiItem, getBusdAddress())

const fetchTokensLeft = async () => {
    const busdCollected = await busdContract.methods.balanceOf(getPresaleAddress()).call()
    const busdPerToken = 3;
    const presaleCap = new BigNumber(300000).multipliedBy(new BigNumber(10).pow(18)) // tochange 
    return presaleCap.minus(new BigNumber(busdCollected)).div(busdPerToken)
}

export default fetchTokensLeft
