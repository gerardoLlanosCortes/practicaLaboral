import React from 'react'
import { empresaValidator } from '../utils/validators'

export const FormEmpresa = ({handleSubmit, onSubmit, register, errors }) => {
  return (    
    <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" id='id'/>
            <div className="input-group mb-3">
                <span className='input-group-text input-group-text__modal--empresa'>Rut Empresa</span>
                <input name='rut' type="text" id='first'  placeholder='Ingresar Rut Empresa'
                className={errors.rut ? 'form-control border border-danger': 'form-control'}
                {...register('rut', {required: true, maxLength: 12, pattern: /\b(\d{1,3}(?:(\.)\d{3}){2}(-)[\dkK])\b/gm })}/>
            </div>
            {errors.rut?.type === 'required' && 
            <p style={{color: "#dc3545"}}>El campo rut es requerido</p>}
            {errors.rut?.type === 'maxLength' && 
            <p style={{color: "#dc3545"}}>Rut de máximo 12 caracteres</p>}
            {errors.rut?.type === 'pattern' && 
            <p style={{color: "#dc3545"}}>Rut no valido, debe incluir puntos y guion</p>}

            <div className="input-group mb-3">
            <span className='input-group-text input-group-text__modal--empresa'>Empresa</span>
                <input name='empresa' type="text" placeholder='Nombre Empresa'
                className={errors.empresa ? 'form-control border border-danger': 'form-control'}
                {...register('empresa', {required: true, validate: empresaValidator})}/>
            </div>
            {errors.empresa && 
            <p style={{color: "#dc3545"}}>El nombre de la empresa debe tener entre 3 y 20 carácteres</p>}

            <div className="input-group mb-3">
                <span className='input-group-text input-group-text__modal--empresa'>Estado</span>
                <select  aria-label="Default select example" name="estado" id='estado'
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

export default FormEmpresa;



