import {React, memo} from 'react'
import './exportExcel.css'
import * as XLSX from "xlsx"
import { DownloadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { message  } from 'antd';
import { useTranslation } from 'react-i18next';

 const  ExportExcel = () => {

  const{t}= useTranslation()
  const dataExcel = useSelector(state => state.task.taskItem)

  const handleExport = () => {
    if (Array.isArray(dataExcel)) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataExcel.map((item,index )=> ({
      STT : index+1,
      ID: item?.id,
      Title: item?.attributes?.title,
      Status: item?.attributes?.complete,
      Creat: item?.attributes?.createdAt,
      LastUpDate: item?.attributes?.updatedAt,
    })));
    ws['!cols'] = [
      {wpx: 50},// Độ rộng của cột
      {wpx: 50}, 
      {wpx: 200}, 
      {wpx: 50}, 
      {wpx: 200},  
      {wpx: 200}
    ];
    XLSX.utils.book_append_sheet(wb , ws , "List to do")
    XLSX.writeFile (wb , "listToDo.xlsx"  )
    } else {
      message.info('Dữ Liệu Không Phải 1 Mảng')
    }
  }

  return <>
            <p className='button-export' onClick={handleExport} >
            <DownloadOutlined /> {t('export')}
            </p>
        </>
}
export default memo(ExportExcel)