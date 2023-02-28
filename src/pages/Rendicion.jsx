import React from 'react'
import { useState,useEffect } from 'react'
import {show__alert} from "../utils/functions"
import Tabla from '../components/Tabla'
import withReactContent from 'sweetalert2-react-content'
import Swal from "sweetalert2";
import { v4 } from 'uuid'
import {Link, Outlet, useNavigate} from 'react-router-dom'
import FormRendicionDetalle from '../components/FormRendicionDetalle'
import PDFFile from '../components/PDFFile'
import itemService from '../services/itemService'
import tipoService from '../services/tipoService'

import rendicionService from '../services/rendicionService'
import empleadoService from '../services/empleadoService'


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
    const [guardar, setGuardar] = useState(false)
    const [formDetalle, setFormDetalle] = useState([])

    const [items, setItems] = useState([])
    const [tipos, setTipos] = useState([])
    const [empleados, setEmpleados] = useState([])


    // =========================
    // ======== GET ============
    // =========================

    useEffect(() => {
        obtenerDatos()
        obtenerDatosItems()
        obtenerDatosTipos()
        obtenerDatosEmpleados()
    }, [])

    useEffect(() => {
        if(guardar && formDetalle.length === rendicionesDet.length) {
            console.log("pasa")
            Promise.all(formDetalle)
            .then(result => {
                console.log(result)
                enviarSolicitud(result[0])
            })
            .catch(reason => {
                console.log(reason)
            });
            setGuardar(false)
            setFormDetalle([])
        }
    }, [formDetalle])

    const obtenerDatos = async () =>{
        try{
            let result = await rendicionService.getAll();
            setRendicionesEnc(result.data)
            setSearchApiData(result.data)
        }catch(err){
            console.log(err)
        }
    }


    const obtenerOne = async (id) =>{
        try{
            setRendicionesDet([])
            let result = await rendicionService.getOne(id);
            setRendicionesDet(result.data.detalle)
            console.log(result.data.detalle)
            console.log(result.data)

        }catch(err){
            console.log(err)
        }
    }


    const obtenerDatosItems = async () =>{
        try{
            let result = await itemService.getAll();
            setItems(result.data)
        }catch(err){
            console.log(err)
        }
    }

    const obtenerDatosTipos = async () =>{
        try{
            
            let result = await tipoService.getAll();
            setTipos(result.data)
            
        }catch(err){
            console.log(err)
        }
    }

    const obtenerDatosEmpleados = async () =>{
        try{
            
            let result = await empleadoService.getAll();
            setEmpleados(result.data)
            
        }catch(err){
            console.log(err)
        }
    }



    // =========================
    // === POST Y PATCH ENC ====
    // =========================

    const validar = async (id) => {
        let parametros = {IdRenEnc:idRenEnc,Numero:numeroEnc,Rut:rut,Fecha:fechaEnc,Obs:obsEnc.trim(),Estado:estadoEnc}

        if(!/^([0-9])*$/.test(numeroEnc)) show__alert("El número de encabezado solo debe poseer carácteres númericos", "warning")
        else if(numeroEnc === "" || numeroEnc === undefined) show__alert("Escribe el número de encabezado de la rendición", "warning")

        else if(rut === "" || rut === undefined) show__alert("Selecciona el rut del empleado", "warning")

        else if(fechaEnc === "" || fechaEnc === undefined) show__alert("Selecciona la fecha de rendición", "warning")

        else if(obsEnc.trim() === "" || obsEnc === undefined) show__alert("Escribe la observación de la rendicion", "warning")
        else if(obsEnc.length < 1 || obsEnc.length > 200) show__alert("la observación de la rendicion debe tener entre 1 y 200 carácteres", "warning")
        
        else if(estadoEnc === "" || estadoEnc === undefined) show__alert("Selecciona el estado de la rendición", "warning")

        else (operation === 1) ? enviarSolicitud(await rendicionService.insertEnc(parametros)) : setGuardar(await rendicionService.updateEnc(id, parametros))
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
            showCancelButton:true,confirmButtonText:"Sí, eliminar",cancelButtonText:"Cancelar"
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
                    {/* <Link to="/rendicionInfo" className='edit edit__icon' data-toggle="modal"><i className='material-icons ' data-toggle="tooltip"  title='See' onClick={(e) => obtenerOne(row.IdRenEnc)}>&#xe417;</i></Link> */}
                    <a href="#" className='edit edit__icon' data-toggle="modal"><i className='material-icons ' data-toggle="tooltip" data-bs-toggle="modal" data-bs-target="#modalTable" title='See' onClick={() => openModal(3, row.IdRenEnc, row.Numero, row.Rut, row.Fecha, row.Obs, row.Estado)}>&#xe417;</i></a> 


                    <a href="#" className='edit edit__icon' data-toggle="modal"><i className='material-icons ' data-toggle="tooltip" data-bs-toggle="modal" data-bs-target="#modalTable" title='Edit' onClick={() => openModal(2, row.IdRenEnc, row.Numero, row.Rut, row.Fecha, row.Obs, row.Estado)}>&#xE254;</i></a> 

                    <a href="#" className='delete delete__icon' data-toggle="modal"><i className='material-icons' data-toggle="tooltip" title='Delete' onClick={() => deleteItem(row.IdRenEnc, row.NumeroEnc)}>&#xE872;</i></a>
                    
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
            setRendicionesDet([{
                IdRenDet: v4(),
                IdTipo: "",
                IdItem: "",
                FechaDoc: "",
                IdTipoDoc: "",
                NumeroDoc: "",
                Obs: "",
                MontoTotal: "",
                Estado: 1,
                NombreImagen: ""
            }])
            
            setTitle("Registrar Rendicion")
            window.setTimeout(function(){
                const selects = document.querySelectorAll(".modal-body select")
                const inputs = document.querySelectorAll(".modal-body input")
                const btns = document.querySelectorAll(".btn__modal")
                for (let i=0; i < btns.length; i++) {
                    btns[i].removeAttribute("disabled", "");
                }
                for (let i=0; i < inputs.length; i++) {
                    inputs[i].removeAttribute("disabled", "");
                }
                for (let i=0; i < selects.length; i++) {
                    selects[i].removeAttribute("disabled", "");
                }
                document.getElementById("first").setAttribute("disabled", "");
                document.getElementById("second").focus()
            },100)
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
                const selects = document.querySelectorAll(".modal-body select")
                const inputs = document.querySelectorAll(".modal-body input")
                const btns = document.querySelectorAll(".btn__modal")
                for (let i=0; i < btns.length; i++) {
                    btns[i].removeAttribute("disabled", "");
                }
                for (let i=0; i < inputs.length; i++) {
                    inputs[i].removeAttribute("disabled", "");
                }
                for (let i=0; i < selects.length; i++) {
                    selects[i].removeAttribute("disabled", "");
                }
                document.getElementById("first").setAttribute("disabled", "");
                document.getElementById("second").focus()
            },100)
        }else if(op === 3){
            setTitle("Ver Rendición")
            setIdRenEnc(id)
            setNumeroEnc(numero)
            setRut(rut)
            setFechaEnc(fecha)
            setObsEnc(obs)
            setEstadoEnc(estado)
            obtenerOne(id)

            window.setTimeout(function(){
                const btns = document.querySelectorAll(".btn__modal")
                for (let i=0; i < btns.length; i++) {
                    btns[i].setAttribute("disabled", "");
                }
                const inputs = document.querySelectorAll(".modal-body input")
                for (let i=0; i < inputs.length; i++) {
                    inputs[i].setAttribute("disabled", "");
                }
                const selects = document.querySelectorAll("select")
                for (let i=0; i < selects.length; i++) {
                    selects[i].setAttribute("disabled", "");
                }
            },100)
        }
    }


    // =========================
    // ======== SEARCH =========
    // =========================

    const handleFilter = (e) => {
        if(e.target.value == ""){
            setRendicionesEnc(searchApiData)
        }else{
            const filterResult = searchApiData.filter(item => 
            item.Numero.toString().includes(e.target.value)||
            item.Rut.toLowerCase().includes(e.target.value.toLowerCase())||
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

    const añadirDetalle = () => {
        const objDetalle = {
            IdRenDet: v4(),
            IdTipo: "",
            IdItem: "",
            FechaDoc: "",
            IdTipoDoc: "",
            NumeroDoc: "",
            Obs: "",
            MontoTotal: "",
            Estado: 1,
            NombreImagen: "",
            isNew: true
        }
        
        setRendicionesDet([ objDetalle, ...rendicionesDet ]);
    
    }

    const deleteDet = (idEnc,idDet,numeroDoc, isNew) => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: "Seguro que quieres eliminar el detalle " + numeroDoc + " ?",
            icon: "question",
            confirmButtonColor: 'rgba(25, 135, 84, 0.800)',
            cancelButtonColor: '#d33',
            showCancelButton:true,confirmButtonText:"Sí, eliminar",cancelButtonText:"Cancelar"
        }).then((async result => {
            if(result.isConfirmed){
                if(isNew){
                    setRendicionesDet(rendicionesDet.filter(item => item.IdRenDet !== idDet));
                    show__alert("Accion exitosa","success")
                }else{
                    setRendicionesDet(rendicionesDet.map(el => {
                        if(el.IdRenDet === idDet){
                            el.Estado = 2
                            console.log(el.Estado)
                        }
                        return el
                    }))
                }
                
            }else{
                show__alert("El detalle NO fue eliminado", "info")
            }
        }))
    }

    const defaultFecha = () => {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        let today = year + "-" + month + "-" + day;     
        return today;
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
                            <label className="h5 my-auto">{title}</label>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id='btnCerrar'></button>
                        </div>

                        <div className="modal-body">
                            <input type="hidden" id='id'/>
                            <div className="input-group mb-3">
                                <input type="number" id='first' className='form-control' placeholder='ID Rendición' hidden   value={idRenEnc}
                                onChange={(e) => setIdRenEnc(e.target.value)} />
                            </div>

                        <div className="d-flex justify-content-between w-100 flex--gap">
                            <div className="input-group mb-3">
                                <span className='input-group-text input-group-text--encabezado'>Numero de Rendición</span>
                                <input type="text" id='second' className='form-control' placeholder='Ingrese Numero de Rendición'  value={numeroEnc}
                                onChange={(e) => setNumeroEnc(e.target.value)} />
                            </div>

                            <div className="input-group mb-3">
                                <span className='input-group-text input-group-text--encabezado'>Rut</span>

                                <select className="form-select" aria-label="Default select example" name="item" id='item' onChange={(e) => setRut(e.target.value)} value={rut}>
                                    <option value="">Selecciona un Rut</option>
                                    {
                                        empleados.map((empleado)=>{
                                            return <option value={empleado.Rut} key={empleado.Rut} >{empleado.Nombres+ " "  + empleado.Apellidos + " - "  + empleado.Rut}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between w-100 flex--gap">
                            <div className="input-group mb-3">
                                <span className='input-group-text input-group-text--encabezado'>Fecha</span>
                                <input type="datetime-local"  className='form-control' placeholder='Fecha' value={fechaEnc}
                                onChange={(e) => setFechaEnc(e.target.value)} />
                            </div>
                        
                            <div className="input-group mb-3">
                                <span className='input-group-text input-group-text--encabezado'>Observación</span>
                                <input type="text"  className='form-control' placeholder='Ingrese observación' value={obsEnc}
                                onChange={(e) => setObsEnc(e.target.value)} />
                            </div>
                        </div>

                            <div className="input-group mb-3">
                                <span className='input-group-text input-group-text--encabezado'>Estado</span>
                                <select className="form-select" aria-label="Default select example" name="estado" id='estado' onChange={(e) => setEstadoEnc(e.target.value)}
                                value={estadoEnc}>
                                    <option value="">Selecciona un Estado</option>
                                    <option value="1">Activo</option>
                                    <option value="0">Inactivo</option>
                                </select>
                            </div>
                        

                        <div className="d-flex justify-content-between btn__container mt-2 mb-4">
                            <div className="">
                                <button type='button' onClick={() => validar(idRenEnc)} className='btn btn-success btn__modal btn__save btn__save--modal' disabled={guardar}>
                                    <i className="fa-solid fa-floppy-disk save__icon"></i>
                                </button>
                            </div>
                            <div className="">
                                <button type='button' className='btn btn-success btn__modal' onClick={añadirDetalle}>Añadir Detalle</button>
                            </div>
                            <div className="">
                                <button type='button' className='btn btn-danger btn__modal' onClick={() => deleteItem(idRenEnc, numeroEnc)} >Eliminar Rendición</button>
                            </div>
                        </div>



                           
                            { 
                                    rendicionesDet.map(detalle =>{
                                        return (
                                        <div key={detalle.IdRenDet} className={(detalle.Estado == 2)? "d-none" : "" }>
                                            <FormRendicionDetalle
                                            formDetalle={formDetalle}
                                            setFormDetalle={setFormDetalle}
                                            guardar={guardar}
                                            setGuardar={setGuardar}
                                            idEnc={idRenEnc}
                                            detalle={detalle} 
                                            items={items}
                                            tipos={tipos}
                                            deleteDet={deleteDet}
                                            defaultFecha={defaultFecha}/>
                                        </ div>
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