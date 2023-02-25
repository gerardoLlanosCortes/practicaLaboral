import React, { useState, useEffect } from 'react'
import {show__alert} from "../utils/functions"
import withReactContent from 'sweetalert2-react-content'
import Swal from "sweetalert2";

import rendicionService from '../services/rendicionService'
import { width } from '@mui/system';


export const FormRendicionDetalle = ({detalle, idEnc, guardar, setGuardar, formDetalle, setFormDetalle, items, tipos, deleteDet, defaultFecha}) => {
    const [idRenEnc, setIdRenEnc] = useState(idEnc)
    const [idRenDet, setIdRenDet] = useState(detalle.IdRenDet)
    const [idTipo,setIdTipo] = useState(detalle.IdTipo)
    const [idItem,setIdItem] = useState(detalle.IdItem)
    const [fechaDocDet, setFechaDocDet] = useState(detalle.FechaDoc)
    const [idTipoDoc, setIdTipoDoc] = useState(detalle.IdTipoDoc)
    const [numeroDoc, setNumeroDoc] = useState(detalle.NumeroDoc)
    const [obsDet, setObsDet] = useState(detalle.Obs)
    const [montoTotal, setMontoTotal] = useState(detalle.MontoTotal)
    const [estado, setEstado] = useState(detalle.Estado)
    const [nombreImagen, setNombreImagen] = useState(detalle.NombreImagen)

    const [urlImagen, setUrlImagen] = useState("")

    
    useEffect(() => {
        setEstado(detalle.Estado)
    })


    useEffect(() => {
        (guardar)? validarDet() :setFormDetalle([])
    }, [guardar])

    useEffect(() =>{
        if(nombreImagen == ""){
            setUrlImagen("http://localhost:4503/public/no-image.png")
        }
        
        else{
            setUrlImagen("http://localhost:4503/public/" + nombreImagen)
        }
    }, [])

    // =========================
    // === POST Y PATCH DET ====
    // =========================

    const validarDet = async () => {
        const formdata = new FormData()
        formdata.append("IdRenDet", idRenDet)
        formdata.append("IdTipo", idTipo)
        formdata.append("IdItem", idItem)
        formdata.append("FechaDoc", fechaDocDet)
        formdata.append("IdTipoDoc", idTipoDoc)
        formdata.append("NumeroDoc", numeroDoc)
        formdata.append("MontoTotal", montoTotal)
        formdata.append("Obs", obsDet)
        formdata.append("Estado", estado)
        formdata.append("NombreImagen", nombreImagen)
            
        

        if(idTipo === ""){
            show__alert("Escribe el id tipo del detalle", "warning")
            setGuardar(false)
        }else if(idItem === ""){
            show__alert("Escribe la id item del detalle", "warning")
            setGuardar(false)
        }else if(fechaDocDet === ""){
            show__alert("Escribe la fecha del detalle", "warning")
            setGuardar(false)
        }else if(idTipoDoc === ""){
            show__alert("Ingresa el tipo de doc del detalle", "warning")
            setGuardar(false)
        }else if(numeroDoc === ""){
            show__alert("Ingresa el numero de doc del detalle", "warning")
            setGuardar(false)
        }else if(montoTotal === ""){
            show__alert("Ingresa el monto total del detalle", "warning")
            setGuardar(false)
        }else if(obsDet === ""){
            show__alert("Ingresa la observación del detalle", "warning")
            setGuardar(false)        

        }
        else{
            console.log("detalle valido")
            if(detalle.isNew){
                setFormDetalle([...formDetalle,rendicionService.insertDet(idRenEnc, formdata)])

            }else{
                setFormDetalle((prevState) => [...prevState,rendicionService.updateDet(idRenEnc, idRenDet , formdata)])
            }   
        }
    }
    

    function previewFile() {
        let preview = document.querySelector('img');
        let file    = document.querySelector('input[type=file]').files[0];
        let reader  = new FileReader();
      
        reader.onloadend = function () {
          preview.src = reader.result;
        }
      
        if (file) {
          reader.readAsDataURL(file);
        } else {
            preview.src = "http://localhost:4503/public/no-image.png";
        }
    }
    


  return (
    <div className="modal-footer mt-3 modal-xl">
        <div className="d-block w-100">
        <label className="h5">Detalle</label>
        </div>
        <div  className="input-group mb-3">
            <input type="text" id='first' className='form-control' placeholder='ID Rendición' hidden  value={idRenDet}
            onChange={(e) => setIdRenDet(e.target.value)} />
        </div>

        <div className="d-flex justify-content-between w-100 flex--gap">
            <div className="input-group mb-3">
                <span className='input-group-text input-group-text--detalle'>Tipo</span>
                <select className="form-select" id='second' aria-label="Default select example" name="tipo"  onChange={(e) => {setIdTipo(e.target.value)}} value={idTipo}>
                    <option value="">Selecciona un Tipo</option>
                    {
                        tipos.map((tipo)=>{
                            return <option value={tipo.IdTipo} key={tipo.IdTipo} >{tipo.Tipo}</option>
                        })
                    }
                </select>
            </div>
            
            <div className="input-group mb-3">
                <span className='input-group-text input-group-text--detalle'>Item</span>
                <select className="form-select" aria-label="Default select example" name="item" id='item' onChange={(e) => setIdItem(e.target.value)} value={idItem}>
                    <option value="">Selecciona un Item</option>
                    {
                        items.map((item)=>{
                            return <option value={item.IdItem} key={item.IdItem} >{item.Item}</option>
                        })
                    }
                </select>
            </div>
            
            
            <div className="input-group mb-3">
                <span className='input-group-text input-group-text--detalle'>Fecha Doc</span>
                <input id="startDate" className="form-control" type="date" placeholder='Fecha del documento' value={fechaDocDet || setFechaDocDet(defaultFecha())} 
                onChange={(e) => {
                    setFechaDocDet(e.target.value)}}/> 
            </div>
        </div>

        
        <div className="d-flex justify-content-between w-100 flex--detalle flex--gap">
            <div className="input-group mb-3">
                <span className='input-group-text input-group-text--detalle'>ID Tipo Doc</span>
                <select className="form-select" aria-label="Default select example" name="estado" id='estado' value={idTipoDoc}
                onChange={(e) => setIdTipoDoc(e.target.value)}>
                    <option value="">Selecciona un Estado</option>
                    <option value="1">Boleta</option>
                    <option value="2">Factura</option>
                </select>
            </div>
            
            <div className="input-group mb-3">
                <span className='input-group-text input-group-text--detalle'>Numero Doc</span>
                <input type="text"  className='form-control' placeholder='Numero del documento' value={numeroDoc}
                onChange={(e) => setNumeroDoc(e.target.value)} />
            </div>
            
            <div className="input-group mb-3">
                <span className='input-group-text input-group-text--detalle'>Observación</span>
                <input type="text"  className='form-control' placeholder='Observación' value={obsDet}
                onChange={(e) => setObsDet(e.target.value)} />
            </div>
        </div>
        
        <div className="d-flex justify-content-between w-100 flex--detalle flex--gap">
            <div className="input-group mb-3 my-auto input__height">
                <span className='input-group-text input-group-text--detalle'>Monto Total</span>
                <input type="text"  className='form-control ' placeholder='Monto Total' value={montoTotal}
                onChange={(e) => setMontoTotal(e.target.value)} />
            </div>
            
            <div className="input-group mb-3 my-auto input__height">
                <input className="form-control " id="formFile" type="file" 
                onChange={(e) => {
                    setNombreImagen(e.target.files[0])
                    previewFile()
                }}/>
            </div>

            <div className="input-group mb-3 my-auto">
                <a className='imagen__link'  target="_blank">
                    <img className='img__detalle d-block' src={urlImagen}  alt=""/>
                </a>
            </div>

        </div>
    
        <div className="d-flex justify-content-end btn__container w-100">
            <div className="">
                <button type='button' className='btn btn-danger btn__modal '  onClick={() => deleteDet(idRenEnc,idRenDet,numeroDoc, detalle.isNew)}>Eliminar Detalle</button>
            </div>
            
        </div>
    </div>
  )
}
export default FormRendicionDetalle;