import React, { memo, useEffect } from 'react'
import { useRef } from 'react';
import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom'
import config from '../../config/config';
import { getTaskById } from '../../services/getTaskById'
import { updateTask } from '../../services/updateTask';

export default memo( function Update() {
  let { id } = useParams()
  const [task, setTask] = useState([])
  const inputValue = useRef()
  const textAlert = useRef()
  const { t } = useTranslation()
  useEffect(() => {
    const getTask = async () => {
      const response = await getTaskById(id)
      if (response, response.data.data) setTask(response.data.data)
    }
    getTask()
  }, [id])
  const updateTaskHandler = async () => {
    const newListTask = inputValue.current.value;
    if (newListTask.length > 0) {
      const request = {
        data: {
          title: newListTask
        }
      }
      const response = await updateTask(id, request, config)
      setTask(response.data.data)
      inputValue.current.value = ''
      textAlert.current.innerHTML = ''
    } else { textAlert.current.innerHTML = `*Nhấp đi đã bạn ôi*` }
  }
  return <>
    <div className='card-todo'>
      <h1>{t('update')}</h1>
      <div className='todo-form'>
        <div className="input-container">
          <h2><span style={{ color: '#68a2f4' }}>Task:</span>{task?.attributes?.title}</h2>
          {task?.attributes?.image?.data?.attributes?.url ?
            <img style={{ width: "50px", height: '50px', borderRadius: "50%" }} src={`https://backoffice.nodemy.vn${task?.attributes?.image?.data?.attributes?.url}`} alt="" /> : null}
          <input placeholder="edit here. . ." className="input-field" type="text" ref={inputValue} />
          <label htmlFor="input-field" className="input-label">write-to-edit</label>
          <span className="input-highlight"></span>
        </div>
        <p ref={textAlert} className='alert-nonInput'></p>
        <button className='btn-add' onClick={updateTaskHandler}>
          <span>Update</span>
        </button>
        <button className='btn-back' onClick={() => { window.location = '/' }}><span>Back To HomePage</span></button>
      </div>
      <hr />
    </div>
  </>
}
)