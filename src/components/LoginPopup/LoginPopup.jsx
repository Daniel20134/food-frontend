import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import {StoreContext} from '../../context/StoreContext'
import axios from 'axios'
const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Signup")

  const {url ,setToken ,token} = useContext(StoreContext)

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const onchangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((data) => ({ ...data, [name]: value }))
  }

  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = url
    if (currentState === "Login"){
      newUrl += "/api/user/login"
    }
    else {
      newUrl += "/api/user/register"
    }


    const response = await axios.post(newUrl ,data)

    if(response.data.success) {
     setToken(response.data.token)
     localStorage.setItem("token" ,response.data.token)
     setShowLogin(false)
    }
    else{
      alert(response.data.message)
    }
  }



  // useEffect(() => {
  //   console.log(data);

  // }, [data])

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img src={assets.cross_icon} alt="" onClick={() => setShowLogin(false)} />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? "" : <input type="text" name='name' onChange={onchangeHandler} value={data.name} placeholder='Your name' required />}
          <input type="email" name='email' placeholder='Your email' onChange={onchangeHandler} value={data.email} required />
          <input type="password" name='password' placeholder='Your password' onChange={onchangeHandler} value={data.password} required />
        </div>
        <button type='submit'>{currentState === "Signup" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" name='checkbox' required />
          <p>By continuing , I agree to the terms of use & privacy policy</p>
        </div>
        {currentState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrentState("Signup")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>}

      </form>
    </div>
  )
}

export default LoginPopup
