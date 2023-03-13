import React from 'react'
import { useState,useEffect } from 'react'
import {buscarEnTabla, showAlert} from "../utils/functions"
import Tabla from '../components/shared/Tabla'

import { useForm } from 'react-hook-form'
import FormItem from '../components/forms/FormItem'
import ModalLibreria from '../components/shared/ModalLibreria'


import itemService from '../services/itemService'

export const Item = () => {

    const {register, handleSubmit, formState: { errors }, setValue, reset} = useForm({defaultValues: { item: "", estado: "",}})

    const [items, setItems] = useState([]);
    const [idItem,setIdItem] = useState("")

    const [operation, setOperation] = useState(1)
    const [title, setTitle] = useState("")

    const [searchApiData, setSearchApiData] = useState("")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    


    // =========================
    // ======== GET ============
    // =========================

    useEffect(() => {
        obtenerDatos()

        
    }, [])

    const obtenerDatos = async () =>{
        try{
            let result = await itemService.getAll();
            setItems(result.data)
            setSearchApiData(result.data)
        }catch(err){
            console.log(err)
        }
        
    }



    // =========================
    // ==== POST Y PATCH =======
    // =========================

    const onSubmit = async (data, e) => {
        let parametros = {Item: data.item,Estado: data.estado}

        if(operation === 1){
            showResult(await itemService.insert(parametros))
        }else{
            showResult(await itemService.update(idItem, parametros))
        }
        e.target.reset()
    };


    // =========================
    // ======= DELETE ==========
    // =========================

    const deleteItem = (id,item) => {
        showAlert(`Seguro que quieres eliminar el item ${item} ?`, "question", "eliminar")
        .then((async result => {
            if(result.isConfirmed){
                setIdItem(id)
                let result = await itemService.del(id)
                showResult(result)
            }else{
                showAlert("El item NO fue eliminado", "info")
            }
        }))
    }
    

    // =========================
    // ======= ENVIAR ==========
    // =========================

    const showResult = (result) => {
        if(result.statusText === "OK"){
            showAlert("Accion exitosa","success")
            handleClose()
            obtenerDatos()
        }
        else{
            showAlert("Error en la solicitud", "error")
            console.log(err)
        }
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
                    <a href="#" className='edit edit__icon' data-toggle="modal"><i className='material-icons ' data-toggle="tooltip" title='Edit' onClick={() => handleShow(2, row.IdItem, row.Item, row.Estado)}>&#xE254;</i></a> 
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

    const handleShow = (op, id, banco, estado) => {
        setIdItem("")
        reset()
        setOperation(op)
        if(op === 1){
            setTitle("Registrar Item")
        }
        else if(op === 2){
            setIdItem(id)
            setTitle("Editar Item")
            setValue("item", banco)
            setValue("estado", estado)
        }
        setShow(true)
        window.setTimeout(function(){
            document.getElementById("first").focus()
        },500)
    }

    // =========================
    // ======== SEACRH =========
    // =========================

    const handleFilter = (e) => {
        const valor = buscarEnTabla(e.target.value, searchApiData, ["Item"])
        setItems(valor)
    }


    return(
        <div className='item' >
            <Tabla 
                arrayData={items}
                columns={columns}
                title={"Administrar Items"}
                handleFilter={handleFilter}
                handleShow={handleShow}
                />

            <ModalLibreria
                title={title} 
                handleClose={handleClose}
                show={show}
            >
                <FormItem 
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit} 
                    register={register}
                    errors={errors}
                />
            </ModalLibreria>


            
        </div>

        
    )
}

export default Item;