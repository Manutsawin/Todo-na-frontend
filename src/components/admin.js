import React from 'react'
import axios from 'axios'


const Admin = ()=>{

    const TokenLocal = localStorage.getItem("token")
    React.useEffect(()=>{
        fetchTask(); 
    }, []);

    function  fetchTask(){
        console.log("111")
        axios
            .get(`https://todo-na-backend.herokuapp.com/api/TaskAdmin?token=${TokenLocal}&isFinished=false`)
            .then((res)=>{
                
                console.log("5555")
                console.log(res.data)
                
            });
    }
    
    return <div>
       
       <h1>Admin</h1>
      
       
    </div>;
    
}
export default Admin;