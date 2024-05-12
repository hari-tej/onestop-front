import {Navbar} from './nav';
import {Footer} from './footer';
import { FaSearch,FaPen,FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import "../styling/place.css";
import toast from 'react-hot-toast';
import { useState,useEffect,useContext } from 'react';
import {store} from '../App';

export const Alumni=()=>{
      const[token,setToken]=useContext(store);

      const[search,setSearch]=useState("");
      let currentimage="";
      const[profileimage,setProfileimage]=useState("");
      const[imagepreview,setImagepreview]=useState(null);
      const[isloading,setIsloading]=useState(false);

      const[name,setName]=useState("");
      const[rollno,setRollno]=useState("");
      const[userid,setUserid]=useState("");
      const[imageurl,setImageurl]=useState();
      const[personname,setPersonname]=useState();
      const[personbatch,setPersonbatch]=useState();
      const[company,setCompany]=useState();
      const[box,setBox]=useState(false);
      const[role,setRole]=useState();
      const[pack,setPack]=useState();
      const[location,setLocation]=useState();
      const[instagram,setInstagram]=useState();
      const[linkedin,setLinkedin]=useState();
      const[personalemail,setPersonalemail]=useState("");
      const[data,setData]=useState([]);

      useEffect(()=>{

            const token=localStorage.getItem("token");
            axios.get("https://onestop-backend.onrender.com/alumni",{
              headers:{
                Authorization: `Bearer ${token}`
               } 
            })
            .then((res)=>{
                 
                  setName(res.data.name);
                  setRollno(res.data.rollno);
                  setUserid(res.data._id);
            }).catch((err)=>{
                if(!token){
                  return <Navigate to="/login"/>
              }
              });
    
            axios.get('https://onestop-backend.onrender.com/alumni/read',{
                
            }).then((response)=>{
                
                setData(response.data);
            });
        },[data]); 

        const handlesubmit=()=>{
                      
            axios.post('https://onestop-backend.onrender.com/alumni/post',{
               userid:userid,
               name:name,
               rollno:rollno,
               imageurl,
               personname,
               personbatch,
               company,
               role,
               pack,
               location,
               instagram,
               linkedin,
               personalemail
            }).then(res=>{
                 toast.success("details added successfully");
                 console.log(res);
                 
            }).catch(err=>{
                toast.err("details not added successfully");
                console.log(err);
            })
            
     }
     const handleupdate=(pid)=>{
  
          axios.put('https://onestop-backend.onrender.com/alumni/update',{
            id:pid,
            company,
            role,
            pack,
            location,
            instagram,
            linkedin,
            personalemail
         }).then((res)=>{
           setBox(!box);
           toast.success("updated successfully");
           console.log(res);
         }).catch(err=> console.log(err));
       };
       
       
       const handledelete=(pid)=>{
            axios.delete(`https://onestop-backend.onrender.com/alumni/${pid}`)
            .then((res)=>{
             toast.success("deleted successfully");
             console.log(res);
           }).catch(err=> console.log(err));
                 
           
       };

       const uploadImage=(e)=>{
            e.preventDefault();
            setIsloading(true);
          
              if(
                 profileimage && (
                    profileimage.type === "image/png"  ||
                    profileimage.type === "image/jpeg" ||
                    profileimage.type === "image/jpg" 
                 )
              ){
                const image=new FormData();
                image.append("file",profileimage);
                image.append("upload_preset","nlxq0nca");
          
                 axios.post("https://api.cloudinary.com/v1_1/dwahlftsr/image/upload",image
                
              ).then((res)=> {
                toast.success("image uploaded successfully");
                currentimage=res.data.secure_url;
                setImageurl(currentimage);
                setIsloading(false);
                setImagepreview(null);
              }
              ).catch(err=> console.log(err));
               
              }
          
          };
          

       const handleImageChange=(e)=>{
            setProfileimage(e.target.files[0]);
            setImagepreview(URL.createObjectURL(e.target.files[0]));
           
      }
       
      if(!localStorage.getItem("token")){
          return <Navigate to="/"/>
     }

     

      const searchterm=(e)=>{
            setSearch(e.target.value);
      }
    return(
      <>
         <Navbar/>
       <div>
       
        
       <section id="company" className="m-5">
                 
                
                <form className="reg-form mb-5 " onSubmit={handlesubmit}>
                    <div>
                        <h4 className="mt-3">Hey! Alumni or Students</h4><br></br>
                        <p>Help us by sharing your current work details if you are an alumni or share the details of your known alumni if you are a student.</p>
                    </div>
                    
                    <div>
                    <label>Person Name</label><br></br>
                    <input type="text" className="col-7 text-center" placeholder="Enter the person's name" onChange={(e)=>setPersonname(e.target.value)} required />
                    </div>
                    <div>
                    <label>Batch</label><br></br>
                    <input type="text" className="col-7 text-center" placeholder="Enter the person's batch" onChange={(e)=>setPersonbatch(e.target.value)} required />
                    </div>
                    <div>
                    <label>Company</label><br></br>
                    <input type="text" className="col-7 text-center" placeholder="Enter your comapny's name" onChange={(e)=>setCompany(e.target.value)} required />
                    </div>
                    <div>
                    <label>Role</label><br></br>
                    <input type="text" className="col-7 text-center" placeholder="Enter your role" onChange={(e)=>setRole(e.target.value)} required />
                    </div>
                    <div>
                    <label>Package</label><br></br>
                    <input type="text" className="col-7 text-center" placeholder="Enter your package (3LPA/8LPA/20LPA)" onChange={(e)=>setPack(e.target.value)} required />
                    </div>
                    <div>
                    <label>Location</label><br></br>
                    <input type="text" className="col-7 text-center" placeholder="Enter your work location" onChange={(e)=>setLocation(e.target.value)} required />
                    </div>
                    <div>
                    <label>Instagram</label><br></br>
                    <input type="text" className="col-7 text-center" placeholder="Instagram id" onChange={(e)=>setInstagram(e.target.value)} required  />
                    </div>
                    <div>
                    <label>Linkedin</label><br></br>
                    <input type="textarea" className="col-7 text-center" placeholder="Linkedin id" onChange={(e)=>setLinkedin(e.target.value)} required/>
                    </div>
                    <div>
                    <label>Perosnal Email of the Person (Optional)</label><br></br>
                    <input type="text" className="col-7 text-center" placeholder="Enter your personal email" onChange={(e)=>setPersonalemail(e.target.value)} />
                    </div>
                    <div>
                    <label>Photo</label><br></br>
                    <input type="file" accept="image/png,image/jpeg,image/png" name="image" onChange={handleImageChange}/>
                    </div>
                    <div className="profile-photo">
                    {
                    imagepreview && (
                      <img src={imagepreview && imagepreview} alt="image" width="200" height="200"/>
                    )
                  }
               </div>
                    <br></br>
                    <p>
                       {
                         isloading ? ("uploading"): (
                         
                           
                           <button type="button" className="btn btn-success" onClick={(e)=>uploadImage(e)}>upload image</button>
                         )
                       }
                   </p>
                <button className="btn btn-success col-7">Submit Details</button>
              </form>

            </section>
               
              </div> 
              <span><input type="text" className="text-center text-dark mt-2 p-2 col-8 " placeholder="Search by Company" onChange={searchterm}/><FaSearch size="20px"/></span>
              {
        data.filter((val)=>{
        if(search===""){
            return val;
        }else if(val.company.toLowerCase().includes(search.toLowerCase())){
            return val;
        }
       }).map((val,key)=>{ 
      
      return <div class="container-lg">
      <div class="card p-4 my-3 shadow-lg">
      <div class="card-body">
      <p className="text-end">Contributed by:</p><h5 class="text-end text-primary"> {val.name}</h5>
      <h5 class="text-end text-primary">{val.rollno}</h5>
      <h6 className="text-end ">{val.updatedAt}</h6>
      <img class="align-start" src={val.imageurl} alt="image"  width="150" height="150" id="image"/>
      <h6 class="text-start text-bolder">PERSON'S NAME: {val.personname}</h6>
      <h6 class="text-start text-bolder">PERSON'S BATCH: {val.personbatch}</h6>
      <h6 class="text-start text-bolder">COMPANY: {val.company}</h6>
      <h6 class="text-start">ROLE: {val.role}</h6>
      <h6 class="text-start">PACKAGE: {val.pack}</h6>
      <h6 class="text-start">LOCATION:{val.location}</h6>
      {val.personalemail=="" ? <></> :<h6 class="text-start">PERSONAL EMAIL: {val.personalemail}</h6>}
      <button className=" btn btn-danger text-center text-light col-9 mt-3"><a href={val.instagram} target="blank">Instagram</a></button><br></br>
      <button className=" btn btn-primary text-center text-light col-9 mt-3"><a href={val.linkedin} target="blank">Linkedin</a></button><br></br>

         {val.userid===userid ? <button className="btn " onClick={()=>setBox(!box)} ><FaPen/></button> : <h1></h1>}
         {val.userid===userid ? <button className="btn " onClick={()=>handledelete(val._id)}><FaTrash/></button> : <h1></h1>}<br></br>
         {val.userid===userid && box  ? 
                  <form onSubmit={()=>handleupdate(val._id)}>
                    <div>
                    <div>
                    <label>Person Name</label><br></br>
                    <input type="text" className="col-9 text-center" placeholder="Enter the person's name" onChange={(e)=>setPersonname(e.target.value)} required />
                    </div>
                    <div>
                    <label>Batch</label><br></br>
                    <input type="text" className="col-9 text-center" placeholder="Enter the person's batch" onChange={(e)=>setPersonbatch(e.target.value)} required />
                    </div>
                    <div>
                    <label>Company</label><br></br>
                    <input type="text" className="col-9 text-center" placeholder="Enter the comapny's name" onChange={(e)=>setCompany(e.target.value)} required />
                    </div>
                    <div>
                    <label>Role</label><br></br>
                    <input type="text" className="col-9 text-center" placeholder="Enter the role" onChange={(e)=>setRole(e.target.value)} required />
                    </div>
                    <div>
                    <label>Package</label><br></br>
                    <input type="text" className="col-9 text-center" placeholder="Enter the package (3LPA/8LPA/20LPA)" onChange={(e)=>setPack(e.target.value)} required />
                    </div>
                    <div>
                    <label>Location</label><br></br>
                    <input type="text" className="col-9 text-center" placeholder="Enter the work location" onChange={(e)=>setLocation(e.target.value)} required />
                    </div>
                    <div>
                    <label>Instagram</label><br></br>
                    <input type="text" className="col-9 text-center" placeholder="Instagram id" onChange={(e)=>setInstagram(e.target.value)} required  />
                    </div>
                    <div>
                    <label>Linkedin</label><br></br>
                    <input type="textarea" className="col-9 text-center" placeholder="Linkedin id" onChange={(e)=>setLinkedin(e.target.value)} required/>
                    </div>
                    <div>
                    <label>Perosnal Email of the Person (Optional)</label><br></br>
                    <input type="text" className="col-9 text-center" placeholder="Enter your personal email" onChange={(e)=>setPersonalemail(e.target.value)} />
                    </div>
                    <button type="submit"  className="btn btn-success mt-3"  >Submit</button><button className="btn btn-danger mt-3" onClick={()=>setBox(!box)}>Undo</button>
                    </div>
                    
              
                  </form>
                  : <h1></h1>}<br></br>
      </div>
    </div>
    </div>
  

    })
  
    }
           <Footer/>
       </>
    );
};