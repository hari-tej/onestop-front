import{GrDocumentPdf} from 'react-icons/gr'
import {useState,useEffect,useContext} from 'react';
import '../styling/fourth.css'
import {Navbar} from './nav';
import {Footer} from './footer';
import { store } from '../App';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { FaSearch,FaPen,FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { useTypewriter } from 'react-simple-typewriter';

export const Fourth=()=>{
  const[token,setToken]=useContext(store);
  let currentimage="";
  const[link,setLink]=useState("");
  const[search,setSearch]=useState("");
  const[secsearch,setSecsearch]=useState("");
  const[comment,setComment]=useState("");
  const[newcomment,setNewcomment]=useState("");
  const[details,setDetails]=useState([]);
  const[box,setBox]=useState("");
  const[name,setName]=useState("");
  const[rollno,setRollno]=useState("");
  const[userid,setUserid]=useState("");
  const[newlink,setNewlink]=useState();
  
  const[desc,setDesc]=useState("");
  const[latesturls,setLatesturls]=useState([]);

  const[profileimage,setProfileimage]=useState("");
   const[imagepreview,setImagepreview]=useState(null);
   const[isloading,setIsloading]=useState(false);

  useEffect(()=>{

    const token=localStorage.getItem("token");
      axios.get("https://onestop-backend.onrender.com/fourth",{
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

     
  
    axios.get("https://onestop-backend.onrender.com/fourth/read",{
    }).then((response)=>{
        
          setDetails(response.data);
    });

    axios.get("https://onestop-backend.onrender.com/fourth/url")
      .then((response)=>{
          setLatesturls(response.data);
      })
      
 
},[details,latesturls]);




 
const addtodata=()=>{
 
  axios.post("https://onestop-backend.onrender.com/fourth/post",{
   userid:userid, 
   rollno:rollno,
   name:name,
   comment:comment,
   link:link

 });



 };

 
const handleupdate=(pid)=>{
  axios.put('https://onestop-backend.onrender.com/fourth/update',{
    id:pid,
    comment:newcomment,
    newlink
  }).then((res)=>{
    setBox(!box);
    toast.success("updated successfully");
    console.log(res);
  }).catch(err=> console.log(err));
};


const handledelete=(pid)=>{
     axios.delete(`https://onestop-backend.onrender.com/fourth/${pid}`)
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
      sendtoback();
      setIsloading(false);
      setImagepreview(null);
    
    }
    ).catch(err=> console.log(err));
     
    }

};
const sendtoback=()=>{
  axios.post("https://onestop-backend.onrender.com/fourth/image",{
        userid:userid,
        name:name,
        rollno:rollno,
        description:desc,
        imageurl:currentimage
    });
  }

const handleImageChange=(e)=>{
 setProfileimage(e.target.files[0]);
 setImagepreview(URL.createObjectURL(e.target.files[0]));

}

const handleimagedelete=(pid)=>{
  axios.delete(`https://onestop-backend.onrender.com/fourth/image/delete/${pid}`)
  .then((res)=>{
  toast.success("deleted successfully");
  console.log(res);
  }).catch(err=> console.log(err));
}

   

    if(!localStorage.getItem("token")){
      return <Navigate to="/"/>;
    }
    
    return (
      <>
         <Navbar/>
        <div>
          <section className="text-center m-5 ">
            <h2 className="text-primary">FOURTH YEAR PAGE</h2>
            <br></br>
          </section>
        <section className=" pt-4 pl-2 pr-2 m-2 bg-light border rounded border-1 shadow-lg">
          <h1 className="text-center text-primary ps-5 pe-5 ms-5 me-5"><b>SEMESTER-7</b> </h1>
          <h3 className="text-center">(August-November)</h3>
          <p className="text-center"  >All resources needed by a student have been provided below.These include youtube videos links of each subject and PYQs.</p>
        <div className="accordion p-5" id="accordionExample">
    <div className="accordion-item p-2">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
       ADVANCED DATA STRUCTURES 
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
      <div className="accordion-body text-start">
   

        <p>Youtube channels:</p>
         <b>Uzaid Javed Akhtar </b><a href="https://youtube.com/playlist?list=PLv9sD0fPjvSHqIOLTIvHJWjkdH0IdzmXT" target="_blank">https://youtube.com/playlist?list=PLv9sD0fPjvSH</a><br></br>
          
          <b>Previous Year Questions:</b> <a className="inner"href='https://drive.google.com/file/d/1doU2OKwnCOgRSIvalJrd0NmDUMuQOZCK/view?usp=drive_link'target="blank"> <GrDocumentPdf size="25px"/></a>
        
         
      </div>
    </div>
  </div>
  <div className="accordion-item p-2">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        ADVANCED COMPUTER ARCHITECTURE
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body text-start">
      
        <p>Youtube Channels:</p>
        <b>Shanu kuttan CSE classes: </b> <a href="https://youtube.com/playlist?list=PL3R9-um41JswxXxLu6qmsib45wDd7d0YU" target="_blank">https://youtube.com/playlist?list=PL3R9-um41Js</a><br></br>
        <b>AllAboutCSIT:</b> <a href="https://youtube.com/playlist?list=PLGuh2K9TUN4Qxkrylyq_qwfhAZiuzZ2gz" target="_blank">https://youtube.com/playlist?list=PLGuh2K9TUN4Q</a><br></br>
        <b>Asha khilrani:</b> <a href="https://youtube.com/playlist?list=PLz8TdOA7NTzSOHaom_1AGQNrVeAzI3GIM" target="_blank">https://youtube.com/playlist?list=PLz8TdOA</a><br></br>
        
         <b>Previous Year Questions:</b> <a className="inner"href='https://drive.google.com/file/d/1Uzw4nKF6uaytCGRr3MeOIMo0gVBgSuGW/view?usp=drive_link' target="blank"> <GrDocumentPdf size="25px"/></a>
        
      </div>
    </div>
  </div>
  <div className="accordion-item p-2">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        MACHINE LEARNING
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body text-start">
       
        <p>Youtube Channels:</p>
      
        <b>5 mins engineering:</b> <a href="https://youtube.com/playlist?list=PLYwpaL_SFmcBhOEPwf5cFwqo5B-cP9G4P" target="_blank">https://youtube.com/playlist?list=PLYwpaL_SFmcB</a><br></br>
        <b>Trouble-Free:</b> <a href="https://youtube.com/playlist?list=PLmAmHQ-_5ySyQeEryrlomrEvOGNYN3TAL" target="_blank">https://youtube.com/playlist?list=PLmAmHQ-_5ySy</a><br></br>
        <b>Codebasics:</b> <a href="https://youtube.com/playlist?list=PLeo1K3hjS3uvCeTYTeyfe0-rN5r8zn9rw" target="_blank">https://youtube.com/playlist?list=PLeo1K3hjS</a><br></br>
        
        <b>Previous Year Questions:</b> <a className="inner"href='https://drive.google.com/file/d/1T1339MKFdC2MKMlBm9viTetrN47XkcMy/view?usp=drive_link' target="blank"> <GrDocumentPdf size="25px"/></a>
        
      </div>
    </div>
  </div>
  

</div>

</section>
       
<br></br><br></br>   

 
 <section className="pt-4 pl-2 pr-2 m-2 bg-light border rounded border-1 shadow-lg">
  <h1 className="text-center text-primary "><b>SEMESTER-8</b> </h1>
  <h3 className="text-center">(January-May)</h3>
  <p className="text-center"  >All resources needed by a student have been provided below.These include youtube videos links of each subject and  PYQs.</p>
<div className="accordion p-5" id="accordionExample2">
<div className="accordion-item p-2">
<h2 className="accordion-header">
<button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
NETWORK SECURITY AND CRYPTOGRAPHY 
</button>
</h2>
<div id="collapseSix" className="accordion-collapse collapse " data-bs-parent="#accordionExample2">
<div className="accordion-body text-start">


<p>Youtube channels:</p>
 <b>Abhishek Sharma: </b> <a href="https://youtube.com/playlist?list=PL9FuOtXibFjV77w2eyil4Xzp8eooqsPp8" target="_blank">https://youtube.com/playlist?list=PL9FuOtXibF</a><br></br>
 <b>Trouble-Free: </b> <a href="https://youtube.com/playlist?list=PLmAmHQ-_5ySx_dXmOwSuGGGyE8XsbYT0n" target="_blank">https://youtube.com/playlist?list=PLmAmHQ-_5yS</a><br></br>
 <b>Neso Academy: </b> <a href="https://youtube.com/playlist?list=PLBlnK6fEyqRgJU3EsOYDTW7m6SUmW6kII" target="_blank">https://youtube.com/playlist?list=PLBlnK6fEyq</a><br></br>
 
  <b>Previous Year Questions:</b> <a className="inner"href='https://drive.google.com/file/d/10eeINQP9uixqsbp80fhGFtTN-LOBI8j_/view?usp=drive_link' target="blank"> <GrDocumentPdf size="25px"/></a>
        
</div>
</div>
</div>
<div className="accordion-item p-2">
<h2 className="accordion-header">
<button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
IMAGE PROCESSING
</button>
</h2>
<div id="collapseSeven" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
<div className="accordion-body text-start">

<p>Youtube Channels:</p>
<b>Abhishek Sharma:</b> <a href="https://youtube.com/playlist?list=PL9FuOtXibFjUE8MpVv6uiAWfj5E3dsBZR" target="_blank">https://youtube.com/playlist?list=PL9FuOtXibF</a><br></br>
<b>5 mins engineering:</b> <a href="https://youtube.com/playlist?list=PLYwpaL_SFmcCyQH0n9GHfwviu6KeJ46BV" target="_blank">https://youtube.com/playlist?list=PLYwpaL_SFmc</a><br></br>
<b>Education4u: </b> <a href="https://youtube.com/playlist?list=PLrjkTql3jnm86_Jr9195OaqN-HeiBy49I" target="_blank">https://youtube.com/playlist?list=PLrjkTql3jnm86</a><br></br>

<b>Previous Year Questions:</b> <a className="inner"href='/question/fourth/CC.pdf' download='CC.pdf'> <GrDocumentPdf size="25px"/></a>
        

</div>
</div>
</div>
<div className="accordion-item p-2">
<h2 className="accordion-header">
<button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
ENVIRONMENTAL STUDIES
</button>
</h2>
<div id="collapseEight" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
<div className="accordion-body text-start">
 
<p>Youtube Channels:</p>
<b>Study circle 2.0:</b> <a href="https://youtube.com/playlist?list=PLhc1EpSGc3oNHOEtC_gDeazKbyOrF-wkP" target="_blank">https://youtube.com/playlist?list=PLhc1EpSGc3oNHOE</a><br></br>

<b>Previous Year Questions:</b> <a className="inner"href='https://drive.google.com/file/d/1OnzbElYCK_3u49OCldk-AJ_LI89eGC9a/view?usp=drive_link'target="blank"> <GrDocumentPdf size="25px"/></a>
        
</div>
</div>
</div>


</div>
</section>
<br></br>
<br></br>
<form className="fourth-form">
 <div className="container-lg">
 <h2 className="text-light">Post your ideas, resources in the form of links here!</h2><br></br>
 <label><h5 className="text-light">Ideas/Description</h5></label><br></br>
 <textarea rows="10" cols="30" className="col-9 text-center" placeholder='comments,suggestions,queries...' onChange={(e)=>{setComment(e.target.value)}}></textarea><br></br>
 <label><h5 className="text-light">Any links?</h5></label><br></br>
 <input type="text" className="p-2 col-9" onChange={(e)=>setLink(e.target.value)}/><br></br>
 <button className="btn btn-success col-9 text-center mt-3" onClick={addtodata}>Submit</button>

 </div>
 </form>
 <br></br>
 
  <br></br>
  {
          details.length !=0 ? 
          <div >
          <input type="text" className="text-center col-8 p-2" placeholder="search by keywords " onChange={(e)=> setSearch(e.target.value)} /> <FaSearch size="20px"/>
 
          <h4 className="text-dark">RESPONSES:</h4>
          </div>
          :
          <h4> </h4>
      }
   {
    details.filter((val)=>{
      if(search===""){
          return val;
      }else if(val.comment.toLowerCase().includes(search.toLowerCase())){
          return val;
      }
     }).map((val,key)=>{
      return <div class="container-lg">
      <div class="card p-4 my-3 shadow-lg">
      <div class="card-body">
      <h3 class="text-end text-primary">{val.rollno}</h3>
      <h5 class="text-end">{val.name}</h5>
      <p class="text-end">{val.updatedAt}</p>
      <br></br>
         <h5>{val.comment}</h5>
          <h6> <a href={val.link}>{val.link}</a></h6>
         <br></br>
             
         {val.userid===userid ? <button className="btn " onClick={()=>setBox(!box)} ><FaPen/></button> : <h1></h1>}
         {val.userid===userid ? <button className="btn " onClick={()=>handledelete(val._id)}><FaTrash/></button> : <h1></h1>}<br></br>
         {val.userid===userid && box  ? <div><label>Idea/Description</label><br></br><textarea rows="10" cols="30" className="col-9 text-center" placeholder='comments,suggestions,queries...' onChange={(e)=>{setNewcomment(e.target.value)}} ></textarea><br></br> <label>Link</label><br></br><input type="text" className="col 9" onChange={(e)=>setNewlink(e.target.value)}  required/><br></br><br></br><button  className="btn btn-success" onClick={()=>handleupdate(val._id)} >Submit</button><button className="btn btn-danger" onClick={()=>setBox(!box)}>Undo</button></div>: <h1></h1>}<br></br>
      </div>
    </div>
    </div>
  

    })
  
    }

<section className="flex-center mt-5 ">
         <div className="container shadow-lg bg-dark p-4">
           <h3 className="text-light">SHARE your resources here!</h3>
           <h6 className="text-light">formats: PNG,JPG,JPEG</h6>
           <div className="card mt-5 ">
              <form onSubmit={uploadImage} className="form-control">
                   <p>
                     <label className="text-center ">What's the file about?</label><br></br>
                     <input type="text" placeholder="description "  className=" text-center col-8" onChange={(e)=> setDesc(e.target.value)} /><br></br>
                     <label className="text-center mt-3">Photo</label>
                     <input type="file" accept="image/png,image/jpeg,image/png" name="image" onChange={handleImageChange}/>
                   </p>
                   <p>
                       {
                         isloading ? ("uploading"): (

                           <button type="submit" className="btn btn-success col-8"> Submit</button>
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
        </div>
    </section>
    <br></br>
    <br></br>
    {
      latesturls.length !=0 ?
      <div >
      <input type="text" className="text-center col-8 p-2" placeholder="search by keywords " onChange={(e)=> setSecsearch(e.target.value)} /> <FaSearch size="20px"/>

      <h4 className="text-dark">RESPONSES:</h4>
      </div>
      :
      <h4></h4>
    }
    
    {
     latesturls.filter((val)=>{
      if(secsearch===""){
          return val;
      }else if(val.description.toLowerCase().includes(secsearch.toLowerCase())){
          return val;
      }
     }).map((val,key)=>{
      return <div class="container-lg">
      <div class="card p-4 my-3 shadow-lg">
      <div class="card-body">
      <h6 class="text-end">{val.name}</h6>
      <h6 class="text-end">{val.rollno}</h6>
      <h4 class="text-center text-primary">Description:{val.description}</h4><br></br>
      <img src={val.imageurl} alt="rescource" width="240" height="150"/><br></br>
      <button className="btn btn-primary col-4 mt-5"><a href={val.imageurl} target="blank">See the enlarged resource</a></button>
      {val.userid===userid ? <button className="btn " onClick={()=>handleimagedelete(val._id)}><FaTrash/></button> : <h1></h1>}

      </div>
    </div>
    </div>
  

    })
  
    }
   

</div>
<Footer/>
</>
    );
}