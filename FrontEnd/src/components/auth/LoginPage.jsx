import React, { useState } from 'react'


const LoginPage = () => {

 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");

  async function Login() {
     try{
        const API=await fetch("http://localhost:3000/api/auth/login",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(email,password)
        })
     }catch(e){
       console.log("Server Error ",e);
     }
  }
  return (
    <div>
      
    </div>
  )
}

export default LoginPage
