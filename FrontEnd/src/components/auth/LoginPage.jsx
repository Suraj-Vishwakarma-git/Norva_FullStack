import React, { useState } from 'react'

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function Login() {
    try {

      const API = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await API.json();

      alert(data.message);

    } catch (e) {
      console.log("Server Error ", e);
    }
  }

  return (
    <div>

      <input
        type='email'
        placeholder='Enter your email'
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type='password'
        placeholder='Enter password'
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={Login}>
        Login
      </button>

    </div>
  )
}

export default LoginPage