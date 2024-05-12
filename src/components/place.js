import axios from 'axios';
import '../styling/place.css';
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useState, useEffect,useContext } from 'react';
import {Navbar} from './nav';
import {Footer} from './footer';
import toast from 'react-hot-toast';
import {FaSearch,FaPen,FaTrash} from 'react-icons/fa'
import {store} from '../App';
import { Navigate } from 'react-router-dom';

export const Placement=()=>{
    const[token,setToken]=useContext(store);

    const[name,setName]=useState("");
    const[rollno,setRollno]=useState("");
    const[userid,setUserid]=useState("");
    const[company,setCompany]=useState();
    const[box,setBox]=useState(false);
    const[role,setRole]=useState();
    const[pack,setPack]=useState();
    const[rounds,setRounds]=useState();
    const[difficulty,setDifficulty]=useState();
    const[details,setDetails]=useState();
    const[search,setSearch]=useState("");

    const[data,setData]=useState([]);
    

     useEffect(()=>{

        const token=localStorage.getItem("token");
        axios.get("https://onestop-backend.onrender.com/place",{
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

        axios.get('https://onestop-backend.onrender.com/place/read',{
            
        }).then((response)=>{
            
            setData(response.data);
        });
    },[data]); 

  
    
    
    if(!localStorage.getItem("token")){
        return <Navigate to="/"/>
    }

    const handlesubmit=()=>{
          
           axios.post('https://onestop-backend.onrender.com/place/post',{
              userid:userid,
              name:name,
              rollno:rollno,
              company,
              role,
              pack,
              rounds,
              difficulty,
              details
           }).then(res=>{
                toast.success("Review added successfully");
                console.log(res);
                
           }).catch(err=>{
               toast.err("Review not added successfully");
               console.log(err);
           })
           
    }
    const handleupdate=(pid)=>{
 

        axios.put('https://onestop-backend.onrender.com/place/update',{
          id:pid,
          company:company,
          role:role,
           pack:pack,
           rounds:rounds,
          difficulty:difficulty,
           details:details
        }).then((res)=>{
          setBox(!box);
          toast.success("updated successfully");
          console.log(res);
        }).catch(err=> console.log(err));
      };
      
      
      const handledelete=(pid)=>{
           axios.delete(`https://onestop-backend.onrender.com/place/${pid}`)
           .then((res)=>{
            toast.success("deleted successfully");
            console.log(res);
          }).catch(err=> console.log(err));
                
          
      };
    
    

    return (
        <> 
           <Navbar/>
            <div >
                <AnchorLink href="#data">
               <button className="btn btn-success m-2">DSA</button>
               </AnchorLink> 
               <AnchorLink href="#proj">
               <button className="btn btn-success m-2">Projects</button>
               </AnchorLink>
              <AnchorLink href="#company">
              <button className="btn btn-success m-2">Company Review</button>
              </AnchorLink>

              <section id="data">
                   <div className="shadow-lg m-4 p-5">
                           <h3 className="text-center">Data Structures and Algorithms</h3>
                           <p className="text-start">Data Structures and Algorithms are the most important when it comes to placements, almost all companies have dedicated rounds for DSA either as an entire round or a part of the Online Assessment. It is therefore important to be proficient in these to ace your placement exams and interviews. This sections provides your will the best resources to get started with DSA. The necessary steps and the resources are here for your best use. Happy CoDiNg!</p>
                           <h5 className="text-start mt-4">1.Programming Language</h5>
                           <p className="text-start">To get started with your placement preperation for IT companies, the first and foremost thing to learn is a programming language. There are many programming languages available however learning the programming language whose resources are ample is a good decision. The most popular choice of programming langauge for coding include: Java,C++,Python.If you are a beginner it is recommended to learn Python first as it is beginner friendly. While learning a language, you should simultaneoulsy practice questions for each concept to get a good hold of the concept. The resouces for learning the programming langauges are provided below.  </p>
                           <h6 className="text-start">JAVA:<a href="https://youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ&si=dH_zIEeHQzMEcCwO" target="blank"> https://youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ&si=dH_zIEeHQzMEcCwO</a> </h6>
                           <h6 className="text-start">C++:<a href="https://youtube.com/playlist?list=PLxgZQoSe9cg0df_GxVjz3DD_Gck5tMXAd&si=rGqwodDaH_LMmwx-" target="blank">https://youtube.com/playlist?list=PLxgZQoSe9cg0df_GxVjz3DD_Gck5tMXAd&si=rGqwodDaH_LMmwx-</a> </h6>
                           <h6 className="text-start">Python:<a href="https://youtu.be/XKHEtdqhLK8?si=MaaSVbSt7wiYWOve" target="blank">https://youtu.be/XKHEtdqhLK8?si=MaaSVbSt7wiYWOve</a></h6>
                           <h6 className="text-start">Problem-sheet:<a href="https://www.geeksforgeeks.org/basic-coding-problems-in-dsa-for-beginners/" target="blank"> https://www.geeksforgeeks.org/basic-coding-problems-in-dsa-for-beginners/</a></h6>
                           <h5 className="text-start mt-4">2. Data Structures</h5>
                           <p className="text-start">The next thing after learning a programming language is to start learning Data Structures and Algorithms. Data Structures are a way of storing the data such that the insertion, updation, deletion and retrieval becomes easy. In the interviews and exams, these are the ones that are asked and on the basis of which you are judged. Data Structures are of two types Linear and Non-linear. Linear data structures store the data in sequential form while non-linear data structures store the data in non-linear form. Algorithms on the other hand are step by step procedures to solve a problem. There are many algorithms used for searching and sorting in both linear and non-linear data structures. So getting a good hold on data structures and algorithms is key in acing the interview rounds. The resources to learn these are provided below.</p>
                           <h6 className="text-start">DSA in Java:<a href="https://youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ&si=dH_zIEeHQzMEcCwO" target="blank">https://youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ&si=dH_zIEeHQzMEcCwO</a> </h6>
                           <h6 className="text-start">DSA in C++:<a href="https://youtube.com/playlist?list=PLxgZQoSe9cg0df_GxVjz3DD_Gck5tMXAd&si=rGqwodDaH_LMmwx-" target="blank">https://youtube.com/playlist?list=PLxgZQoSe9cg0df_GxVjz3DD_Gck5tMXAd&si=rGqwodDaH_LMmwx-</a> </h6>
                           <h6 className="text-start">DSA in Python:<a href="https://youtube.com/playlist?list=PLdylWCIGC6gcF_D5CDq-a9zWR74Ek9ZCH&si=NmyX-3fR0l0OJthq" target="blank">https://youtube.com/playlist?list=PLdylWCIGC6gcF_D5CDq-a9zWR74Ek9ZCH&si=NmyX-3fR0l0OJthq</a></h6>
                           <h5 className="text-start mt-4">2. Practice, Practice and Practice</h5>
                           <p className="text-start">To ace any exam, the key is to practice as much as possible.While learning the Data Structures and Algorithms, you should solve as many problems as you can to learn a variety of topics. The questions for practice can be found on website like: Leetcode, GeeksForGeeks, InterviewBit, HackerRank.You can use these platforms to practice a variety of questions ranging from easy-medium-hard. While practicing always start with easy problems and try solving them in 20 mins, once you are confident with the easy problems you can proceed with the medium problems and try solving them in 40 mins. In the interviews generally the questions are asked from the easy to medium level only. Once you have got a good hold on medium problems as well, you can try hard problems but these are not be taken that seriously. These can be solved only to challange yourself as to how far you have come in your preperation. Once you are comfortable in solving problems, start giving the contests on these websites. A contest is like a mock environment where random questions are thrown at you and you have to use your problem solving skills to ace them.The links of these websites and useful rources are provided below.</p>
                           <h6 className="text-start">Leetcode:<a href="https://leetcode.com/problemset/" target="blank">https://leetcode.com/problemset/</a> </h6>
                           <h6 className="text-start">GeeksForGeeks:<a href="https://www.geeksforgeeks.org/explore?page=1&sprint=a663236c31453b969852f9ea22507634&sortBy=submissions&sprint_name=SDE%20Sheet&utm_medium=newui_home&utm_campaign=first_section">https://www.geeksforgeeks.org/explore?page=1&sprint=a663236c31453b969852f9ea22507634&sortBy</a> </h6>
                           <h6 className="text-start">HackerRank:<a href="https://www.hackerrank.com/challenges/challenges/problem" target="blank">https://www.hackerrank.com/challenges/challenges/problem</a></h6>
                           <h6 className="text-start">InterviewBit:<a href="https://www.interviewbit.com/coding-interview-questions/" target="blank">https://www.interviewbit.com/coding-interview-questions/</a> </h6><br></br>
                           <h6 className="text-start">DSA-Sheet1:<a href="https://drive.google.com/file/d/1FMdN_OCfOI0iAeDlqswCiC2DZzD4nPsb/view?pli=1" target="blank">https://drive.google.com/file/d/1FMdN_OCfOI0iAeDlqswCiC2DZzD4nPsb/view?pli=1</a> </h6>
                           <h6 className="text-start">DSA-Sheet2:<a href="https://docs.google.com/spreadsheets/d/1-wKcV99KtO91dXdPkwmXGTdtyxAfk1mbPXQg81R9sFE/edit#gid=0" target="blank">https://docs.google.com/spreadsheets/d/1-wKcV99KtO91dXdPkwmXGTdtyxAfk1mbPXQg81R9sFE/edit#gid=0</a></h6>
                           <h6 className="text-start">DSA-Sheet3:<a href=""></a> </h6>
                        
                   </div>
              </section>
              <section id="data">
                    <div className="shadow-lg m-4 p-5">
                           <h3 className="text-center">Projects</h3>
                           <p>Projects play a pivotal role in securing placements by showcasing a candidate's practical skills, problem-solving abilities, and real-world application of theoretical knowledge. They provide tangible evidence of a candidate's competence and initiative, which can significantly enhance their chances of selection. Here's why: </p>

<p>1. Demonstration of Skills: Projects offer a platform to demonstrate technical proficiency, creativity, and innovation, illustrating how candidates can apply their knowledge to solve practical problems.</p>

<p>2. Hands-on Experience: Engaging in projects provides hands-on experience with tools, technologies, and methodologies relevant to the industry, making candidates more adept at handling real-world challenges.</p>

<p>3. Problem-solving Ability: Projects often require identifying, analyzing, and solving complex problems, showcasing a candidate's critical thinking and problem-solving skills, which are highly valued by employers.</p>

<p>4. Collaboration and Communication: Team projects foster collaboration, communication, and leadership skills, demonstrating an individual's ability to work effectively in a team environment, an essential attribute in most workplaces.</p>

<p>5. Differentiation: Well-executed projects set candidates apart from their peers, making them stand out in a competitive job market and leaving a lasting impression on recruiters.</p>

<h5>Some popular project topics for placements and their corresponding useful channels have been provided below :</h5>
        <h5 class="px-4 text-center mt-4">MongoDb: </h5><a class=" text-center" href="https://youtu.be/c2M-rlkkT5o" alt="">Bro Code</a><br></br>
        <h5 class="px-4 text-center mt-4">React js: </h5><a class="text-center" href="https://youtube.com/playlist?list=PL0Zuz27SZ-6PrE9srvEn8nbhOOyxnWXfp" alt="..." target="_blank">Davy Gray</a><br></br>
        <h5 class="px-4 text-center mt-4">Node js: </h5><a class=" text-center" href="https://youtube.com/playlist?list=PL0Zuz27SZ-6PFkIxaJ6Xx_X46avTM1aYw" alt="..." target="_blank">Davy Gray</a><br></br>
        <h5 class="px-4 text-center mt-4">Devops: </h5><a class=" text-center" href="https://youtube.com/playlist?list=PLy7NrYWoggjwV7qC4kmgbgtFBsqkrsefG" alt="..." target="_blank">Techworld with Nana</a><br></br>
        <h5 class="px-4 text-center mt-4">Javascript: </h5><a class=" text-center" href="https://youtu.be/BI1o2H9z9fo" alt="..." target="_blank">Traversy Media</a><br></br>
        <h5 class="px-4 text-center mt-4">Flutter: </h5><a class=" text-center" href="https://youtube.com/playlist?list=PL4cUxeGkcC9jLYyp2Aoh6hcWuxFDX6PBJ" alt="..." target="_blank">The Net Ninjas</a><br></br>
        <h5 class="px-4 text-center mt-4">Machine Learning: </h5><a class=" text-center" href="https://youtube.com/playlist?list=PLTDARY42LDV7WGmlzZtY-w9pemyPrKNUZ" alt="..." target="_blank">Krish Naik</a><br></br>  
        <h5 class="px-4 text-center mt-4">Kotlin: </h5><a class=" text-center" href="https://youtube.com/playlist?list=PLVUm4IewkTXqwzuRXZisWg7shMTiQhUtz" alt="..." target="_blank">DonN Felkar</a><br></br>        
        <h5 class="px-4 text-center mt-4">UI/UX: </h5><a class=" text-center" href="https://youtube.com/playlist?list=PLW-zSkCnZ-gBtmXf9AfRbA90GnBv7o2gS" alt="..." target="_blank">GFXmentor</a><br></br>
        <h5 class="px-4 text-center mt-4">Cybersecurity: </h5><a class=" text-center" href="https://youtube.com/playlist?list=PLLKT__MCUeixqHJ1TRqrHsEd6_EdEvo47" alt="..." target="_blank">The Cyber Mentor</a><br></br>                                    
                
         


                   </div>
             </section>

        <section id="data">
           <div className="shadow-lg m-4 p-5">
           <h3 className="text-center">Resume</h3>
           <p class="px-4 text-start mt-4">Resume making is another import tool when it comes to interviews. A simple and informative resume is what is expected of you.
         A resume should not be decorative at all, it should be as simple as possible. The only purpose of a resume is to highlight your skills, projects, work experience
         to the interviewer. A resume should not be overly crowded with unnecessary details.It should contain mainly your educational details, conatct details, skills, projects, work experience etc.
         Making a resume doesn't take much of time, there are various websites available which can be used to make resumes in minutes. 
         Below are links of some resume building websites:                 
         </p>
         <h5 class=" text-center ">Canva: <a class="text-center" href="https://www.canva.com/" alt="..." target="_blank">www.canva.com</a> </h5><br></br>
         <h5 class=" text-center " >Zety: <a class="text-center" href="https://zety.com/blog/best-online-resume-builders" alt="..." target="_blank">www.zety.com</a></h5><br></br>
         <h5 class=" text-center ">Novoresume: <a class="text-center" href="https://novoresume.com/" alt="..." target="_blank">www.novoresume.com</a></h5><br></br>
         <p>An ATS (Applicant Tracking System) friendly resume is crucial for job seekers as it ensures their resume can be parsed and understood by automated systems used by employers. By optimizing their resume with relevant keywords, formatting, and structure, candidates increase their chances of passing through initial screening stages and securing interviews.
          A reference ATS friendly resume has been provided here for your reference. Ensure that your resume is as close to the resume as possible.
         </p>
         <h5>ATS friendly resume: <a href="https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs" target="blank">https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs</a></h5>
           </div>

        </section>     
             <section id="company">
                
                <form className="reg-form m-5 " onSubmit={handlesubmit}>
                    <div>
                        <h4 className="mt-3">write a COMPANY REVIEW!</h4><br></br>
                    
                    </div>
                    
                    <div>
                    <label>Company</label><br></br>
                    <input type="text" className="col-9 text-center" placeholder="Enter your comapny's name" onChange={(e)=>setCompany(e.target.value)} required />
                    </div>
                    <div>
                    <label>Role</label><br></br>
                    <input type="text" className="col-9 text-center" placeholder="Enter your role" onChange={(e)=>setRole(e.target.value)} required />
                    </div>
                    <div>
                    <label>Package</label><br></br>
                    <input type="text" className="col-9 text-center" placeholder="Enter your package (3LPA/8LPA/20LPA)" onChange={(e)=>setPack(e.target.value)} required />
                    </div>
                    <div>
                    <label>Rounds</label><br></br>
                    <input type="text" className="col-9 text-center" placeholder="Enter no. of rounds (1/3/5)" onChange={(e)=>setRounds(e.target.value)} required />
                    </div>
                    <div>
                    <label>difficulty</label><br></br>
                    <input type="text" className="col-9 text-center" placeholder=" Enter the difficulty (easy,medium,hard)" onChange={(e)=>setDifficulty(e.target.value)} required  />
                    </div>
                    <div>
                    <label>details</label><br></br>
                    <input type="textarea" className="col-9 text-center" placeholder="Detailed Review" onChange={(e)=>setDetails(e.target.value)} required/>
                    </div>
                    <br></br>
                    <div>
                    <button type="submit" className="btn btn-success text-center col-9">Add review</button>
                    </div>
                    <br></br>
                </form>

                <br></br>
                <br></br>
                {
                     data.length !=0 ? 
                 <div >
                 <input type="text" className="text-center col-8 p-2" placeholder="search by keywords " onChange={(e)=> setSearch(e.target.value)} /> <FaSearch size="20px"/>
 
                 <h4 className="text-dark">RESPONSES:</h4>
                </div>
                   :
                  <h4> </h4>
            }
                <div>
                {
                   data.filter((val)=>{
                    if(search===""){
                        return val;
                    }else if(val.company.toLowerCase().includes(search.toLowerCase())){
                        return val;
                    }
                   })
                  .map((val,key)=>{
                 return <div class="container-lg details">
                   <div class="card p-4 my-3 shadow-lg">
                   <div class="card-body">
                   <h3 class="text-end text-primary">{val.name}</h3>
                   <h5 class="text-end fw-">{val.rollno}</h5>
                   <h6 className="text-end ">{val.updatedAt}</h6>
                   <h5 class="text-start text-danger">Company: {val.company}</h5>
                   <h5 class="text-start">Role: {val.role}</h5>
                   <h5 class="text-start">Package: {val.pack}</h5>
                   <h5 class="text-start">Rounds: {val.rounds}</h5>
                   <h5 class="text-start">Difficulty: {val.difficulty}</h5>
                
                  <br></br>
                    <h5>{val.details}</h5>
                  <br></br>
                  {val.userid===userid ? <button className="btn " onClick={()=>setBox(!box)} ><FaPen/></button> : <h1></h1>}
                  {val.userid===userid ? <button className="btn " onClick={()=>handledelete(val._id)}><FaTrash/></button> : <h1></h1>}<br></br>
                  {val.userid===userid && box  ? 
                  <form onSubmit={()=>handleupdate(val._id)}>
                    <div>
                    <div>
                    <label>Company</label><br></br>
                    <input type="text" className="col-9 text-center" placeholder="Enter your comapny's name" onChange={(e)=>setCompany(e.target.value)} />
                    </div>
                    <div>
                    <label>Role</label><br></br>
                    <input type="text" className="col-9 text-center" placeholder="Enter your role" onChange={(e)=>setRole(e.target.value)}  />
                    </div>
                    <div>
                    <label>Package</label><br></br>
                    <input type="text" className="col-9 text-center" placeholder="Enter your package (3LPA/8LPA/20LPA)" onChange={(e)=>setPack(e.target.value)}  />
                    </div>
                    <div>
                    <label>Rounds</label><br></br>
                    <input type="text" className="col-9 text-center" placeholder="Enter no. of rounds (1/3/5)" onChange={(e)=>setRounds(e.target.value)}  />
                    </div>
                    <div>
                    <label>difficulty</label><br></br>
                    <input type="text" className="col-9 text-center" placeholder=" Enter the difficulty (easy,medium,hard)" onChange={(e)=>setDifficulty(e.target.value)}  />
                    </div>
                    <div>
                    <label>details</label><br></br>
                    <textarea  rows="10" cols="30" className="col-9 text-center" placeholder="Detailed Review" onChange={(e)=>setDetails(e.target.value)} >
                    </textarea>
                    </div>
                  <button type="submit"  className="btn btn-success"  >Submit</button><button className="btn btn-danger" onClick={()=>setBox(!box)}>Undo</button>
                  </div> 
                  </form>
                  : <h1></h1>}<br></br>
              </div>
              </div>
               </div>
  

    })
  
    }
                </div>

             </section>
               
            </div>
            <Footer/>
        </>
    );
}