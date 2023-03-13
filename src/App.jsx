import { useState,useEffect } from 'react'
import {Routes,Route,useLocation,Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Layout from './components/shared/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Banco from './pages/Banco'
import Empresa from './pages/Empresa'
import Item from './pages/Item'
import Empleado from './pages/Empleado'
import Rendicion from './pages/Rendicion'

import './App.css'
import Dashboard from './pages/Dashboard'


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
      <Route path='dashboard' element={<Dashboard/>}/>
      <Route path='banco' element={<Banco/>}/>
      <Route path='empresa' element={<Empresa/>}/>
      <Route path='item' element={<Item/>}/>
      <Route path='empleado' element={<Empleado/>}/>
      <Route path='rendicion' element={<Rendicion/>}/>
    </Route>
    <Route path='*' element={<h1>not found</h1>}/>
  </Routes>

  
 )
}

export default App