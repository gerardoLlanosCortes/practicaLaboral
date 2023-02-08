import { useState,useEffect } from 'react'
import {Routes,Route,useLocation,Navigate} from 'react-router-dom'
import Login from './Login'
import Layout from './Layout'
import Home from './Home'
import About from './About'
import Banco from './Banco'
import './App.css'


const url = "https://tzone.cl:4503/banco"

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
    </Route>
    <Route path='*' element={<h1>not found</h1>}/>
  </Routes>

  
 )
}

export default App