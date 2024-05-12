import { Link } from "react-router-dom"
import axios from 'axios';
import{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../styling/register.css'
import toast from 'react-hot-toast';

export const Register=()=>{
    const[name,setName]=useState();
    const[rollno,setRollno]=useState();
    const[batch,setBatch]=useState();
    const[email,setEmail]=useState();
    const[password,setPassword]=useState();

    const navigate=useNavigate();
    const handleregister=(e)=>{
       e.preventDefault();

       const rollnopattern=/^bt(\d{2})cs\d{3}$/;
       const emailpattern=/^bt\d{2}cs\d{3}@nitmz\.ac\.in$/;
       const currentyear= new Date().getFullYear();

       if(!rollnopattern.test(rollno.toLowerCase())){
          toast.error("Invalid roll no");
          return;
       }

       const yearprefix=rollno.substring(2,4);
       if(yearprefix!== batch.slice(-2)){
         toast.error("Invalid roll no");
         return;
       }
      
      const emailpref= email.substring(2,4);
       if(emailpref!==batch.slice(2,4)){
            toast.error("invalid email");
            return;
       }

       if(!emailpattern.test(email.toLowerCase())){
          toast.error("Invalid email ");
          return;
       }

       if(!rollno.toLowerCase().includes('cs')){
          toast.error("invalid rollno");
          return;
       }

       const batchyear= parseInt(batch);
       if(batchyear>currentyear || batchyear<2010){
         toast.error("Invalid batch");
         return;
       }


       axios.post("https://onestop-backend.onrender.com/register",{name,rollno,batch,email,password})
       .then(result=>{
         toast.success("account created successfully");
         console.log(result)
         navigate('/')
       }).catch(err=>{
        toast.error(err.message);
        console.log(err)
       } );
    }

    return(
        <>
        <div className="mt-5 p-4">
        <form className="reg-form mb-5 " onSubmit={handleregister} autoComplete="off">
        <div>
          <h4>OneStop REGISTRATION</h4><br></br>
        <div >
          <label for="exampleInputEmail1">Username </label><br></br>
          <input type="text" className="col-8 text-center"  id="exampleInputEmail1"  placeholder="Enter your name"  onChange={(e)=> setName(e.target.value)} required />
          
        </div>
        <div >
          <label for="exampleInputEmail1">Roll No </label><br></br>
          <input type="text" className="col-8 text-center"  id="exampleInputEmail1"  placeholder="Enter your roll no"  onChange={(e)=> setRollno(e.target.value)} required maxLength={9}/>
          
        </div>
        <div >
          <label for="exampleInputEmail1">Batch </label><br></br>
          <input type="text" className="col-8 text-center"  id="exampleInputEmail1"  placeholder="Enter your Batch (2019/2020..)"  onChange={(e)=> setBatch(e.target.value)} required />
          
        </div>
        <div>
          <label for="exampleInputEmail1">Institute Email </label><br></br>
          <input type="email" className="col-8 text-center"  id="exampleInputEmail1"  placeholder="Enter your email" onChange={(e)=> setEmail(e.target.value)} required />
        </div>
        <div >
          <label for="exampleInputPassword1">Password </label><br></br>
          <input type="password" className="col-8 text-center"  id="exampleInputPassword1" placeholder="Enter your password" onChange={(e)=> setPassword(e.target.value)} required />
        </div>
             <button type="submit" className="btn btn-success mt-4 col-8 text-center" >Register</button>
        </div>
        <div className="mt-2">
           <p>Already registered? <Link to="/"><a href="#" >Login</a> </Link></p>
        </div>
      </form>
      </div>
     
      </>
    );
}