import React from 'react';
import { Navbar } from './nav';
import { Footer } from './footer';
import { store } from '../App';
import { FaUser } from 'react-icons/fa';
import {useState,useEffect,useContext} from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export const Profile = () => {
    const[token,setToken]=useContext(store);
    const[user,setUser]=useState({});
    const year=new Date().getFullYear();
    
    useEffect(()=>{
        const fetchUserProfile=async()=>{
        try{
            const token=localStorage.getItem("token");
            const response= await axios.get("https://onestop-backend.onrender.com/profile",{
            headers:{
                Authorization: `Bearer ${token}`
            }
            
        });
        setUser(response.data);
        
    }catch(err){
        if(!token){
            return <Navigate to="/"/>
        }
        handlelogout();
        console.log(err);
    }
   };
   fetchUserProfile();
        
    },[user]);

    if(!localStorage.getItem("token")){
        return <Navigate to="/"/>
    }
   

    const handlelogout=()=>{
         localStorage.clear();
         setToken(null);
         toast.success("logout successful");
    }

    
  return (
     <>
        
        <Navbar/>
        <div className="card m-5 p-3">
              <div className="card-title">
                    <h3 className="text-primary mb-4">USER PROFILE</h3>
                     <FaUser size="40px"/>
               
                <div className="card-body">
                   <h5 className="text-center">Welcome! </h5>
                    <h5 className="text-center mt-3"> {user.name}</h5>
                    <h6 className="text-center mt-3">Roll No: {user.rollno} </h6>
                    <h6 className="text-center mt-3">Email:{user.email}</h6>
                
                   
                </div>
                <div>
                    <button className="btn btn-success mt-4" onClick={handlelogout}>Logout</button>
                </div>
               
              </div>
              
            </div>
              
        <Footer/>
     </>
  )
}

