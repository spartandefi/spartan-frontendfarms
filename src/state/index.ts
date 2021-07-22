import { configureStore } from '@reduxjs/toolkit'
import farmsReducer from './farms'
import poolsReducer from './pools'
import referralsReducer from './referrals'
import presaleReducer from './presale'

export default configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    farms: farmsReducer,
    pools: poolsReducer,
    referrals: referralsReducer,
    presale: presaleReducer
  },
})
