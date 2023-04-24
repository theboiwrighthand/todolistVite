import React, { memo } from 'react'
import * as XLSX from "xlsx"
import './importExcel.css'
import { message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addTaskToList } from '../../redux/taskSlice';
import { useTranslation } from 'react-i18next';

export default memo(function ImportExcel() {

    const { t } = useTranslation()
    const dispatch = useDispatch()

    const handleImport = (e) => {
        e.preventDefault();
        try {
            let files = e.target.files
            let f = files[0];
            let reader = new FileReader();
            reader.onload = function (e) {
                let data = e.target.result;
                let readedData = XLSX.read(data, { type: 'binary' });
                const wsname = readedData.SheetNames[0];
                const ws = readedData.Sheets[wsname];
                /* Convert array to json*/
                const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
                const dataConvert = dataParse.slice(1).map(item => {
                    const input = {};
                    for (let i = 0; i < dataParse[0].length; i++) {
                        input[dataParse[0][i]] = item[i];
                    }
                    var output = {
                        id: input.id,
                        attributes: input
                    }
                    delete output.attributes.id
                    return output;
                });
                console.log(dataConvert);
                dispatch(addTaskToList(dataConvert))
            };
            reader.readAsBinaryString(f)
        } catch (error) {
            message.info('Import không thành công!')
        }
    }
    return <>

        <input type="file" id="file" onChange={handleImport} />
        <label htmlFor="file" className="btn-import">
            <span> <UploadOutlined /> {t('import')}</span>
        </label>
    </>
})