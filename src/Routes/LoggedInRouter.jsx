import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Login from '../Page/Login/Login'

export default function LoggedInRouter() {
    const user = useSelector((state)=>state.auth)
    const {isLogin} = user
  return <>
    {isLogin? <Outlet></Outlet>:<Login></Login>}
    </>
}
