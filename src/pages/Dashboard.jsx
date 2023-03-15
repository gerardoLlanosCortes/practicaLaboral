import React from 'react'
import { useState,useEffect } from 'react'
import AreaChartItem from '../components/charts/AreaChartItem';
import BarChartEmpleado from '../components/charts/BarChartEmpleado';
import BarChartEmpleadoVertical from '../components/charts/BarChartEmpleadoVertical';
import PieChartItem from '../components/charts/PieChartItem';
// import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import gastosService from '../services/gastosService';
import { rangeYear } from '../utils/functions';


export const Dashboard = () => {

  const anioActual = new Date().getFullYear()
  const mesActual = new Date().getMonth() + 1

  const [gastoEmpleadoAnual, setGastoEmpleadoAnual] = useState([]);
  const [gastoEmpleadoMensual, setGastoEmpleadoMensual] = useState([]);
  const [gastoItemAnual, setGastoItemAnual] = useState([]);
  const [gastoItemMensual, setGastoItemMensual] = useState([]);
  const [anio, setAnio] = useState(anioActual);
  const [mes, setMes] = useState(mesActual);

useEffect(() => {
  obtenerDatos()  
}, [])

useEffect(() => {
  obtenerDatos()  
}, [mes, anio])

const obtenerDatos = async () =>{
    try{
        let result = await gastosService.getAll(mes, anio);
        console.log(result.data)
        setGastoEmpleadoAnual(result.data.gastoEmpleadoAnual)
        setGastoEmpleadoMensual(result.data.gastoEmpleadoMes)
        setGastoItemAnual(result.data.gastoItemAnual)
        setGastoItemMensual(result.data.gastoItemMes)
    }catch(err){
        console.log(err)
    }
    
}

const meses = ["Enero", "Febero", "Marzo", "Abril", "Mayo", "junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
const anios = rangeYear()

  return (
    
    <div className="container-sm"> 
      <h1 className="text-center mb-4 mt-5">Dashboard</h1>
      <div className="d-flex justify-content-between w-100 flex--gap mb-5">
        <div className="input-group">
          <span className='input-group-text input-group-text--detalle'>Mes</span>
          <select className="form-select" id='mes' aria-label="Default select example" name="mes" onChange={(e) => setMes(e.target.value)} value={mes}>
              {
                  meses.map((mes, i)=>{
                      return <option value={i+1} key={i} >{mes}</option>
                  })
              }
          </select>
        </div>
        <div className="input-group">
          <span className='input-group-text input-group-text--detalle'>Año</span>
          <select className="form-select" id='anio' aria-label="Default select example" name="anio" onChange={(e) => setAnio(e.target.value)} value={anio}>
              {
                  anios.map((anio, i)=>{
                      return <option value={anio} key={i} >{anio}</option>
                  })
              }
          </select>
        </div>
      </div>

    <div className="row justify-content-center mb-5">
        <BarChartEmpleado 
          datos={gastoEmpleadoAnual}
          title={"Gasto Empleado Anual"}
        />

        <BarChartEmpleado 
          datos={gastoEmpleadoMensual}
          title={"Gasto Empleado Mensual"}
        />

        <PieChartItem
          datos={gastoItemAnual}
          title={"Gasto Item Anual"}
        />

        <PieChartItem
          datos={gastoItemMensual}
          title={"Gasto Item Mensual"}
        />
      </div>

    </div>
  )
}

export default Dashboard
