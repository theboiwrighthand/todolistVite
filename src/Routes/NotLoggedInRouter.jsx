import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function NotLoggedInRouter() {
    const user = useSelector((state)=>state.auth)
    const {isLogin} = user
  return (
    <>
     {isLogin? <Navigate to={"/"}></Navigate>:<Outlet></Outlet>}
    </>
  )
}
