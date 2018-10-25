import React, { Component } from 'react';
import '../App.css';



class Tasks extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            id: 0,
            Task: ''
        }
    }
 

    componentDidMount(){
        // document.getElementById("toDoTask").disabled = true;
        // document.getElementById("saveTaskButton").style.visibility = "hidden"
        document.getElementById("editTaskButton").style.visibility = "hidden"
    }

    

    editTask() {
        
        console.log("I was clicked")

    }

    saveTask() {
        // document.getElementById("saveTaskButton").style.visibility = "hidden"
        // document.getElementById("toDoTask").disabled = true;
        // document.getElementById("editTaskButton").style.visibility = "visible"
        // document.getElementById("showTasks").innerHTML = this.state.Task
    
        
        document.getElementById("firstTask").style.visibility = "visible"

        let txtVal = document.getElementById("toDoTask").value
        let listNode = document.getElementById("list")
        let liNode = document.createElement("LI")
        let txtNode = document.createTextNode(txtVal)

        liNode.appendChild(txtNode)
        listNode.appendChild(liNode)


        // document.getElementById("firstTask").innerHTML = task
   
         let newTask = {
             "id": this.state.id,
             "Task": this.state.Task
        }

        let endPoint = '/api/tasks'

        fetch(endPoint, {
            method: 'post',
            body: JSON.stringify(newTask),
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(function (response){
            if(response.ok){
                return response.json()
                
                }
                
                return Promise.reject("Invalid Note"); 
            
        })
    }


   render() {
    return (
        <div className="tasks">
        <h3>{this.state.Task}</h3>
        <h2 className="tasks-header">To do:</h2>
        
        <input
        id="toDoTask"
        placeholder="enter your task here"
        onChange = {event => this.setState({Task: event.target.value})}
        ></input>

        <div className="listTasks">
        <ul id="list">
            <li id="firstTask"></li>
        </ul>
        </div>


        <button
        className="button"
        id="saveTaskButton"
        type="button"
        onClick={() => this.saveTask()}
        >Add Task</button>

        <button
        className="button"
        id="editTaskButton"
        type="button"
        onClick={() => this.editTask()}
        >Edit Task</button>

        </div>
    ) 
   }

    
}



export default Tasks;