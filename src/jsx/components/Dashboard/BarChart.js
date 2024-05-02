import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
//import { Bar } from 'react-chartjs-2';
//import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({branches,assessments,students}) => {

  const data = {
    defaultFontFamily: "Poppins",
    labels:branches,
    datasets: [
      {
        label: "Students",
        data: students,
        borderColor: "rgba(110, 124, 203, 1)",
        borderWidth: "0",
        backgroundColor: "rgba(110, 124, 203, 1)",
        //barThickness: 40,

      },
      {
        label: "Assessments",
        data: assessments,
        borderColor: "rgba(68, 129, 78, 1)",
        borderWidth: "0",
        backgroundColor: "rgba(68, 129, 78, 1)",
        //barThickness: 40,

      },
     
    ],
  };

  const options = {
    plugins: {
      legend: false,

    },
    scales: {
      y:
      {
        ticks: {
          beginAtZero: true,
        },

      },

      x:
      {
        // Change here
        barPercentage: 0.5,
      },

    },
    //responsive: true,
    /* responsive:{
     barThickness: 40	
   } */
  };

  return (
    <>
      <Bar data={data} height={150} options={options} />
    </>
  );

}

export default BarChart;
