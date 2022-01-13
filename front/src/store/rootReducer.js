import { combineReducers } from '@reduxjs/toolkit'

import authReducer from './authReducer'
import appReducer from './appReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
})

export default rootReducer
