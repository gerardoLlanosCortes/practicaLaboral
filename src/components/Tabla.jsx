import React, {Component} from 'react'
import DataTable, {createTheme} from 'react-data-table-component'
import 'styled-components'

export const Tabla = ({bancos,title,filterVal,handleFilter, openModal,columns}) => {
 
    // =========================
    // ======== ESPANOL ========
    // =========================

    const paginacionOpciones = {
        rowsPerPageText: "Filas por Página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "todos",
    }


    return (
        <div className='container-sm' >

            <h2 className='text-center table__title'>{title}</h2>
            <div className="d-flex justify-content-between table__cta">
                <div className="input-group input__search">
                    <span className='input-group-text'><i className="fa-solid fa-magnifying-glass"></i></span>
                    <input type="text" className='form-control' placeholder='Buscar' value={filterVal}
                    onInput={(e) => handleFilter(e)}/>
                </div>
                <button onClick={() => openModal(1)} className="btn btn-success btn__add btn__save" data-bs-toggle="modal" data-bs-target="#modalBancos">
                    <i className="fa-solid fa-circle-plus circle-icon"></i>Añadir
                </button>
            </div>
                    
            <DataTable 
                id="#example"
                data={bancos}
                columns={columns} 
                pagination
                paginationComponentOptions={paginacionOpciones}
                responsive
                striped
                highlightOnHover
                fixedHeader
                fixedHeaderScrollHeight='300px'
            />

            
        </div>
    )
}

export default Tabla;