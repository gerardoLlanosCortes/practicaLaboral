import React, { useState, useEffect } from 'react'
import PDFFile from '../components/PDFFile'
import { PDFDownloadLink,  PDFViewer} from '@react-pdf/renderer'
import rendicionService from '../services/rendicionService'
import itemService from '../services/itemService'
import {formatNumbers} from '../utils/utils'
import CardHome from '../components/CardHome'

export const Home = () => {

  const [rendicionDet, setRendicionDet] = useState([]);
  const [resumenes, setResumenes] = useState([]);
  const [rendicionesEnc, setRendicionesEnc] = useState([]);
  const [rendicionesEncOne, setRendicionesEncOne] = useState([]);

  const [items, setItems] = useState([]);
  const [tipos, setTiposDet] = useState([])
  
  const [loading, setLoading] = useState([true])


  useEffect(() => {
    obtenerDatos()
    obtenerDatosItems()
  },[])


  const obtenerOne = async (id) =>{
    try{
      setLoading(true)
      let result = await rendicionService.getOne(id);
      setRendicionDet(result.data.detalle)
      setResumenes(result.data.resumen)
      setTiposDet(result.data.tipo)
      setRendicionesEncOne(result.data)
      setLoading(false)

    }catch(err){
      console.log(err)
    }
  }


  const obtenerDatos = async () =>{
    try{
      let result = await rendicionService.getAll();
      setRendicionesEnc(result.data)
    }catch(err){
      console.log(err)
    }
  }

  const obtenerDatosItems = async () =>{
    try{
        let result = await itemService.getAll();
        setItems(result.data)
    }catch(err){
        console.log(err)
    }
  }

  return (
    <div className="container-sm">
      <div className="container-sm">
        <div className="row">
          {rendicionesEnc.map((encabezado) => {
            return (
              <CardHome
                obtenerOne = {obtenerOne}
                encabezado = {encabezado}
                formatNumbers = {formatNumbers}
                key={encabezado.IdRenEnc}
              />
            )
          })} 
        </div>

          
        <div id='modalTable' className="modal fade modal-xl" aria-hidden="true">
          <div className="modal-dialog">
              <div className="modal-content">
                { loading ? " " : 
                  <PDFViewer style={{width:"100%", height:"93vh"}}>
                    <PDFFile
                    rendicionesEncOne={rendicionesEncOne}
                    rendicionDet={rendicionDet}
                    resumenes={resumenes}
                    items={items}
                    tipos={tipos}
                    />
                  </PDFViewer>
                }
              </div>
          </div>
        </div> 
      </div>
    </div>
  )
}

export default Home
