import React from 'react'
import { itemValidar } from '../../utils/validators'

export const FormItem = ({handleSubmit, onSubmit, register, errors }) => {
  return (    
    <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" id='id'/>
        <div className="input-group mb-3">
            <span className='input-group-text input-group-text__modal'>Item</span>
            <input type="text" name='item' id='first'placeholder='Ingrese Nombre del Item' 
            className={errors.item ? 'form-control border border-danger': 'form-control'}
            {...register('item', {required: true, validate: itemValidar})}/>
        </div>
        {errors.item && 
        <p style={{color: "#dc3545"}}>El item debe tener entre 3 y 100 carácteres</p>}

        <div className="input-group mb-3">
            <span className='input-group-text input-group-text__modal'>Estado</span>
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

export default FormItem;



