import React from 'react'
import {Test }from './components/Test'

export const TestBig = () => {
    const msj = "hola"
  return (
    <div>
        <Test 
        msj={msj}/>
    </div>
  )
}

export default TestBig;