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


export const BarChartEmpleadoVertical = ({datos, title}) => {
    const options = {
        maintainAspectRatio: false,
        indexAxis: 'y' ,
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: title,
          },
        },
      };
      
      
      const data = {
        labels: datos.map((dato) => dato.Empleado),
        datasets: [
          {
            label: "Monto Total",
            data: datos.map((dato) => dato.MontoTotal),
            backgroundColor: '#62a9e2',
          }
        ]
      }
      

  return (
    <div className="col-md-6 mb-5">
        <Bar options={options} data={data} width={300}
          height={300} />
    </div>
  )
}

export default BarChartEmpleadoVertical
