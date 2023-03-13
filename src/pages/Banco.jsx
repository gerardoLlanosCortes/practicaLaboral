import React from 'react'
import { useState,useEffect } from 'react'
import {buscarEnTabla, showAlert} from "../utils/functions"
import Tabla from '../components/shared/Tabla'

import { useForm } from 'react-hook-form'
import FormBanco from '../components/forms/FormBanco'
import ModalLibreria from '../components/shared/ModalLibreria'
import bancoService from '../services/bancoService'

export const Banco = () => {

    const {register, handleSubmit, formState: { errors }, setValue, reset} = useForm({defaultValues: { banco: "", estado: "",}})


    const [bancos, setBancos] = useState([]);
    const [bancoId,setBancoId] = useState("")

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

    const onSubmit = async (data, e) => {
        let parametros = {Banco: data.banco,Estado: data.estado}

        if(operation === 1){
            showResult(await bancoService.insert(parametros))
        }else{
            showResult(await bancoService.update(bancoId, parametros))
        }
        e.target.reset()
    };


    // =========================
    // ======= DELETE ==========
    // =========================

    const deleteItem = (id,banco) => {
        showAlert(`Seguro que quieres eliminar el banco ${banco} ?`, "question", "eliminar" )
        .then((async result => {
            if(result.isConfirmed){
                setBancoId(id)
                let result = await bancoService.del(id)
                showResult(result)
            }else{
                showAlert("El banco NO fue eliminado", "info")
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
                    <a href="#" className='edit edit__icon' data-toggle="modal"><i className='material-icons ' data-toggle="tooltip" title='Edit' onClick={() => handleShow(2, row.IdBanco, row.Banco, row.Estado)}>&#xE254;</i></a> 
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

    const handleShow = (op, id, banco, estado) => {
        setBancoId("")
        reset()
        setOperation(op)
        if(op === 1){
            setTitle("Registrar Banco")
        }
        else if(op === 2){
            setBancoId(id)
            setTitle("Editar Banco")
            setValue("banco", banco)
            setValue("estado", estado)
        }
        setShow(true)
        window.setTimeout(function(){
            document.getElementById("first").focus()
        },500)
    }

    // =========================
    // ======== SEARCH =========
    // =========================

    const handleFilter = (e) => {
        const valor = buscarEnTabla(e.target.value, searchApiData, ["Banco"])
        setBancos(valor)
    }


    return(
        <div className='Banco' >
            <Tabla 
                arrayData={bancos}
                columns={columns}
                title={"Administrar Bancos"}
                handleFilter={handleFilter}
                handleShow={handleShow}
            />

            <ModalLibreria
                title={title} 
                handleClose={handleClose}
                show={show}
            >
                <FormBanco 
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit} 
                    register={register}
                    errors={errors}
                />
            </ModalLibreria>
        </div>


        
    )
}

export default Banco;