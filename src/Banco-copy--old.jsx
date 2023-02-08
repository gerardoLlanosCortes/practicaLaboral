import React, {Component} from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import {show__alert} from "./functions"
import withReactContent from 'sweetalert2-react-content'
import Swal from "sweetalert2";
import DataTable, {createTheme} from 'react-data-table-component'
import 'styled-components'




export const Banco = () => { 

    

    const url = "https://tzone.cl:4503/banco"
    const [bancos, setBancos] = useState([]);
    const [bancoId,setBancoId] = useState("")
    const [bancoNombre,setBancoNombre] = useState("")
    const [estado, setEstado] = useState("")
    const [operation, setOperation] = useState(1)
    const [title, setTitle] = useState("")
    
    const header = {
        "Content-Type": "application/json",
        "Accept": 'application/json',
        "authorization": "Bearer: " + localStorage.getItem("user-token")
    }

    $(document).ready(function () {
        $('#example').DataTable();
    });

    useEffect(() => {
        obtenerDatos()

        
    }, [])

    const obtenerDatos = async () =>{
        try{
            let result = await axios.get(url,{
                headers: header,
            })
            setBancos(result.data)
        }catch(err){
            console.log(err)
        }
        
    }

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
            document.getElementById("banco").focus()
        },500)
    }

    const validar = (bancoId) => {
        let parametros
        let metodo
        if(bancoNombre.trim() === ""){
            show__alert("Escribe el nombre del banco", "warning")
        }else if(estado === ""){
            show__alert("Escribe el estado del banco", "warning")
        }else{
            if(operation === 1){
                parametros = {Banco:bancoNombre.trim(), Estado: estado}
                metodo = "POST"
                enviarSolicitud(metodo, url, parametros)
            }else{
                parametros = {Banco:bancoNombre.trim(), Estado: estado}
                enviarSolicitud("PATCH", `https://tzone.cl:4503/banco/${bancoId}`, parametros)
            }
            
        }
    }


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


    const deleteBanco = (id,banco) => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: "Seguro que quieres eliminar el banco " + banco + " ?",
            icon: "question",
            showCancelButton:true,confirmButtonText:"Sí, eliminar",cancelButtonText:"Cancelar"
        }).then((result => {
            if(result.isConfirmed){
                setBancoId(id)
                let urlDelete= `https://tzone.cl:4503/banco/${id}`
                enviarSolicitud("DELETE", urlDelete)
            }else{
                show__alert("El banco NO fue eliminado", "info")
            }
        }))
    }


    const accionEdit = <a href="#" className='edit' data-toggle="modal"><i className='material-icons' data-toggle="tooltip" title='Edit'>&#xE254;</i></a>,
    accionDelete = <a href="#" className='delete' data-toggle="modal"><i className='material-icons' data-toggle="tooltip" title='Delete'>&#xE872;</i></a>


    //columns config
    const columns = [
        {
            name: "ID",
            selector: row => row.IdBanco,
            sortable: true
        },
        {
            name: "Banco",
            selector: row => row.Banco,
            sortable: true
        },
        {
            name: "Estado",
            selector: row => row.Estado,
            sortable: true,
            right: true
        },
        {
        name: "Acciones",
        selector: row => accionEdit,
        sortable: true,
        right: true
        },
    ]
    
    const paginacionOpciones = {
        rowsPerPageText: "Filas por Página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "todos",
    }
    

    return (
        <div className='Banco' >
                <DataTable 
                id="#example"
                columns={columns} 
                data={bancos}
                pagination
                paginationComponentOptions={paginacionOpciones}
                responsive
                striped
                highlightOnHover
                title="Datos De Bancos"
                fixedHeader
                fixedHeaderScrollHeight='300px'
                
                />



            {/* <div className="container-fluid">
                    <div className="row mt-3">
                        <div className="col-md-4 offset-md-4">
                            <div className="d-grix max-auto">
                                <button onClick={() => openModal(1)} className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalBancos">
                                <i className="fa-solid fa-circle-plus"></i>Añadir
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                            <div className="table-responsive">
                                <table id="example" className="table table-striped " >
                                <thead>
                                     <tr>
                                        <th>#</th>
                                        <th>Banco</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                     </tr>
                                 </thead>
                                    <tbody>
                                        {bancos.map((banco, i) => {
                                                return(
                                                    <tr key={i}>
                                                        <td>{i}</td>
                                                        <td>{banco.Banco}</td>
                                                        <td>{banco.Estado === 1 ?"Activo" : "Inactivo"}</td>
                                                        <td>
                                                            <a href="#" className='edit' data-toggle="modal"><i className='material-icons' data-toggle="tooltip" title='Edit'>&#xE254;</i></a>
                                                            <a href="#" className='delete' data-toggle="modal"><i className='material-icons' data-toggle="tooltip" title='Delete'>&#xE872;</i></a>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>#</th>
                                            <th>Banco</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>    */}
        </div>
    )
}



// export default Banco;




