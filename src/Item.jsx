import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import {show__alert} from "./functions"
import withReactContent from 'sweetalert2-react-content'
import Swal from "sweetalert2";

import Tabla from './components/Tabla'

export const Item = () => {

    const url = "https://tzone.cl:4503/item"
    const [items, setItems] = useState([]);
    const [idItem,setIdItem] = useState("")
    const [item,setItem] = useState("")
    const [estado, setEstado] = useState("")
    const [operation, setOperation] = useState(1)
    const [title, setTitle] = useState("")

    const header = {
        "Content-Type": "application/json",
        "Accept": 'application/json',
        "authorization": "Bearer: " + localStorage.getItem("user-token")
    }

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
            let result = await axios.get(url,{
                headers: header,
            })
            setItems(result.data)
            setSearchApiData(result.data)
        }catch(err){
            console.log(err)
        }
        
    }

    useEffect(() => {
        obtenerDatos()

        
    }, [])



    // =========================
    // ==== POST Y PATCH =======
    // =========================

    const validar = (idItem) => {
        let parametros
        let metodo
        if(item.trim() === ""){
            show__alert("Escribe el nombre del item", "warning")
        }else if(estado === ""){
            show__alert("Escribe el estado del item", "warning")
        }else{
            if(operation === 1){
                parametros = {Item:item.trim(), Estado:estado}
                metodo = "POST"
                enviarSolicitud(metodo, url, parametros)
            }else{
                parametros = {Item:item.trim(), Estado:estado}
                enviarSolicitud("PATCH", `https://tzone.cl:4503/item/${idItem}`, parametros)
            }
            
        }
    }



    // =========================
    // ======= DELETE ==========
    // =========================

    const deleteItem = (id,item) => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: "Seguro que quieres eliminar el item " + item + " ?",
            icon: "question",
            confirmButtonColor: 'rgba(25, 135, 84, 0.800)',
            cancelButtonColor: '#d33',
            showCancelButton:true,confirmButtonText:"Sí, eliminar",cancelButton:"Cancelar"
        }).then((result => {
            if(result.isConfirmed){
                setIdItem(id)
                let urlDelete= `https://tzone.cl:4503/item/${id}`
                enviarSolicitud("DELETE", urlDelete)
            }else{
                show__alert("El item NO fue eliminado", "info")
            }
        }))
    }



    // =========================
    // ======= ENVIAR ==========
    // =========================

    const enviarSolicitud = async(metodo, url, parametros) => {
        await axios({method:metodo, url:url, headers:header, data:parametros})
        .then(function(respuesta){
            if(respuesta.statusText === "OK"){
                let tipo = "success"
                let mensaje = "Accion exitosa"
                show__alert(mensaje,tipo)
                document.getElementById("btnCerrar").click()
                obtenerDatos()
            }
        }).catch(function(err){
            show__alert("Error en la solicitud", "error")
            console.log(err)
        })
    }


    // =========================
    // ======== COLUMNAS =======
    // =========================

    const columns = [
        {
            name: "Item",
            selector: row => row.Item,
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
                    <a href="#" className='edit edit__icon' data-toggle="modal"><i className='material-icons ' data-toggle="tooltip" data-bs-toggle="modal" data-bs-target="#modalTable" title='Edit' onClick={() => openModal(2, row.IdItem, row.Item, row.Estado)}>&#xE254;</i></a> 
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

    const openModal = (op, id, item, estado) => {
        setIdItem("")
        setItem("")
        setEstado("")
        setOperation(op)
        if(op === 1){
            setTitle("Registrar Item")
        }
        else if(op === 2){
            setTitle("Editar Item")
            setIdItem(id)
            setItem(item)
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
            setItems(searchApiData)
        }else{
            const filterResult = searchApiData.filter(item => item.Item.toLowerCase().includes(e.target.value.toLowerCase()))
            if (filterResult.length > 0) {
                setItems(filterResult)
            } else {
                setItems([{"Item": "No hay información", "Estado": undefined}])
            }
        }
        setFilterVal(e.target.value)
    }


    return(
        <div className='item' >
            <Tabla 
                arrayData={items}
                columns={columns}
                title={"Administrar Items"}
                filterVal={filterVal}
                handleFilter={handleFilter}
                openModal={openModal}
                />




            <div id='modalTable' className="modal fade" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="h5">{title}</label>
                            <button type='button' className='btn-close' data-bs-miss="modal" aria-label='Close'></button>
                        </div>
                        <div className="modal-body">
                            <input type="hidden" id='id'/>
                            <div className="input-group mb-3">
                                <span className='input-group-text'><i className="fas fa-database"></i></span>
                                <input type="text" id='first' className='form-control' placeholder='Item' value={item}
                                onChange={(e) => setItem(e.target.value)} />
                            </div>

                            <div className="input-group mb-3">
                                <span className='input-group-text'><i className="fa-solid fa-rss"></i></span>
                                <select className="form-select" aria-label="Default select example" name="estado" id='estado' onChange={(e) => setEstado(e.target.value)}>
                                    <option value="">Selecciona un Estado</option>
                                    <option value="1">Activo</option>
                                    <option value="0">Inactivo</option>
                                </select>
                            </div>


                            <div className="d-grid col-6 mx-auto">
                                <button onClick={() => validar(idItem)} className='btn btn-success btn__save btn__save--modal'>
                                    <i className="fa-solid fa-floppy-disk save__icon"></i>
                                </button>
                            </div>
                            <div className="modal-footer mt-3">
                                <button type='button' className='btn btn-danger' id='btnCerrar' data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    )
}

export default Item;