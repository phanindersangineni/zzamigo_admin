import React from "react";

import ReactApexChart from "react-apexcharts";

class ApexBar2 extends React.Component {
  constructor(props) {
    super(props);
     
    this.state = {
      series: [
        {
          name: "Students",
          data: this.props.students,
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 230,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              position: "top",
            },
          },
        },
        colors: ["#44814e"],
        legend: {
          show: false,
          position: "top",
          horizontalAlign: "left",
        },
        dataLabels: {
          enabled: false,
          offsetX: -6,
          style: {
            fontSize: "12px",
            // colors: ["#fff"],
          },
        },
        stroke: {
          show: false,
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        xaxis: {
          show: false,
          categories: this.props.branches,
        },
      },
    };
  }

  render() {
    return (
      <div id="chart" className="line-chart-style bar-chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={350}
        />
      </div>
    );
  }
}
export default ApexBar2;
