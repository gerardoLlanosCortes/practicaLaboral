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


  

  const menuToggle = () => {
    document.querySelector(".navbar").classList.toggle("open")
  }

  return (
    <>

        {/* <header>
          <div className="nav__container">
            <div className="navbar">
              <div className="left">
                <div className="logo"><Link to="/">LOGO</Link></div>
                <ul className="links">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/banco">Banco</Link></li>
                </ul>
              </div>
                <div className="nav__right">
                  <div className="user__nav">
                    <i className="fa fa-solid fa-user"></i>
                    <p className='user__name'>{nombreUsuario()}</p>
                  </div>
                  <a href="#" className='btn__cta' onClick={cerrarSesion}>Cerrar Sesión</a>
            </div>
              <div className="hamburgerBtn__toggle" onClick={menuToggle}>
                <i className="fa fa-solid fa-bars"></i>
              </div>
            </div>
          </div>
        </header> */}
        <header>
          <nav className="navbar navbar-expand-md ">
            <div className=" container-sm ">
              <a href="#" className="navbar-brand mb-1 ">
                  <i class="fa-solid fa-location-dot brand__logo"></i>
                  <span>Logo</span>
              </a>

              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse " id='menu' >
                <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#"><Link to="/" className='nav__anchor'>Home</Link></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"><Link to="/about" className='nav__anchor'>About</Link></a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle nav__anchor" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Administración
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                      <li><a className="dropdown-item" href="#"><Link to="/banco" className='nav__anchor nav__anchor--dropdown'>Banco</Link></a></li>
                      <li><a className="dropdown-item" href="#"><Link to="/banco" className='nav__anchor nav__anchor--dropdown'>Empresa</Link></a></li>
                      <li><a className="dropdown-item" href="#"><Link to="/banco" className='nav__anchor nav__anchor--dropdown'>Item</Link></a></li>
                      <li><a className="dropdown-item" href="#"><Link to="/banco" className='nav__anchor nav__anchor--dropdown'>Empleado</Link></a></li>
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