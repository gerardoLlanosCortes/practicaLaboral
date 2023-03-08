import React from 'react'
import { useState,useEffect } from 'react'
import {buscarEnTabla, showAlertDelete, show__alert} from "../utils/functions"
import Tabla from '../components/Tabla'
import withReactContent from 'sweetalert2-react-content'
import Swal from "sweetalert2";
import empresaService from '../services/empresaService'

import { useForm } from 'react-hook-form'
import { empresaValidator } from '../utils/validators'
import FormEmpresa from '../components/FormEmpresa'
import ModalLibreria from '../components/ModalLibreria'
import Modal from 'react-bootstrap/Modal';

export const Empresa = () => {

    const {register, handleSubmit, formState: { errors }, setValue, reset} = useForm({defaultValues: { rut: "", empresa: "", estado: "",}})

    const [empresas, setEmpresas] = useState([]);
    const [idEmpresa,setIdEmpresa] = useState("")
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

    const onSubmit = async (data, e) => {
        let parametros = {RutEmpresa: data.rut,Empresa: data.empresa,Estado: data.estado}

        if(operation === 1){
            showResult(await empresaService.insert(parametros))
        }else{
            showResult(await empresaService.update(idEmpresa, parametros))
        }
        e.target.reset()
    };



    // =========================
    // ======= DELETE ==========
    // =========================

    const deleteItem = (id,empresa) => {
        showAlertDelete(empresa)
        .then((async result => {
            if(result.isConfirmed){
                setIdEmpresa(id)
                let result = await empresaService.del(id)
                showResult(result)
            }else{
                show__alert("La empresa NO fue eliminada", "info")
            }
        }))
    }


    // ====================================
    // ======= Mostrar resultado ==========
    // ====================================

    const showResult = (result) => {
        if(result.statusText === "OK"){
            show__alert("Accion exitosa","success")
            handleClose()
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
                    <a href="#" className='edit edit__icon' data-toggle="modal"><i className='material-icons ' data-toggle="tooltip"  title='Edit' onClick={() => handleShow(2, row.IdEmpresa, row.RutEmpresa, row.Empresa, row.Estado)}>&#xE254;</i></a> 
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

    const handleShow = (op, id, rut, empresa, estado) => {
        setIdEmpresa("")
        reset()
        setOperation(op)
        if(op === 1){
            setTitle("Registrar Empresa")
        }else{
            setIdEmpresa(id)
            setTitle("Editar Empresa")
            setValue("rut", rut)
            setValue("empresa", empresa)
            setValue("estado", estado)
        }
        setShow(true)
        window.setTimeout(function(){
        document.getElementById("first").focus()
        },500)
    };


    // =========================
    // ======== SEARCH =========
    // =========================

    const handleFilter = (e) => {
        const valor = buscarEnTabla(e.target.value, searchApiData, ["Empresa", "RutEmpresa"])
        setEmpresas(valor)
    }

    return(
        <div className='Empresa' >
            <Tabla 
                arrayData={empresas}
                columns={columns}
                title={"Administrar Empresas"}
                handleFilter={handleFilter}
                handleShow={handleShow}
            />

            <ModalLibreria
                title={title} 
                handleClose={handleClose}
                show={show}
            >
                <FormEmpresa 
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit} 
                    register={register}
                    errors={errors}
                />
            </ModalLibreria>
        </div>

        
    )
}

export default Empresa;