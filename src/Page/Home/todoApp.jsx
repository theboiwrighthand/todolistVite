import React, { useEffect, useState } from 'react'
import './todoApp.css';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import AddIcon from '@material-ui/icons/Add';
import { deleteTask } from '../../services/deleteTask';
import { Link } from 'react-router-dom';
import { Pagination, Select, Skeleton, Space } from 'antd';
import { getTasksByPagination } from '../../services/getTasksByPagination';
import { LazyLoadImage } from "react-lazy-load-image-component";
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
import Calendar from "../../assets/date.svg";
import Trash from "../../assets/trash.svg";
import Options from "../../assets/options.svg";
import BtnToggleCompleted from "../../Components/checkbutton"
import moment from 'moment';


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
        if (listTask.length === 0) { handleChangePage() }
        const response = await getAllTasks()
        dispatch(response.data.data)
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
                        <div>
                            <ul className="tasksList mt-4 grid gap-2 sm:gap-4 xl:gap-6 grid-cols-1">
                                {listTask.map((item, index) => {
                                    return <li key={item.id * 100}>
                                        <a href="#" title='Main' className={`${item.attributes.complete ? 'bg-green-500  hover:bg-green-400' : 'bg-red-500 hover:bg-red-400' } ml-auto mr-4 w-min whitespace-nowrap overflow-hidden max-w-[10rem] text-center text-ellipsis text-slate-100  px-4 py-1 rounded-t-md transition block`}>
                                           {item.attributes.complete ? 'Completed' : 'Uncompleted'}</a>
                                        <article className="bg-slate-100 rounded-lg p-3 sm:p-4 flex text-left transition hover:shadow-lg hover:shadow-slate-300  flex-row sm:h-32">
                                            <div className="flex flex-col flex-auto mr-6">
                                                <div className='flex items-center justify-between mb-1'>
                                                    <span className='block font-medium '>Task {index + 1}:</span>
                                                </div>
                                                <p className='description mb-2 line-clamp-2 sm:line-clamp-1' > {item.attributes.title} </p>
                                                <time className='mt-auto flex w-full'>
                                                    <img src={Calendar} className="mr-2 w-4 sm:w-5" alt="Calendar" />
                                                    {moment(item.attributes.date).format("DD/MM/YYYY")}
                                                </time>
                                            </div>
                                            <div className='flex items-center ' >
                                                {item?.attributes?.image?.data?.attributes?.url ?
                                                    <LazyLoadImage src={`https://backoffice.nodemy.vn${item?.attributes?.image?.data?.attributes?.url}`}
                                                        className='w-20 h-20 rounded-lg mr-5' style={{ filter: `${item.attributes.complete ? 'grayscale(100%) blur(0.8px)' : 'none'}` }}
                                                        alt="Image Alt"
                                                        placeholdersrc={`https://backoffice.nodemy.vn${item?.attributes?.image?.data?.attributes?.url}`}
                                                        effect="blur" />
                                                    : null}
                                            </div>
                                            <div className='flex border-slate-200 items-center'>
                                                <input title='check box'
                                                    type="checkbox"
                                                    className='bg-emerald-200 hover:bg-amber-400 cursor-pointer w-5 h-5 border-3 border-rose-500 rounded-lg checked:bg-green-500'
                                                    checked={item.attributes.complete}
                                                    onChange={(e) => handleCheck(e, index, item.id)} />
                                                <button title="Delete Task"
                                                    className='ml-2 transition hover:text-slate-700 hover:opacity-50'
                                                    onClick={() => { deleteTaskHandler(item.id) }}>
                                                    <img src={Trash} alt="Trash" className='w-5 h-5 sm:w-6 sm:h-6 ' />
                                                </button>
                                                <Link to={`/update/${item.id}`}>
                                                    <button title='Edit Task'
                                                        className='transition w-7 sm:w-8 h-6 sm:h-8 grid place-items-center hover:text-slate-700 hover:opacity-50' >
                                                        <img src={Options} alt="Options" className='w-4 sm:w-5 h-4 sm:h-5' />
                                                    </button>
                                                </Link>
                                            </div>
                                        </article>
                                    </li>
                                })}
                            </ul>
                            {!isShow ? <Pagination showSizeChanger={false} total={totalPage} pageSize={5} onChange={handleChangePage} defaultCurrent={page} style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }} /> : null}
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
                        <Space style={{ margin: '0 auto' }}>
                            <Skeleton.Button active size={"small"} block={true} />
                            <Skeleton.Button active size={"small"} block={true} />
                        </Space>
                    </div>
                }
            </section>
            <section className='right-section'>
                <DoughnutChart />
            </section>
        </div>
    </>
}
