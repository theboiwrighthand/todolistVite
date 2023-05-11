import './App.css';
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';
import { lazy, Suspense, useEffect } from 'react';
import {loginSuccess } from './redux/authSlice';
import  { ArrowUpOutlined } from '@ant-design/icons';
import config from './config/config';
import Loading from './Page/Loading/loading.jsx'


function App() {

  const Layout = lazy(()=> import('./Page/Layout/Layout'))
  const TodoApp = lazy(()=> import('./Page/Home/todoApp'))
  const Update = lazy(()=> import('./Page/Update/Update'))
  const Add = lazy(()=> import('./Page/Add/add'))
  const Login = lazy(()=> import('./Page/Login/Login'))
  const LoggedInRouter = lazy(()=> import('./Routes/LoggedInRouter'))
  const NotLoggedInRouter = lazy(()=> import('./Routes/NotLoggedInRouter'))

  const dispatch = useDispatch()
  const fetchMe = async () => {
    const response = await axios.get("https://backoffice.nodemy.vn/api/users/me",config)
    dispatch(loginSuccess(response.data))
  } // thực hiện lấy data user về và lưu vào redux bằng dispatch
  useEffect(()=>{ 
    if(Cookies.get("jwt")) {
      
      fetchMe()
    }
  },[])

  return<>
  <div className='App'>
    <a className='to-top' href="#"> <ArrowUpOutlined style={{fontSize :'35px',color:"#E6EFF4"}} /></a>
    <Routes>
      <Route element={<Suspense fallback={<Loading/>}> <LoggedInRouter/> </Suspense>}>
        <Route element={<Suspense fallback={<Loading/>}> <Layout/> </Suspense>}>
            <Route path='/' element={<Suspense fallback={<Loading/>}> <TodoApp/> </Suspense>}/>
            <Route path='/update/:id' element={<Suspense fallback={<Loading/>}> <Update/> </Suspense>}/>
            <Route path='/add' element={<Suspense fallback={<Loading/>}> <Add/></Suspense>}/>
        </Route>
      </Route>
      <Route element={<Suspense fallback={<Loading/>}> <NotLoggedInRouter/> </Suspense>}>
      <Route path='/login' element={<Suspense fallback={<Loading/>}> <Login/> </Suspense>}/>
      </Route>
    </Routes>
  </div>
  </>
}

export default App;
