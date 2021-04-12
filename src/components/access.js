import React from 'react'
import Todo from "./pages/Todo"
import Done from "./pages/Done"
import Profile from "./pages/Profile" 
import Create from "./pages/Create"
import Contact from "./pages/ContactPage"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./Nav/NavbarLogined" 


const Access = ()=>{
    return<div>
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
    </div>;
}
export default Access;