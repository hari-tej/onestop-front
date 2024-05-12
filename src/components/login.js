import '../styling/login.css'
import axios from 'axios';
import {useState,useEffect,useContext} from 'react'
import {Navigate} from 'react-router-dom';
import { FaUserCheck } from 'react-icons/fa';
import toast from 'react-hot-toast';
import {store} from '../App';
import { Link } from 'react-router-dom';

export const Login=()=>{
    const[token,setToken]=useContext(store);
    const[email,setEmail]=useState();
    const[password,setPassword]=useState();

    

        const handlelog=(e)=>{
            e.preventDefault();
            axios.post("https://onestop-backend.onrender.com/login",{email,password})
            .then(res=>{
               localStorage.setItem("token",res.data.token);
               setToken(res.data.token);
               toast.success("login successful");
               console.log(res)
               
            }).catch(err=>{ 
               toast.error("invalid credentials");
               console.log(err)});
    }
    if(token){
      return <Navigate to="/profile"/>;
    }
    return(
        <>
        <div className="mt-5 mb-0 p-5">
        <form className="reg-form mb-5 " onSubmit={handlelog} autoComplete="off">
        <div>
        
          <h4>OneStop  STUDENT Login <FaUserCheck size="30px"/></h4> <br></br>
    
        <div>
          <label for="exampleInputEmail1">Email </label><br></br>
          <input type="email" className="col-8 text-center"  id="exampleInputEmail1"  placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)} required/>
        </div>
        <div >
          <label for="exampleInputPassword1">Password </label><br></br>
          <input type="password" className="col-8 text-center"  id="exampleInputPassword1" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} required/>
        </div>
             <button type="submit" className="btn btn-success mt-4 col-8 text-center">Login</button>
             <p className="mt-3">Don't have an account? <Link to="/register"><a href="#" >Register</a> </Link></p>
             <p className="mt-3">Admin Login <Link to="/admin-login"><a href="#" > Login</a> </Link></p>
        </div>
      
      </form>
        </div>
      </>
    );
}