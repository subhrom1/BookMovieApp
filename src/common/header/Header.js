import React, { Component } from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import LoginRegisterModal from '../../screens/modals/LoginRegisterModal';


class Header extends Component {

       constructor() {
        super();
       this.state = {
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            modalIsOpen: false,
            value: 0,
            req:"req",
            username: "",
            loginPassword: "",
            firstname: "",
            lastname: "",
            email: "",
            registerPassword: "",
            contact: "",
            registrationSuccess: false,
            inputFirstNameChangeHandler:this.inputFirstNameChangeHandler,
            inputLastNameChangeHandler:this.inputLastNameChangeHandler,
            inputEmailChangeHandler:this.inputEmailChangeHandler,
            inputRegisterPasswordChangeHandler:this.inputRegisterPasswordChangeHandler,
            inputContactChangeHandler:this.inputContactChangeHandler,
            logoutHandler:this.logoutHandler,
            inputUsernameChangeHandler:this.inputUsernameChangeHandler,
            inputLoginPasswordChangeHandler:this.inputLoginPasswordChangeHandler,
            openModalHandler:this.openModalHandler,
            closeModalHandler:this.closeModalHandler,
            tabChangeHandler:this.tabChangeHandler,
            loginClickHandler:this.loginClickHandler,
            registerClickHandler:this.registerClickHandler 
    };
}

   

    render() {
        return (
            <div>
                <header className="header">
                    <img src={logo} className="logo" alt="Movies App Logo" />
                    {!this.state.loggedIn ?
                        <div className="login-logout">
                            <Button variant="contained" color="default" onClick={this.openModalHandler}>
                                Login
                            </Button>
                        </div>
                        :
                        <div className="login-logout">
                            <Button variant="contained" color="default" onClick={this.logoutHandler}>
                                Logout
                            </Button>
                        </div>
                    }
                    {this.props.showBookShowButton === "true" && !this.state.loggedIn
                        ? <div className="bookshow">
                            <Button variant="contained" color="primary" onClick={this.openModalHandler}>
                                Book Show
                            </Button>
                        </div>
                        : ""
                    }

                    {this.props.showBookShowButton === "true" && this.state.loggedIn
                        ? <div className="bookshow-button">
                            <Link to={"/bookshow/" + this.props.id}>
                                <Button variant="contained" color="primary">
                                    Book Show
                                </Button>
                            </Link>
                        </div>
                        : ""
                    }

                </header>

                <LoginRegisterModal model = {this.state} />
               
            </div>
        )
    }

    inputFirstNameChangeHandler = (e) => {
        this.setState({ firstname: e.target.value });
    }

    inputLastNameChangeHandler = (e) => {
        this.setState({ lastname: e.target.value });
    }

    inputEmailChangeHandler = (e) => {
        this.setState({ email: e.target.value });
    }

    inputRegisterPasswordChangeHandler = (e) => {
        this.setState({ registerPassword: e.target.value });
    }

    inputContactChangeHandler = (e) => {
        this.setState({ contact: e.target.value });
    }

    logoutHandler = (e) => {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");

        this.setState({
            loggedIn: false
        });
    }


    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    inputLoginPasswordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
    }

    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            req: "req",
            username: "",
            loginPassword: "",
            firstname: "",
            lastname: "",
            email: "",
            registerPassword: "",
            contact: ""
        });
    }

    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
    }

    tabChangeHandler = (event, value) => {
        this.setState({ value });
    }

    loginClickHandler = () => {
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : this.setState({ loginPasswordRequired: "dispNone" });

        let dataLogin = null;
        let xhrLogin = new XMLHttpRequest();
        let that = this;

        let headers = {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*',
            "Authorization": "Basic " + window.btoa(this.state.username + ":" + this.state.loginPassword),
            "access-control-allow-methods": "HEAD, POST, PUT, GET, PATCH, DELETE",
            "access-control-allow-headers": "Content-Type, X-Requested-With, accept, Origin, Access-Control-Request-Method, Access-Control-Request-Headers, X-FORWARDED-FOR, authorization",
            "access-control-expose-headers": "access-token, request-id, location",
            "access-control-allow-credentials": "true"
        };

        fetch('http://localhost:8085/api/v1/auth/login', {
            method: 'POST',
            headers
        })
            .then(response => response.json())
            .then(data => {
                sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));

                that.setState({
                    loggedIn: true
                });

                that.closeModalHandler();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    registerClickHandler = () => {
        if (this.state.firstname === "" || this.state.lastname === ""
         || this.state.email === "" || this.state.registerPassword === "" 
         || this.state.contact === "" ) {
             this.setState({req:'blk'});
         }
         else {
             this.setState({req:'req'});
         }

        let dataSignup = JSON.stringify({
            "email_address": this.state.email,
            "first_name": this.state.firstname,
            "last_name": this.state.lastname,
            "mobile_number": this.state.contact,
            "password": this.state.registerPassword
        });

        let headers = {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*',
            "access-control-allow-methods": "HEAD, POST, PUT, GET, PATCH, DELETE",
            "access-control-allow-headers": "Content-Type, X-Requested-With, accept, Origin, Access-Control-Request-Method, Access-Control-Request-Headers, X-FORWARDED-FOR, authorization",
            "access-control-expose-headers": "access-token, request-id, location",
            "access-control-allow-credentials": "true"
        };

        fetch('http://localhost:8085/api/v1/signup', {
            method: 'POST',
            headers,
            body: JSON.stringify(dataSignup),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

export default Header;