import React, { memo, useState } from 'react'
import './header.css'
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { Link } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';
import { useEffect } from 'react';
import { getAllTasks } from '../../services/getAll';
import { addTaskToList } from '../../redux/taskSlice';
import SearchDebounce from '../../Components/Debounce/searchDebounce';
import { Modal } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import LanguageSelector from '../../Components/LanguageSelector/languageSelector';
import { useTranslation } from 'react-i18next';


export default memo( function Header() {

    // useEffect(() => {
    //     const getAllData = async () => {
    //         const response = await getAllTasks()
    //         if (response, response.data.data) dispatch(addTaskToList(response.data.data))
    //     }
    //     getAllData()
    // }, [])
    
    const { t } = useTranslation()
    const items = [
        {
            label: `${t('profile')}`,
            key: '1',
        },
        {
            label: `${t('change password')}`,
            key: '2',
        },
        {
            label: `${t('logout')}`,
            key: '3',
        },
    ]; // item dropdown
    const [isModalOpen, setIsModalOpen] = useState(false);

    const taskFromRedux = useSelector(state => state.task.taskItem)
    let uncompletedCount = taskFromRedux.filter(item => item.attributes.complete === false);
    const username = useSelector(state => state.auth.user.username)
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    const onClick = ({ key }) => {
        key == 3 ? handleLogout() : message.info('chưa có gì')
    };

    const showModal = () => {
        setIsModalOpen(true);

    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return <>
        <nav className="nav">
            <div className="nav-container">
                <div className="logo">
                    <Link to={"/"}>To dududu</Link>
                </div>
                <div className='search'>
                    <SearchDebounce />
                </div>
                <div id="mainListDiv" className="main_list">
                    <ul className="navlinks">
                        <li><Link to={"/add"}>{t('add')}</Link></li>
                        <li><Link to={"#"}>{t('update')}</Link></li>
                        <li><Link to={"#"}>{t('delete')}</Link></li>
                        <li >
                            {uncompletedCount.length > 0
                                ? <Modal title={`Còn ${uncompletedCount.length} Task chưa hoàn thành`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                    {uncompletedCount.map((item) => {
                                        return <p key={item.id}>  <CaretRightOutlined /> {item.attributes.title}</p>
                                    })}
                                </Modal>
                                : <Modal title='Đã hoàn thành hết các task' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}></Modal>
                            }
                            <Badge className='button-alert' onClick={showModal} color="secondary" badgeContent={uncompletedCount.length} overlap="rectangular">
                                <NotificationsIcon />
                            </Badge>

                        </li>
                        <li>
                            <span className='Log-out'>
                                <Dropdown
                                    menu={{
                                        items,
                                        onClick
                                    }}
                                    trigger={['click']}>
                                    <Space>
                                        <span> {t('hi')} ! {username} </span>
                                        <DownOutlined />
                                    </Space>
                                </Dropdown>
                            </span>
                        </li>
                        <li>
                            <LanguageSelector/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
}
)