{/* <div className="container-fluid">
                    <div className="row mt-3">
                        <div className="col-md-4 offset-md-4">
                            <div className="d-grix max-auto">
                                <button onClick={() => openModal(1)} className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modalBancos">
                                <i className="fa-solid fa-circle-plus"></i>Añadir
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Banco</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bancos.map((banco, i) => {
                                            return(
                                                <tr key={i}>
                                                    <td>{i}</td>
                                                    <td>{banco.Banco}</td>
                                                    <td>{banco.Estado === 1 ?"Activo" : "Inactivo"}</td>
                                                    <td>
                                                        <button onClick={() => openModal(2, banco.IdBanco, banco.Banco, banco.Estado)} className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalBancos">
                                                            <i className="fa fa-solid fa-edit"></i>
                                                        </button>
                                                        &nbsp;
                                                        <button onClick={() => deleteBanco(banco.IdBanco)} className="btn btn-danger">
                                                            <i className="fa fa-solid fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            <div id='modalBancos' className="modal fade" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="h5">{title}</label>
                            <button type='button' className='btn-close' data-bs-miss="modal" aria-label='Close'></button>
                        </div>
                        <div className="modal-body">
                            <input type="hidden" id='id'/>
                            <div className="input-group mb-3">
                                <span className='input-group-text'><i class="fa-solid fa-building-columns"></i></span>
                                <input type="text" id='banco' className='form-control' placeholder='Banco' value={bancoNombre}
                                onChange={(e) => setBancoNombre(e.target.value)} />
                            </div>

                            <div className="input-group mb-3">
                                <span className='input-group-text'><i class="fa-solid fa-rss"></i></span>
                                <select className="form-select" aria-label="Default select example" name="estado" id='estado' onChange={(e) => setEstado(e.target.value)}>
                                    <option value="">Selecciona un Estado</option>
                                    <option value="1">Activo</option>
                                    <option value="0">Inactivo</option>
                                </select>
                            </div>


                            <div className="d-grid col-6 mx-auto">
                                <button onClick={() => validar(bancoId)} className='btn btn-success'>
                                    <box-icon name='save' type='solid' ></box-icon>
                                </button>
                            </div>
                            <div className="modal-footer mt-3">
                                <button type='button' className='btn btn-secondary' id='btnCerrar' data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}






















// <div className="main-content">
//                 <div className="row table-fixed">
//                     <div className="col-md-12">
//                         <div className="table-wrapper">
//                             <div className="table-title">
//                                 <div className="row">
//                                     <div className="col-sm-6 p-0 flex justify-content-lg-start justify-content-center">
//                                         <h2 className="ml-lg-2">Manage Employee</h2>
//                                     </div>
//                                     <div className="col-sm-6 p-0 flex justify-content-lg-start justify-content-center">
//                                         <a href="#" className="btn btn-success" datatoggle="modal">
//                                             <i className="material-icons">&#xE147;</i>
//                                             <span>Add New Employee</span>
//                                         </a>
//                                         <a href="#" className="btn btn-danger" datatoggle="modal">
//                                             <i className="material-icons">&#xE15C;</i>
//                                             <span>Delete</span>
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>

//                             <table className="table table-striped table-hover">
//                                 <thead>
//                                     <tr>
//                                         <th>
//                                             <span className='custom-checkbox'></span>
//                                             <input type="checkbox" id='selectAll'/>
//                                             <label htmlFor="selectAll"></label>
//                                         </th>
//                                         <th>#</th>
//                                         <th>Banco</th>
//                                         <th>Estado</th>
//                                         <th>Acciones</th>
//                                     </tr>
//                                 </thead>

//                                 <tbody>
//                                     <tr>
//                                         <th>
//                                             <span className='custom-checkbox'></span>
//                                             <input type="checkbox" id='checkbox1' name='option[]' value="1"/>
//                                             <label htmlFor="checkbox1"></label>
//                                         </th>
//                                         <th>1</th>
//                                         <th>SANTANDER</th>
//                                         <th>ACTIVO</th>
//                                         <th>
//                                             <a href="#" className='edit' data-toggle="modal"><i className='material-icons' data-toggle="tooltip" title='Edit'>&#xE254;</i></a>
//                                             <a href="#" className='delete' data-toggle="modal"><i className='material-icons' data-toggle="tooltip" title='Delete'>&#xE872;</i></a>
//                                         </th>
//                                     </tr>

                                    
//                                 </tbody>
//                             </table>

//                             <div className="clearfix">
//                                 <div className="hint-text">showing <b>5</b> out of <b>25</b></div>
//                                 <ul className="pagination">
//                                     <li className="page-item disabled"><a href="#">Previous</a></li>
//                                     <li className="page-item "><a href="#" className='page-link'>1</a></li>
//                                     <li className="page-item active"><a href="#" className='page-link'>2</a></li>
//                                     <li className="page-item "><a href="#" className='page-link'>3</a></li>
//                                     <li className="page-item "><a href="#" className='page-link'>4</a></li>
//                                     <li className="page-item "><a href="#" className='page-link'>Next</a></li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>











{/* <div className="input-group mb-3">
    <span className='input-group-text'><i className="fa fa-solid fa-comment"></i></span>
    <input type="text" id='estado' className='form-control' placeholder='Estado' value={estado}
    onChange={(e) => setEstado(e.target.value)} />
</div> */}





// <div className="contenedor">
        //     <table className='table'>
        //         <thead>
        //             <tr>
        //                 <th>Banco</th>
        //                 <th>Estado</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {bancos.map((banco, i) => {
        //                 return(
        //                     <tr key={i}>
        //                         <td>{banco.Banco}</td>
        //                         <td>{banco.Estado}</td>
        //                     </tr>
        //                 )
        //             })}
        //         </tbody>
        //     </table>
        // </div>