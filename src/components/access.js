import React from 'react'
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import {  useState } from 'react';
import axios from 'axios'
import Contact from "./pages/ContactPage"
import Todo from "./pages/Todo"
import Done from "./pages/Done"
import Profile from "./pages/Profile" 
import Create from "./pages/Create"
import Navbar from "./Nav/NavbarLogined"
import Admin from "./admin"




const Access = ()=>{

  const [isAdmin,setisAdmin]= useState(false);

  const TokenLocal = localStorage.getItem("token")

  function  checkAdmin(){
      
    axios
      .post(`https://todo-na-backend.herokuapp.com/api/isAdmin?token=${TokenLocal}`)
      .then((res)=>{
         if(res.data==true){
             setisAdmin(true);
         }
         else{
          console.log("isUser");  
          setisAdmin(false);

         }
      })
    

  }

  React.useEffect(()=>{
    checkAdmin();
  }, []);


    return<div>
      {
        isAdmin ? 
        (
          <Admin/>
        )  
        : 
        (
          <div>
              <Navbar/>
              <Router>
                <Switch>
                  <Route exact path="/" component={() =>  <Profile />} />
                  <Route path="/todo" component={() =>  <Todo />}/>
                  <Route path="/done" component={() =>  <Done />}/>
                  <Route path="/create" component={() =>  <Create />}/>
                  <Route path="/Profile" component={() =>  <Profile />}/>
                  <Route path="/contact" component={() =>  <Contact />}/>
                  <Route path="/signIn" component={() =>  <Profile />}/>
                  <Route  component={() =>  <Todo />}/>
                </Switch> 
              </Router>
          </div>
          
        )
      }
      
    </div>;
}
export default Access;