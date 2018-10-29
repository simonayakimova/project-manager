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
            assignedToPrevious: this.props.assignedTo

        }

        this.descriptionChanged = this.descriptionChanged.bind(this)
        this.titleChanged = this.titleChanged.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    

    }

    componentDidMount() {
        console.log(this.state)
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
                return Promise.reject("Invalid Note");
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

            </div>
        )
    }
}

export default Task;