// ADD a blocked symbol to tasks + ability to assign it



import React, { Component } from 'react';
import "./Task.css"


import { RIEInput } from 'riek'
import _ from 'lodash'

class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
            descriptonPrevious: this.props.description,
            titlePrevious: this.props.title,
            assignedToPrevious: this.props.assignedTo,
            project: this.props.project,
            comments: this.props.comments,
            complexity: this.props.complexity,
            isBlocked: this.props.isBlocked
        }

        this.descriptionChanged = this.descriptionChanged.bind(this)
        this.titleChanged = this.titleChanged.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.addMore = this.addMore.bind(this)
        this.blocked = this.blocked.bind(this)


    }

    componentDidMount() {
        console.log(this.state)
    }


    blocked(ev) {
        ev.preventDefault()

        document.getElementById("modalMore").style.display = "none"


        this.setState({
            isBlocked: true
        })

        console.log(this.state.isBlocked)
        let addBlocker = {
            "id": this.props.id,
            "isBlocked": this.state.isBlocked
        }

        console.log(addBlocker.id)
        console.log(addBlocker.isBlocked)

        let endPoint = '/api/addBlocker'

        fetch(endPoint, {
            method: 'put',
            body: JSON.stringify(addBlocker),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json()
                }
                return Promise.reject("Invalid");
            })

        


    }

    // not working
    addMore(ev) {

        console.log(this.state.comments)

        ev.preventDefault()

        document.getElementById("modalMore").style.display = "none"
        // this.setState({
        //     comments: task.comments
        // })
        let newComment = {
            "id": this.props.id,
            "comments": this.state.comments
        }

        console.log(newComment.comments)
        console.log(newComment.id)

        let endPoint = '/api/addComments'

        fetch(endPoint, {
            method: 'put',
            body: JSON.stringify(newComment),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json()
                }
                return Promise.reject("Invalid");
            })

    }

    descriptionChanged(task) {
        this.setState({
            descriptonPrevious: task.description
        })

        let newDescription = {
            "id": this.props.id,
            "description": task.description
        }

        let endPoint = '/api/editDescription'

        fetch(endPoint, {
            method: 'put',
            body: JSON.stringify(newDescription),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json()
                }
                return Promise.reject("Invalid");
            })
    }

    titleChanged(task) {
        this.setState({
            titlePrevious: task.title
        })

        let newTitle = {
            "id": this.props.id,
            "title": task.title
        }

        let endPoint = '/api/editTitle'

        fetch(endPoint, {
            method: 'put',
            body: JSON.stringify(newTitle),
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
    }

    handleDelete() {

        this.props.handleDelete(this.props.id)

        let deleteTask = {
            "id": this.props.id,
        }

        let endPoint = '/api/deleteDone'

        fetch(endPoint, {
            method: 'delete',
            body: JSON.stringify(deleteTask),
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


    }

    handleMore() {
        document.getElementById("modalMore").style.display = "block"

    }
    close() {
        document.getElementById("modalMore").style.display = "none"
    }

    render() {
        if (this.props.type === "DONE") {
            return (
                <div className="containerTask">

                    <button className="deleteButt" onClick={this.handleDelete}>x</button>

                    <h3 className="title">
                        <RIEInput
                            value={this.state.titlePrevious}
                            change={this.titleChanged}
                            propName='title'
                            validate={_.isString} />
                    </h3>

                    Description: <RIEInput
                        value={this.state.descriptonPrevious}
                        change={this.descriptionChanged}
                        propName='description'
                        validate={_.isString} />
                    <br></br>

                    {/* Assigned to: <RIEInput
                        value={this.state.assignedToPrevious}
                        change={this.assignedToChanged}
                        propName="assignedTo"
                        validate={_.isString}
                    /> */}

                    Assigned to: {this.props.assignedTo}

                    <i className="complexity">{this.props.complexity}</i>

                    <div>

                        <div className="createTaskDiv">
                            <button id="moreBtn" onClick={this.handleMore}>More</button>
                            <div className="popUpForm" id="modalMore">
                                <div className="modal-content">
                                    <form onSubmit={this.addMore}>
                                        <label>Comments: </label>
                                        <textarea
                                            value={this.state.comments}
                                            id="comments"
                                            placeholder="enter comments"
                                            onChange={event => this.setState({ comments: event.target.value })}
                                        ></textarea><br></br>
                                        <input type="submit" value="Add" />
                                    </form>
                                    <form>
                                        <label>Blocked:</label>
                                        <input type="submit" value="Block" onClick={this.blocked} />
                                    </form>
                                    <span className="close" onClick={this.close}>&times;</span>
                                </div>
                            </div>


                        </div>
                    </div>


                </div>
            )
        }


        return (
            <div className="containerTask">


                <h3 className="title">
                    <RIEInput
                        value={this.state.titlePrevious}
                        change={this.titleChanged}
                        propName='title'
                        validate={_.isString} />
                </h3>

                Description: <RIEInput
                    value={this.state.descriptonPrevious}
                    change={this.descriptionChanged}
                    propName='description'
                    validate={_.isString} /><br></br>

                {/* Assigned to: <RIEInput
                    value={this.state.assignedToPrevious}
                    change={this.assignedToChanged}
                    propName="assignedTo"
                    validate={_.isString} /> */}

                Assigned to: {this.props.assignedTo}

                <i className="complexity">{this.props.complexity}</i>


                <div>

                    <div className="createTaskDiv">
                        <button id="moreBtn" onClick={this.handleMore}>More</button>
                        <div className="popUpForm" id="modalMore">
                            <div className="modal-content">
                                <form onSubmit={this.addMore}>
                                    <label>Comments: </label>
                                    <textarea
                                        value={this.state.comments}
                                        id="comments"
                                        placeholder="enter comments"
                                        onChange={event => this.setState({ comments: event.target.value })}
                                    ></textarea>
                                </form>
                                <form>
                                    <label>Blocked:</label>
                                    <input type="submit" value="Block" onClick={this.blocked} />
                                </form>
                                <span className="close" onClick={this.close}>&times;</span>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        )
    }
}

export default Task;