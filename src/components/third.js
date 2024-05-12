import{GrDocumentPdf} from 'react-icons/gr'
import {useState,useEffect,useContext} from 'react';
import '../styling/third.css'
import {Navbar} from './nav';
import {Footer} from './footer';
import{store} from '../App'
import toast from 'react-hot-toast';
import { FaSearch,FaTrash,FaPen } from 'react-icons/fa';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useTypewriter } from 'react-simple-typewriter';

export const Third=()=>{
  const[token,setToken]=useContext(store);
  let currentimage="";

  const[search,setSearch]=useState("");
  const[secsearch,setSecsearch]=useState("");
  const[box,setBox]=useState("");
  const[link,setLink]=useState("");
  const[comment,setComment]=useState("");
  const[details,setDetails]=useState([]);
  const[newcomment,setNewcomment]=useState("");
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
      axios.get("https://onestop-backend.onrender.com/third",{
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

     
     axios.get("https://onestop-backend.onrender.com/third/read",{
        header:{
          'x-token':token
         } 
      }).then((response)=>{
          
            setDetails(response.data);
      })

      axios.get("https://onestop-backend.onrender.com/third/url")
      .then((response)=>{
          setLatesturls(response.data);
      })
      

 
 
},[details,latesturls]);


 
const addtodata=()=>{
 
  axios.post("https://onestop-backend.onrender.com/third/post",{
   userid:userid, 
   rollno:rollno,
   name:name,
   comment:comment,
   link:link 

  } );



};

const handleupdate=(pid)=>{
  axios.put('https://onestop-backend.onrender.com/third/update',{
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
     axios.delete(`https://onestop-backend.onrender.com/third/${pid}`)
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
  axios.post("https://onestop-backend.onrender.com/third/image",{
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
  axios.delete(`https://onestop-backend.onrender.com/third/image/delete/${pid}`)
  .then((res)=>{
  toast.success("deleted successfully");
  console.log(res);
  }).catch(err=> console.log(err));
}


   
if(!localStorage.getItem("token")){
  return <Navigate to="/"/>
}
    return(
        <> 
        <Navbar/>
        <div>
          <section className="text-center m-5 ">
            <h2 className="text-danger">THIRD YEAR PAGE</h2>
            <br></br>
          </section>
        <section className=" pt-4 pl-2 pr-2 m-2 bg-light border rounded  border-1 shadow-lg">
          <h1 className="text-center text-danger ps-5 pe-5 ms-5 me-5"><b>SEMESTER-5</b> </h1>
          <h3 className="text-center">(August-November)</h3>
          <p className="text-center"  >All resources needed by a student have been provided below.These include youtube videos links of each subject and PYQs.</p>
        <div className="accordion p-5" id="accordionExample">
    <div className="accordion-item p-2">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
       DATABASE MANAGEMENT 
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
      <div className="accordion-body text-start">


        <p>Youtube channels:</p>
         <b>Gate Smashers:</b> <a href="https://youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y" target="_blank">https://youtube.com/playlist?list=PLxCzCOWd7aiFA</a><br></br>
        <b>Knowledge Gate:</b> <a href="https://youtube.com/playlist?list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV" target="_blank">https://youtube.com/playlist?list=PLmXKhU9FNesR1</a><br></br>
        <b>Neso Academy:</b> <a href="https://youtube.com/playlist?list=PLBlnK6fEyqRi_CUQ-FXxgzKQ1dwr_ZJWZ" target="_blank">https://youtube.com/playlist?list=PLBlnK6fEyqRi</a><br></br>
        <b>Education 4u:</b>  <a href="https://youtube.com/playlist?list=PLrjkTql3jnm-CLxHftqLgkrZbM8fUt0vn" target="_blank">https://youtube.com/playlist?list=PLrjkTql3jnm</a><br></br>

          <b>Previous Year Questions:</b> <a className="inner"href='https://drive.google.com/file/d/1sNoVPhwpm4VtJa574gKfhAHv4Zlz_500/view?usp=drive_link' target="blank"> <GrDocumentPdf size="25px"/></a>
        
         
      </div>
    </div>
  </div>
  <div className="accordion-item p-2">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        COMPUTER NETWORKS
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body text-start">
       
        <p>Youtube Channels:</p>
        <b>Gate Smashers:</b> <a href="https://youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_" target="_blank">https://youtube.com/playlist?list=PLxCzCOWd7aiGFB</a><br></br>
        <b>Knowledge Gate:</b> <a href="https://youtube.com/playlist?list=PLmXKhU9FNesSjFbXSZGF8JF_4LVwwofCd" target="_blank">https://youtube.com/playlist?list=PLmXKhU9FNesS</a><br></br>
        <b>Neso Academy:</b> <a href="https://youtube.com/playlist?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx" target="_blank">https://youtube.com/playlist?list=PLBlnK6fEyqRgMC</a><br></br>
        <b>Sandeep Saradhi:</b> <a href="https://youtube.com/playlist?list=PLLOxZwkBK52BCOXC7wpI_U81W_eklMFE3" target="_blank">https://youtube.com/playlist?list=PLLOxZwkBK5</a><br></br><br></br>

         <b>Previous Year Questions:</b> <a className="inner" href='https://drive.google.com/file/d/1RAqzC6pHa52iVv1suUp7m0oRQcgQuCzV/view?usp=drive_link' target="blank"> <GrDocumentPdf size="25px"/></a>
        
      </div>
    </div>
  </div>
  <div className="accordion-item p-2">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        MICROPROCESSOR AND MICROCONTROLLER
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body text-start">

        <p>Youtube Channels:</p>
        <b>Padmasri Naban:</b> <a href="https://youtube.com/playlist?list=PLMpCSwrw7iRFqHzQyVTfw9JMHqI3xbS6S" target="_blank">https://youtube.com/playlist?list=PLMpCSwrw7iRF</a><br></br>
        <b>Pawan Chandani:</b> <a href="https://youtube.com/playlist?list=PLt5syl71JKf2KqohkFDBkq4eWX0h4Ol5k" target="_blank">https://youtube.com/playlist?list=PLt5syl71JKf2</a><br></br>
        <b>Tutorialspoint:</b> <a href="https://youtube.com/playlist?list=PLWPirh4EWFpFDi8bggPYOiMLlD1D_bBPM" target="_blank">https://youtube.com/playlist?list=PLWPirh4EWFpF</a><br></br>
        

        <b>Previous Year Questions:</b> <a className="inner" href='https://drive.google.com/file/d/1Cj9dJvkMgrrwP9TblGHe7fy9h1hXa9hT/view?usp=drive_link' target="blank"> <GrDocumentPdf size="25px"/></a>
        
      </div>
    </div>
  </div>
  <div className="accordion-item p-2">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
        OPERATING SYSTEM
      </button>
    </h2>
    <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body text-start">
    
        <p>Youtube Channels:</p>
        <b>Gate Smashers:</b> <a href="https://youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p" target="_blank">https://youtube.com/playlist?list=PLxCzCOWd7a</a><br></br>
        <b>Knowledge Gate:</b> <a href="https://youtube.com/playlist?list=PLmXKhU9FNesSFvj6gASuWmQd23Ul5omtD" target="_blank">https://youtube.com/playlist?list=PLmXKhU9FN</a><br></br>
        <b>Neso Academy:</b> <a href="https://youtube.com/playlist?list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O" target="_blank">https://youtube.com/playlist?list=PLBlnK6fEyqR</a><br></br>
        <b>Education4u:</b> <a href="https://youtube.com/playlist?list=PLrjkTql3jnm9U1tSPnPQWQGIGNkUwBFv-" target="_blank">https://youtube.com/playlist?list=PLrjkTql3jnm9</a><br></br>
    
        <b>Previous Year Questions:</b> <a className="inner" href='https://drive.google.com/file/d/1Fxob0OwUG4ewjEKMQ1m4NDVXjL7o9v24/view?usp=drive_link' target="blank"> <GrDocumentPdf size="25px"/></a>
        
      </div>
    </div>
  </div>
  <div className="accordion-item p-2">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
        PRINCIPLES OF PROGRAMMING LANGUAGES
      </button>
    </h2>
    <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body text-start">

        <p>Youtube Channels:</p>
        <b>Kapil Joshi Tutorials:</b> <a href="https://youtube.com/playlist?list=PLbWkMgLvWbDF3bErg6Ejo8d1QtTSqtWwN" target="_blank">https://youtube.com/playlist?list=PLbWkMgLvWb</a><br></br>

   
        <b>Previous Year Questions:</b> <a className="inner" href='https://drive.google.com/file/d/1bBPMlhWPCZCgVbgrG80yEaj4qVggM0N6/view?usp=drive_link' target="blank"><GrDocumentPdf size="25px"/></a>
        
      </div>
    </div>
  </div>

</div>

</section>
       
<br></br><br></br>   

 
 <section className="pt-4 pl-2 pr-2 m-2 bg-light border rounded  border-1 shadow-lg">
  <h1 className="text-center  text-danger "><b>SEMESTER-6</b> </h1>
  <h3 className="text-center">(January-May)</h3>
  <p className="text-center"  >All resources needed by a student have been provided below.These include youtube videos links of each subject and  PYQs.</p>
<div className="accordion p-5" id="accordionExample2">
<div className="accordion-item p-2">
<h2 className="accordion-header">
<button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="true" aria-controls="collapseSix">
ARTIFICIAL INTELLIGENCE
</button>
</h2>
<div id="collapseSix" className="accordion-collapse collapse " data-bs-parent="#accordionExample2">
<div className="accordion-body text-start">
 

<p>Youtube channels:</p>
 <b>Gate Smashers:</b> <a href="https://youtube.com/playlist?list=PLxCzCOWd7aiHGhOHV-nwb0HR5US5GFKFI" target="_blank">https://youtube.com/playlist?list=PLxCzCOWd7aiHGh</a><br></br>
<b>Easy Engineering Classes:</b> <a href="https://youtube.com/playlist?list=PLV8vIYTIdSnYsdt0Dh9KkD9WFEi7nVgbe" target="_blank">https://youtube.com/playlist?list=PLV8v</a><br></br>
<b>Education4u:</b>  <a href="https://youtube.com/playlist?list=PLrjkTql3jnm_yol-ZK1QqPSn5YSg0NF9r" target="_blank">https://youtube.com/playlist?list=PLrjkTql3jnm_yol</a><br></br>

  <b>Previous Year Questions:</b> <a className="inner" href='https://drive.google.com/file/d/1FPQfCYi2bgBpbQKz0_NWKtG0oLzOEvNX/view?usp=drive_link' target="blank"> <GrDocumentPdf size="25px"/></a>
        
</div>
</div>
</div>
<div className="accordion-item p-2">
<h2 className="accordion-header">
<button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="true" aria-controls="collapseSeven">
SOFTWARE ENGINEERING
</button>
</h2>
<div id="collapseSeven" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
<div className="accordion-body text-start">
 
<p>Youtube Channels:</p>
<b>Gate Smashers:</b> <a href="https://youtube.com/playlist?list=PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2" target="_blank">https://youtube.com/playlist?list=PLxCzCOWd7aiE</a><br></br>
<b>Easy Engineering Tutorials:</b> <a href="https://youtube.com/playlist?list=PLV8vIYTIdSnat3WCO9jfehtZyjnxb74wm" target="_blank">https://youtube.com/playlist?list=PLV8vIY</a><br></br>
<b>Education4u:</b> <a href="https://youtube.com/playlist?list=PLrjkTql3jnm9b5nr-ggx7Pt1G4UAHeFlJ" target="_blank">https://youtube.com/playlist?list=PLrjkTql3jnm</a><br></br>


<b>Previous Year Questions:</b> <a className="inner" href='https://drive.google.com/file/d/10y3XQckcLc8zqIACntU53qLeUZNdmYPr/view?usp=drive_link' target="blank"><GrDocumentPdf size="25px"/></a>
        

</div>
</div>
</div>
<div className="accordion-item p-2">
<h2 className="accordion-header">
<button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="true" aria-controls="collapseEight">
COMPUTER GRAPHICS
</button>
</h2>
<div id="collapseEight" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
<div className="accordion-body text-start">
 
<p>Youtube Channels:</p>

<b>5 mins engineering:</b> <a href="https://youtube.com/playlist?list=PLYwpaL_SFmcAtxMe7ahYC4ZYjQHun_b-T" target="_blank">https://youtube.com/playlist?list=PLYwpaL_SFmcAt</a><br></br>
<b>Education4u:</b> <a href="https://youtube.com/playlist?list=PLrjkTql3jnm9cY0ijEyr2fPdwnH-0t8EY" target="_blank">https://youtube.com/playlist?list=PLrjkTql3jn</a><br></br>
<b>Sandeep Sarathi:</b> <a href="https://youtube.com/playlist?list=PLLOxZwkBK52DkMLAYhRLA_VtePq5wW_N4" target="_blank">https://youtube.com/playlist?list=PLLOxZwkBK</a><br></br>

<b>Previous Year Questions:</b> <a className="inner" href='https://drive.google.com/file/d/1SxIyr_c9QOIFvaceMT_90vaGeHI88DMa/view?usp=drive_link' target="blank"> <GrDocumentPdf size="25px"/></a>
        
</div>
</div>
</div>
<div className="accordion-item p-2">
<h2 className="accordion-header">
<button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="true" aria-controls="collapseNine">
COMPILER DESIGN
</button>
</h2>
<div id="collapseNine" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
<div className="accordion-body text-start">

<p>Youtube Channels:</p>
<b>The GateHub:</b> <a href="https://youtube.com/playlist?list=PL1QH9gyQXfguPNDTsnG90W2kBDQpYLDQr" target="_blank">https://youtube.com/playlist?list=PL1QH9gyQXf</a><br></br>
<b>Ravindrababu Ravula:</b> <a href="https://youtube.com/playlist?list=PLMzYNEvC0P7FwwnrXwAjPq8zLTC4MDQKQ" target="_blank">https://youtube.com/playlist?list=PLMzYNEvC0P</a><br></br>


<b>Previous Year Questions:</b> <a className="inner" href='https://drive.google.com/file/d/1w5pP7N9zbPn31Z4Vyim4Bsh9nbF4SrAF/view?usp=drive_link' target="blank"><GrDocumentPdf size="25px"/></a>
        
</div>
</div>
</div>
<div className="accordion-item p-2">
<h2 className="accordion-header">
<button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="true" aria-controls="collapseTen">
MACROECONOMICS
</button>
</h2>
<div id="collapseTen" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
<div className="accordion-body text-start">

<p>Youtube Channel:</p>
<b>Learn to Complete:</b> <a href="https://youtube.com/playlist?list=PLKH0BevfCZvLnVr07InGNBG5KzqDy6ia3" target="_blank">https://youtube.com/playlist?list=PLKH0BevfCZ</a><br></br>


<b>Previous Year Questions:</b> <a className="inner" href='https://drive.google.com/file/d/1dox0XyFHOWrhacWvYjweNwu59DtXlRyl/view?usp=drive_link' target="blank"> <GrDocumentPdf size="25px"/></a>
        
</div>
</div>
</div>

</div>
</section>
<br></br>
<br></br>
<form className="third-form">
 <div className="container-lg">
 <h2 className="text-light">Post your ideas, resources in the form of links here!</h2><br></br>
 
 <label><h5 className="text-light">Ideas/Description</h5></label><br></br>
 <textarea rows="10" cols="30" className="col-9 text-center" placeholder='ideas,description...' onChange={(e)=>{setComment(e.target.value)}}></textarea><br></br>
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
          <h6><a href={val.link}>{val.link}</a></h6>
         <br></br>
         
         {val.userid===userid ? <button className="btn " onClick={()=>setBox(!box)} ><FaPen/></button> : <h1></h1>}
         {val.userid===userid ? <button className="btn " onClick={()=>handledelete(val._id)}><FaTrash/></button> : <h1></h1>}<br></br>
         {val.userid===userid && box  ? <div><label>Idea/Description</label><br></br><textarea rows="10" cols="30" className="col-9 text-center" placeholder='comments,suggestions,queries...' onChange={(e)=>{setNewcomment(e.target.value)}} ></textarea><br></br> <label>Link</label><br></br><input type="text" className="col-9" onChange={(e)=>setNewlink(e.target.value)}  required/><br></br><br></br><button  className="btn btn-success" onClick={()=>handleupdate(val._id)} >Submit</button><button className="btn btn-danger" onClick={()=>setBox(!box)}>Undo</button></div>: <h1></h1>}<br></br>
      </div>
    </div>
    </div>
  

    })
  
    }

<section className="flex-center mt-5 ">
         <div className="container shadow-lg bg-dark p-4">
           <h3 className="text-light">SHARE your resources here!</h3>
           <h6 className="text-light">formats: PNG,JPG,JPEG</h6>
           <div className="card mt-5">
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
      <button className="btn btn-primary col-4 mt-5"><a href={val.imageurl} target="blank">See the enlarged resource</a></button><br></br>
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
};