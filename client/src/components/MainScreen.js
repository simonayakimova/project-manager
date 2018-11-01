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
            type: "TODO",
            assignedTo: 'Mark',
            project: 'myProject',
            createdAt: new Date,
            selectedProject: 'myProject'
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
        this.onDragStart = this.onDragStart.bind(this)
        this.onDrop = this.onDrop.bind(this)
        this.onDropDone = this.onDropDone.bind(this)
        this.allowDropDone = this.allowDropDone.bind(this)
        this.allowDrop = this.allowDrop.bind(this)
        this.close = this.close.bind(this)
        this.handleTypeSelection = this.handleTypeSelection.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.assign = this.assign.bind(this)
        this.projectSelect = this.projectSelect.bind(this)
        this.toggleProject = this.toggleProject.bind(this)
        this.change = this.change.bind(this)
    }

    change(event) {
        event.preventDefault()
        console.log(this.state.selectedProject)

        if(this.state.selectedProject == "myProject") {
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
                        // if ((task[i].project === "myProject") && (this.state.selectedProject === "myProject")) {
                        // if(this.state.selectedProject == "myProject" && task[i].project == "myProject"){
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
                    // }
                    this.setState({
                        tasks: tasksToDo,
                        tasksDoing: tasksDoing,
                        tasksDone: tasksDone
                    })
                })
        

         } else {
             console.log(2)
             fetch('/api/getTasksSecond', {
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
                        // if ((task[i].project === "myProject") && (this.state.selectedProject === "myProject")) {
                        // if(this.state.selectedProject == "myProject" && task[i].project == "myProject"){
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
                    // }
                    this.setState({
                        tasks: tasksToDo,
                        tasksDoing: tasksDoing,
                        tasksDone: tasksDone
                    })
                })
        
         }
    }

    handleCreate() {
        document.getElementById("modal").style.display = "block"
    }

    close() {
        document.getElementById("modal").style.display = "none"
    }

    assign(event) {
        this.setState({
            assignedTo: event.target.value
        })

    }

    projectSelect(event) {
        this.setState({
            project: event.target.value

        })
        console.log(this.state.project)

    }

    toggleProject(event) {
        this.setState({
            selectedProject: event.target.value
        })
         console.log(this.state.selectedProject)

         
    }

    handleSubmit(ev) {

        ev.preventDefault()
        document.getElementById("modal").style.display = "none"
        const date = new Date

        this.setState({
            task: ' ',
            id: this.state.id + 1,
            description: ' ',
            assignedTo: '',
            createdAt: date
        })


        let newTask = {
            "id": this.state.id + 1,
            "task": this.state.task,
            "description": this.state.description,
            "type": this.state.type,
            "assignedTo": this.state.assignedTo,
            "project": this.state.project,
            "createdAt": this.state.createdAt
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

        // if (this.state.selectedProject == "myProject") {
            // fetch('/api/getTasks', {
            //     method: 'get',

            // })
            //     .then(function (response) {
            //         return response.json()
            //     })
            //     .then(task => {
            //         let tasksToDo = []
            //         let tasksDoing = []
            //         let tasksDone = []
            //         for (let i = 0; i < task.length; i++) {
            //             // if ((task[i].project === "myProject") && (this.state.selectedProject === "myProject")) {
            //             // if(this.state.selectedProject == "myProject" && task[i].project == "myProject"){
            //             if (task[i].type === "TODO") {
            //                 tasksToDo.push(task[i])
            //             }
            //             if (task[i].type === "DOING") {
            //                 tasksDoing.push(task[i])
            //             }
            //             if (task[i].type === "DONE") {
            //                 tasksDone.push(task[i])
            //             }
            //         }
            //         // }
            //         this.setState({
            //             tasks: tasksToDo,
            //             tasksDoing: tasksDoing,
            //             tasksDone: tasksDone
            //         })
            //     })

            fetch('/api/getTasksSecond', {
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
                        // if ((task[i].project === "myProject") && (this.state.selectedProject === "myProject")) {
                        // if(this.state.selectedProject == "myProject" && task[i].project == "myProject"){
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
                    // }
                    this.setState({
                        tasks: tasksToDo,
                        tasksDoing: tasksDoing,
                        tasksDone: tasksDone
                    })
                })
        
         }
        
     

    componentDidMount() {

        console.log(this.state.selectedProject)
        console.log(new Date)

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

        //     if()

        // fetch('/api/getTasks', {
        //     method: 'get',

        // })
        //     .then(function (response) {
        //         return response.json()
        //     })
        //     .then(task => {
        //         let tasksToDo = []
        //         let tasksDoing = []
        //         let tasksDone = []
        //         for (let i = 0; i < task.length; i++) {
        //             if (task[i].type === "TODO") {
        //                 tasksToDo.push(task[i])
        //             }
        //             if (task[i].type === "DOING") {
        //                 tasksDoing.push(task[i])
        //             }
        //             if (task[i].type === "DONE") {
        //                 tasksDone.push(task[i])
        //             }
        //         }
        //         this.setState({
        //             tasks: tasksToDo,
        //             tasksDoing: tasksDoing,
        //             tasksDone: tasksDone
        //         })
        //     })
        if(this.state.selectedProject == "myProject") {
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
                        // if ((task[i].project === "myProject") && (this.state.selectedProject === "myProject")) {
                        // if(this.state.selectedProject == "myProject" && task[i].project == "myProject"){
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
                    // }
                    this.setState({
                        tasks: tasksToDo,
                        tasksDoing: tasksDoing,
                        tasksDone: tasksDone
                    })
                })
        

         } else {
             console.log(2)
             fetch('/api/getTasksSecond', {
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
                        // if ((task[i].project === "myProject") && (this.state.selectedProject === "myProject")) {
                        // if(this.state.selectedProject == "myProject" && task[i].project == "myProject"){
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
                    // }
                    this.setState({
                        tasks: tasksToDo,
                        tasksDoing: tasksDoing,
                        tasksDone: tasksDone
                    })
                })
        
         }


    }


    handleTypeSelection(event) {
        this.setState({
            type: event.target.value
        })
    }

    onDragStart(ev) {
        ev.dataTransfer.setData("id", ev.target.id)
    }

    onDrop(ev) {

        ev.preventDefault()
        let array = this.state.tasks
        let newArray = this.state.tasksDoing

        for (let i = 0; i < array.length; i++) {
            if (array[i].id == ev.dataTransfer.getData("id")) {
                array[i].type == "DOING"
                newArray.push(array[i])

                let newType = {
                    "id": array[i].id,
                    "type": "DOING"
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

    onDropDone(ev) {

        ev.preventDefault()
        let array = this.state.tasksDoing
        let newArray = this.state.tasksDone

        for (let i = 0; i < array.length; i++) {
            if (array[i].id == ev.dataTransfer.getData("id")) {
                array[i].type == "DONE"
                newArray.push(array[i])


                let newType = {
                    "id": array[i].id,
                    "type": "DONE"
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
            tasksDoing: array,
            tasksDone: newArray
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

    allowDropDone(ev) {
        ev.preventDefault()
    }

    handleDelete(id) {
        let array = this.state.tasksDone
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                array.splice(i, 1)
                this.setState({
                    tasksDone: array
                })
            }
        }
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
                                <select value={this.state.project} onChange={this.projectSelect}>
                                    <option value="myProject">My Project</option>
                                    <option value="mySecondProject">My second project</option>
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
                                    value={this.state.description}
                                    id="taskDescription"
                                    placeholder="Add a task description"
                                    onChange={event => this.setState({ description: event.target.value })}
                                ></textarea><br></br>
                                <label>Type: </label>
                                <select value={this.state.type} onChange={this.handleTypeSelection}>
                                    <option value="TODO">To Do</option>
                                    <option value="DOING">Doing</option>
                                    <option value="DONE">Done</option>
                                </select><br></br>
                                <label>Assign to: </label>
                                <select value={this.state.assignedTo} onChange={this.assign}>
                                    <option disabled> Select someone</option>
                                    <option value="Mike">Mike</option>
                                    <option value="Tim">Tim</option>
                                    <option value="John">John</option>
                                </select><br></br>

                                <input type="submit" value="Submit" />
                            </form>
                        </div>
                    </div>
                </div>

                <div className="projectSelect" onSubmit={this.change}>
                <form>
                    <label className="selectLabel">Select a project:</label>
                    <select value={this.state.selectedProject} onChange={this.toggleProject}>
                    <option disabled>Please select a project</option>
                        <option value="myProject">My Project</option>
                        <option value="mySecondProject">My Second Project</option>
                    </select><br></br>
                    <input type="submit" value="Change Project" />
                    </form>
                </div>

                <div className="container">

                    <div className="todo">
                        <h3>To do: {this.state.tasks.length}</h3>
                        {this.state.tasks.map(task => {
                            return (<div draggable="true" key={task.id} id={task.id}
                                onDragStart={this.onDragStart}
                                onDragOver={(event) => event.preventDefault()}
                                onDragEnd={this.onDragEnd}
                            >
                                <Task
                                    id={task.id}
                                    title={task.task}
                                    description={task.description}
                                    assignedTo={task.assignedTo}
                                />
                            </div>)

                        })}
                    </div>

                    <div className="doing" onDragOver={this.allowDrop} onDrop={this.onDrop}>
                        <h3>Doing: {this.state.tasksDoing.length}</h3>
                        {this.state.tasksDoing.map((task =>
                            <div draggable="true" key={task.id} id={task.id}
                                onDragStart={this.onDragStart}
                                onDragOver={(event) => event.preventDefault()}
                                onDragEnd={this.onDragEnd}
                            >
                                <Task
                                    id={task.id}
                                    title={task.task}
                                    description={task.description}
                                    assignedTo={task.assignedTo}
                                />
                            </div>
                        ))}

                    </div>

                    <div className="done" onDragOver={this.allowDropDone} onDrop={this.onDropDone}>
                        <h3> Done: {this.state.tasksDone.length}</h3>
                        {this.state.tasksDone.map((task =>
                            <div draggable="true" key={task.id} id={task.id}
                                onDragStart={this.onDragStart}
                                onDragOver={(event) => event.preventDefault()}
                                onDragEnd={this.onDragEnd}
                            >
                                <Task
                                    handleDelete={this.handleDelete}
                                    type={task.type}
                                    id={task.id}
                                    title={task.task}
                                    description={task.description}
                                    assignedTo={task.assignedTo}
                                />
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        )
    }
}

export default MainScreen;