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
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


export const BarChart = ({datos, title}) => {
  
const data = {
    labels: datos.map((dato) => dato.Empleado),
    datasets: [
      {
        label: "Monto Total",
        data: datos.map((dato) => dato.MontoTotal),
        backgroundColor: 'rgba(54, 162, 235, 0.35)',
      }
    ]
  }
  
const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
      legend: {
      position: 'top',
      },
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
        />
    </div>
  )
}

export default BarChart