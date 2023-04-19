import './App.css';
import { Routes, Route } from "react-router-dom";
import Layout from './Page/Layout/Layout';
import TodoApp from './Page/Home/todoApp';
import Update from './Page/Update/Update';
import Add from './Page/Add/add';
import Login from './Page/Login/Login';
import { useDispatch } from 'react-redux';
import NotLoggedInRouter from './Routes/NotLoggedInRouter';
import LoggedInRouter from './Routes/LoggedInRouter';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect } from 'react';
import {loginSuccess } from './redux/authSlice';
import  { ArrowUpOutlined } from '@ant-design/icons';
import config from './config/config';


function App() {
  const dispatch = useDispatch()
  const fetchMe = async () => {
    const response = await axios.get("https://backoffice.nodemy.vn/api/users/me",config)
    dispatch(loginSuccess(response.data))
  } // thực hiện lấy data user về và lưu vào redux bằng dispatch
  useEffect(()=>{ 
    if(Cookies.get("jwt")) {
      
    }fetchMe()
  },[])

  return<>
  <div className='App'>
    <a className='to-top' href="#"> <ArrowUpOutlined style={{fontSize :'35px',color:"#E6EFF4"}} /> </a>
    <Routes>
      <Route element={<LoggedInRouter></LoggedInRouter>}>
        <Route element={<Layout/>}>
            <Route path='/' element={<TodoApp/>}/>
            <Route path='/update/:id' element={<Update/>}/>
            <Route path='/add' element={<Add/>}/>
        </Route>
      </Route>
      <Route element={<NotLoggedInRouter></NotLoggedInRouter>}>
      <Route path='/login' element={<Login/>}/>
      </Route>
    </Routes>
  </div>
  </>
}

export default App;
