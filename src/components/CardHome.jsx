import React from 'react'

export const CardHome = ({obtenerOne, encabezado, formatNumbers}) => {
  return (
    <div className="col-sm-4 g-4">
        <div className="card">
        <img src="./images/tax.jpg" style={{width: "100%"}} className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title">Numero de Rendición: {encabezado.Numero}</h5>
            <p className="card-text">Responsable: {encabezado.Empleado}</p>
            <p className="card-text">Monto Total: $ {formatNumbers(encabezado.Total)}</p>
            <a href="#" data-toggle="tooltip" data-bs-toggle="modal" data-bs-target="#modalTable"  className="btn btn-danger" onClick={() => obtenerOne(encabezado.IdRenEnc)}>Ver PDF</a>
        </div>
        </div>
     </div>
  )
}

export default CardHome