import React from "react";
import "./Header.css";
import Button from "@material-ui/core/Button";

const Header = (props) => {

    return (
        <div className="header">
            <img className="logo" src = "../../assets/logo.svg"/>
            <Button
              variant="contained"
              color="default"
              className="login-logout">
              Login </Button>
        </div>

    );

}

export default Header;