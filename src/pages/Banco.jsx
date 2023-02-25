import React from 'react'
import { useState,useEffect } from 'react'
import {show__alert} from "../utils/functions"
import withReactContent from 'sweetalert2-react-content'
import Swal from "sweetalert2";

import Tabla from '../components/Tabla'
import bancoService from '../services/bancoService'

export const Banco = () => {

    const [bancos, setBancos] = useState([]);
    const [bancoId,setBancoId] = useState("")
    const [bancoNombre,setBancoNombre] = useState("")
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
            let result = await bancoService.getAll();
            setBancos(result.data)
            setSearchApiData(result.data)
        }catch(err){
            console.log(err)
        }
        
    }


    // =========================
    // ==== POST Y PATCH =======
    // =========================

    const validar = async (bancoId) => {
        let parametros = {Banco:bancoNombre, Estado: estado}
        
        if(bancoNombre === "" || bancoNombre === undefined) show__alert("Escribe el nombre del banco", "warning")
        else if(bancoNombre.length <= 2 || bancoNombre.length > 200) show__alert("El nombre del banco debe tener entre 3 y 200 carácteres", "warning")
        else if(estado === "" || estado === undefined) show__alert("Seleeciona el estado del banco", "warning")
        else (operation === 1) ? enviarSolicitud(await bancoService.insert(parametros)) : enviarSolicitud(await bancoService.update(bancoId, parametros))   
    }



    // =========================
    // ======= DELETE ==========
    // =========================

    const deleteItem = (id,banco) => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: "Seguro que quieres eliminar el banco " + banco + " ?",
            icon: "question",
            confirmButtonColor: 'rgba(25, 135, 84, 0.800)',
            cancelButtonColor: '#d33',
            showCancelButton:true,confirmButtonText:"Sí, eliminar",cancelButtonText:"Cancelar"
        }).then(( async result => {
            if(result.isConfirmed){
                setBancoId(id)
                let result = await bancoService.del(id)
                enviarSolicitud(result)
            }else{
                show__alert("El banco NO fue eliminado", "info")
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
            name: "Banco",
            selector: row => row.Banco,
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
                    <a href="#" className='edit edit__icon' data-toggle="modal"><i className='material-icons ' data-toggle="tooltip" data-bs-toggle="modal" data-bs-target="#modalTable" title='Edit' onClick={() => openModal(2, row.IdBanco, row.Banco, row.Estado)}>&#xE254;</i></a> 
                    <a href="#" className='delete delete__icon' data-toggle="modal"><i className='material-icons' data-toggle="tooltip" title='Delete' onClick={() => deleteItem(row.IdBanco, row.Banco)}>&#xE872;</i></a>
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

    const openModal = (op, id, banco, estado) => {
        setBancoId("")
        setBancoNombre("")
        setEstado("")
        setOperation(op)
        if(op === 1){
            setTitle("Registrar Banco")
        }
        else if(op === 2){
            setTitle("Editar Banco")
            setBancoId(id)
            setBancoNombre(banco)
            setEstado(estado)
        }
        window.setTimeout(function(){
            document.getElementById("first").focus()
        },500)
    }

    // =========================
    // ======== SEARCH =========
    // =========================

    const handleFilter = (e) => {
        if(e.target.value == ""){
            setBancos(searchApiData)
        }else{
            const filterResult = searchApiData.filter(item => item.Banco.toLowerCase().includes(e.target.value.toLowerCase()))
            if (filterResult.length > 0) {
                setBancos(filterResult)
            } else {
                setBancos([{"Banco": "No hay información", "Estado": undefined}])
            }
        }
        setFilterVal(e.target.value)
    }


    return(
        <div className='banco' >
            <Tabla 
                arrayData={bancos}
                columns={columns}
                title={"Administrar Bancos"}
                filterVal={filterVal}
                handleFilter={handleFilter}
                openModal={openModal}
                />




            <div id='modalTable' className="modal fade " aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="h5">{title}</label>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id='btnCerrar'></button>
                        </div>
                        <div className="modal-body">
                            <input type="hidden" id='id'/>
                            <div className="input-group mb-3">
                                <span className='input-group-text input-group-text__modal'>Banco</span>
                                <input type="text" id='first' className='form-control' placeholder='Ingresar Banco' value={bancoNombre}
                                onChange={(e) => setBancoNombre(e.target.value)} />
                            </div>

                            <div className="input-group mb-3">
                                <span className='input-group-text input-group-text__modal'>Estado</span>
                                <select className="form-select" aria-label="Default select example" name="estado" id='estado' onChange={(e) => setEstado(e.target.value)} value={estado}>
                                    <option value="">Selecciona un Estado</option>
                                    <option value="1">Activo</option>
                                    <option value="0">Inactivo</option>
                                </select>
                            </div>

                            <div className="d-flex justify-content-end btn__container">
                                <div className="">
                                    <button type='button' onClick={() => validar(bancoId)} className='btn btn-success btn__save btn__save--modal'>
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

export default Banco;