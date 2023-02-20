import React from 'react'
import { useState,useEffect } from 'react'
import {show__alert} from "../utils/functions"
import Tabla from '../components/Tabla'
import withReactContent from 'sweetalert2-react-content'
import Swal from "sweetalert2";
import { v4 } from 'uuid'
import {Link, Outlet, useNavigate} from 'react-router-dom'
import FormRendicionDetalle from '../components/FormRendicionDetalle'
// onClick={() => window.location.href="/rendicionInfo"}


import rendicionService from '../services/rendicionService'

export const Rendicion = () => {

    // Encabezado
    // IdRenEnc, Numero, Rut, Fecha, Obs, Estado, FechaServer, LastModified, RowGuidControl
    const [rendicionesEnc, setRendicionesEnc] = useState([]);
    const [idRenEnc, setIdRenEnc] = useState("")
    const [numeroEnc,setNumeroEnc] = useState("")
    const [rut,setRut] = useState("")
    const [fechaEnc, setFechaEnc] = useState("")
    const [obsEnc, setObsEnc] = useState("")
    const [estadoEnc, setEstadoEnc] = useState(1)

    // Detalle
    // IdRenDet, IdTipo, IdItem, Fecha, FechaDoc, IdTipoDoc, NumeroDoc, Obs, MontoTotal, Estado, LastModified, FechaServer, RowGuidControl, IdRenEnc, NombreImagen
    const [rendicionesDet, setRendicionesDet] = useState([]);


    const [filterVal, setFilterVal] = useState("")
    const [searchApiData, setSearchApiData] = useState("")
    const [operation, setOperation] = useState(1)
    const [title, setTitle] = useState("")


    // =========================
    // ======== GET ============
    // =========================

    useEffect(() => {
        obtenerDatos()
        
    }, [])

    const obtenerDatos = async () =>{
        try{
            let result = await rendicionService.getAll();
            setRendicionesEnc(result.data)
            setSearchApiData(result.data)
        }catch(err){
            console.log(err)
        }
    }

    // Get one

    const obtenerOne = async (id) =>{
        try{
            let result = await rendicionService.getOne(id);
            console.log(result.data.detalle)
            setRendicionesDet(result.data.detalle)

        }catch(err){
            console.log(err)
        }
    }


    



    // =========================
    // === POST Y PATCH ENC ====
    // =========================

    const validar = async (id) => {
        let parametros = {
            IdRenEnc:idRenEnc,
            Numero:numeroEnc,
            Rut:rut.trim(),
            Fecha:fechaEnc.trim(),
            Obs:obsEnc.trim(),
            Estado:estadoEnc
        }

        if(numeroEnc=== ""){
            show__alert("Escribe el numero de la rendicion", "warning")
        }else if(rut === ""){
            show__alert("Escribe el Rut de la rendicion", "warning")
        }else if(fechaEnc === ""){
            show__alert("Escribe la fecha de la rendicion", "warning")
        }else if(obsEnc === ""){
            show__alert("Escribe el obs de la rendicion", "warning")
        }else if(estadoEnc === ""){
            show__alert("Ingresa el estado de la rendicion", "warning")
        }else{
            if(operation === 1){
                let result = await rendicionService.insertEnc(parametros)
                enviarSolicitud(result)
            }else{
                let result = await rendicionService.updateEnc(id, parametros)
                enviarSolicitud(result)
                
            }
            
            
        }
    }



    // =========================
    // ======= DELETE ENC ======
    // =========================

    const deleteItem = (id,numeroEnc) => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: "Seguro que quieres eliminar la rendición " + numeroEnc + " ?",
            icon: "question",
            confirmButtonColor: 'rgba(25, 135, 84, 0.800)',
            cancelButtonColor: '#d33',
            showCancelButton:true,confirmButtonText:"Sí, eliminar",cancelButton:"Cancelar"
        }).then((async result => {
            if(result.isConfirmed){
                setIdRenEnc(id)
                let result = await rendicionService.delEnc(id)
                enviarSolicitud(result)
            }else{
                show__alert("la rendición NO fue eliminada", "info")
            }
        }))
    }


    // =========================
    // === POST Y PATCH DET ====
    // =========================

    const validarDet = async (idEnc,idDet) => {
        let parametros = {
            IdRenDet:idRenDet,
            IdTipo:idTipo,
            Tipo:tipo.trim(),
            IdItem:idItem,
            Fecha:fechaDet,
            FechaDoc:fechaDocDet,
            IdTipoDoc:idTipoDoc,
            NumeroDoc:numeroDoc,
            MontoTotal:montoTotal,
            Obs:obsDet.trim(),
            Estado:estadoEnc,
            NombreImagen:nombreImagen,
        }

        if(idTipo=== ""){
            show__alert("Escribe el id tipo del detalle", "warning")
        }else if(tipo === ""){
            show__alert("Escribe el tipo del detalle", "warning")
        }else if(idItem === ""){
            show__alert("Escribe la id item del detalle", "warning")
        }else if(fechaDet === ""){
            show__alert("Escribe la fecha del detalle", "warning")
        }else if(idTipoDoc === ""){
            show__alert("Ingresa el tipo de doc del detalle", "warning")
        }else if(numeroDoc === ""){
            show__alert("Ingresa el numero de doc del detalle", "warning")
        }else if(montoTotal === ""){
            show__alert("Ingresa el monto total del detalle", "warning")
        }else if(obsDet === ""){
            show__alert("Ingresa una obs del detalle", "warning")
        }else if(estadoEnc === ""){
            show__alert("Ingresa el estado del detalle", "warning")
        }else if(nombreImagen === ""){
            show__alert("Ingresa una imagen del detalle", "warning")
        }else{
            if(operation === 1){
                let result = await rendicionService.insertDet(idEnc,parametros)
                enviarSolicitud(result)
            }else{
                let result = await rendicionService.updateDet(idEnc, idDet , parametros)
                enviarSolicitud(result)
                
            }
            
            
        }
    }


    // =========================
    // ======= DELETE DET ======
    // =========================

    const deleteDet = (id,numeroDoc) => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: "Seguro que quieres eliminar el documento " + numeroDoc + " ?",
            icon: "question",
            confirmButtonColor: 'rgba(25, 135, 84, 0.800)',
            cancelButtonColor: '#d33',
            showCancelButton:true,confirmButtonText:"Sí, eliminar",cancelButton:"Cancelar"
        }).then((async result => {
            if(result.isConfirmed){
                setIdRenDet(id)
                let result = await rendicionService.delDet(id)
                enviarSolicitud(result)
            }else{
                show__alert("El detalle NO fue eliminado", "info")
            }
        }))
    }



    // =========================
    // ======= ENVIAR ==========
    // =========================

    const enviarSolicitud = (result) => {
        if(result.statusText === "OK"){
            show__alert("Accion exitosa","success")
            document.getElementById("btnCerrar").click()
            obtenerDatos()
        }
        else{
            show__alert("Error en la solicitud", "error")
            console.log(err)
        }
    }


    // =========================
    // ======== COLUMNAS =======
    // =========================

    const columns = [
        {
            name: "Numero",
            selector: row => row.Numero,
            sortable: true
        },
        {
            name: "Rut",
            selector: row => row.Rut,
            sortable: true
        },
        {
            name: "Fecha",
            selector: row => row.Fecha,
            sortable: true
        },
        {
            name: "Obs",
            selector: row => row.Obs,
            sortable: true
        },
        {
            name: "Estado",
            selector: row => row.Estado === 1 ?"Activo" :"Inactivo",
            sortable: true,
        },
        {
            name:"Action",
            cell: row => (
                <div>      
                    <Link to="/rendicionInfo" className='edit edit__icon' data-toggle="modal"><i className='material-icons ' data-toggle="tooltip"  title='See' onClick={(e) => obtenerOne(row.IdRenEnc)}>&#xe417;</i></Link>
                    <a href="#" className='edit edit__icon' data-toggle="modal"><i className='material-icons ' data-toggle="tooltip" data-bs-toggle="modal" data-bs-target="#modalTable" title='Edit' onClick={() => openModal(2, row.IdRenEnc, row.Numero, row.Rut, row.Fecha, row.Obs, row.Estado)}>&#xE254;</i></a> 
                    <a href="#" className='delete delete__icon' data-toggle="modal"><i className='material-icons' data-toggle="tooltip" title='Delete' onClick={() => deleteItem(row.IdItem, row.Item)}>&#xE872;</i></a>
                </div>
            ),
            
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,      
        }  
    ]
    


    // =========================
    // ======== MODAL ==========
    // =========================

    const openModal = (op, id, numero, rut,  fecha, obs, estado) => {
        setIdRenEnc(v4())
        setNumeroEnc("")
        setRut("")
        setFechaEnc("")
        setObsEnc("")
        setEstadoEnc("")
        setOperation(op)
        if(op === 1){
            setTitle("Registrar Rendicion")
            window.setTimeout(function(){
                document.getElementById("second").focus()
            },500)
        }
        else if(op === 2){
            setTitle("Editar Rendición")
            setIdRenEnc(id)
            setNumeroEnc(numero)
            setRut(rut)
            setFechaEnc(fecha)
            setObsEnc(obs)
            setEstadoEnc(estado)
            obtenerOne(id)

            window.setTimeout(function(){
                document.getElementById("second").focus()
            },500)
        }
    }

    // =========================
    // ======== SEACRH =========
    // =========================

    const handleFilter = (e) => {
        if(e.target.value == ""){
            setRendicionesEnc(searchApiData)
        }else{
            const filterResult = searchApiData.filter(item => item.Rut.toLowerCase().includes(e.target.value.toLowerCase())||
            item.Fecha.toLowerCase().includes(e.target.value.toLowerCase())||
            item.Obs.toLowerCase().includes(e.target.value.toLowerCase()))
            if (filterResult.length > 0) {
                setRendicionesEnc(filterResult)
            } else {
                setRendicionesEnc([{"Rendicion": "No hay información", "Estado": undefined}])
            }
        }
        setFilterVal(e.target.value)
    }


    return(
        <div className='item' >
            <Tabla 
                arrayData={rendicionesEnc}
                columns={columns}
                title={"Administrar Rendiciones"}
                filterVal={filterVal}
                handleFilter={handleFilter}
                openModal={openModal}
                />

            <div id='modalTable' className="modal fade modal-xl" aria-hidden="true" >
                <div className="modal-dialog">
                <div className="modal-content">
                        <div className="modal-header">
                            <label className="h5">{title}</label>
                            <button type='button' className='btn-close' data-bs-miss="modal" aria-label='Close'></button>
                        </div>
                        <div className="modal-body">
                            <input type="hidden" id='id'/>
                            <div className="input-group mb-3">
                                <span className='input-group-text'><i className="fa-solid fa-user"></i></span>
                                <input type="text" id='first' className='form-control' placeholder='ID Rendición' disabled  value={idRenEnc}
                                onChange={(e) => setIdRenEnc(e.target.value)} />
                            </div>

                            <div className="input-group mb-3">
                                <span className='input-group-text'><i className="fa-solid fa-user"></i></span>
                                <input type="text" id='second' className='form-control' placeholder='Numero'  value={numeroEnc}
                                onChange={(e) => setNumeroEnc(e.target.value)} />
                            </div>

                            <div className="input-group mb-3">
                                <span className='input-group-text'><i className="fa-solid fa-user"></i></span>
                                <input type="text"  className='form-control' placeholder='Rut' value={rut}
                                onChange={(e) => setRut(e.target.value)} />
                            </div>

                            <div className="input-group mb-3">
                                <span className='input-group-text'><i className="fa-solid fa-user"></i></span>
                                <input type="text"  className='form-control' placeholder='Fecha' value={fechaEnc}
                                onChange={(e) => setFechaEnc(e.target.value)} />
                            </div>

                            <div className="input-group mb-3">
                                <span className='input-group-text'><i className="fa-solid fa-money-check"></i></span>
                                <input type="text"  className='form-control' placeholder='Obs' value={obsEnc}
                                onChange={(e) => setObsEnc(e.target.value)} />
                            </div>

                            <div className="input-group mb-3">
                                <span className='input-group-text'><i className="fa-solid fa-rss"></i></span>
                                <select className="form-select" aria-label="Default select example" name="estado" id='estado' onChange={(e) => setEstadoEnc(e.target.value)}
                                value={estadoEnc}>
                                    <option value="">Selecciona un Estado</option>
                                    <option value="1">Activo</option>
                                    <option value="0">Inactivo</option>
                                </select>
                            </div>

                            
                            <div className="d-flex justify-content-between btn__container">
                                <div className="">
                                    <button type='button' onClick={() => validar(idRenEnc)} className='btn btn-success btn__save btn__save--modal'>
                                        <i className="fa-solid fa-floppy-disk save__icon"></i>
                                    </button>
                                </div>
                                <div className="">
                                    <button type='button' className='btn btn-danger btn__close' id='btnCerrar' data-bs-dismiss="modal">Cerrar</button>
                                </div>
                            </div>

                           
                            { 
                                    rendicionesDet.map(detalle =>{
                                        return (
                                        <FormRendicionDetalle
                                        detalle={detalle} 
                                        key={detalle.IdRenDet}/>
                                        )
                                    })
                            }
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

        
    )
}

export default Rendicion;