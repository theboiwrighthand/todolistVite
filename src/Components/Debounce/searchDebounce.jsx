import React, { useState, useCallback, useRef , memo } from 'react';
import { debounce } from 'lodash';
import Axios from 'axios';
import "./searchDebounce.css"
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function SearchDebounce() {
    const [visible, setVisible] = useState(false);
    const inputValue = useRef()
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const { t } = useTranslation();


    const openDropdown = () => {
        setVisible(true);
    }

    const fetchDropdownOptions = async (key) => {
        if(key){
            const response = await Axios.get(`https://backoffice.nodemy.vn/api/tasks?populate=*&filters[title][$contains]=${key}`)
            response.data?.data?.length === 0 ? setDropdownOptions([{id:0,attributes:{title:'*không tìm thấy'}}]) : setDropdownOptions(response.data.data) 
        }

    };
    const debounceDropDown = useCallback(
        debounce((nextValue) => fetchDropdownOptions(nextValue), 1000),
        []
    );

    const handleInputChange = () => {
        const keyword = inputValue.current.value;
        debounceDropDown(keyword);
    }
    return <>
        <div className='search-container'>
            <input className='input-search'
                ref={inputValue}
                placeholder={t('type to search')}
                onClick={openDropdown}
                onChange={handleInputChange}
            />
            <ul>
                {visible &&
                    dropdownOptions.map((item) => (
                        <li key={item?.id}>
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
    </>
}

export default memo(SearchDebounce);