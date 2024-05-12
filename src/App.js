import './App.css';
import {Navbar} from './components/nav.js'
import {Home} from './components/home.js'
import {Second} from './components/second.js'
import {Third} from './components/third.js'
import {Fourth} from './components/fourth.js'
import {Placement} from './components/place.js'
import {Alumni} from './components/alumni.js' 
import {Error} from './components/error.js'
import {Login} from './components/login.js'
import {Register} from './components/register.js'
import { Admin } from './components/admin.js';
import { Footer } from './components/footer.js';
import {Toaster} from 'react-hot-toast';
import {Profile} from './components/profile.js'
import { createContext,useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Adminlogin } from './components/admin-login.js';


export const store=createContext();

function App() {
  const[token,setToken]=useState(null);
  
  useEffect(()=>{
     const item=localStorage.getItem("token");
     
     setToken(item); 
    
       

  },[]);
  return (
       <div className="App">
       <store.Provider value={[token,setToken]}>
       <Router>
           
        <Routes>
           
           <Route path='/' element={<Login/>}></Route>
           <Route path='/register' element={<Register/>}></Route>
           <Route path='/home' element={<Home/>}></Route>
           <Route path='/admin-login' element={<Adminlogin/>}></Route>
           <Route path='/second' element={<Second/>}></Route>
           <Route path='/admin' element={<Admin/>}></Route>
           <Route path='/third' element={<Third/>}></Route>
           <Route path='/fourth' element={<Fourth/>}></Route>
           <Route path='/placement' element={<Placement/>}></Route>
           <Route path='/profile' element={<Profile/>}></Route>
           <Route path='/alumni' element={<Alumni/>}></Route>
           <Route path='/*' element={<Error/>}></Route>
        
        </Routes>
            <Toaster position="bottom-center"/>
       </Router>
       </store.Provider>
       </div>
  );
}

export default App;
