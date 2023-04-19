import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const initialState = {
  user: {},
  isLogin:false,
  isregister:false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess:(state,actions) => {
      state.isLogin=true
      state.user=actions.payload
    },
    logout: (state,actions) => {
      state.user=null
      state.isLogin=false
      if(Cookies.get("jwt")) {
        Cookies.remove("jwt")
      }
    },
    registerSuccess :(state,actions)=>{
      state.isregister=true
    },
  },
})

export const {loginSuccess,logout} = authSlice.actions

export default authSlice.reducer