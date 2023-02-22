import React, { useState, useEffect } from 'react'
import itemService from '../services/itemService'
import tipoService from '../services/tipoService'

export const FormRendicionDetalle = ({detalle}) => {
    const [idRenDet, setIdRenDet] = useState(detalle.IdRenDet)
    const [idTipo,setIdTipo] = useState(detalle.IdTipo)
    const [idItem,setIdItem] = useState(detalle.IdItem)
    const [fechaDocDet, setFechaDocDet] = useState(detalle.Fecha)
    const [idTipoDoc, setIdTipoDoc] = useState(detalle.IdTipoDoc)
    const [numeroDoc, setNumeroDoc] = useState(detalle.NumeroDoc)
    const [obsDet, setObsDet] = useState(detalle.Obs)
    const [montoTotal, setMontoTotal] = useState(detalle.MontoTotal)
    const [nombreImagen, setNombreImagen] = useState(detalle.NombreImagen)

    const [item, setItem] = useState([])
    const [tipo, setTipo] = useState([])

    useEffect(() => {
        obtenerDatosItem()
        obtenerDatosTipo()
    }, [])


    const obtenerDatosItem = async () =>{
        try{
            let result = await itemService.getAll();
            setItem(result.data)
        }catch(err){
            console.log(err)
        }
    }

    const obtenerDatosTipo = async () =>{
        try{
            
            let result = await tipoService.getAll();
            setTipo(result.data)
        }catch(err){
            console.log(err)
        }
    }


  return (
    <div className="modal-footer mt-3 modal-xl">
        <div className="d-block w-100">
        <label className="h5">Detalle</label>
        </div>
        <div  className="input-group mb-3">
            <input type="text" id='first' className='form-control' placeholder='ID Rendición' hidden  value={idRenDet}
            onChange={(e) => setIdRenDet(e.target.value)} />
        </div>

        <div className="d-flex justify-content-between w-100 flex--detalle">
            <div className="input-group mb-3">
                <span className='input-group-text input-group-text--detalle'>Tipo</span>
                {/* <input type="text" id='second' className='form-control' placeholder='Tipo' value={idTipo} onChange={(e) => setIdTipo(e.target.value)}/> */}
                <select className="form-select" id='second' aria-label="Default select example" name="tipo"  onChange={(e) => setIdTipo(e.target.value)} value={idTipo}>
                    <option value="">Selecciona un Tipo</option>
                    {
                        tipo.map((tipo)=>{
                            return <option value={tipo.IdTipo} key={tipo.IdTipo} >{tipo.Tipo}</option>
                        })
                    }
                </select>
            </div>
            
            <div className="input-group mb-3">
                <span className='input-group-text input-group-text--detalle'>Item</span>
                {/* <input type="text"  className='form-control' placeholder='Fecha' value={idItem}
                onChange={(e) => setIdItem(e.target.value)} /> */}

                <select className="form-select" aria-label="Default select example" name="item" id='item' onChange={(e) => setIdItem(e.target.value)} value={idItem}>
                    <option value="">Selecciona un Item</option>
                    {
                        item.map((item)=>{
                            return <option value={item.IdItem} key={item.IdItem} >{item.Item}</option>
                        })
                    }
                </select>
            </div>
            
            
            <div className="input-group mb-3">
                {/* <span className='input-group-text input-group-text--detalle'>Fecha Doc</span>
                <input type="text"  className='form-control' placeholder='Obs' value={fechaDocDet}
                onChange={(e) => setFechaDocDet(e.target.value)} /> */}

                <span className='input-group-text input-group-text--detalle'>Fecha Doc</span>
                <input id="startDate" className="form-control" type="date" placeholder='Fecha' value={fechaDocDet || " "} 
                onChange={(e) => {
                    setFechaDocDet(e.target.value)}}/> 
            </div>
        </div>

        
        <div className="d-flex justify-content-between w-100 flex--detalle">
            <div className="input-group mb-3">
                <span className='input-group-text input-group-text--detalle'>ID Tipo Doc</span>
                <select className="form-select" aria-label="Default select example" name="estado" id='estado' value={idTipoDoc}
                onChange={(e) => setIdTipoDoc(e.target.value)}>
                    <option value="">Selecciona un Estado</option>
                    <option value="1">Boleta</option>
                    <option value="2">Factura</option>
                </select>
            </div>
            
            <div className="input-group mb-3">
                <span className='input-group-text input-group-text--detalle'>Numero Doc</span>
                <input type="text"  className='form-control' placeholder='Obs' value={numeroDoc}
                onChange={(e) => setNumeroDoc(e.target.value)} />
            </div>
            
            <div className="input-group mb-3">
                <span className='input-group-text input-group-text--detalle'>Obs</span>
                <input type="text"  className='form-control' placeholder='Obs' value={obsDet}
                onChange={(e) => setObsDet(e.target.value)} />
            </div>
        </div>
        
        <div className="d-flex justify-content-between w-100 flex--detalle">
            <div className="input-group mb-3">
                <span className='input-group-text input-group-text--detalle'>Monto Total</span>
                <input type="text"  className='form-control' placeholder='Monto Total' value={montoTotal}
                onChange={(e) => setMontoTotal(e.target.value)} />
            </div>
            
            <div className="input-group mb-3">
                <input className="form-control" id="formFile" type="file" placeholder='Imagen' 
                onChange={(e) => {
                    setNombreImagen(e.target.value)
                    // console.log(e.target.value)
                }}/>
            </div>

        </div>
    
        <div className="d-flex justify-content-between btn__container">
            <div className="">
                <button type='button' className='btn btn-danger btn__modal '>Eliminar Detalle</button>
            </div>
        </div>
    </div>
  )
}
export default FormRendicionDetalle;