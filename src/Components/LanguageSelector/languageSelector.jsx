import { memo } from 'react';
import { useDispatch } from 'react-redux';
import i18n from '../../config/i18n';
import { setLanguage } from '../../redux/languageSlice';



const LanguageSelector = () => {
  const dispatch = useDispatch()

  const changeLanguage = (lng) => {
    dispatch(setLanguage(lng))
    i18n.changeLanguage(lng)
  };
  return (
    <div style={{display:'flex',}}>
      <button style={{ cursor: 'pointer', width : '22px' ,border :'none', margin :'2px',padding:'2px', backgroundColor:'#AED2F9',color :' black'}} onClick={() => changeLanguage('en')}>EN</button>
      <button style={{ cursor: 'pointer', width : '22px',border :'none', margin :'2px',padding:'2px', backgroundColor:'#F54768',color :' black'}} onClick={() => changeLanguage('vi')}>VI</button>
    </div>
  );
};

export default memo(LanguageSelector) ;