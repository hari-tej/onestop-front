import React from 'react';
import { useState,useEffect} from 'react';
import AnchorLink from "react-anchor-link-smooth-scroll";
import '../styling/place.css'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { NavAdmin } from './admin-nav';
import { Footer } from './footer';
import {FaTrash,FaPen,FaSearch} from 'react-icons/fa';

export const Admin = () => {

    const[username,setUsername]=useState();
    const[search,setSearch]=useState("");
    
    const[secsearch,setSecsearch]=useState("");
    const[secusearch,setSecusearch]=useState("");
    const[thrsearch,setThrsearch]=useState("");
    const[thrusearch,setThrusearch]=useState("");
    const[fousearch,setFousearch]=useState("");
    const[fouusearch,setFouusearch]=useState("");
    const[parsearch,setParsearch]=useState("");
    const[alusearch,setAlusearch]=useState("");

    const[box,setBox]=useState(false);
    const[rollno,setRollno]=useState();
    const[batch,setBatch]=useState();
    const[email,setEmail]=useState();
    const[details,setDetails]=useState([]);
    const[sdetails,setSdetails]=useState([]);
    const[sudetails,setSudetails]=useState([]);
    const[tdetails,setTdetails]=useState([]);
    const[tudetails,setTudetails]=useState([]);
    const[fdetails,setFdetails]=useState([]);
    const[fudetails,setFudetails]=useState([]);
    const[pdetails,setPdetails]=useState([]);

    const[adetails,setAdetails]=useState([]);
    
    const[usercount,setUsercount]=useState(0);
    const[suser,setSusers]=useState(0);
    const[suuser,setSuusers]=useState(0);
    const[tuser,setTusers]=useState(0);
    const[tuuser,setTuusers]=useState(0);
    const[fuser,setFusers]=useState(0);
    const[fuuser,setFuusers]=useState(0);
    const[puser,setPusers]=useState(0);
    const[auser,setAusers]=useState(0);

  
    useEffect(()=>{
        const fetchUserProfile=async()=>{
            try{
                const token=localStorage.getItem("atoken");
                const response= await axios.get("https://onestop-backend.onrender.com/admin",{
                headers:{
                    Authorization: `Bearer ${token}`
                }
               
            });
            
            
        }catch(err){
            if(!localStorage.getItem("atoken")){
                return <Navigate to="/"/>
            }
            handlelogout();
            console.log(err);
        }
       };
       fetchUserProfile();
           
            
         axios.get("https://onestop-backend.onrender.com/admin/register/read")
        .then((res)=>{
                setDetails(res.data);
                setUsercount(details.length);
        }).catch(err=> console.log(err));
       
         axios.get("https://onestop-backend.onrender.com/admin/second/read")
        .then((res)=>{
                setSdetails(res.data);
                setSusers(sdetails.length);
        }).catch(err=> console.log(err));

        axios.get("https://onestop-backend.onrender.com/admin/secondurl/read")
        .then((res)=>{
                setSudetails(res.data);
                setSuusers(sudetails.length);
        }).catch(err=> console.log(err));

         axios.get("https://onestop-backend.onrender.com/admin/third/read")
        .then((res)=>{
                setTdetails(res.data);
                setTusers(tdetails.length);
        }).catch(err=> console.log(err));
        axios.get("https://onestop-backend.onrender.com/admin/thirdurl/read")
        .then((res)=>{
                setTudetails(res.data);
                setTuusers(tudetails.length);
        }).catch(err=> console.log(err));

         axios.get("https://onestop-backend.onrender.com/admin/fourth/read")
        .then((res)=>{
                setFdetails(res.data);
                setFusers(fdetails.length);
        }).catch(err=> console.log(err));

        axios.get("https://onestop-backend.onrender.com/admin/fourthurl/read")
        .then((res)=>{
                setFudetails(res.data);
                setFuusers(fudetails.length);
        }).catch(err=> console.log(err));

         axios.get("https://onestop-backend.onrender.com/admin/placement/read")
        .then((res)=>{
                setPdetails(res.data);
                setPusers(pdetails.length);
        }).catch(err=> console.log(err));

        axios.get("https://onestop-backend.onrender.com/admin/alumni/read")
        .then((res)=>{
                setAdetails(res.data);
                setAusers(adetails.length);
        }).catch(err=> console.log(err));

        


    },[details]);

    const handleupdate=(pid)=>{
   
        axios.put("https://onestop-backend.onrender.com/admin/register/update",{
            id:pid,
            username,
            rollno,
            batch,
            email
        })
        .then((res)=>{
              toast.success("updated successfully");
              console.log(res);
        })

    };
    const handledelete=(pid)=>{
          axios.delete(`https://onestop-backend.onrender.com/admin/register/delete/${pid}`)
          .then((res)=>{
              toast.success("deleted successfully");
          })
    }
    const handlesdelete=(pid)=>{
        axios.delete(`https://onestop-backend.onrender.com/admin/second/delete/${pid}`)
        .then((res)=>{
            toast.success("deleted successfully");
        })
    }
    const handlesudelete=(pid)=>{
        axios.delete(`https://onestop-backend.onrender.com/admin/secondurl/delete/${pid}`)
        .then((res)=>{
            toast.success("deleted successfully");
        })
    }
    const handletdelete=(pid)=>{
        axios.delete(`https://onestop-backend.onrender.com/admin/third/delete/${pid}`)
        .then((res)=>{
            toast.success("deleted successfully");
        })
    }
    const handletudelete=(pid)=>{
        axios.delete(`https://onestop-backend.onrender.com/admin/thirdurl/delete/${pid}`)
        .then((res)=>{
            toast.success("deleted successfully");
        })
    }
    const handlefdelete=(pid)=>{
        axios.delete(`https://onestop-backend.onrender.com/admin/fourth/delete/${pid}`)
        .then((res)=>{
            toast.success("deleted successfully");
        })
    }
    const handlefudelete=(pid)=>{
        axios.delete(`https://onestop-backend.onrender.com/admin/fourthurl/delete/${pid}`)
        .then((res)=>{
            toast.success("deleted successfully");
        })
    }
    const handlepdelete=(pid)=>{
        axios.delete(`https://onestop-backend.onrender.com/admin/placement/delete/${pid}`)
        .then((res)=>{
            toast.success("deleted successfully");
        })
    }
    const handleadelete=(pid)=>{
        axios.delete(`https://onestop-backend.onrender.com/admin/alumni/delete/${pid}`)
        .then((res)=>{
            toast.success("deleted successfully");
        })
    }

    const handlelogout=()=>{
        localStorage.clear();
        toast.success("logout successful");

    }

    if(!localStorage.getItem("atoken")){
        return <Navigate to="/"/>
    }

  return ( 
           <div>
             <NavAdmin/>
             <div className="m-5 gap">
                <AnchorLink href="#second">
                <button className="btn btn-success mr-3">Second Year</button>
                </AnchorLink>
                <AnchorLink href="#third">
                <button className="btn btn-success  ">Third Year</button>
                </AnchorLink>
                <AnchorLink href="#fourth">
                <button className="btn btn-success  ">Fourth Year</button>
               
                </AnchorLink>
                <AnchorLink href="#place">
                <button className="btn btn-success ">Placement</button>
               
                </AnchorLink>
                <AnchorLink href="#alumni">
                <button className="btn btn-success">Alumni</button>
               
                </AnchorLink>
                <button className="btn btn-success" onClick={handlelogout}>Logout</button>
            </div>
            
           <h3 className="m-5 p-2">REGISTERED USERS: {usercount}</h3>
        {
          details.length !=0 ? 
          <div >
          <input type="text" className="text-center col-8 p-2" placeholder="search by rollno " onChange={(e)=> setSearch(e.target.value)} /> <FaSearch size="20px"/>
         
          <h4 className="text-dark mt-5">USERS:</h4>
          </div>
          :
          <h4> </h4>
      }
      
   {
    details.filter((val)=>{
      if(search===""){
          return val;
      }else if(val.rollno.toLowerCase().includes(search.toLowerCase())){
          return val;
      }
     }).map((val,key)=>{ 
      
      return <div class="container-lg">
      <div class="card p-4 my-3 shadow-lg">
      <div class="card-body">
      <h3 class="text-end text-primary">{val.name}</h3>
      <h5 class="text-end">{val.rollno}</h5>
      <h5 class="text-end">{val.batch}</h5>
      <h5 class="text-end">{val.email}</h5>
          <button className="btn " onClick={()=>setBox(!box)} ><FaPen/></button> 
          <button className="btn " onClick={()=>handledelete(val._id)}><FaTrash/></button>
         { val._id && box  ? 
           <div>
            <form onSubmit={()=>handleupdate(val._id)}>
                <div>
                <label>Username</label>
                <input type="text" placeholder="username" required onChange={(e)=> setUsername(e.target.value)} /><br></br>
                <label>RollNo</label>
                <input type="text" placeholder="RollNo" required  onChange={(e)=> setRollno(e.target.value)} /><br></br>
                <label>Batch</label>
                <input type="text" placeholder="Batch" required onChange={(e)=> setBatch(e.target.value)} /><br></br>
                <label>Email</label>
                <input type="email" placeholder="Email" required  onChange={(e)=> setEmail(e.target.value)}/><br></br>
         
                <button type="submit"  className="btn btn-success"  >Submit</button>
                <button className="btn btn-danger" onClick={()=>setBox(!box)}>Undo</button></div> 
             </form> 
             </div> : 
             <h1> </h1> 
             }
         
         
      </div>
    </div>
    </div>
  

    })
    
  
    }
     <br></br><br></br>
     <section id="second" className="bg-dark p-5 text-light">
     {
          sdetails.length !=0 ? 
          <div >
          <input type="text" className="text-center col-8 p-2" placeholder="search by rollno " onChange={(e)=> setSecsearch(e.target.value)} /> <FaSearch size="20px"/>
         
          <h4 className="text-light mt-5">SECOND YEAR RESPONSES: {suser}</h4>
          </div>
          :
          <h4> </h4>
      }
      
   {
    sdetails.filter((val)=>{
      if(secsearch===""){
          return val;
      }else if(val.rollno.toLowerCase().includes(secsearch.toLowerCase())){
          return val;
      }
     }).map((val,key)=>{ 
      
      return <div class="container-lg">
      <div class="card p-4 my-3 shadow-lg">
      <div class="card-body">
      <h3 class="text-end text-primary">{val.name}</h3>
      <h5 class="text-end text-dark">{val.rollno}</h5>
      <h5 class="text-center text-dark">{val.comment}</h5>
      <h5 class="text-end text-dark">{val.email}</h5>
          
      <button className="btn " onClick={()=>handlesdelete(val._id)}><FaTrash/></button>
         
    
         
         
      </div>
    </div>
    </div>
  

    })
    
  
    }

     {
          sudetails.length !=0 ? 
          <div >
          <input type="text" className="text-center col-8 p-2" placeholder="search by rollno " onChange={(e)=> setSecusearch(e.target.value)} /> <FaSearch size="20px"/>
         
          <h4 className="text-light mt-5">SECOND YEAR URL RESPONSES: {suuser}</h4>
          </div>
          :
          <h4> </h4>
      }
      
   {
    sudetails.filter((val)=>{
      if(secusearch===""){
          return val;
      }else if(val.rollno.toLowerCase().includes(secusearch.toLowerCase())){
          return val;
      }
     }).map((val,key)=>{ 
      
      return <div class="container-lg">
      <div class="card p-4 my-3 shadow-lg">
      <div class="card-body">
      <h3 class="text-end text-primary">{val.name}</h3>
      <h5 class="text-end text-dark">{val.rollno}</h5>
      <h5 class="text-center text-dark">{val.description}</h5>
      <img src={val.imageurl} alt="rescource" width="240" height="150"/><br></br>
      
          
      <button className="btn " onClick={()=>handlesudelete(val._id)}><FaTrash/></button>
         
    
         
         
      </div>
    </div>
    </div>
  

    })
    
  
    }
    </section>

     <section id="third" className="bg-primary text-light p-5">
     {
          tdetails.length !=0 ? 
          <div >
          <input type="text" className="text-center col-8 p-2" placeholder="search by rollno " onChange={(e)=> setThrsearch(e.target.value)} /> <FaSearch size="20px"/>
         
          <h4 className="text-light mt-5">THIRD YEAR RESPONSES: {tuser}</h4>
          </div>
          :
          <h4> </h4>
      }
      
   {
    tdetails.filter((val)=>{
      if(thrsearch===""){
          return val;
      }else if(val.rollno.toLowerCase().includes(thrsearch.toLowerCase())){
          return val;
      }
     }).map((val,key)=>{ 
      
      return <div class="container-lg">
      <div class="card p-4 my-3 shadow-lg">
      <div class="card-body">
      <h3 class="text-end text-primary">{val.name}</h3>
      <h5 class="text-end">{val.rollno}</h5>
      <h5 class="text-center">{val.comment}</h5>
      <h5 class="text-end">{val.email}</h5>
          
      <button className="btn " onClick={()=>handletdelete(val._id)}><FaTrash/></button>
         
    
         
         
      </div>
    </div>
    </div>
  

    })
    
  
    }
    {
          tudetails.length !=0 ? 
          <div >
          <input type="text" className="text-center col-8 p-2" placeholder="search by rollno " onChange={(e)=> setThrusearch(e.target.value)} /> <FaSearch size="20px"/>
         
          <h4 className="text-light mt-5">THIRD YEAR URL RESPONSES: {tuuser}</h4>
          </div>
          :
          <h4> </h4>
      }
      
   {
    tudetails.filter((val)=>{
      if(thrusearch===""){
          return val;
      }else if(val.rollno.toLowerCase().includes(thrusearch.toLowerCase())){
          return val;
      }
     }).map((val,key)=>{ 
      
      return <div class="container-lg">
      <div class="card p-4 my-3 shadow-lg">
      <div class="card-body">
      <h3 class="text-end text-primary">{val.name}</h3>
      <h5 class="text-end">{val.rollno}</h5>
      <h5 class="text-center">{val.description}</h5>
      <img src={val.imageurl} alt="rescource" width="240" height="150"/><br></br>
      
          
      <button className="btn " onClick={()=>handletudelete(val._id)}><FaTrash/></button>
         
    
         
         
      </div>
    </div>
    </div>
  

    })
    
  
    }
    </section>
    <section id="fourth" className="bg-success p-5 text-light">
     {
          fdetails.length !=0 ? 
          <div >
          <input type="text" className="text-center col-8 p-2" placeholder="search by rollno " onChange={(e)=> setFousearch(e.target.value)} /> <FaSearch size="20px"/>
         
          <h4 className="text-light mt-5">FOURTH YEAR RESPONSES: {fuser}</h4>
          </div>
          :
          <h4> </h4>
      }
      
   {
    fdetails.filter((val)=>{
      if(fousearch===""){
          return val;
      }else if(val.rollno.toLowerCase().includes(fousearch.toLowerCase())){
          return val;
      }
     }).map((val,key)=>{ 
      
      return <div class="container-lg">
      <div class="card p-4 my-3 shadow-lg">
      <div class="card-body">
      <h3 class="text-end text-primary">{val.name}</h3>
      <h5 class="text-end">{val.rollno}</h5>
      <h5 class="text-center">{val.comment}</h5>
      <h5 class="text-end">{val.email}</h5>
          
      <button className="btn " onClick={()=>handlefdelete(val._id)}><FaTrash/></button>
         
    
         
         
      </div>
    </div>
    </div>
  

    })
    
  
    }
    {
          fudetails.length !=0 ? 
          <div >
          <input type="text" className="text-center col-8 p-2" placeholder="search by rollno " onChange={(e)=> setFouusearch(e.target.value)} /> <FaSearch size="20px"/>
         
          <h4 className="text-light mt-5">FOURTH YEAR URL RESPONSES: {fuuser}</h4>
          </div>
          :
          <h4> </h4>
      }
      
   {
    fudetails.filter((val)=>{
      if(fouusearch===""){
          return val;
      }else if(val.rollno.toLowerCase().includes(fouusearch.toLowerCase())){
          return val;
      }
     }).map((val,key)=>{ 
      
      return <div class="container-lg">
      <div class="card p-4 my-3 shadow-lg">
      <div class="card-body">
      <h3 class="text-end text-primary">{val.name}</h3>
      <h5 class="text-end">{val.rollno}</h5>
      <h5 class="text-center">{val.description}</h5>
      <img src={val.imageurl} alt="rescource" width="240" height="150"/><br></br>
      
          
      <button className="btn " onClick={()=>handlefudelete(val._id)}><FaTrash/></button>
         
    
         
         
      </div>
    </div>
    </div>
  

    })
    
  
    }
    </section>
    <section id="place" className="p-5">
     {
          pdetails.length !=0 ? 
          <div >
          <input type="text" className="text-center col-8 p-2" placeholder="search by rollno " onChange={(e)=> setParsearch(e.target.value)} /> <FaSearch size="20px"/>
         
          <h4 className="text-dark mt-5">PLACEMENT RESPONSES: {puser}</h4>
          </div>
          :
          <h4> </h4>
      }
      
   {
    pdetails.filter((val)=>{
      if(parsearch===""){
          return val;
      }else if(val.rollno.toLowerCase().includes(parsearch.toLowerCase())){
          return val;
      }
     }).map((val,key)=>{ 
      
      return <div class="container-lg">
      <div class="card p-4 my-3 shadow-lg">
      <div class="card-body">
      <h3 class="text-end text-primary">{val.name}</h3>
      <h5 class="text-end">{val.rollno}</h5>
      <h5 class="text-center">{val.company}</h5>
      <h5 class="text-center">{val.role}</h5>
      <h5 class="text-center">{val.package}</h5>
      <h5 class="text-center">{val.rounds}</h5>
      <h5 class="text-center">{val.difficulty}</h5>
      <h5 class="text-center">{val.details}</h5>
      
          
      <button className="btn " onClick={()=>handlepdelete(val._id)}><FaTrash/></button>
         
    
         
         
      </div>
    </div>
    </div>
  

    })
    
  
    }
    {
          adetails.length !=0 ? 
          <div >
          <input type="text" className="text-center col-8 p-2" placeholder="search by rollno " onChange={(e)=> setAlusearch(e.target.value)} /> <FaSearch size="20px"/>
         
          <h4 className="text-dark mt-5"> ALUMNI RESPONSES: {auser}</h4>
          </div>
          :
          <h4> </h4>
      }
     </section> 
     <section id="alumni" className="p-5">
   {
    adetails.filter((val)=>{
      if(alusearch===""){
          return val;
      }else if(val.rollno.toLowerCase().includes(alusearch.toLowerCase())){
          return val;
      }
     }).map((val,key)=>{ 
      
      return <div class="container-lg">
      <div class="card p-4  shadow-lg">
      <div class="card-body">
      <h3 class="text-end text-primary">{val.name}</h3>
      <h5 class="text-end">{val.rollno}</h5>
      <img src={val.imageurl} alt="image" width="150" height="150" id="image"/>
      <h5 class="text-start">Company: {val.company}</h5>
      <h5 class="text-start">Role: {val.role}</h5>
      <h5 class="text-start">Package: {val.package}</h5>
      <h5 class="text-start">Location: {val.location}</h5>
      <h5 class="text-start">Personal email: {val.personalemail}</h5>
      <button className="btn btn-danger col-8 mt-3"><a href={val.instagram}>Instagram</a></button><br></br>
      <button className="btn btn-primary col-8 mt-3"><a href={val.linkedin}>Instagram</a></button><br></br>
      
      
          
      <button className="btn " onClick={()=>handleadelete(val._id)}><FaTrash/></button>
         
    
         
         
      </div>
    </div>
    </div>
  

    })
    
  
    }
    </section>
     
      <Footer/>
     </div>

  )
}

