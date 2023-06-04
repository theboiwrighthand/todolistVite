import { memo } from 'react';
import { useDispatch } from 'react-redux';
import i18n from '../../config/i18n';
import { setLanguage } from '../../redux/languageSlice';
import "./languageSelector.css"


const LanguageSelector = () => {
  const dispatch = useDispatch()

  const changeLanguage = (lng) => {
    dispatch(setLanguage(lng))
    i18n.changeLanguage(lng)
  };
  return (
    <div style={{display:'flex', justifyContent:'center'}}>

      <button className='setLng colortext' onClick={() => changeLanguage('en')}>
        <img src="https://cdn.pixabay.com/photo/2017/03/14/21/00/american-flag-2144392_960_720.png" alt="" />
      </button>
      <button className='setLng colortext' onClick={() => changeLanguage('vi')}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkuo0yYIHeat5zP9eeZbnzV43AULztiE7laQ&usqp=CAU" alt="" />
      </button>
    </div>
  );
};

export default memo(LanguageSelector) ;