import React, { useEffect, useState } from 'react'
import './todoApp.css';
import AddIcon from '@material-ui/icons/Add';
import { deleteTask } from '../../services/deleteTask';
import { Link } from 'react-router-dom';
import { Select } from 'antd';
import { getTasksByPagination } from '../../services/getTasksByPagination';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { getAllTasks } from '../../services/getAll';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../../services/updateTask';
import { getTaskByComplete } from '../../services/getTaskByComplete';
import ExportExcel from '../../Components/ExportExcel/exportExcel';
import DoughnutChart from '../../Components/Chart/doughnutChart';
import ImportExcel from '../../Components/ImportExcel/importExcel';
import { useTranslation } from 'react-i18next';
import config from '../../config/config';
import { addTaskToList } from '../../redux/taskSlice';
import queryString from 'query-string';
import SkeletonLoading from '../../Components/Skeleton/SkeletonLoading';
import ListTask from '../../Components/ListTask/ListTask';


export default function TodoApp() {
    const [listTask, setListTask] = useState([])
    const [totalPage, setToTalPage] = useState('')
    const [isShow, setIsShow] = useState(false)
    const listTaskFromRedux = useSelector(state => state.task.taskItem)
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const ChartStatus = useSelector(state => state.chart.whichStatusWantMap)
    const dataTask = useSelector(state => state.task.taskItem)

    const page = queryString.parse(window.location.search).page || 1;
    const status = queryString.parse(window.location.search).status;
    //auto Param
    const autoParam = (name, value) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set(name, value);
        window.history.pushState({}, '', `${window.location.pathname}?${searchParams}`);
    }

    useEffect(() => {
        const getData = async () => {
            const response = await getTasksByPagination(page);
            if (response, response.data.data) setListTask(response.data.data);
            setToTalPage(response.data.meta.pagination.total)
        }
        getData()
        setIsShow(false)

        const getAllData = async () => {
            const response = await getAllTasks()
            if (response, response.data.data) dispatch(addTaskToList(response.data.data))
        }
        getAllData()
    }, [])

    // set Data theo chart status
    // const setDataChart = ()=>{
    //     if(ChartStatus === 'done'){
    //         const data = dataTask.filter(item => item.attributes.complete === true)
    //         setListTask(data)
    //     } else if(ChartStatus === 'notdone'){
    //         const data = dataTask.filter(item => item.attributes.complete === false)
    //         setListTask(data)
    //     }
    // }
    // setDataChart()

    //thay đổi trang list task
    const handleChangePage = async (page) => {
        setListTask([]);
        autoParam('page', page)
        let response = await getTasksByPagination(page)
        setListTask(response.data.data)
    }
    //mở rộng list task
    const seeMoreHandler = async () => {
        const getAllData = async () => {
            const response = await getAllTasks()
            if (response, response.data.data) dispatch(addTaskToList(response.data.data))
        }
        getAllData()
        setIsShow(true)
        const response = await getAllTasks();
        if (response, response.data.data) setListTask(response.data.data);
    }
    //thu gọn list task
    const seeLessTask = async () => {
        setIsShow(false)
        const response = await getTasksByPagination(1);
        if (response, response.data.data) setListTask(response.data.data);
    }
    //xoa
    const deleteTaskHandler = async (id) => {
        await deleteTask(id, config)
        const newListTask = listTask.filter((item) => {
            return item.id !== id
        })
        setListTask(newListTask)
        if (listTask.length == 1) {
            const response = await getTasksByPagination(1)
            console.log(response);
            setListTask(response.data.data)
            dispatch(response.data.data)
        }

    }
    //checkbox onchange
    const handleCheck = async (e, index, id) => {
        const isChecked = e.target.checked;
        const request = {
            data: {
                complete: isChecked
            }
        }
        await updateTask(id, request, config)
        const updatedListTask = [...listTask];
        updatedListTask[index].attributes.complete = isChecked;
        setListTask(updatedListTask);
        // const nameTask = e.target.parentElement.parentElement.previousElementSibling
        // nameTask.classList.toggle('line-through');
    }

    //filter complete status
    const handleFilter = async (value) => {
        if (value === 1) {
            autoParam('status', value)
            seeMoreHandler()
        } else if (value === false) {
            autoParam('status', value)
            let response = await getTaskByComplete(false)
            setListTask(response.data.data)
        } else {
            autoParam('status', value)
            let response = await getTaskByComplete(true)
            setListTask(response.data.data)
        }
    }
    console.log('1');
    return <>
        <div>
            <section className='left-section'>
                {listTask && listTask.length > 0 ?
                    <div className='card-todo'>
                        <h1 className='listtodo'>{t('list to do')}</h1>
                        <div className='todo-form'>
                            <button className='btn-add-home'>
                                <Link to={"/add"} >
                                    <span><AddIcon />{t('add')}</span>
                                </Link>
                            </button>
                            <hr />
                            <Select onChange={handleFilter}
                                style={{ width: 140 }}
                                placeholder={t('filter task')}
                                options={[
                                    {
                                        value: 1,
                                        label: `${t('all')}`,
                                    },
                                    {
                                        value: true,
                                        label: `${t('done')}`,
                                    },
                                    {
                                        value: false,
                                        label: `${t('notdone')}`,
                                    },
                                ]}
                            />
                            <hr />
                            <ImportExcel />
                            <br />
                            <ExportExcel />
                            <br />
                            {!isShow ? <p className='see-all' onClick={seeMoreHandler} >{t('expand')} &#8794; </p> :
                                <p className='see-all' onClick={seeLessTask} > &#8793; {t('collapse')}</p>}
                        </div>
                        <ListTask listTask={listTask}
                            isShow={isShow}
                            totalPage={totalPage}
                            handleChangePage={handleChangePage}
                            page={page}
                            handleCheck={handleCheck}
                            deleteTaskHandler={deleteTaskHandler} />
                    </div>
                    : <SkeletonLoading />
                }
            </section>
            <section className='right-section'>
                <DoughnutChart />
            </section>
        </div>
    </>
}
