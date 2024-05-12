import '../styling/home.css';
import '../styling/second.css';
import AnchorLink from "react-anchor-link-smooth-scroll";
import {Navbar} from './nav';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaTrash,FaSearch } from 'react-icons/fa';
import {Footer} from './footer';
import { useContext,useEffect,useState} from 'react';
import {store} from '../App';
import { useTypewriter } from 'react-simple-typewriter';
import { Navigate } from 'react-router-dom';
import { FaInstagram,FaLinkedin, FaWhatsapp } from 'react-icons/fa';

export const Home=()=>{
   const[token,setToken]=useContext(store);
   const[search,setSearch]=useState("");
   const[desc,setDesc]=useState("");
   const[name,setName]=useState("");
   const[rollno,setRollno]=useState("");
   const[userid,setUserid]=useState("");
   const[details,setDetails]=useState([]);
   const[link,setLink]=useState("");
   const[profileimage,setProfileimage]=useState("");
   const[imagepreview,setImagepreview]=useState(null);
   const[isloading,setIsloading]=useState(false);

   let currentimage="";

   useEffect(()=>{
      const token=localStorage.getItem("token");
      axios.get("https://onestop-backend.onrender.com/second",{
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

     axios.get("https://onestop-backend.onrender.com/home/read",{
        
    }).then((response)=>{
         
          setDetails(response.data);
    }).catch((err)=>{
       console.log(err);
    });

   },[details]);

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
        toast.success("information added successfully");
        currentimage=res.data.secure_url;
        sendtoback();
        setIsloading(false);
        setImagepreview(null);
      }
      ).catch(err=> console.log(err));
       
      }else{
        sendtoback();
        toast.success("information addedd successfully");
        setIsloading(false);
        setImagepreview(null);
      }
  
  };

  const handleImageChange=(e)=>{
    setProfileimage(e.target.files[0]);
    setImagepreview(URL.createObjectURL(e.target.files[0]));
   
   }

   const handleimagedelete=(pid)=>{
    axios.delete(`https://onestop-backend.onrender.com/home/delete/${pid}`)
    .then((res)=>{
    toast.success("deleted successfully");
    console.log(res);
    }).catch(err=> console.log(err));
 }

  const sendtoback=()=>{
    axios.post("https://onestop-backend.onrender.com/home/post",{
          userid:userid,
          name:name,
          rollno:rollno,
          description:desc,
          imageurl:currentimage,
          link:link
      });
    }
    const [text] = useTypewriter({
      words:["Hello! Welcome to OneStop!","OneStop provides you with all the resources at one place."],
      loop:{},
      typeSpeed:120,
      deleteSpeed:80,
      
    }); 

   if(!localStorage.getItem("token")){
      return <Navigate to="/"/>
   }

   
  
    return (
         <>
          <Navbar/>             
           <h3 className="text-bolder">{text}</h3>
          <section className="flex-center mt-5 mb-5">
          <div className="container shadow-lg p-4 bg-dark p-2">
           <h2 className="text-danger text-bolder">NOTICE BOARD</h2>
           
           <div className="card mt-5">
              <form onSubmit={uploadImage} className="form-control p-5">
                   <p>
                     <label className="text-center "><h5>Information Box</h5></label><br></br>
                     <input type="text" placeholder="Give your information here... "  className=" text-center col-8 p-2" onChange={(e)=> setDesc(e.target.value)} /><br></br>
                     <label><h5 className="text-dark">Any links?</h5></label><br></br>
                     <input type="text" className="p-2 col-8 text-center" placeholder="give the link here..." onChange={(e)=>setLink(e.target.value)}/><br></br>
                     <label className="text-center mt-2 "><h5>Any Notice image ?</h5></label><br></br>
                     <label className="text-center mt-3">Photo</label>
                     <input type="file" accept="image/png,image/jpeg,image/png" name="image" onChange={handleImageChange}/>
                   </p>
                   <p>
                       {
                         isloading ? ("uploading"): (

                           <button type="submit" className="btn btn-success col-8"> Submit </button>
                         )
                       }
                   </p>
              </form>
              <div className="profile-photo">
                 {
                    imagepreview && (
                      <img src={imagepreview && imagepreview} alt="image" width="200" height="200"/>
                    )
                 }
              </div>
           </div>
           <br></br>
           <br></br>
        
    {
      details.length !=0 ?
      <div >
      <input type="text" className="text-center col-8 p-2" placeholder="search by keywords " onChange={(e)=> setSearch(e.target.value)} /> <FaSearch size="20px"/>

      <h4 className="text-dark">RESPONSES:</h4>
      </div>
      :
      <h4></h4>
    }
    
    {
     details.filter((val)=>{
      if(search===""){
          return val;
      }else if(val.description.toLowerCase().includes(search.toLowerCase())){
          return val;
      }
     }).map((val,key)=>{
      return <div class="container-lg">
      <div className="card my-3 shadow-lg">
      <div className="card-body">
      <h6 className="text-end">{val.name}</h6>
      <h6 className="text-end">{val.rollno}</h6>
      <h4 className="text-center text-danger">NOTICE No:{key+1}</h4><br></br>
      <p className="text-center ">{val.description}</p>
      <img src={val.imageurl} alt="rescource" width="240" height="150"/><br></br>
      <button className="btn btn-primary mt-5" ><a href={val.imageurl} target="blank">See the notice </a></button><br></br>
      {val.userid===userid ? <button className="btn " onClick={()=>handleimagedelete(val._id)}><FaTrash/></button> : <h1></h1>}
      

      </div>
    </div>
    </div>
  

    })
  
    }
      </div>
    </section> 
      <Footer/>
    </>

    );
} 