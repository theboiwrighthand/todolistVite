import React, { memo, useState,useEffect } from 'react'
import './navBar.css'
import AddBoxIcon from '@material-ui/icons/AddBox';
import CreateIcon from '@material-ui/icons/Create';
import HomeIcon from '@material-ui/icons/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';

import SearchDebounce from '../../Components/Debounce/searchDebounce';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { message } from 'antd';
import LanguageSelector from '../../Components/LanguageSelector/languageSelector';
import { useTranslation } from 'react-i18next';
import ButtonDarkMode from './buttonDarkMode';
export default memo(function NavBar() {

    const { t } = useTranslation()
    const sidebarStatus = useSelector(state => state.sidebarStatus.status);
    const taskFromRedux = useSelector(state => state.task.taskItem)
    let uncompletedCount = taskFromRedux.filter(item => item.attributes.complete === false);
    const username = useSelector(state => state.auth.user.username)
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
        Navigate('/login')
    }

    return <>
        <div className='mainbody'>
            <nav className={sidebarStatus == 'close' ? 'close' : null}>
                <div className="logo-name">
                    <div className="logo-image">
                        <img src="https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-avatar-ff-ngau-560x560.jpg" alt="" />
                    </div>
                    <div className='logo'>
                        <span className="logo_name">
                            <a href="/">To Do List</a>
                        </span>
                        <span className='colortext'>Wellcome! {username}</span>
                    </div>
                </div>
                

                <div className="menu-items">
                    <ul className="nav-links">
                        <li><a href="#">
                            <i><HomeIcon /></i>
                            <span className="link-name">Home</span>
                        </a></li>
                        <li><a href="#">
                            <i><AddBoxIcon /></i>
                            <span className="link-name">Add Task</span>
                        </a></li>
                        <li><a href="#">
                            <i><CreateIcon /></i>
                            <span className="link-name">Update Task</span>
                        </a></li>
                    </ul>

                    <ul className="logout-mode">
                        <li><a href="#" onClick={handleLogout}>
                            <i><LogoutIcon/></i>
                            <span className="link-name">Logout</span>
                        </a></li>
                        <li className="mode">
                            <ButtonDarkMode/>
                        </li>
                        <li >
                          
                            <LanguageSelector/>
                        </li>
                    </ul>
                </div>
            </nav>
            <section className="dashboard">
                <SearchDebounce />
                <Outlet />
            </section>
        </div>
    </>
})


