import React from "react";
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const DoughnutChart = () => {

  const dataTask = useSelector(state => state.task.taskItem)
  const total = dataTask.length;  
  const completedCount = dataTask.filter(item => item.attributes.complete === true).length;
  const uncompletedCount = dataTask.filter(item => item.attributes.complete === false).length;
  const { t } = useTranslation();

  ChartJs.register(
    Tooltip, Title, ArcElement, Legend
  )
  const data = {
    datasets: [{
      data: [completedCount, uncompletedCount],
      backgroundColor: ["#36a2eb", "#ff6384"]
    },
    ],

    labels: [`${t('done')}`, `${t('notdone')}`],
  };

  return <>

    <h2>{`${t('complete')} : ${completedCount}/${total}`}</h2>
    <Doughnut data={data} />

  </>
}


export default DoughnutChart;