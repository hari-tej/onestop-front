import { Link } from "react-router-dom";
import '../styling/nav.css';
import { useState,useContext } from "react";
import {store} from '../App';

export const Navbar=()=>{
    const[token,setToken]=useContext(store);

 

    return (
       <>
          <nav className="navbar navbar-expand-lg navbar-dark m-0 shadow-lg p-1 pt-0 mb-5 ">
              <div className="container-fluid pt-5 ps-5 pe-5 pb-2   mt-auto shadow-lg ">
                 <h1 className="navbar-brand fw-bolder titleColor">OneStop</h1>
                 <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                  </button>

                 <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav  ms-auto align-items-center-lg ">
                    
                        <li className="nav-item p-1">
                             <Link to="/home"> <a  href="#">Home</a></Link> 
                     
                        </li>
                    
                        <li className="nav-item p-1">
                            <Link to="/second"> <a  href="#">Second </a></Link> 
                        </li>
                         <li className="nav-item p-1">
                            <Link to="/third"> <a  href="#">Third </a> </Link> 
                         </li>
                          <li className="nav-item p-1">
                            <Link to="/fourth"><a   href="#">Fourth </a></Link>
                       
                         </li>
                         <li className="nav-item p-1">
                             <Link to="/placement"> <a  href="#">Placement</a></Link>
                      
                         </li>
                    
                          <li className="nav-item p-1">
                              <Link to="/alumni"> <a   href="#">Alumni</a></Link>
                      
                         </li>
                         <li className="nav-item p-1">
                              <Link to="/profile"> <a href="#">Profile</a></Link>
                      
                         </li>
                     
                    
                  
                     </ul>
                </div>
             </div>
        </nav>          
          
        </>

    );
}