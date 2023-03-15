import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const AreaChartItem = ({datos, title}) => {
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
    };
    
    
    const data = {
        labels: datos.map((dato) => dato.Tipo),
        datasets: [
            {
            fill: true,
            label: 'MontoTotal',
            data: datos.map((dato) => dato.MontoTotal),
            borderColor: '#4e99d6',
            backgroundColor: 'rgb(98 169 226 / 70%)',
            },
        ],
    };

  return (
    <div className="col-md-6">
        <Line options={options} data={data} 
        width={300}
        height={400}
        />
    </div>
  )
}

export default AreaChartItem