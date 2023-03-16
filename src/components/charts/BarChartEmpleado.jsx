import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import ChartDataLabels from 'chartjs-plugin-datalabels';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  ChartJS.defaults.set('plugins.datalabels', {
    anchor: 'end',
    align: 'end',
    offset: -5
  });


export const BarChart = ({datos, title}) => {
  
const data = {
    labels: datos.map((dato) => dato.Empleado),
    datasets: [
      {
        data: datos.map((dato) => dato.MontoTotal),
        backgroundColor: [
          'rgba(255, 99, 132, 0.35)',
          'rgba(54, 162, 235, 0.35)',
          'rgba(255, 206, 86, 0.35)',
          'rgba(75, 192, 192, 0.35)',
          'rgba(153, 102, 255, 0.35)',
          'rgba(255, 159, 64, 0.35)',
        ],
      }
    ]
  }
  
const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
      legend: false,
      title: {
      display: true,
      text: title,
      },
  },
}

  return (
    <div className="col-md-6 mb-5">
        <Bar
        data={data}
        options={options}
        width={300}
        height={400}
        plugins={[ChartDataLabels]}
        />
    </div>
  )
}

export default BarChart