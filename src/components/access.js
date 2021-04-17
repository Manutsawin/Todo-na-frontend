import React from 'react'
import Todo from "./pages/Todo"
import Done from "./pages/Done"
import Profile from "./pages/Profile" 
import Create from "./pages/Create"
import Contact from "./pages/ContactPage"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./Nav/NavbarLogined" 


const Access = ()=>{

  const [Session,setSession] = useState({
    isAdmin : false ,
  });

  const TokenLocal = localStorage.getItem("token")

  function  checkAdmin(){
      
    axios
      .post(`https://todo-na-backend.herokuapp.com/api/isAdmin?token=${TokenLocal}`)
      .then((res)=>{
         if(res.data==true)
         {
          setSession ({
            isAdmin : true
          })
         }
         else{
          localStorage.setItem("isLogined",false) 
          setSession ({
            isAdmin : false
          })
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