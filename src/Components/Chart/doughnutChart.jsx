import React, { useRef, memo } from "react";
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Doughnut, getElementAtEvent } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { changeStatus } from "../../redux/chartSlice";

const DoughnutChart = () => {

  const dataTask = useSelector(state => state.task.taskItem)
  const total = dataTask.length;
  const completedTask = dataTask.filter(item => item.attributes.complete === true)
  const completedCount = completedTask.length;
  const uncompletedTask = dataTask.filter(item => item.attributes.complete === false)
  const uncompletedCount = uncompletedTask.length;

  const [taskMap, setTaskMap] = useState('')
  const dispatch = useDispatch()

  const { t } = useTranslation();
  const chartRef = useRef();
  ChartJs.register(
    Tooltip, Title, ArcElement, Legend
  )
  const data = {
    datasets: [{
      data: [completedCount, uncompletedCount],
      backgroundColor: ["#36a2eb", "#ff6384"],
      options: {
        onClick: (e) => {
         
        }
      }
    },
    ],

    labels: [`${t('done')}`, `${t('notdone')}`],
  };

  return <>

    <h2>{`${t('complete')} : ${completedCount}/${total}`}</h2>
    <Doughnut ref={chartRef} data={data} onClick={(event) => {
      const ChartElement = getElementAtEvent(chartRef.current, event);
      if (ChartElement.length > 0) {
        // console.log(data.datasets[ChartElement[0].datasetIndex]);
        const dataIndex = ChartElement[0].index
        if (dataIndex === 0) {
          setTaskMap(0)
          dispatch(changeStatus('done'))
        } else if (dataIndex === 1) {
          setTaskMap(1)
          dispatch(changeStatus('notdone'))
        }
        // console.log(data.datasets[0].data);
      }
    }
    } />
    <p>Task : {taskMap === 0 ? 'hoan thanh' : 'chua hoan thanh'}</p>

    {/* {taskMap === 0 ? completedTask.map((item) => {
      return <p key={item.id}>{item.attributes.title}</p>
    }) : uncompletedTask.map((item) => {
      return <p key={item.id}>{item.attributes.title}</p>
    })
    } */}
  </>
}


export default memo(DoughnutChart);