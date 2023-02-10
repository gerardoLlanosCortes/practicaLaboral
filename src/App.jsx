import { useState,useEffect } from 'react'
import {Routes,Route,useLocation,Navigate} from 'react-router-dom'
import Login from './Login'
import Layout from './Layout'
import Home from './Home'
import About from './About'
import Banco from './Banco'
import Empresa from './Empresa'
import Item from './Item'
import Empleado from './Empleado'


import './App.css'


function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  // location
  const location = useLocation();


   useEffect(() => {
    const token = localStorage.getItem("user-token");
    if (token) {//todo: validar si el token expiro
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [location]);

 return (
  <Routes>
    <Route path='/login' element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}/>
    <Route path='/' element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
      <Route index element={<Home/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='banco' element={<Banco/>}/>
      <Route path='empresa' element={<Empresa/>}/>
      <Route path='item' element={<Item/>}/>
      <Route path='empleado' element={<Empleado/>}/>
    </Route>
    <Route path='*' element={<h1>not found</h1>}/>
  </Routes>

  
 )
}

export default App