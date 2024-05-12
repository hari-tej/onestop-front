import '../styling/second.css'
import{GrDocumentPdf} from 'react-icons/gr'
import {useState,useEffect,useContext} from 'react';
import {Navbar} from './nav';
import {Footer} from './footer';
import { store } from '../App';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch,FaTrash,FaPen } from 'react-icons/fa';
import toast from 'react-hot-toast';
import {useTypewriter} from 'react-simple-typewriter';

export const Second=()=>{
  const[token,setToken]=useContext(store);
  let currentimage="";
  
  const[desc,setDesc]=useState("");
  const[newcomment,setNewcomment]=useState("");
  const[secsearch,setSecsearch]=useState("");
  const[search,setSearch]=useState("");
  const[latesturls,setLatesturls]=useState([]);
  const[box,setBox]=useState(false);
  const[show,setShow]=useState(false);
  const[text,setText]=useState("");
  const[newlink,setNewlink]=useState();
  const[name,setName]=useState("");
  const[rollno,setRollno]=useState("");
  const[userid,setUserid]=useState("");
  const[link,setLink]=useState("");

  
   const[comment,setComment]=useState("");
   const[details,setDetails]=useState([]);

   const[profileimage,setProfileimage]=useState("");
   const[imagepreview,setImagepreview]=useState(null);
   const[isloading,setIsloading]=useState(false);



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


      axios.get("https://onestop-backend.onrender.com/second/read",{
        
      }).then((response)=>{
           
            setDetails(response.data);
      }).catch((err)=>{
         console.log(err);
      });

      axios.get("https://onestop-backend.onrender.com/second/url")
      .then((response)=>{
          setLatesturls(response.data);
      }).catch((err)=>{
        console.log(err);
     });
      
     
  
},[details,latesturls]);



  
const addtodata=()=>{

  
  axios.post("https://onestop-backend.onrender.com/second/post",{
    userid:userid,
    rollno:rollno,
    name:name,
    comment:comment,
    link:link
 
  });

  



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

const handleupdate=(pid)=>{
 

  axios.put('https://onestop-backend.onrender.com/second/update',{
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
     axios.delete(`https://onestop-backend.onrender.com/second/${pid}`)
     .then((res)=>{
      toast.success("deleted successfully");
      console.log(res);
    }).catch(err=> console.log(err));
          
    
};

const sendtoback=()=>{
  axios.post("https://onestop-backend.onrender.com/second/image",{
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
   axios.delete(`https://onestop-backend.onrender.com/second/image/delete/${pid}`)
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
            <h2 className="text-success ">SECOND YEAR PAGE</h2>
            <br></br>
          </section>
        <section className=" pt-4 pl-2 pr-2 m-2 border bg-light rounded border-1 shadow-lg">
          <h1 className="text-center text-success ps-5 pe-5 ms-5 me-5"><b>SEMESTER-3</b> </h1>
          <h3 className="text-center">(August-November)</h3>
          <p className="text-center"  >All resources needed by a student have been provided below.These include youtube videos links of each subject and  PYQs.</p>
        <div className="accordion p-5" id="accordionExample">
    <div className="accordion-item ">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
       OBJECT ORIENTED PROGRAMMING
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
      <div className="accordion-body text-start">
  

        <p>Youtube channels:</p>
          <b>kunal kushwaha:</b> <a href="https://youtube.com/playlist?list=PL9gnSGHSqcno1G3XjUbwzXHL8_EttOuKk" target="_blank">https://youtube.com/playlist?list=PL9gnSGHSq</a><br></br>
         <b>codeitup:</b> <a href="https://youtube.com/playlist?list=PLmRclvVt5DtnqhXTJwd-oqVRwO3bLZCGV" target="_blank">https://youtube.com/playlist?list=PLmRclvVt5DtnqhX</a><br></br>
         <b>Smart Programming:</b> <a href="https://youtube.com/playlist?list=PLlhM4lkb2sEhf5NlWeYh_gdcN49pHjVP0" target="_blank">https://youtube.com/playlist?list=PLlhM4lkb2s</a><br></br>
          
          
          <b>Previous Year Questions:</b> <a className="inner" href='/question/second/Macroeconomics.pdf' download='Oops.pdf'> <GrDocumentPdf size="25px"/></a>
        
        
         
      </div>
    </div>
  </div>
  <div className="accordion-item p-2">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        DATA STRUCTURES
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body text-start">
     
        <p>Youtube Channels:</p>
        <b>Naresh i Technologies:</b> <a href="https://youtube.com/playlist?list=PLVlQHNRLflP_OxF1QJoGBwH_TnZszHR_j" target="_blank">https://youtube.com/playlist?list=PLVlQHNRLflP</a><br></br>
        <b>Engineer Drive:</b> <a href="https://youtube.com/playlist?list=PL5Rc9H5eTGY46HAzmNeHbrE5r9LTf_rNB" target="_blank">https://youtube.com/playlist?list=PL5Rc9H5eTGY46H</a><br></br>
        
        
         <b>Previous Year Questions:</b> <a className="inner" href='https://drive.google.com/file/d/17NboObx-R4_MIyOGFRmYHJHMYKSVuWYQ/view?usp=drive_link' target="blank"> <GrDocumentPdf size="25px"/></a>
        
        
      </div>
    </div>
  </div>
  <div className="accordion-item p-2">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        LINEAR ALGEBRA
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body text-start">
        
        <p>Youtube Channels:</p>
        <b>Dr.Gajendra Purohit:</b> <a href="https://youtube.com/playlist?list=PLU6SqdYcYsfI34zVjDYDCZ6KLAifHmN1v" target="_blank">https://youtube.com/playlist?list=PLU6SqdYcYsf </a><br></br>
        <b>Dr.Gajendra Purohit:</b> <a href="https://youtube.com/playlist?list=PLU6SqdYcYsfJOGZdxUpDk3w9o-w94-RoG" target="_blank">https://youtube.com/playlist?list=PLU6SqdYcYsf</a><br></br>
        <b>Bhagwan Singh Vishwakarma:</b> <a href="https://youtube.com/playlist?list=PLdM-WZokR4taLvoJPvfHwF8m0Q1K6Qvmz" target="_blank">https://youtube.com/playlist?list=PLdM-WZokR4</a><br></br>
        
        
        <b>Previous Year Questions:</b> <a className="inner" href='https://drive.google.com/file/d/155aHuwhqKKGnoN9GKvhudjsp3lDOc8U6/view?usp=drive_link' target="blank"> <GrDocumentPdf size="25px"/></a>
        
        
      </div>
    </div>
  </div>
  <div className="accordion-item p-2">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
        DIGITAL LOGIC DESIGN
      </button>
    </h2>
    <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body text-start">
       
        <p>Youtube Channels:</p>
        <b>Tutorials point:</b> <a href="https://youtube.com/playlist?list=PLWPirh4EWFpHk70zwYoHu87uVsCC8E2S-" target="_blank">https://youtube.com/playlist?list=PLWPirh4EWF</a><br></br>
        <b>Gate academy plus:</b> <a href="https://youtube.com/playlist?list=PL9RcWoqXmzaJN3LcyxBm2tLjUk8wvOYrv" target="_blank">https://youtube.com/playlist?list=PL9RcWoqX</a><br></br>
        <b>Neso Academy:</b> <a href="https://youtube.com/playlist?list=PLBlnK6fEyqRjMH3mWf6kwqiTbT798eAOm" target="_blank">https://youtube.com/playlist?list=PLBlnK6fEyqRjM</a><br></br>
        
        
        <b>Previous Year Questions:</b> <a className="inner" href='https://drive.google.com/file/d/1pPZ55kzUQiyhrkooK-XLiKRiqfjfNU1n/view?usp=drive_link' target="blank" ><GrDocumentPdf size="25px"/></a>
        
        
      </div>
    </div>
  </div>
  <div className="accordion-item p-2">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
        MICRO ECONOMICS
      </button>
    </h2>
    <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body text-start">
         
        <p>Youtube Channels:</p>
        <b>Pratham Singh:</b> <a href="https://youtube.com/playlist?list=PL-fORSyPTUEILOVoZ9rh5KTCC1EnvKCJ0" target="_blank">https://youtube.com/playlist?list=PL-fORSyPTUE</a><br></br>
        
        
        <b>Previous Year Questions:</b> <a className="inner" href='https://drive.google.com/file/d/15giamqdV9zCCx7iVIKFgGo6Edz_n89AA/view?usp=drive_link' target="blank"> <GrDocumentPdf size="25px"/></a>
        
        
      </div>
    </div>
  </div>
  <div className="accordion-item p-2">
    <h2 className="accordion-header text-start">
      <button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
        DISCRETE MATHEMATICS
      </button>
    </h2>
    <div id="collapseSix" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body text-start">
       
        <p>Youtube Channels:</p>
        <b>Dr.Gajendra Purohit:</b> <a href="https://youtube.com/playlist?list=PLU6SqdYcYsfJ27O0dvuMwafS3X8CecqUg" target="_blank">https://youtube.com/playlist?list=PLU6SqdYcY</a><br></br>
<b>Neso Academy:</b> <a href="https://youtube.com/playlist?list=PLBlnK6fEyqRhqJPDXcvYlLfXPh37L89g3" target="_blank">https://youtube.com/playlist?list=PLBlnK6fEyqR</a><br></br>
<b>Knowledge Gate:</b> <a href="https://youtube.com/playlist?list=PLmXKhU9FNesTpQNP_OpXN7WaPwGx7NWsq" target="_blank">https://youtube.com/playlist?list=PLmXKhU9FN</a><br></br>
        
        
        <b>Previous Year Questions:</b> <a className="inner" href='https://drive.google.com/file/d/1RnZn1YatpnOYezKWDl1rzhSDI-Sk9C9z/view?usp=drive_link' target="blank"> <GrDocumentPdf size="25px"/></a>
        
        
      </div>
    </div>
  </div>

</div>

</section>
       
<br></br><br></br>   

 
 <section className="pt-4 pl-2 pr-2 m-2 border bg-light rounded border-1 shadow-lg">
  <h1 className="text-center  text-success "><b>SEMESTER-4</b> </h1>
  <h3 className="text-center">(January-May)</h3>
  <p className="text-center"  >All resources needed by a student have been provided below.These include youtube videos links of each subject and  PYQs.</p>
<div className="accordion p-5" id="accordionExample2">
<div className="accordion-item p-2">
<h2 className="accordion-header">
<button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="true" aria-controls="collapseSeven">
COMPUTER ORGANIZATION AND ARCHITECTURE
</button>
</h2>
<div id="collapseSeven" className="accordion-collapse collapse " data-bs-parent="#accordionExample2">
<div className="accordion-body text-start">


<p>Youtube channels:</p>
  <b>Sudhakar Atchala:</b> <a href="https://youtube.com/playlist?list=PLXj4XH7LcRfDXDRzSLv1FfZ-SSA38SiC0" target="_blank">https://youtube.com/playlist?list=PLXj4XH7LcRfD</a><br></br>
  <b>Enginnering Drive:</b> <a href="https://youtube.com/playlist?list=PL5Rc9H5eTGY6MHqCKAarxhxqT7nipKgun" target="_blank">https://youtube.com/playlist?list=PL5Rc9H5eTGY</a><br></br>
  <b>Shanu Kuttan CSE classes:</b> <a href="https://youtube.com/playlist?list=PL3R9-um41JsxDsAsdRtw7XN7MJJ27Icsv" target="_blank">https://youtube.com/playlist?list=PL3R9-um41JsxD</a><br></br>
  
  
  <b>Previous Year Questions:</b> <a className="inner" href='https://drive.google.com/file/d/12hYQKNTgX94cQsYjBmwayBm55nUna0ib/view?usp=drive_link'  target="blank"> <GrDocumentPdf size="25px"/></a>
        
        
</div>
</div>
</div>
<div className="accordion-item p-2">
<h2 className="accordion-header">
<button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="true" aria-controls="collapseEight">
THEORY OF COMPUTATION
</button>
</h2>
<div id="collapseEight" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
<div className="accordion-body text-start">

<p>Youtube Channels:</p>
<b>Knowledge Gate:</b> <a href="https://youtube.com/playlist?list=PLmXKhU9FNesSdCsn6YQqu9DmXRMsYdZ2T" target="_blank">https://youtube.com/playlist?list=PLmXKhU9FN</a><br></br>
<b>Sandeep Sarathi:</b> <a href="https://youtube.com/playlist?list=PLLOxZwkBK52CTVrHjYa7-SpXlEtef1TqL" target="_blank">https://youtube.com/playlist?list=PLLOxZwkBK</a><br></br>
<b>Education4u:</b> <a href="https://youtube.com/playlist?list=PLrjkTql3jnm_TWSXXvWX1_jX-L6f1QJSx" target="_blank">https://youtube.com/playlist?list=PLrjkTql3jnm</a><br></br>
<b>Neso Academy:</b> <a href="https://youtube.com/playlist?list=PLBlnK6fEyqRgp46KUv4ZY69yXmpwKOIev" target="_blank">https://youtube.com/playlist?list=PLBlnK6fE</a><br></br>

<b>Previous Year Questions:</b> <a className="inner" href='https://drive.google.com/file/d/17PUUKF3aSMvw9RoJqRXV-WjdqBXRwA_I/view?usp=drive_link'  target="blank"> <GrDocumentPdf size="25px"/></a>
        
        

</div>
</div>
</div>
<div className="accordion-item p-2">
<h2 className="accordion-header">
<button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="true" aria-controls="collapseNine">
PROBABILITY AND STOCHASTIC PROCESSES
</button>
</h2>
<div id="collapseNine" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
<div className="accordion-body text-start">

<p>Youtube Channels:</p>
<b>Dr.Gajendra Purohit:</b> <a href="https://youtube.com/playlist?list=PLU6SqdYcYsfLRq3tu-g_hvkHDcorrtcBK" target="_blank">https://youtube.com/playlist?list=PLU6SqdY</a><br></br>
<b>Engineering made easy:</b> <a href="https://youtube.com/playlist?list=PLDp9Jik5WjRtVUYHjx_Q0KohHqqDVKhcX" target="_blank">https://youtube.com/playlist?list=PLDp9Jik5Wj</a><br></br>


<b>Previous Year Questions:</b> <a className="inner" href='https://drive.google.com/file/d/1vNLROwHoQBqK_SjXw2CqYslOv3zdf-S-/view?usp=drive_link'  target="blank"> <GrDocumentPdf size="25px"/></a>
        
        
</div>
</div>
</div>
<div className="accordion-item p-2">
<h2 className="accordion-header">
<button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="true" aria-controls="collapseTen">
DESIGN AND ANALYSIS OF ALGORITHMS
</button>
</h2>
<div id="collapseTen" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
<div className="accordion-body text-start">

<p>Youtube Channels:</p>
<b>Gate Smashers:</b> <a href="https://youtube.com/playlist?list=PLxCzCOWd7aiHcmS4i14bI0VrMbZTUvlTa" target="_blank">https://youtube.com/playlist?list=PLxCzCOWd</a><br></br>
<b>Education4u:</b> <a href="https://youtube.com/playlist?list=PLrjkTql3jnm8wGQyNhgdmm2gkoa8CXCml" target="_blank">https://youtube.com/playlist?list=PLrjkTql3jn</a><br></br>
<b>CSE gurus:</b> <a href="https://youtube.com/playlist?list=PLYT7YDstBQmHr7eumHSrdo1aTMpqrpPDa" target="_blank">https://youtube.com/playlist?list=PLYT7YDstBQmH</a><br></br>


<b>Previous Year Questions:</b> <a className="inner" href='https://drive.google.com/file/d/1MI4emEjo1ceNaPM5aHLjYnOygoqOhyJB/view?usp=drive_link'  target="blank"> <GrDocumentPdf size="25px"/></a>
        
        
</div>
</div>
</div>
<div className="accordion-item p-2">
<h2 className="accordion-header">
<button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEleven" aria-expanded="true" aria-controls="collapseEleven">
CONVEX OPTIMIZATION
</button>
</h2>
<div id="collapseEleven" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
<div className="accordion-body text-start">

<p>Youtube Channels:</p>
<b>Ahmed Bazzi: </b><a href="https://youtube.com/playlist?list=PL-DDW8QIRjNOVxrU2efygBw0xADVOgpmw" target="_blank">https://youtube.com/playlist?list=PL-DDW8QIRjN</a><br></br>
<b>Stanford: </b> <a href="https://youtube.com/playlist?list=PL3940DD956CDF0622" target="_blank">https://youtube.com/playlist?list=PL3940DD956CDF0622</a><br></br>
<b>Previous Year Questions:</b> <a className="inner" href='https://drive.google.com/file/d/1e6OyOtMS9saSFTonNJjNlYESXmvpkTR7/view?usp=drive_link'  target="blank"> <GrDocumentPdf size="25px"/></a>
        
        
</div>
</div>
</div>

<div className="accordion-item p-2">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwelve" aria-expanded="true" aria-controls="collapseTwelve">
        SIGNAL AND SYSTEMS
      </button>
    </h2>
    <div id="collapseTwelve" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
      <div className="accordion-body text-start">
   
        <p>Youtube Channels:</p>
       <b>Engineers ki Pathshala:</b> <a href="https://youtube.com/playlist?list=PL9RcWoqXmzaIG-RWneeqDJ-FCt66S15pl" target="_blank">https://youtube.com/playlist?list=PL9RcWoqXmzaIG</a><br></br>
        <b>Neso Academy:</b> <a href="https://youtube.com/playlist?list=PLBlnK6fEyqRhG6s3jYIU48CqsT5cyiDTO" target="_blank">https://youtube.com/playlist?list=PLBlnK6fEyqRh</a><br></br>
        <b>Tutorialspoint</b> <a href="https://youtube.com/playlist?list=PLWPirh4EWFpHr_1ZCkuF9ToYUrmujv9Aa" target="_blank">https://youtube.com/playlist?list=PLWPirh4EWF</a><br></br>
        <b>Previous Year Questions:</b> <a className="inner" href='https://drive.google.com/file/d/1KoRQLcKK9Ab4IewcVe5rLR6by1wmTm4f/view?usp=drive_link' target="blank"> <GrDocumentPdf size="25px"/></a>
        
        
      </div>
    </div>
  </div>

</div>
</section>
<br></br>
<form className="second-form">
 <div className="container-lg">
 <h2 className="text-light">Post your ideas, resources in the form of links here!</h2><br></br>
 
 <label><h5 className="text-light">Ideas/Description</h5></label><br></br>
 <textarea rows="10" cols="30" className="col-9 text-center" placeholder='ideas,descriptions...' onChange={(e)=>{setComment(e.target.value)}}></textarea><br></br>
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
      <h6 className="text-end">{val.updatedAt}</h6>
      <br></br>
         <h5>{val.comment}</h5>
         <h6> <a href={val.link}>{val.link}</a></h6>
         <br></br>   
         {val.userid===userid ? <button className="btn " onClick={()=>setBox(!box)} ><FaPen/></button> : <h1></h1>}
         {val.userid===userid ? <button className="btn " onClick={()=>handledelete(val._id)}><FaTrash/></button> : <h1></h1>}<br></br>
         {val.userid===userid && box  ? <div><label>Idea/Description</label><br></br><textarea rows="10" cols="30" className="col-9 text-center" placeholder='comments,suggestions,queries...' onChange={(e)=>{setNewcomment(e.target.value)}} required ></textarea><br></br>
         <label>Link</label><br></br><input type="text" className="col-9" onChange={(e)=>setNewlink(e.target.value)}  required/><br></br><br></br><button  className="btn btn-success" onClick={()=>handleupdate(val._id)} >Submit</button><button className="btn btn-danger" onClick={()=>setBox(!box)}>Undo</button></div>: <h1></h1>}<br></br>
         
      </div>
    </div>
    </div>
  

    })
  
    }
    <section className="flex-center mt-5 ">
         <div className="container shadow-lg p-4 bg-dark">
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
      <button className="btn btn-primary col-4 mt-5" ><a href={val.imageurl} target="blank">See the enlarged resource</a></button><br></br>
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