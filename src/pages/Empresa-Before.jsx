import React from 'react'
import { useState,useEffect } from 'react'
import {show__alert} from "../utils/functions"
import Tabla from '../components/Tabla'
import withReactContent from 'sweetalert2-react-content'
import Swal from "sweetalert2";

import empresaService from '../services/empresaService'

export const Empresa = () => {

    const [empresas, setEmpresas] = useState([]);
    const [idEmpresa,setIdEmpresa] = useState("")
    const [rutEmpresa,setRutEmpresa] = useState("")
    const [empresa, setEmpresa] = useState("")
    const [estado, setEstado] = useState("")
    const [operation, setOperation] = useState(1)
    const [title, setTitle] = useState("")

    const [filterVal, setFilterVal] = useState("")
    const [searchApiData, setSearchApiData] = useState("")
    


    // =========================
    // ======== GET ============
    // =========================

    useEffect(() => {
        obtenerDatos()
    }, [])

    const obtenerDatos = async () =>{
        try{
            let result = await empresaService.getAll();
            setEmpresas(result.data)
            setSearchApiData(result.data)
        }catch(err){
            console.log(err)
        }
        
    }


    // =========================
    // ==== POST Y PATCH =======
    // =========================

    const validar = async (id) => {
        let parametros = {RutEmpresa: rutEmpresa,Empresa: empresa.trim(),Estado:estado}

        if(rutEmpresa === "" || rutEmpresa === undefined) show__alert("Escribe el rut de la empresa", "warning")
        if(rutEmpresa.length > 12) show__alert("Rut de máximo 12 caracteres", "warning")
        else if(! /\b(\d{1,3}(?:(\.)\d{3}){2}(-)[\dkK])\b/gm.test(rutEmpresa)) show__alert("Rut no valido, debe incluir puntos y guion")
        else if(empresa.trim() === "" || empresa === undefined) show__alert("Escribe el nombre de la empresa", "warning")
        else if(empresa.length <= 2 || empresa.length > 20) show__alert("El nombre de la empresa debe tener entre 3 y 20 carácteres", "warning")
        else if(estado === "" || estado === undefined) show__alert("Selecciona el estado de la empresa", "warning")
        else (operation === 1) ? enviarSolicitud( await empresaService.insert(parametros)) : enviarSolicitud(await empresaService.update(id, parametros))
    }



    // =========================
    // ======= DELETE ==========
    // =========================

    const deleteItem = (id,empresa) => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: "Seguro que quieres eliminar la empresa " + empresa + " ?",
            icon: "question",
            confirmButtonColor: 'rgba(25, 135, 84, 0.800)',
            cancelButtonColor: '#d33',
            showCancelButton:true,confirmButtonText:"Sí, eliminar",cancelButtonText:"Cancelar"
        }).then((async result => {
            if(result.isConfirmed){
                setIdEmpresa(id)
                let result = await empresaService.del(id)
                enviarSolicitud(result)
            }else{
                show__alert("La empresa NO fue eliminada", "info")
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
            name: "RutEmpresa",
            selector: row => row.RutEmpresa,
            sortable: true
        },
        {
            name: "Empresa",
            selector: row => row.Empresa,
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
                    <a href="#" className='edit edit__icon' data-toggle="modal"><i className='material-icons ' data-toggle="tooltip" data-bs-toggle="modal" data-bs-target="#modalTable" title='Edit' onClick={() => openModal(2, row.IdEmpresa, row.RutEmpresa, row.Empresa, row.Estado)}>&#xE254;</i></a> 
                    <a href="#" className='delete delete__icon' data-toggle="modal"><i className='material-icons' data-toggle="tooltip" title='Delete' onClick={() => deleteItem(row.IdEmpresa, row.Empresa)}>&#xE872;</i></a>
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

    const openModal = (op, id,rut, empresa, estado) => {
        setIdEmpresa("")
        setRutEmpresa("")
        setEmpresa("")
        setEstado("")
        setOperation(op)
        if(op === 1){
            setTitle("Registrar Empresa")
        }
        else if(op === 2){
            setTitle("Editar Empresa")
            setIdEmpresa(id)
            setRutEmpresa(rut)
            setEmpresa(empresa)
            setEstado(estado)
        }
        window.setTimeout(function(){
            document.getElementById("first").focus()
        },500)
    }

    // =========================
    // ======== SEACRH =========
    // =========================

    const handleFilter = (e) => {
        if(e.target.value == ""){
            setEmpresas(searchApiData)
        }else{
            const filterResult = searchApiData.filter(item => item.Empresa.toLowerCase().includes(e.target.value.toLowerCase()) || item.RutEmpresa.toLowerCase().includes(e.target.value.toLowerCase()))
            if (filterResult.length > 0) {
                setEmpresas(filterResult)
            } else {
                setEmpresas([{"Empresa": "No hay información", "Estado": undefined}])
            }
        }
        setFilterVal(e.target.value)
    }


    return(
        <div className='Empresa' >
            <Tabla 
                arrayData={empresas}
                columns={columns}
                title={"Administrar Empresas"}
                filterVal={filterVal}
                handleFilter={handleFilter}
                openModal={openModal}
            />




            <div id='modalTable' className="modal fade" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="h5">{title}</label>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id='btnCerrar'></button>
                        </div>
                        <div className="modal-body">
                            <input type="hidden" id='id'/>
                            <div className="input-group mb-3">
                                <span className='input-group-text input-group-text__modal--empresa'>Rut Empresa</span>
                                <input type="text" id='first' className='form-control' placeholder='Ingresar Rut Empresa' value={rutEmpresa}
                                onChange={(e) => setRutEmpresa(e.target.value)} />
                            </div>

                            <div className="input-group mb-3">
                            <span className='input-group-text input-group-text__modal--empresa'>Empresa</span>
                                <input type="text" className='form-control' placeholder='Nombre Empresa' value={empresa}
                                onChange={(e) => setEmpresa(e.target.value)} />
                            </div>

                            <div className="input-group mb-3">
                                <span className='input-group-text input-group-text__modal--empresa'>Estado</span>
                                <select className="form-select" aria-label="Default select example" name="estado" id='estado' onChange={(e) => setEstado(e.target.value)} value={estado}>
                                    <option value="">Selecciona un Estado</option>
                                    <option value="1">Activo</option>
                                    <option value="0">Inactivo</option>
                                </select>
                            </div>


                            <div className="d-flex justify-content-end btn__container">
                                <div className="">
                                    <button type='button' onClick={() => validar(idEmpresa)} className='btn btn-success btn__save btn__save--modal'>
                                        <i className="fa-solid fa-floppy-disk save__icon"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    )
}

export default Empresa;