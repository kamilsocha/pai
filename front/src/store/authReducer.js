import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false,
  },
  reducers: {
    signIn(state, _) {
      state.loggedIn = true
    },
    signOut(state, _) {
      state.loggedIn = false
    },
  },
})

export const {
  signIn: signInAction,
  signOut: signOutAction,
} = authSlice.actions

export default authSlice.reducer
