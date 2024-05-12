import React from 'react';
import '../styling/login.css'
import axios from 'axios';
import {useState} from 'react'
import {Navigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export const Adminlogin = () => {
    const[token,setToken]=useState("");
    const[username,setUsername]=useState();
    const[password,setPassword]=useState();
    

        const handlelog=(e)=>{
            e.preventDefault();
            axios.post("https://onestop-backend.onrender.com/login/admin",{username,password})
            .then(res=>{
               localStorage.setItem("atoken",res.data.token);
               setToken(res.data.token);
               toast.success("login successful");
               console.log(res)
               
            }).catch(err=>{ 
               toast.error("invalid credentials");
               console.log(err)});
    }
    if(token){
      return <Navigate to="/admin"/>;
    }
    return(
        <>
        <div className="mt-5 mb-0 p-5">
        <form className="reg-form mb-5 " onSubmit={handlelog} autoComplete="off">
        <div>
          <h4>OneStop ADMIN Login</h4><br></br>
    
        <div>
          <label for="exampleInputEmail1">Username </label><br></br>
          <input type="text" className="col-8 text-center"  id="exampleInputEmail1"  placeholder="Enter your email" onChange={(e)=>setUsername(e.target.value)} required/>
        </div>
        <div >
          <label for="exampleInputPassword1">Password </label><br></br>
          <input type="password" className="col-8 text-center"  id="exampleInputPassword1" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} required/>
        </div>
             <button type="submit" className="btn btn-success mt-4 col-8 text-center">Login</button>
             <p className="mt-3">Student Login?  <Link to="/login"><a href="#" > Login</a> </Link></p>
        </div>
      
      </form>
        </div>
      </>
    );
}

