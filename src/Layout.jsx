import React from 'react'
import {Link, Outlet, useNavigate} from 'react-router-dom'
import {resultNameExport, resultEmailExport} from './Login'

export const Layout = () => {
	const navigate = useNavigate();

  const cerrarSesion = () =>{
    localStorage.removeItem("user-token")
    navigate('/login')
  }

  const nombreUsuario = () => {
    if(resultNameExport === null){
      return resultEmailExport;
    } else{
      return resultNameExport
    }
  }


  

  // const menuToggle = () => {
  //   document.querySelector(".navbar").classList.toggle("open")
  // }

  return (
    <>
        <header>
          <nav className="navbar navbar-expand-md ">
            <div className=" container-sm ">
              <a href="#" className="navbar-brand mb-1 ">
                  <i className="fa-solid fa-location-dot brand__logo"></i>
                  <span>Logo</span>
              </a>

              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse " id='menu' >
                <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                    <Link to="/" className='nav__anchor nav-link active" ' aria-current="page">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/about" className='nav__anchor nav-link'>About</Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle nav__anchor" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Administración
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                      <li><Link to="/banco" className='nav__anchor nav__anchor--dropdown dropdown-item'>Banco</Link></li>
                      <li><Link to="/empresa" className='nav__anchor nav__anchor--dropdown dropdown-item'>Empresa</Link></li>
                      <li><Link to="/item" className='nav__anchor nav__anchor--dropdown dropdown-item'>Item</Link></li>
                      <li><Link to="/empleado" className='nav__anchor nav__anchor--dropdown dropdown-item'>Empleado</Link></li>
                    </ul>
                  </li>
                </ul>

                <div className="nav__right d-flex align-items-center">
                  <div className="user__nav d-flex">
                    <i className="fa fa-solid fa-user m-auto"></i>
                    <p className='user__name m-auto'>{nombreUsuario()}</p>
                  </div>
                  <a href="#" className='btn__cta' onClick={cerrarSesion}>Cerrar Sesión</a>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <Outlet/>
    </>)
}

export default Layout;