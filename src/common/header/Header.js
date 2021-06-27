import React, { useState } from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import LoginRegisterModal from '../../screens/modals/LoginRegisterModal';

const Header = (props) => {

    const headers = {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        "access-control-allow-methods": "HEAD, POST, PUT, GET, PATCH, DELETE",
        "access-control-allow-headers": "Content-Type, X-Requested-With, accept, Origin, Access-Control-Request-Method, Access-Control-Request-Headers, X-FORWARDED-FOR, authorization",
        "access-control-expose-headers": "access-token, request-id, location",
        "access-control-allow-credentials": "true"
    };

    const BLANK = '';

    const [model, setModel] = useState({
        loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
        modalIsOpen: false,
        tabOrder: 0,
        req: "req",
        username: BLANK,
        loginPassword: BLANK,
        firstname: BLANK,
        lastname: BLANK,
        email: BLANK,
        registerPassword: BLANK,
        contact: BLANK,
        registrationSuccess: false,
    });

    const inputFirstNameChangeHandler = (value) => {
        setModel({ ...model, firstname: value });
    }

    const inputLastNameChangeHandler = (value) => {
        setModel({ ...model, lastname: value });
    }

    const inputEmailChangeHandler = (value) => {
        setModel({ ...model, email: value });
    }

    const inputRegisterPasswordChangeHandler = (value) => {
        setModel({ ...model, registerPassword: value });
    }

    const inputContactChangeHandler = (value) => {
        setModel({ ...model, contact:value });
    }

    const logoutHandler = (e) => {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");

        setModel({
            ...model,
            loggedIn: false
        });
    }


    const inputUsernameChangeHandler = (value) => {
        setModel({ ...model, username: value });
    }

    const inputLoginPasswordChangeHandler = (value) => {
        setModel({ ...model, loginPassword: value });
    }

    const openModalHandler = () => {
        setModel({
            modalIsOpen: true,
            tabOrder: 0,
            req: "req",
            username: BLANK,
            loginPassword: BLANK,
            firstname: BLANK,
            lastname: BLANK,
            email: BLANK,
            registerPassword: BLANK,
            contact: BLANK
        });
    }

    const closeModalHandler = () => {
        setModel({ ...model, modalIsOpen: false });
    }

    const tabChangeHandler = (event, value) => {
        setModel({ ...model, tabOrder:value});
    }

    const loginClickHandler = () => {
        model.username === "" || model.loginPassword === "" ? setModel({ ...model, req: "block" }) : setModel({ ...model, req: "req" });

        fetch(`${props.baseUrl}auth/login`, {
            method: 'POST',
            headers: {...headers, 'Authorization':'Basic ' + btoa(model.username + ":" + model.loginPassword)}
        })
            .then((response) => {
                let respHeaders = response.headers;
                if (respHeaders && respHeaders.get('access-token')) {
                    sessionStorage.setItem('access-token', respHeaders.get('access-token'));
                }
                return response.json()
            })
            .then(data => {
                sessionStorage.setItem("uuid", data.id);

                setModel({
                    ...model, 
                    loggedIn: true
                });

                closeModalHandler();
            })
            .catch((error) => {
                console.log(error);
                setModel({
                    ...model, 
                    loggedIn: false
                });
            });
    }


    const registerClickHandler = () => {
        if (model.firstname === "" || model.lastname === ""
            || model.email === "" || model.registerPassword === ""
            || model.contact === "") {
            setModel({...model,  req: 'blk' });
        }
        else {
            setModel({ ...model, req: 'req' });
        }

        let dataSign = JSON.stringify({
            "email_address": model.email,
            "first_name": model.firstname,
            "last_name": model.lastname,
            "mobile_number": model.contact,
            "password": model.registerPassword
        });

            fetch(`${props.baseUrl}signup`, {
            method: 'POST',
            headers,
            body: dataSign
        });
    };

    const functions = {
        inputFirstNameChangeHandler,
        inputLastNameChangeHandler,
        inputEmailChangeHandler,
        inputRegisterPasswordChangeHandler,
        inputContactChangeHandler,
        logoutHandler,
        inputUsernameChangeHandler,
        inputLoginPasswordChangeHandler,
        openModalHandler,
        closeModalHandler,
        tabChangeHandler,
        loginClickHandler,
        registerClickHandler
    };

    return (
        <div>
            <header className="header">
                <img src={logo} className="logo" alt="Movies App Logo" />
                {!model.loggedIn ?
                    <div className="login-logout">
                        <Button variant="contained" color="default" onClick={openModalHandler}>
                            Login
                        </Button>
                    </div>
                    :
                    <div className="login-logout">
                        <Button variant="contained" color="default" onClick={logoutHandler}>
                            Logout
                        </Button>
                    </div>
                }
                {props.showBookShowButton === "true" && !model.loggedIn
                    ? <div className="bookshow">
                        <Button variant="contained" color="primary" onClick={openModalHandler}>
                            Book Show
                        </Button>
                    </div>
                    : ""
                }

                {props.showBookShowButton === "true" && model.loggedIn
                    ? <div className="bookshow-button">
                        <Link to={"/bookshow/" + props.id}>
                            <Button variant="contained" color="primary">
                                Book Show
                            </Button>
                        </Link>
                    </div>
                    : ""
                }

            </header>

            <LoginRegisterModal model={model} functions={functions} />

        </div>
    )

}

export default Header;