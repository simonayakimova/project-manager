import React, { Component } from 'react'

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
            
        }
    }

    signUp() {
        console.log('this.state', this.state)

        let signUpData = {
            "userEmail": this.state.email,
            "userPassword": this.state.password
        }

        let endPoint = '/api/signUp'

        fetch(endPoint, {
            method: 'post',
            body: JSON.stringify(signUpData),
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(function (response){
            if(response.ok){
                window.location.href = "/customers"
                return response.json()
                
                }
                
                return Promise.reject("Not signed up"); 
                
    
            
        })
    }

    render() {
        return (
            <div className="form-inline">
                <h2>Sign Up</h2>
                <h3>{this.state.email}</h3>
                <h2>{this.state.password}</h2>
                <div className="form-group">
                    <input
                      className="form-control"
                      id="userEmail"
                      type="email"
                      placeholder="email"
                      onChange = {event => this.setState({email: event.target.value})}
                    />
                    <input 
                      className="form-control"
                      id="userPassword"
                      type="password"
                      placeholder="password"
                      onChange = {event => this.setState({password: event.target.value})}
                    />
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => this.signUp()}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
              
        )
    }
}

export default SignUp;