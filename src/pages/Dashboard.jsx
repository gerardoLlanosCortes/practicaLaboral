import React from 'react'
import { useState,useEffect } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import gastosService from '../services/gastosService';
import { formatNumbers } from '../utils/utils';

export const Dashboard = () => {
  const [gastoEmpleadoAnual, setGastoEmpleadoAnual] = useState([]);
  const [gastoEmpleadoMensual, setGastoEmpleadoMensual] = useState([]);
  const [gastoItemAnual, setGastoItemAnual] = useState([]);
  const [gastoItemMensual, setGastoItemMensual] = useState([]);

useEffect(() => {
  obtenerDatos()  
}, [])

const obtenerDatos = async () =>{
    try{
        let result = await gastosService.getAll();
        console.log(result.data)
        setGastoEmpleadoAnual(result.data.gastoEmpleadoAnual)
        setGastoEmpleadoMensual(result.data.gastoEmpleadoMes)
        setGastoItemAnual(result.data.gastoItemAnual)
        setGastoItemMensual(result.data.gastoItemMes)
    }catch(err){
        console.log(err)
    }
    
}

  return (
    
      

    <div className="container-sm"> 
      <h1>Dashboard</h1>

    <h2>Gastos Empleado Anual</h2>
      {gastoEmpleadoAnual.map((gasto, i) => {
        return(
          <div key={i}>
          <b>{gasto.Empleado} :</b> <p style={{display: "inline-block"}}>${formatNumbers(gasto.MontoTotal)}</p>
          </div>
        )
      })}

    <h2>Gastos Empleado Mensual</h2>
      {gastoEmpleadoMensual.map((gasto, i) => {
        return(
          <div key={i}>
          <b>{gasto.Empleado} :</b> <p style={{display: "inline-block"}}>${formatNumbers(gasto.MontoTotal)}</p>
          </div>
        )
      })}


    <h2>Gastos Item Anual</h2>
      {gastoItemAnual.map((gasto, i) => {
        return(
          <div key={i}>
          <b>{gasto.Tipo} :</b> <p style={{display: "inline-block"}}>${formatNumbers(gasto.MontoTotal)}</p>
          </div>
        )
      })}

    <h2>Gastos Item Mensual</h2>
      {gastoItemMensual.map((gasto, i) => {
        return(
          <div key={i}>
          <b>{gasto.Tipo} :</b> <p style={{display: "inline-block"}}>${formatNumbers(gasto.MontoTotal)}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Dashboard
