import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart1 = ({ color1, color2, color3, color4, color5,color6,color7,height, width ,branches ,students}) => {
    
   const data = {
      datasets: [
         {
            data: students,
            borderWidth: 0,
            backgroundColor: [
               `${color1 ? color1 : "rgba(255, 108, 9,0.95)"}`,
               `${color2 ? color2 : "rgb(255, 201, 10,1)"}`,
               `${color3 ? color3 : "rgba(68, 129, 78,1)"}`,
               `${color4 ? color4 : "rgba(10, 156, 255,0.9)"}`,
               `${color5 ? color5 : "rgba(255, 10, 213,0.55)"}`,
               `${color7 ? color7 : "rgba(255, 10, 10, 0.79)"}`,
               `${color7 ? color7 : "rgba(168, 175, 68, 0.9)"}`,
               `${color7 ? color7 : "rgba(187, 93, 87, 1)"}`,
               `${color7 ? color7 : "rgba(72, 71, 166, 1)"}`,
               
            ],
            hoverBackgroundColor: [
               `${color1 ? color1 : "rgba(255, 108, 9,0.95)"}`,
               `${color2 ? color2 : "rgb(255, 201, 10,1)"}`,
               `${color3 ? color3 : "rgba(68, 129, 78,1)"}`,
               `${color4 ? color4 : "rgba(10, 156, 255,0.9)"}`,
               `${color5 ? color5 : "rgba(255, 10, 213,0.55)"}`,
               `${color7 ? color7 : "rgba(255, 10, 10, 0.79)"}`,
               `${color7 ? color7 : "rgba(168, 175, 68, 0.79)"}`,
               `${color7 ? color7 : "rgba(187, 93, 87, 1)"}`,
               `${color7 ? color7 : "rgba(72, 71, 166, 1)"}`,
               
            ],
         },
      ],
      labels: branches,
   };

   const options = {
		plugins:{
			legend: false,
			responsive: true,
		},
      
      maintainAspectRatio: false,
   };

   return (
      <>
    
         <Pie data={data} height={height ? height : 200} options={options} />
      </>
   );
};

export default PieChart1;
