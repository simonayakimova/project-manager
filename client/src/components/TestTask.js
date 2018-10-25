import React, { Component } from 'react';
import '../App.css';

import './TestTask.css'
import { WSASERVICE_NOT_FOUND } from 'constants';
import { CLIENT_RENEG_WINDOW } from 'tls';




class TestTask extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            task: '',
            tasks: [],
            description: ''

        }
        this.handleSubmit = this.handleSubmit.bind(this)
        // this.check = this.check.bind(this)
        this.edit = this.edit.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
        this.close = this.close.bind(this)
        this.moveToDoing = this.moveToDoing.bind(this)
        this.editBox = this.editBox.bind(this)
        this.saveEdit = this.saveEdit.bind(this)
    }

    handleCreate() {
        console.log("I was clicked")
        document.getElementById("modal").style.display = "block"
    }

    close() {
        document.getElementById("modal").style.display = "none"

    }

    editBox() {
        var editBox = document.getElementById("editBox")
        editBox.style.visibility = "hidden";
        // document.getElementById('taskToDo').addClassName('editable');
        // document.getElementById('toDoText').setAttribute('contenteditable', 'true');
        // document.getElementById('saveEdit').style.visibility = "visible";
        document.getElementById("taskToDo").contentEditable = true;



    }

    saveEdit() {

        document.getElementById("taskToDo").contentEditable = false

        this.setState({
            task: document.getElementById("createTask").value,
            id: this.state.id + 1,
            description: ''
        })

        console.log(this.state)

        let newTask = {
            "id": '',
            // "author": this.state.currentUser,
            "task": document.getElementById("createTask").value,
            "description": this.state.description

        }
        console.log(newTask)

        let endPoint = "/api/editTasks";

        fetch(endPoint, {
            method: 'put',
            body: JSON.stringify(newTask),
            headers: {
                'Content-Type': 'application/json'
            }
        })

            .then(function (response) {
                if (response.ok) {
                    return response.json()

                }

                return Promise.reject("Invalid Note");

            })

            .then(function () {
                fetch('/api/getTasks', {
                    method: 'get',

                })
                    .then(function (response) {
                        return response.json()
                    })
                // .then(task => {
                //     this.setState({ tasks: task })

                // })

            })

    }

    edit() {
        document.getElementById("toDoText").disabled = false;
        document.getElementById("myMoveDoingButton").style.display = "block"
    }

    moveToDoing() {
        document.getElementById("toDoText").style.visibility = "hidden"
        document.getElementById("myMoveDoingButton").style.display = "hidden"
        document.getElementById("toDoText")

    }

    handleSubmit(ev) {
        ev.preventDefault()
        document.getElementById("modal").style.display = "none"

        this.setState({
            task: ' ',
            id: this.state.id + 1,
            description: ''
        })


        let newTask = {
            "id": this.state.id,
            // "author": this.state.currentUser,
            "task": this.state.task,
            "description": this.state.description

        }

        let endPoint = '/api/tasks'

        fetch(endPoint, {
            method: 'post',
            body: JSON.stringify(newTask),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json()

                }

                return Promise.reject("Invalid Note");

            })

        fetch('/api/getTasks', {
            method: 'get',

        })
            .then(function (response) {
                return response.json()
            })
            .then(task => {
                this.setState({ tasks: task })

            })



    }


    componentDidMount() {



        fetch('/api/getTasks', {
            method: 'get',

        })
            .then(function (response) {
                return response.json()
            })
            .then(task => {
                this.setState({ tasks: task })
                console.log(this.state.tasks)
            })
    }


    render() {

        return (
            <div className="entirePage">
                <div className="createTaskDiv">
                    <button id="myCreateBtn" onClick={this.handleCreate}>Create Task</button>
                    <div className="popUpForm" id="modal">
                        <div className="modal-content">
                            <span className="close" onClick={this.close}>&times;</span>
                            <form onSubmit={this.handleSubmit}>
                                <label htmlFor="myProject"> Project name: </label>
                                <select>
                                    <option value="myProject">My Project</option>
                                </select><br></br>
                                <label htmlFor="createTask">Task: </label>
                                <textarea
                                    value={this.state.task}
                                    id="createTask"
                                    placeholder="Create task"
                                    onChange={event => this.setState({ task: event.target.value })}
                                /><br></br>
                                <label> Description: </label>
                                <textarea
                                    id="taskDescription"
                                    placeholder="Add a task description"
                                    onChange={event => this.setState({ description: event.target.value })}
                                ></textarea>

                                <input type="submit" value="Submit" />
                            </form>
                        </div>
                    </div>
                </div>

                <div className="container">

                    <div className="todo">
                        <h3>To do: </h3>
                        {this.state.tasks.map(((task, description, id) =>
                            <div className="taskToDo" id="taskToDo" >
                                <span className="editBox" id="editBox" onClick={this.editBox}>edit</span>
                                <span className="saveEdit" id="saveEdit" onClick={this.saveEdit}>save</span>
                                {/* <input type="checkbox" id="checkbox" onChange={this.check}/> */}

                                <li
                                    data-id={id}
                                    key={id}
                                    // draggable='true'
                                    // onDragEnd={this.dragEnd.bind(this)}
                                    // onDragStart={this.dragStart.bind(this)}
                                    id="toDoText"
                                    onChange={event => this.setState({ task: event.target.value })}
                                    onClick={this.edit}
                                >{task.task}<br></br>
                                    Description: {task.description}</li>
                                <button className="myButtons" id="myMoveDoingButton" onClick={this.moveToDoing}>Move to doing</button>
                                <button className="myButtons" id="myMoveDoneButton">Move to done</button>
                            </div>

                        ))}
                    </div>

                    <div className="doing">
                        <h3>Doing: </h3>

                    </div>

                    <div className="done">
                        <h3> Done: </h3>

                    </div>
                </div>

            </div>



        )
    }


}



export default TestTask;