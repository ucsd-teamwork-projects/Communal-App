import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import logo from '../../logo.svg';
import axios from 'axios'

class Navbar extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/user/logout').then(response => {
            console.log(response.data)
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                })
            }
        }).catch(error => {
            console.log('Logout error')
        })
    }

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);

        return (
            <div>
                <nav className="navbar navbar-light bg-light" id="nav-container">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} width="30" height="30" className="d-inline-block align-top mr-2" alt="logo" />
                        MERN Passport
                    </Link>
                    <div className="col-4" >
                        {loggedIn ? (
                            <section className="navbar-section">
                                <Link to="/api/user/logout" className="btn btn-secondary" onClick={this.logout}>
                                    <span className="text-secondary">logout</span></Link>

                            </section>
                        ) : (
                                <section className="navbar-section">
                                    <Link to="/" className="btn btn-link text-secondary">
                                        <span className="text-secondary">home</span>
                                    </Link>
                                    <Link to="/login" className="btn btn-link text-secondary">
                                        <span className="text-secondary">login</span>
                                    </Link>
                                    <Link to="/signup" className="btn btn-link">
                                        <span className="text-secondary">sign up</span>
                                    </Link>
                                </section>
                            )}
                    </div>
                    {/* <div className="col-4 col-mr-auto">
                        <div id="top-filler"></div>
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">MERN Passport</h1>
                    </div> */}
                </nav>
            </div>

        );

    }
}

export default Navbar