import "./register.css"
import { useState } from "react"
import axios from "axios"

export default function Register() {

    const[username,setUsername]=useState("")
    const[email, setEmail]= useState("")
    const[password,setPassword]=useState("")
    const[error,setError]= useState(false)

    const handleSubmit= async(e)=>{
      e.preventDefault()
      try {
        setError(false)
        const res= await  axios.post("http://localhost:5000/api/auth/register",{
        username,
        email,
        password
      });
      res.data && window.location.replace("/login")
      } catch (error) {
        setError(true)
        console.log(error);
      }
      
      
    }

    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Enter your username..."  onChange={e=> setUsername(e.target.value)} />
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your email..." onChange={e=> setEmail(e.target.value)} />
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password..." onChange={e=> setPassword(e.target.value)} />
        <button className="registerButton">Register</button>
      </form>
        <button className="registerLoginButton" type="submit">Login</button>
        {error && <span style={{color:"red"}}>Something went wrong</span>}
    </div>
    )
}
