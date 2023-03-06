import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'


export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("qwerty123");

  async function login(e){
    try{
      e.preventDefault()

      let item = {email, password};  
      let result = await fetch("http://localhost:4503/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": 'application/json'
        },
        body: JSON.stringify(item)
      })
  
      result = await result.json()
      localStorage.setItem("user-token", result.token)
      localStorage.setItem("email", result.user.email)
      

      //navegar a home
      navigate('/')
    }catch(err){
      console.log(err)
    }
    
  }


  return (
    <div className="App">
      <form className="login__container" onSubmit={login}>
        <h1>Acceso Usuarios</h1>

        <img className='avatar' src="./images/avatar.png" alt="" />

        <div className="input__container">
          <label>Correo</label>
          <input 
          type="email" 
          required 
          placeholder='Ingresar correo'
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="input__container">
          <label>Contraseña</label>
          <input type="password" required 
          placeholder='Ingresar contraseña'
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button className="login__btn" >
          <p>Acceder</p>
        </button>
      </form>
      
    </div>
  )
}

export default Login;