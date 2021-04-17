import React from 'react'
import axios from 'axios'
import "./style/Todo.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle,faTrash,faPencilAlt,faCheckSquare,faTimes,faFile} from '@fortawesome/free-solid-svg-icons'


const iconCheck = <FontAwesomeIcon size="2x" color="green" icon={faCheckCircle} />
const iconTrash = <FontAwesomeIcon size="2x" color="grey" icon={faTrash} />
const iconEdit = <FontAwesomeIcon size="2x" color="orange" icon={faPencilAlt} />
const iconSave = <FontAwesomeIcon size="3x" color="green" icon={faCheckSquare} />
const iconCancel = <FontAwesomeIcon size="3x" color="red" icon={faTimes} />
const iconTask = <FontAwesomeIcon size="7x" color="grey" icon={faFile} />

const AllUser = ()=>{

    const [allUser,setAllUser] = React.useState([]);
    const TokenLocal = localStorage.getItem("token")
    
    const [empty,setEmpty]= React.useState(false);

    const [edit, setEdit] = React.useState(false);
    
    const [editData,setEditData] = React.useState({
        ID:"",
        Name : "" ,
        Role : ""
    });
    
    
    React.useEffect(()=>{
        fetchTask(); 
    }, []);

    function fetchTask(){
        getTaskFalse();

    }
    
    function  getTaskFalse(){
        axios
            .get(`https://todo-na-backend.herokuapp.com/api//TaskUser?token=${TokenLocal}`)
            .then((res)=>{
                
                if(res.data=="")
                {
                    setEmpty(true)
                }
                console.log(res.data)
                setAllUser(res.data)
                
                
            });
    }


    function  onUpdate(id,isFinished){
        axios.put(`https://todo-na-backend.herokuapp.com/api/task?token=${TokenLocal}&id=${id}`,{
            isFinished : isFinished,
        }).then(()=>{
            fetchTask();
        })
    }

    function  onUpdateData(id,Name,Time){
        axios.put(`https://todo-na-backend.herokuapp.com/api/task?token=${TokenLocal}&id=${id}`,{
            taskName : Name,
            time : Time
        }).then(()=>{
            
            fetchTask();
        })
    }

    function onDelete(id){
        axios.delete(`https://todo-na-backend.herokuapp.com/api/task?token=${TokenLocal}&id=${id}`)
        .then(()=>{
            fetchTask();
        });
    }
    
    return <div>
       
        <div>



            <ul className="mt-lg-5">


                {
                    edit ?
                        (
                            <div>
                                <center>

                                    <h1 className="mb-md-5" style={{ fontFamily: "Nunito" }}  >Edit</h1>

                                </center>

                                <center>
                                    <div className="col-md-6">
                                        <div className="Card mb-sm-2" >
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <input type="User" className="form-control" placeholder="Enter User" value={editData.Name} onChange={(e) => {
                                                            setEditData({
                                                                ID: editData.ID,
                                                                Name: e.target.value,
                                                                Role: editData.Role
                                                            });
                                                        }} />
                                                    </div>
                                                    <div className="row">
                                                        <input className="form-control" value={editData.Role} type="time" onChange={(e) => {
                                                            setEditData({
                                                                ID: editData.ID,
                                                                Name: editData.Name,
                                                                Role: e.target.value
                                                            });
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="row">
                                                        <div className="col-sm-6" >

                                                        </div>
                                                        <div className="col-sm-2 mr-md-2 ml-md-2" >
                                                            <div align="right" className="buttonGrey" onClick={() => {
                                                                onUpdateData(editData.ID, editData.Name, editData.Role)
                                                                setEdit(false)
                                                            }}>{iconSave}</div>
                                                        </div>
                                                        <div className="col-sm-2 mr-md-2 ml-md-2" >
                                                            <div align="right" className="buttonGrey" onClick={() => setEdit(false)}>{iconCancel}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>



                                        </div>
                                    </div>
                                </center>
                            </div>
                        )
                        :
                        (
                            <div>
                                <center>

                                    <h1 className="mb-md-5" style={{ fontFamily: "Nunito" }}  >Admin edit all User</h1>
                                    {
                                        empty ?
                                            (
                                                <div>
                                                    {iconTask}
                                                    <h4 className="mt-md-5">All tasks completed!</h4>
                                                    <h6 style={{ color: "grey", }}>You can create new tasks</h6>

                                                </div>


                                            )
                                            :
                                            (
                                                <h1></h1>
                                            )
                                    }


                                </center>

                                {allUser.map((task) => (
                                    <center>
                                        <div className="col-md-6">
                                            <div className="Card mb-sm-2" >
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <span style={{ fontFamily: "Prompt" }} >Name : {task.Name} </span>
                                                        </div>
                                                        <div className="row">
                                                            <span style={{ fontFamily: "Prompt" }} >UserID : {task.UserID} </span>
                                                        </div>
                                                        <div className="row">
                                                            <span style={{ fontFamily: "Prompt" }} >Role : {task.Role} </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="row">
                                                            <div className="col-sm-6" >

                                                            </div>
                                                            <div className="col-sm-2" >
                                                                <div align="right" className="buttonGrey" onClick={() => onUpdate(task._id, true)}> {iconCheck}</div>
                                                            </div>
                                                            <div className="col-sm-2" >
                                                                <div align="right" className="buttonGrey" onClick={() => {
                                                                    setEdit(true);
                                                                    setEditData({
                                                                        ID: task._id,
                                                                        Name: task.Name,
                                                                        Role: task.Role
                                                                    });

                                                                }}> {iconEdit}</div>
                                                            </div>
                                                            <div className="col-sm-2" >
                                                                <div align="right" className="buttonGrey" onClick={() => onDelete(task._id)}>{iconTrash}</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </center>

                                ))}
                            </div>
                        )
                }
            </ul>
        </div>


        
      
       
    </div>;
    
}
export default AllUser;