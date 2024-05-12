import React from 'react';
import { Link } from "react-router-dom";
import '../styling/nav.css';

export const NavAdmin = () => {
    
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark m-0 shadow-lg p-1 pt-0 mb-5 ">
        <div className="container-fluid pt-5 ps-5 pe-5 pb-2   mt-auto shadow-lg ">
           <h1 className="navbar-brand fw-bolder titleColor">OneStop-Admin Page</h1>
           <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>

       
       </div>
  </nav>          
    
  </>
  )
}

