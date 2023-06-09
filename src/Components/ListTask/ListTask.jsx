import React, { memo } from 'react'
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
import Calendar from "../../assets/date.svg";
import Trash from "../../assets/trash.svg";
import Options from "../../assets/options.svg";
import moment from 'moment';
import { LazyLoadImage } from "react-lazy-load-image-component";


function ListTask(props) {
    const{listTask,isShow,totalPage,handleChangePage,page,handleCheck,deleteTaskHandler} = props
    return <>
        <div>
            <ul className="tasksList mt-4 grid gap-2 sm:gap-4 xl:gap-6 grid-cols-1">
                {listTask.map((item, index) => {
                    return <li key={item.id * 100} className='colortext'>
                        <a href="#" title='Main' className={`${item.attributes.complete ? 'bg-green-500  hover:bg-green-400' : 'bg-red-500 hover:bg-red-400'} ml-auto mr-4 w-min whitespace-nowrap overflow-hidden max-w-[10rem] text-center text-ellipsis text-slate-100  px-4 py-1 rounded-t-md transition block`}>
                            {item.attributes.complete ? 'Completed' : 'Uncompleted'}</a>
                        <article className="bg-slate-100 rounded-lg p-3 sm:p-4 flex text-left transition hover:shadow-lg hover:shadow-slate-300  flex-row sm:h-32">
                            <div className="flex flex-col flex-auto mr-6">
                                <div className='flex items-center justify-between mb-1'>
                                    <span className='block font-medium '>Task {index + 1}:</span>
                                </div>
                                <p className='description mb-2 line-clamp-2 sm:line-clamp-1' > {item.attributes.title} </p>
                                <time className='mt-auto flex w-full'>
                                    <img src={Calendar} className="mr-2 w-4 sm:w-5 " alt="Calendar" />
                                    {moment(item.attributes.date).format("DD-MM-YYYY")}
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
    </>
}

export default memo(ListTask) 