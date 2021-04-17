import React from 'react'
import Login from  "./Login"
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import {  useState } from 'react';
import axios from 'axios'
import Access from "./access"
import Contact from "./pages/ContactPage"
import SignIn from "./signIn"
import Navbar from "./Nav/Navbar"



const Access = ()=>{

  const [isAdmin,setisAdmin]= React.useState(false);

  const TokenLocal = localStorage.getItem("token")

  function  checkAdmin(){
      
    axios
      .post(`https://todo-na-backend.herokuapp.com/api/isAdmin?token=${TokenLocal}`)
      .then((res)=>{
         if(res.data==true){
             setisAdmin(true);
         }
         else{
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
          <Contact/>
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