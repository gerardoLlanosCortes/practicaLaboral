import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend);




export const PieChartItem = ({datos, title}) => {

    const data = {
        labels: datos.map((dato) => dato.Tipo),
        datasets: [
            {
                label: 'Monto Total',
                data: datos.map((dato) => dato.MontoTotal),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.35)',
                    'rgba(54, 162, 235, 0.35)',
                    'rgba(255, 206, 86, 0.35)',
                    'rgba(75, 192, 192, 0.35)',
                    'rgba(153, 102, 255, 0.35)',
                    'rgba(255, 159, 64, 0.35)',
                  ],
                
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            title: {
            display: true,
            text: title,
            },
            datalabels: {
                anchor: 'center'
            },
        },
        }

  return (
    <div className="col-md-6">
        <Pie data={data} options={options}
        width={300}
        height={400}
        plugins={[ChartDataLabels]}/>
    </div>
  )
}

export default PieChartItem