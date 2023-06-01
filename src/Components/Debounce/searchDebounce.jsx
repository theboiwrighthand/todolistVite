import React, { useState, useCallback, useRef, memo } from 'react';
import { debounce } from 'lodash';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, message, Space, Modal } from 'antd';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { CaretRightOutlined } from '@ant-design/icons';
import Badge from '@material-ui/core/Badge';
import { DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../Components/LanguageSelector/languageSelector';
import Time from '../../Page/Header/time';
import { setSidebarStatus } from '../../redux/sidebarSlice';
import MenuIcon from '@mui/icons-material/Menu';
import'./searchDebounce.css'

function SearchDebounce() {
    const [visible, setVisible] = useState(false);
    const inputValue = useRef()
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const taskFromRedux = useSelector(state => state.task.taskItem)
    const sidebarStatus = useSelector(state => state.sidebarStatus.status)
    const dispatch = useDispatch()
    let uncompletedCount = taskFromRedux.filter(item => item.attributes.complete === false);
    const { t } = useTranslation();

    const openDropdown = () => {
        setVisible(true);
    }
    const closeDropdown = () => {
        setVisible(false);
    }

    const showModal = () => {
        setIsModalOpen(true);

    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const fetchDropdownOptions = async (key) => {
        if (key) {
            const response = await Axios.get(`https://backoffice.nodemy.vn/api/tasks?populate=*&filters[title][$contains]=${key}`)
            response.data?.data?.length === 0 ? setDropdownOptions([{ id: 0, attributes: { title: '*không tìm thấy' } }]) : setDropdownOptions(response.data.data)
        }

    };
    const debounceDropDown = useCallback(
        debounce((nextValue) => fetchDropdownOptions(nextValue), 1000),
        []
    );

    const handleInputChange = () => {
        const keyword = inputValue.current.value;
        if(keyword == ''){
            setDropdownOptions([])
        }else{
            debounceDropDown(keyword);
        }
    }

    const handleSidebar = () => {

        if (sidebarStatus == 'open') {
            dispatch(setSidebarStatus('close'))
        } else if (sidebarStatus == 'close') {
            dispatch(setSidebarStatus('open'))
        }

    }
    return <>
        <div className="top">
            <i className="sidebar-toggle" onClick={handleSidebar}>
                <MenuIcon/>
            </i>
            <div className="search-box">
                <i className="uil uil-search"></i>
                <input type="text"
                    ref={inputValue}
                    placeholder={t('Search task')}
                    onClick={openDropdown}
                    onBlur={closeDropdown}
                    onChange={handleInputChange} />
                <ul>
                    {visible &&
                        dropdownOptions.map((item) => (
                            <li key={item?.id} className='results-list'>
                                <Link onClick={() => {
                                    setDropdownOptions([])
                                }}
                                    to={`/update/${item?.id}`}>
                                    {item.attributes?.title}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <Time />
            <div className='notification'>
                {uncompletedCount.length > 0
                    ? <Modal title={`Còn ${uncompletedCount.length} Task chưa hoàn thành`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        {uncompletedCount.map((item) => {
                            return <p key={item.id}>  <CaretRightOutlined /> {item.attributes.title}</p>
                        })}
                    </Modal>
                    : <Modal title='Đã hoàn thành hết các task' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}></Modal>
                }
                <div style={{ color: '#7c3aed' }}>
                    <Badge className='button-alert' onClick={showModal} color="secondary" badgeContent={uncompletedCount.length} overlap="rectangular">
                        <NotificationsIcon />
                    </Badge>
                </div>
            </div>
        </div>
    </>
}

export default memo(SearchDebounce);