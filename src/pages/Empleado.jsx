import React from 'react'
import { useState,useEffect } from 'react'
import {show__alert} from "../utils/functions"
import Tabla from '../components/Tabla'
import withReactContent from 'sweetalert2-react-content'
import Swal from "sweetalert2";


import empleadoService from '../services/empleadoService'
import bancoService from '../services/bancoService'
import empresaService from '../services/empresaService'

export const Empleado = () => {

    const [empleados, setEmpleados] = useState([]);
    const [rut,setRut] = useState("")
    const [nombres,setNombres] = useState("")
    const [apellidos, setApellidos] = useState("")
    const [cuenta, setCuenta] = useState("")
    const [idBanco, setIdBanco] = useState("")
    const [idEmpresa, setIdEmpresa] = useState("")
    const [imei, setImei] = useState("")
    const [numInicial, setNumInicial] = useState("")
    const [estado, setEstado] = useState("")
    const [operation, setOperation] = useState(1)
    const [title, setTitle] = useState("")

    const [empresas, setEmpresas] = useState([]);
    const [bancos, setBancos] = useState([]);

    const [filterVal, setFilterVal] = useState("")
    const [searchApiData, setSearchApiData] = useState("")
    


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

    const validar = async (rutEmpleado) => {
        let parametros = {Rut: rut, Nombres: nombres, Apellidos: apellidos, Cuenta: cuenta, IdBanco: idBanco, IdEmpresa: idEmpresa, Imei: imei, NumInicial: numInicial,Estado:estado}

        if(rut === ""){
            show__alert("Escribe el rut del empleado", "warning")
        }else if(nombres.trim() === ""){
            show__alert("Escribe los nombres del empleado", "warning")
        }else if(apellidos.trim() === ""){
            show__alert("Escribe los apellidos del empleado", "warning")
        }else if(cuenta.trim() === ""){
            show__alert("Escribe la cuenta del empleado", "warning")
        }else if(idBanco === ""){
            show__alert("Selecciona el banco del empleado", "warning")
        }else if(idEmpresa === ""){
            show__alert("Selecciona la empresa del empleado", "warning")
        }else if(imei.trim() === ""){
            show__alert("Escribe el imei del empleado", "warning")
        }else if(numInicial === ""){
            show__alert("Escribe el numero inicial del empleado", "warning")
        }else if(estado === ""){
            show__alert("Escribe el estado del empleado", "warning")
        }else{
            if(operation === 1){
                let result = await empleadoService.insert(parametros)
                enviarSolicitud(result)
            }else{
                let result = await empleadoService.update(rutEmpleado, parametros)
                enviarSolicitud(result)
            }
            
        }
    }



    // =========================
    // ======= DELETE ==========
    // =========================

    const deleteItem = (rutEmpleado,nombres, apellidos) => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: "Seguro que quieres eliminar al empleado " + nombres +" "+ apellidos + " ?",
            icon: "question",
            confirmButtonColor: 'rgba(25, 135, 84, 0.800)',
            cancelButtonColor: '#d33',
            showCancelButton:true,confirmButtonText:"Sí, eliminar",cancelButtonText:"Cancelar"
        }).then(( async result => {
            if(result.isConfirmed){
                setRut(rutEmpleado)
                let result = await empleadoService.del(rutEmpleado)
                enviarSolicitud(result)
            }else{
                show__alert("El item NO fue eliminado", "info")
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
                    <a href="#" className='edit edit__icon' data-toggle="modal"><i className='material-icons ' data-toggle="tooltip" data-bs-toggle="modal" data-bs-target="#modalTable" title='Edit' onClick={() => openModal(2, row.Rut, row.Nombres, row.Apellidos, row.Cuenta, row.IdBanco, row.IdEmpresa ,row.Imei ,row.NumInicial, row.Estado)}>&#xE254;</i></a> 
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

    const openModal = (op,rut, nombres, apellidos, cuenta, idBanco, idEmpresa, imei, numInicial, estado) => {
        setOperation(op)
        setRut("")
        setNombres("")
        setApellidos("")
        setCuenta("")
        setIdBanco("")
        setIdEmpresa("")
        setImei("")
        setNumInicial("")
        setEstado("")
        if(op === 1){
            setTitle("Registrar Empleado")
            document.getElementById("first").removeAttribute('disabled', '');
            window.setTimeout(function(){
                document.getElementById("first").focus()
            },500)
        }
        else if(op === 2){
            setTitle("Editar Empleado")
            setRut(rut)
            setNombres(nombres)
            setApellidos(apellidos)
            setCuenta(cuenta)
            setIdBanco(idBanco)
            setIdEmpresa(idEmpresa)
            setImei(imei)
            setNumInicial(numInicial)
            setEstado(estado)
            
            document.getElementById("first").setAttribute('disabled', '');
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
            setEmpleados(searchApiData)
        }else{
            const filterResult = searchApiData.filter(item => item.Rut.toLowerCase().includes(e.target.value.toLowerCase()) 
            || item.Nombres.toLowerCase().includes(e.target.value.toLowerCase())
            || item.Apellidos.toLowerCase().includes(e.target.value.toLowerCase())
            || item.Cuenta.includes(e.target.value.toLowerCase())
            || item.Imei.toLowerCase().includes(e.target.value.toLowerCase())
            )
            if (filterResult.length > 0) {
                setEmpleados(filterResult)
            } else {
                setEmpleados([{"Numero": "No hay información", "Estado": undefined}])
            }
        }
        setFilterVal(e.target.value)
    }


    return(
        <div className='empleado' >
            <Tabla 
                arrayData={empleados}
                columns={columns}
                title={"Administrar Empleados"}
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
                                <span className='input-group-text input-group-text__modal--empleado'>Rut</span>
                                <input type="text" id='first' className='form-control' placeholder='Rut de empleado'  value={rut}
                                onChange={(e) => setRut(e.target.value)} />
                            </div>

                            <div className="input-group mb-3">
                                <span className='input-group-text input-group-text__modal--empleado'>Nombres</span>
                                <input type="text" id='second' className='form-control' placeholder='Nombres del empleado' value={nombres}
                                onChange={(e) => setNombres(e.target.value)} />
                            </div>

                            <div className="input-group mb-3">
                                <span className='input-group-text input-group-text__modal--empleado'>Apellidos</span>
                                <input type="text"  className='form-control' placeholder='Apellidos del epleado' value={apellidos}
                                onChange={(e) => setApellidos(e.target.value)} />
                            </div>

                            <div className="input-group mb-3">
                            <span className='input-group-text input-group-text__modal--empleado'>Cuenta</span>
                                <input type="number"  className='form-control' placeholder='Cuenta del empleado' value={cuenta}
                                onChange={(e) => setCuenta(e.target.value)} />
                            </div>

                            <div className="input-group mb-3">
                                <span className='input-group-text input-group-text__modal--empleado'>Banco</span>
                                <select className="form-select" aria-label="Default select example" name="banco" id='banco' onChange={(e) => setIdBanco(e.target.value)} value={idBanco}>
                                    <option value="">Selecciona un Banco</option>
                                    {
                                        bancos.map((banco)=>{
                                            return <option value={banco.IdBanco} key={banco.IdBanco} >{banco.Banco}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className="input-group mb-3">
                                <span className='input-group-text input-group-text__modal--empleado'>Empresa</span>
                                <select className="form-select" aria-label="Default select example" name="estado" id='estado' onChange={(e) => setIdEmpresa(e.target.value)} value={idEmpresa}>
                                    <option value="">Selecciona una Empresa</option>
                                    {
                                        empresas.map((empresa)=>{
                                            return <option value={empresa.IdEmpresa} key={empresa.IdEmpresa} >{empresa.Empresa}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className="input-group mb-3">
                                <span className='input-group-text input-group-text__modal--empleado'>Imei</span>
                                <input type="text"  className='form-control' placeholder='Imei del empleado' value={imei}
                                onChange={(e) => setImei(e.target.value)} />
                            </div>

                            <div className="input-group mb-3">
                                <span className='input-group-text input-group-text__modal--empleado'>Numero Inicial</span>
                                <input type="number"  className='form-control' placeholder='Numero Incial del empleado' value={numInicial}
                                onChange={(e) => setNumInicial(e.target.value)} />
                            </div>

                            <div className="input-group mb-3">
                                <span className='input-group-text input-group-text__modal--empleado'>Estado</span>
                                <select className="form-select" aria-label="Default select example" name="estado" id='estado' onChange={(e) => setEstado(e.target.value)} value={estado}>
                                    <option value="">Selecciona un Estado</option>
                                    <option value="1">Activo</option>
                                    <option value="0">Inactivo</option>
                                </select>
                            </div>

                            
                            <div className="d-flex justify-content-end btn__container">
                                <div className="">
                                    <button type='button' onClick={() => validar(rut)} className='btn btn-success btn__save btn__save--modal'>
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

export default Empleado;