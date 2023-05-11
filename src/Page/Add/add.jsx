import React, { useEffect, useState, useRef, memo } from 'react'
import '../Home/todoApp.css'
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import LabelRoundedIcon from '@material-ui/icons/LabelRounded';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { getAllTasks } from '../../services/getAll';
import { postTask, postTaskImage } from '../../services/postTask';
import { deleteTask } from '../../services/deleteTask';
import { Link } from 'react-router-dom';
import Loading from '../Loading/loading';
import { Skeleton } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch } from 'react-redux';
import { addTaskToList } from '../../redux/taskSlice';
import { useTranslation } from 'react-i18next';
import config from '../../config/config';



export default memo ( function Add() {

    const { t } = useTranslation()
    const [listTask, setListTask] = useState([])
    const inputValue = useRef()
    const textAlert = useRef()
    const inputFileImage = useRef()
    const [showLoading, setShowLoading] = useState(true)
    const dispatch = useDispatch()


    useEffect(() => {
        const getData = async () => {
            const response = await getAllTasks();
            if (response, response.data.data) setListTask(response.data.data);
            dispatch(addTaskToList(response.data.data))
            setShowLoading(false)     
        }
        getData()
        
        // console.log(param.get('?='));
    }, [])


    const handleFileChange = () => {
            const Imagechoose = inputFileImage.current.files[0]
            const image = document.querySelector("#imagechoosed");
            image.src = URL.createObjectURL(Imagechoose);
    };

    const addTaskHandler = async () => {
        const newListTask = inputValue.current.value;
        if (newListTask.length > 0, inputFileImage.current.files[0] ) {
            const request = {
                data: {
                    title: newListTask
                }
            }
            const response = await postTask(request, config)
            const formdata = new FormData();
            formdata.append("files", inputFileImage.current.files[0]);
            formdata.append("ref", "api::task.task");
            formdata.append("refId", response.data.data.id);
            formdata.append("field", "image");
            const responseUpload = await postTaskImage(formdata)
            const responseUpdate = await getAllTasks();
            setListTask(responseUpdate.data.data)
            inputValue.current.value = ''
            textAlert.current.innerHTML = ''
        } else if(newListTask.length > 0){
            const newListTask = inputValue.current.value;       
                const request = {
                    data: {
                        title: newListTask
                    }
                }
                const response = await postTask(request, config);
                setListTask([...listTask, response.data.data])
                inputValue.current.value = ''
                textAlert.current.innerHTML = ''
        }
         else { textAlert.current.innerHTML = `*Nhấp đi đã bạn ôi*` }
    }



    const deleteTaskHandler = async (id) => {
        await deleteTask(id, config)
        const newListTask = listTask.filter((item) => {
            return item.id !== id
        })
        setListTask(newListTask)
    }
    return <>
        {showLoading ? <Loading /> : null}
        {listTask ? <div className='card-todo'>
            <h1>{t('todolist-add')}</h1>
            <div className='todo-form'>
                <div className="input-container">
                    <div className='upload'>
                        <img id='imagechoosed' src="https://4.bp.blogspot.com/-8kN5uucyxDI/XD6vAIw18dI/AAAAAAAA7kU/uTwzqq0EbvgGyzRaNuLpjzARZIKOWbVoACLcBGAs/s1280/no-thumbnail.jpg" alt="error" />
                        <div className='round'>
                            <input className='inputImg' ref={inputFileImage} onChange={handleFileChange} type="file"/>
                            <AddAPhotoIcon/>
                        </div>
                    </div>
                    <input placeholder="write something. . ." className="input-field" type="text" ref={inputValue} />
                    <label htmlFor="input-field" className="input-label">{t('write to do')}</label>
                    <span className="input-highlight"></span>
                </div>
                <p ref={textAlert} className='alert-nonInput'></p>
                <button className='btn-add' onClick={addTaskHandler}  >
                    <span>{t('add')}</span>
                </button>
            </div>
            <hr />
            <h1 className='listtodo'>{t('list to do')}</h1>
            <div>
                <ul>
                    {listTask.map((item, index) => {
                        return <li key={item.id * 100} className='line-todo'>
                            {index+1}
                            <LabelRoundedIcon style={{ color: "#0071e2", fontSize: "50px" }} />
                            {item?.attributes?.image?.data?.attributes?.url ?
                            <LazyLoadImage src={`https://backoffice.nodemy.vn${item?.attributes?.image?.data?.attributes?.url}`}
                                width={50} height={50}
                                alt="Image Alt"
                                placeholdersrc={`https://backoffice.nodemy.vn${item?.attributes?.image?.data?.attributes?.url}`}
                                effect="blur" /> 
                            : null}

                            <span className='content'>{item?.attributes?.title}</span>
                            <div style={{ display: 'flex' }}>
                                <Link to={`/update/${item.id}`}>
                                    <button className='btn-update'>< CreateTwoToneIcon /></button>
                                </Link>
                                <button className='btn-del' onClick={() => { deleteTaskHandler(item.id) }}><DeleteForeverTwoToneIcon />
                                </button>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
        </div>
            : <div className='card-todo'>
                <br /> <br /> <br />
                <Skeleton.Input active size={"large"} block={true} />
                <br />
                <Skeleton active paragraph={{ rows: 1, width: "100%" }} title={false} />
                <br />
                <Skeleton.Input active size={"large"} block={true} />
                <Skeleton active paragraph={{ rows: 4, width: "100%" }} title={false} />
            </div>}
    </>
}
)