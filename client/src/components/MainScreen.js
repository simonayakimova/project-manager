import React, { Component } from 'react';
import '../App.css';
import './MainScreen.css'
import Task from './Task.js'


class MainScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            task: '',
            tasks: [],
            tasksDoing: [],
            tasksDone: [],
            description: '',
            type: "TODO"

        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
        this.onDragStart = this.onDragStart.bind(this)
        this.onDragEnd = this.onDragEnd.bind(this)
        this.onDrop = this.onDrop.bind(this)
        this.allowDrop = this.allowDrop.bind(this)
        this.close = this.close.bind(this)
        this.handleTypeSelection = this.handleTypeSelection.bind(this)
    }

    handleCreate() {
        document.getElementById("modal").style.display = "block"
    }

    close() {
        document.getElementById("modal").style.display = "none"
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
            "id": this.state.id + 1,
            "task": this.state.task,
            "description": this.state.description,
            "type": this.state.type
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
                    let tasksToDo = []
                    let tasksDoing = []
                    let tasksDone = []
                    for (let i = 0; i < task.length; i++) {
                        if (task[i].type === "TODO") {
                            tasksToDo.push(task[i])
                        }
                        if (task[i].type === "DOING") {
                            tasksDoing.push(task[i])
                        }
                        if (task[i].type === "DONE") {
                            tasksDone.push(task[i])
                        }
                    }
                    this.setState({
                        tasks: tasksToDo,
                        tasksDoing: tasksDoing,
                        tasksDone: tasksDone
                    })
                })
    }

    componentDidMount() {

        fetch('/api/getLastId', {
            method: 'get',
        })
            .then(function (response) {
                return response.json()
            })
            .then(task => {
                if (task.length !== 0) {
                    this.setState({ id: task[0].id })

                    // this.setState({ tasks: task })
                } else {
                    this.setState({ id: 0 })
                }
            })


        fetch('/api/getTasks', {
            method: 'get',

        })
            .then(function (response) {
                return response.json()
            })
            .then(task => {
                let tasksToDo = []
                let tasksDoing = []
                let tasksDone = []
                for (let i = 0; i < task.length; i++) {
                    if (task[i].type === "TODO") {
                        tasksToDo.push(task[i])
                    }
                    if (task[i].type === "DOING") {
                        tasksDoing.push(task[i])
                    }
                    if (task[i].type === "DONE") {
                        tasksDone.push(task[i])
                    }
                }
                this.setState({
                    tasks: tasksToDo,
                    tasksDoing: tasksDoing,
                    tasksDone: tasksDone
                })
            })
    }


    handleTypeSelection(event){
        this.setState({
            type: event.target.value
        })
    }

    onDragStart(ev) {

        ev.dataTransfer.setData("id", ev.target.id)
    }

    onDragEnd(ev) {
        console.log()
    }

    onDrop(ev) {

        ev.preventDefault()
        let array = this.state.tasks
        let newArray = this.state.tasksDoing

        for (let i = 0; i < array.length; i++) {
            if (array[i].id == ev.dataTransfer.getData("id")) {
                array[i].type=="DOING"
                newArray.push(array[i])
                

                let newType = {
                    "id": array[i].id,
                    "type" : "DOING"
                }
            
                let endPoint = '/api/editType'
            
                fetch(endPoint, {
                    method: 'put',
                    body: JSON.stringify(newType),
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

                    array.splice(i, 1)
            }
        }

        this.setState({
            tasks: array,
            tasksDoing: newArray
        })
    }

    allowDrop(ev) {
        ev.preventDefault()
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
                                <select value={this.state.type} onChange={this.handleTypeSelection}>
                                    <option value="TODO">To Do</option>
                                    <option value="DOING">Doing</option>
                                    <option value="DONE">Done</option>
                                </select>

                                <input type="submit" value="Submit" />
                            </form>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="todo">
                        <h3>To do: </h3>
                        {this.state.tasks.map(task => {
                            return (<div draggable="true" key={task.id} id={task.id}
                                onDragStart={this.onDragStart}
                                onDragOver={(event) => event.preventDefault()}
                                onDragEnd={this.onDragEnd}
                            >
                                <Task
                                    id={task.id}
                                    title={task.task}
                                    description={task.description} />
                            </div>)

                        })}
                    </div>

                    <div className="doing" onDragOver={this.allowDrop} onDrop={this.onDrop}>
                        <h3>Doing: </h3>
                        {this.state.tasksDoing.map((task =>
                            <div draggable="true" key={task.id} id={task.id}
                                onDragStart={this.onDragStart}
                                onDragOver={(event) => event.preventDefault()}
                                onDragEnd={this.onDragEnd}
                            >
                                <Task
                                    id={task.id}
                                    title={task.task}
                                    description={task.description} />
                            </div>
                        ))}

                    </div>

                    <div className="done">
                        <h3> Done: </h3>

                    </div>
                </div>

            </div>
        )
    }
}

export default MainScreen;