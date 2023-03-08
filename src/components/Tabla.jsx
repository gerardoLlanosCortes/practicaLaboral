import React from 'react'
import DataTable from 'react-data-table-component'
import 'styled-components'


export const Tabla = ({arrayData,title,handleFilter, handleShow,columns}) => {
 
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
        <div className='container-sm container__tabla' >

            <h2 className='text-center table__title'>{title}</h2>
            <div className="d-flex justify-content-between table__cta">
                <div className="input-group input__search">
                    <span className='input-group-text'><i className="fa-solid fa-magnifying-glass"></i></span>
                    <input type="text" className='form-control' placeholder='Buscar'
                    onChange={(e) => handleFilter(e)}/>
                </div>
                <button onClick={() => handleShow(1)} className="btn btn-success btn__add btn__save" id='idbtn__add'>
                    <i className="fa-solid fa-circle-plus circle-icon"></i>Añadir
                </button>
            </div>
                    
            <DataTable 
                id="#example"
                data={arrayData}
                columns={columns} 
                pagination
                paginationComponentOptions={paginacionOpciones}
                responsive
                striped
                highlightOnHover
                fixedHeader
                fixedHeaderScrollHeight='100vh'
                
            />

            
        </div>
    )
}

export default Tabla;