import React from 'react'
import { cuentaValidar, imeiValidar, itemValidar, nombreValidar } from '../../utils/validators'

export const FormEmpleado = ({handleSubmit, onSubmit, register, errors, bancos, empresas}) => {
  return (    
    <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" id='id'/>
        <div className="input-group mb-3">
            <span className='input-group-text input-group-text__modal--empleado'>Rut</span>
            <input type="text" id='first' name='rut' placeholder='Rut de empleado' 
            className={errors.rut ? 'form-control border border-danger': 'form-control'}
            {...register('rut', {required: true, maxLength: 12, pattern: /\b(\d{1,3}(?:(\.)\d{3}){2}(-)[\dkK])\b/gm })} />
        </div>
        {errors.rut?.type === 'required' && 
        <p style={{color: "#dc3545"}}>El campo rut es requerido</p>}
        {errors.rut?.type === 'maxLength' && 
        <p style={{color: "#dc3545"}}>Rut de máximo 12 caracteres</p>}
        {errors.rut?.type === 'pattern' && 
        <p style={{color: "#dc3545"}}>Rut no valido, debe incluir puntos y guion</p>}

        <div className="input-group mb-3">
            <span className='input-group-text input-group-text__modal--empleado'>Nombres</span>
            <input type="text" id='second' name='nombres' placeholder='Nombres del empleado' className={errors.banco ? 'form-control border border-danger': 'form-control'}
            {...register('nombres', {required: true, validate: nombreValidar})}/>
        </div>
        {errors.nombres && 
        <p style={{color: "#dc3545"}}>Nombre del empleado debe tener entre 3 y 50 carácteres</p>}

        <div className="input-group mb-3">
            <span className='input-group-text input-group-text__modal--empleado'>Apellidos</span>
            <input type="text" placeholder='Apellidos del epleado' 
            className={errors.apellidos ? 'form-control border border-danger': 'form-control'}
            {...register('apellidos', {required: true, validate: nombreValidar})}/>
        </div>
        {errors.apellidos && 
        <p style={{color: "#dc3545"}}>Apelido del empleado debe tener entre 3 y 50 carácteres</p>}

        <div className="input-group mb-3">
        <span className='input-group-text input-group-text__modal--empleado'>Cuenta</span>
            <input type="number" name='cuenta' placeholder='Cuenta del empleado' 
            className={errors.cuenta ? 'form-control border border-danger': 'form-control'}
            {...register('cuenta', {required: true, validate: cuentaValidar, pattern: /^([0-9])*$/ })} />
        </div>
        {errors.apellidos && 
        <p style={{color: "#dc3545"}}>Cuenta debe tener entre 1 y 15 carácteres</p>}
        {errors.cuenta?.type === 'pattern' && 
        <p style={{color: "#dc3545"}}>La cuenta solo debe poseer carácteres númericos</p>}

        <div className="input-group mb-3">
            <span className='input-group-text input-group-text__modal--empleado'>Banco</span>
            <select aria-label="Default select example" name="idBanco" id='banco'
            className={errors.idBanco ? 'form-select border border-danger': 'form-select'}
            {...register('idBanco', {required: true})}>
                <option value="">Selecciona un Banco</option>
                {
                    bancos.map((banco)=>{
                        return <option value={banco.IdBanco} key={banco.IdBanco} >{banco.Banco}</option>
                    })
                }
            </select>
        </div>
        {errors.idBanco?.type === 'required' && 
        <p style={{color: "#dc3545"}}>Seleccione un banco</p>}

        <div className="input-group mb-3">
            <span className='input-group-text input-group-text__modal--empleado'>Empresa</span>
            <select  aria-label="Default select example" name="idEmpresa" id='empresa'
            className={errors.idEmpresa ? 'form-select border border-danger': 'form-select'}
            {...register('idEmpresa', {required: true})}>
                <option value="">Selecciona una Empresa</option>
                {
                    empresas.map((empresa)=>{
                        return <option value={empresa.IdEmpresa} key={empresa.IdEmpresa} >{empresa.Empresa}</option>
                    })
                }
            </select>
        </div>
        {errors.idEmpresa?.type === 'required' && 
        <p style={{color: "#dc3545"}}>Seleccione una empresa</p>}

        <div className="input-group mb-3">
            <span className='input-group-text input-group-text__modal--empleado'>Imei</span>
            <input type="text" name='imei' placeholder='Imei del empleado'
             className={errors.banco ? 'form-control border border-danger': 'form-control'}
             {...register('imei', {required: true, validate: imeiValidar})} />
        </div>
        {errors.imei && 
        <p style={{color: "#dc3545"}}>Imei del empleado debe tener entre 1 y 15 carácteres</p>}

        <div className="input-group mb-3">
            <span className='input-group-text input-group-text__modal--empleado'>Numero Inicial</span>
            <input type="number" placeholder='Numero Incial del empleado' name='numInicial'
            className={errors.numInicial ? 'form-control border border-danger': 'form-control'}
            {...register('numInicial', {required: true, pattern: /^([0-9])*$/ })} />
        </div>
        {errors.numInicial?.type === 'required' && 
        <p style={{color: "#dc3545"}}>Ingrese el numero inicial</p>}
        {errors.numInicial?.type === 'pattern' && 
        <p style={{color: "#dc3545"}}>El numero inicial solo debe poseer carácteres númericos</p>}

        <div className="input-group mb-3">
            <span className='input-group-text input-group-text__modal--empleado'>Estado</span>
            <select aria-label="Default select example" name="estado" id='estado' 
            className={errors.estado ? 'form-select border border-danger': 'form-select'}
            {...register('estado', {required: true})}>
                <option value="">Selecciona un Estado</option>
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
            </select>
        </div>
        {errors.estado?.type === 'required' && 
        <p style={{color: "#dc3545"}}>Seleccione un estado</p>}

        
        <div className="d-flex justify-content-end btn__container">
            <div className="">
                <button type='submit' className='btn btn-success btn__save btn__save--modal'>
                    <i className="fa-solid fa-floppy-disk save__icon"></i>
                </button>
            </div>
        </div>
    </form>
  )
}

export default FormEmpleado;



