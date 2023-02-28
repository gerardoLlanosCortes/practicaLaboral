import React, { useState, useEffect } from 'react'
import PDFFile from '../components/PDFFile'
import { PDFDownloadLink,  PDFViewer} from '@react-pdf/renderer'
import { height } from '@mui/system'
import rendicionService from '../services/rendicionService'
import itemService from '../services/itemService'

export const Home = () => {

  const [rendicionDet, setRendicionDet] = useState([]);
  const [resumenes, setResumenes] = useState([]);
  const [rendicionesEnc, setRendicionesEnc] = useState([]);
  const [rendicionesEncOne, setRendicionesEncOne] = useState([]);
  const [items, setItems] = useState([]);
  

  const openModal = () => {
    console.log("click al modal")
  }

  useEffect(() => {
    obtenerDatos()
    obtenerDatosItems()
  },[])


  const obtenerOne = async (id) =>{
    try{
      let result = await rendicionService.getOne(id);
      setRendicionDet(result.data.detalle)
      setResumenes(result.data.resumen)
      setRendicionesEncOne(result.data)
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
            <div className="col-sm-4" key={encabezado.IdRenEnc}>
              <div className="card">
              <img src="https://loremflickr.com/100/100" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{encabezado.Numero}</h5>
                  <p className="card-text">{encabezado.Rut}</p>
                  <a href="#" data-toggle="tooltip" data-bs-toggle="modal" data-bs-target="#modalTable"  className="btn btn-danger" onClick={() => obtenerOne(encabezado.IdRenEnc)}>Ver PDF</a>
                </div>
              </div>
            </div>
          )
        })} 
      </div>


      <div id='modalTable' className="modal fade modal-xl" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
              <PDFViewer style={{width:"100%", height:"93vh"}}>
                <PDFFile
                rendicionesEncOne={rendicionesEncOne}
                rendicionDet={rendicionDet}
                resumenes={resumenes}
                items={items}
                />
              </PDFViewer>
            </div>
        </div>
      </div>


      
        
    {/* <div className="container-sm">
      <div className="row hero__main flex-column-reverse flex-md-row">
        <div className="col-md-5 text-center">
            <div className="home__texts d-flex flex-column justify-content-start">
              <h1>Home</h1>
              <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, rem!</h2>
              <a href="#" className='btn__home'>Click</a>
            </div>
          </div>
        
        <div className="col-md-7 text-center home__img ">
          <img className='d-block' src="./images/hero-img.svg" alt="" />
        </div> */}

        
        {/* <PDFDownloadLink style={{width: "200px", backgroundColor:"#6dbafa", textAlign: 'center', padding: "16px", color:"white", borderRadius: "6px"}}   
          document={<PDFFile/>} fileName="ArchivoDePrueba">
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download now!'
          }
        </PDFDownloadLink> */}

        {/* <PDFViewer><PDFFile/></PDFViewer> */}
      </div>

    </div>
  )
}

export default Home
