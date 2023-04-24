import React from 'react'
import { useRef } from 'react';
import { login } from '../../services/login';
import Cookies from 'js-cookie'
import '../Login/Login.css'
import { useDispatch } from 'react-redux';
import {  loginSuccess } from '../../redux/authSlice';
import { message } from 'antd';

export default function Login() {
    const emailInput = useRef()
    const passInput = useRef()
    const dispatch = useDispatch()

    const LoginClick = async(event)=>{
       try {
        event.preventDefault()
        const res = await login({identifier:emailInput.current.value,password:passInput.current.value})
        const {jwt} = res.data
        Cookies.set("jwt",jwt)
        dispatch(loginSuccess(res.data))
       } catch (error) {
        message.info('sai user password')
       }
    };
    // const request = {
    //     data:{
    //         username:,
    //         email:,
    //         password:,
    //     }
    //   }
    // const registerUser = async () => {
    //     try {
    //       await registerUser()("/v1/auth/register", request);
          
    //     } catch (err) {
    //      console.log(err);;
    //     }
    //   }
    return <>
        <div className="main">
                <input type="checkbox" id="chk" aria-hidden="true"/>
                <div className="login">
                    <form onSubmit={LoginClick} className="form">
                        <label htmlFor="chk" aria-hidden="true">Log in</label>
                        <input ref={emailInput} autoFocus className="input" type="email"  placeholder="Email"  autoComplete="off"/>
                        <input ref={passInput} className="input" type="password"  placeholder="Password"  autoComplete= "off"/>
                        <button type="submit">Log in</button>
                    </form>
                </div>
                <div className="register">
                    <form className="form">
                        <label htmlFor="chk" aria-hidden="true">Register</label>
                        <input className="input" type="text"  placeholder="Email" />
                        <input className="input" type="email"  placeholder="Email" autoComplete="username" />
                        <input className="input" type="password"  placeholder="Password" autoComplete= "current-password" />
                        <button >Register</button>
                    </form>
                </div>
        </div>
</>
}
