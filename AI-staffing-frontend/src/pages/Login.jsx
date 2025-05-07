import React, { useState } from "react";
import { post } from "../services/apiServices";
import { login_url } from "../urls/adminUrls";
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router'

const LoginPage = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    if (!email || !password){
      setError("All fields are required")
      return
    }
    const data = { email, password };
    const res = await post(login_url, data, true);
    localStorage.setItem("user", JSON.stringify(res.data.user))
    localStorage.setItem("auth_token", res.data.token)
    if (res.data.status == 200) {
      toast.success("Login succesful")
      navigate('/facilities')
    }
    if( res.data.status==404){
      toast.error("Invalid credentials")
    }
    if (res.data.status == 500){
      toast.error("An error has occured")
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-blue-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Welcome to AIStaffing
        </h2>
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-200"
            onClick={(e)=>handleLogin(e)}
          >
            Sign In
          </button>
          <p className="text-red-700 text-center">{error}</p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
