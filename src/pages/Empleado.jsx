import React from 'react'
import { useState,useEffect } from 'react'
import {buscarEnTabla, showAlert} from "../utils/functions"
import Tabla from '../components/shared/Tabla'

import { useForm } from 'react-hook-form'
import FormEmpleado from '../components/forms/FormEmpleado'
import ModalLibreria from '../components/shared/ModalLibreria'


import empleadoService from '../services/empleadoService'
import bancoService from '../services/bancoService'
import empresaService from '../services/empresaService'

export const Empleado = () => {

    const {register, handleSubmit, formState: { errors }, setValue, reset} = useForm({defaultValues: { rut: "", nombres: "",apellidos: "",cuenta: "",
    idBanco: "",idEmpresa: "",imei: "",numInicial: "",estado: "",}})

    const [empleados, setEmpleados] = useState([]);
    const [rutEmpleado,setRut] = useState("")
    const [operation, setOperation] = useState(1)
    const [title, setTitle] = useState("")

    const [empresas, setEmpresas] = useState([]);
    const [bancos, setBancos] = useState([]);

    const [searchApiData, setSearchApiData] = useState("")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    


    // =========================
    // ======== GET ============
    // =========================

    useEffect(() => {
        obtenerDatos()
        obtenerDatosEmpresa()
        obtenerDatosBanco()
    }, [])

    const obtenerDatos = async () =>{
        try{
            let result = await empleadoService.getAll();
            setEmpleados(result.data)
            setSearchApiData(result.data)
        }catch(err){
            console.log(err)
        }
        
    }

    const obtenerDatosEmpresa = async () =>{
        try{
            let result = await empresaService.getAll();
            setEmpresas(result.data)
        }catch(err){
            console.log(err)
        }
    }


    const obtenerDatosBanco = async () =>{
        try{
            let result = await bancoService.getAll();
            setBancos(result.data)
        }catch(err){
            console.log(err)
        }
    }
      

    // =========================
    // ==== POST Y PATCH =======
    // =========================

    const onSubmit = async (data, e) => {
        let parametros = {Rut: data.rut,Nombres: data.nombres,Apellidos: data.apellidos,Cuenta: data.cuenta,IdBanco: data.idBanco,IdEmpresa: data.idEmpresa,Imei: data.imei,NumInicial: data.numIinicial,Estado: data.estado}


        if(operation === 1){
            showResult(await empleadoService.insert(parametros))
        }else{
            showResult(await empleadoService.update(rutEmpleado, parametros))
        }
        e.target.reset()
    };


    // =========================
    // ======= DELETE ==========
    // =========================

    const deleteItem = (id,nombres,apellidos) => {
        showAlert(`Seguro que quieres eliminar el empleado ${nombres} ${apellidos} ?`, "question", "eliminar")
        .then((async result => {
            if(result.isConfirmed){
                setRut(id)
                let result = await empleadoService.del(id)
                showResult(result)
            }else{
                showAlert("El Empleado NO fue eliminado", "info")
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
            name: "Rut",
            selector: row => row.Rut,
            sortable: true
        },
        {
            name: "Nombres",
            selector: row => row.Nombres,
            sortable: true
        },
        {
            name: "Apellidos",
            selector: row => row.Apellidos,
            sortable: true
        },
        {
            name: "Cuenta",
            selector: row => row.Cuenta,
            sortable: true,
        },
        {
            name: "IdBanco",
            selector: row => row.IdBanco,
            sortable: true,
            omit: true
        },
        {
            name: "Banco",
            selector: row => row.Banco,
            sortable: true,
        },
        {
            name: "IdEmpresa",
            selector: row => row.IdEmpresa,
            sortable: true,
            omit: true
        },
        {
            name: "Empresa",
            selector: row => row.Empresa,
            sortable: true
        },
        {
            name: "Imei",
            selector: row => row.Imei,
            sortable: true
        },
        {
            name: "NumInicial",
            selector: row => row.NumInicial,
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
                    <a href="#" className='edit edit__icon' data-toggle="modal"><i className='material-icons ' data-toggle="tooltip" title='Edit' onClick={() => handleShow(2, row.Rut, row.Nombres, row.Apellidos, row.Cuenta, row.IdBanco, row.IdEmpresa ,row.Imei ,row.NumInicial, row.Estado)}>&#xE254;</i></a> 
                    <a href="#" className='delete delete__icon' data-toggle="modal"><i className='material-icons' data-toggle="tooltip" title='Delete' onClick={() => deleteItem(row.Rut, row.Nombres, row.Apellidos)}>&#xE872;</i></a>
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

    const handleShow = (op, rut, nombres, apellidos, cuenta, idBanco, idEmpresa, imei, numInicial, estado) => {
        setRut("")
        reset()
        setOperation(op)
        if(op === 1){
            setTitle("Registrar Empleado")
            window.setTimeout(function(){
                document.getElementById("first").removeAttribute('disabled', '');
                document.getElementById("first").focus()
            },100)
        }
        else if(op === 2){
            setRut(rut)
            setTitle("Editar Empleado")
            setValue("rut", rut)
            setValue("nombres", nombres)
            setValue("apellidos", apellidos)
            setValue("cuenta", cuenta)
            setValue("idBanco", idBanco)
            setValue("idEmpresa", idEmpresa)
            setValue("imei", imei)
            setValue("numInicial", numInicial)
            setValue("estado", estado)

            window.setTimeout(function(){
                document.getElementById("first").setAttribute('disabled', '');
                document.getElementById("second").focus()
            },100)
        }
        setShow(true)
    }

    // =========================
    // ======== SEACRH =========
    // =========================

    const handleFilter = (e) => {
        const valor = buscarEnTabla(e.target.value, searchApiData, ["Rut","Item", "Nombres", "Apellidos", "Cuenta", "Imei"])
        setEmpleados(valor)
    }

    return(
        <div className='empleado' >
            <Tabla 
                arrayData={empleados}
                columns={columns}
                title={"Administrar Empleados"}
                handleFilter={handleFilter}
                handleShow={handleShow}
            />

            <ModalLibreria
                title={title} 
                handleClose={handleClose}
                show={show}
            >
                <FormEmpleado 
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit} 
                    register={register}
                    errors={errors}
                    bancos={bancos}
                    empresas={empresas}
                />
            </ModalLibreria>
                            
        </div>
    )
}

export default Empleado;