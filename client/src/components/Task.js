import React, { Component } from 'react';
import "./Task.css"

import {RIEInput} from 'riek'
import _ from 'lodash'

class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
            descriptonPrevious: this.props.description,
            titlePrevious: this.props.title
        }
        this.descriptionChanged = this.descriptionChanged.bind(this)
        this.titleChanged = this.titleChanged.bind(this)
    }

    descriptionChanged(task) {
        this.setState({
            descriptonPrevious: task.description
        })

        let newDescription = {
            "id": this.props.id,
            "description" : task.description
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
            "title" : task.title
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


    render() {

        return (
            <div className="containerTask">
                <h3 className="title">
                    <RIEInput
                        value={this.state.titlePrevious}
                        change={this.titleChanged}
                        propName='title'
                        validate={_.isString} />
                </h3>
            
                <RIEInput
                    value={this.state.descriptonPrevious}
                    change={this.descriptionChanged}
                    propName='description'
                    validate={_.isString} />

            </div>
        )
    }
}

export default Task;