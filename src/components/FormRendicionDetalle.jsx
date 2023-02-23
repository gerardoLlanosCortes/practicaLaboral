import React, { useState, useEffect } from 'react'
import {show__alert} from "../utils/functions"
import withReactContent from 'sweetalert2-react-content'
import Swal from "sweetalert2";

import rendicionService from '../services/rendicionService'


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
    const [nombreImagen, setNombreImagen] = useState(detalle.NombreImagen)

    useEffect(() => {
        if(guardar) validarDet()
    }, [guardar])




    // =========================
    // ======= DELETE DET ======
    // =========================

    // const deleteDet = (idEnc,idDet,numeroDoc) => {
    //     const MySwal = withReactContent(Swal)
    //     MySwal.fire({
    //         title: "Seguro que quieres eliminar el detalle " + numeroDoc + " ?",
    //         icon: "question",
    //         confirmButtonColor: 'rgba(25, 135, 84, 0.800)',
    //         cancelButtonColor: '#d33',
    //         showCancelButton:true,confirmButtonText:"Sí, eliminar",cancelButton:"Cancelar"
    //     }).then((async result => {
    //         if(result.isConfirmed){
    //             let result = await rendicionService.delDet(idEnc, idDet)
    //             enviarSolicitud(result)
    //         }else{
    //             show__alert("El detalle NO fue eliminado", "info")
    //         }
    //     }))
    // }


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
            if(detalle.isNew){
                setFormDetalle([...formDetalle,rendicionService.insertDet(idRenEnc, formdata)])
            }else{
                setFormDetalle([...formDetalle,rendicionService.updateDet(idRenEnc, idRenDet , formdata)])
            }   
        }
    }
    
    // const enviarSolicitud = (result) => {
    //     if(result.statusText === "OK"){
    //         show__alert("Accion exitosa","success")
    //         // document.getElementById("btnCerrar").click()
    //     }
    //     else{
    //         show__alert("Error en la solicitud", "error")
    //         console.log(err)
    //     }
    // }


  return (
    <div className="modal-footer mt-3 modal-xl">
        <div className="d-block w-100">
        <label className="h5">Detalle</label>
        </div>
        <div  className="input-group mb-3">
            <input type="text" id='first' className='form-control' placeholder='ID Rendición' hidden  value={idRenDet}
            onChange={(e) => setIdRenDet(e.target.value)} />
        </div>

        <div className="d-flex justify-content-between w-100 flex--detalle">
            <div className="input-group mb-3">
                <span className='input-group-text input-group-text--detalle'>Tipo</span>
                {/* <input type="text" id='second' className='form-control' placeholder='Tipo' value={idTipo} onChange={(e) => setIdTipo(e.target.value)}/> */}
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
                <input id="startDate" className="form-control" type="date" placeholder='Fecha del documento' value={fechaDocDet || defaultFecha()} 
                onChange={(e) => {
                    setFechaDocDet(e.target.value)}}/> 
            </div>
        </div>

        
        <div className="d-flex justify-content-between w-100 flex--detalle">
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
        
        <div className="d-flex justify-content-between w-100 flex--detalle">
            <div className="input-group mb-3">
                <span className='input-group-text input-group-text--detalle'>Monto Total</span>
                <input type="text"  className='form-control' placeholder='Monto Total' value={montoTotal}
                onChange={(e) => setMontoTotal(e.target.value)} />
            </div>
            
            <div className="input-group mb-3">
                <input className="form-control" id="formFile" type="file" 
                onChange={(e) => {
                    setNombreImagen(e.target.files[0])
                }}/>
            </div>

        </div>
    
        <div className="d-flex justify-content-end btn__container w-100">
            <div className="">
                <button type='button' className='btn btn-danger btn__modal ' onClick={() => deleteDet(idRenEnc,idRenDet,numeroDoc, detalle.isNew)}>Eliminar Detalle</button>
            </div>
            
        </div>
    </div>
  )
}
export default FormRendicionDetalle;