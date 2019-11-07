import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

export default class LoginForm extends Component {
    state = {
        username: '',
        password: '',
        redirectTo: null
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log('handleSubmit')

        axios.post('/api/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    })
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/'
                    })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
                
            })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div className="col-4 mx-auto mt-5">
                    <form>
                        <h4>Login</h4>
                        <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input className="form-control"
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                        </div>
                        <div className="form-group">
                                <label htmlFor="password">Password: </label>
                                <input className="form-control"
                                    placeholder="password"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                        </div>
                            <button
                                className="btn btn-primary"                            
                                onClick={this.handleSubmit}
                                type="submit">Login</button>
                    </form>
                </div>
            )
        }
    }
}