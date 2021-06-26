import React from "react";
import './LoginRegisterModal.css';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import Modal from "react-modal";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';


const TabContainer = function (props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
      {props.children}
    </Typography>
  )
}


TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

const mStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const LoginRegisterModal = (props) => {

  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.model.modalIsOpen}
      contentLabel="Login"
      onRequestClose={props.model.closeModalHandler}
      style={mStyle}
    >
      <Tabs className="tabs" value={props.model.value} onChange={props.model.tabChangeHandler}>
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>

      {props.model.value === 0 &&
        <TabContainer>
          <FormControl required>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input id="username" type="text" username={props.model.username} onChange={props.model.inputUsernameChangeHandler} />
            <FormHelperText className={props.model.req}>
              <span className="red">required</span>
            </FormHelperText>
          </FormControl>
          <br /><br />
          <FormControl required>
            <InputLabel htmlFor="loginPassword">Password</InputLabel>
            <Input id="loginPassword" type="password" loginpassword={props.model.loginPassword} onChange={props.model.inputLoginPasswordChangeHandler} />
            <FormHelperText className={props.model.req}>
              <span className="red">required</span>
            </FormHelperText>
          </FormControl>
          <br /><br />
          {props.model.loggedIn === true &&
            <FormControl>
              <span className="successText">
                Login Successful!
              </span>
            </FormControl>
          }
          <br /><br />
          <Button variant="contained" color="primary" onClick={props.model.loginClickHandler}>LOGIN</Button>
        </TabContainer>
      }

      {props.model.value === 1 &&
        <TabContainer>
          <FormControl required>
            <InputLabel htmlFor="firstname">First Name</InputLabel>
            <Input id="firstname" type="text" firstname={props.model.firstname} onChange={props.model.inputFirstNameChangeHandler} />
            <FormHelperText className={props.model.req}>
              <span className="red">required</span>
            </FormHelperText>
          </FormControl>
          <br /><br />
          <FormControl required>
            <InputLabel htmlFor="lastname">Last Name</InputLabel>
            <Input id="lastname" type="text" lastname={props.model.lastname} onChange={props.model.inputLastNameChangeHandler} />
            <FormHelperText className={props.model.req}>
              <span className="red">required</span>
            </FormHelperText>
          </FormControl>
          <br /><br />
          <FormControl required>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" type="text" email={props.model.email} onChange={props.model.inputEmailChangeHandler} />
            <FormHelperText className={props.model.req}>
              <span className="red">required</span>
            </FormHelperText>
          </FormControl>
          <br /><br />
          <FormControl required>
            <InputLabel htmlFor="registerPassword">Password</InputLabel>
            <Input id="registerPassword" type="password" registerpassword={props.model.registerPassword} onChange={props.model.inputRegisterPasswordChangeHandler} />
            <FormHelperText className={props.model.req}>
              <span className="red">required</span>
            </FormHelperText>
          </FormControl>
          <br /><br />
          <FormControl required>
            <InputLabel htmlFor="contact">Contact No.</InputLabel>
            <Input id="contact" type="text" contact={props.model.contact} onChange={props.model.inputContactChangeHandler} />
            <FormHelperText className={props.model.req}>
              <span className="red">required</span>
            </FormHelperText>
          </FormControl>
          <br /><br />
          {props.model.registrationSuccess === true &&
            <FormControl>
              <span className="successText">
                Registration Successful. Please Login!
              </span>
            </FormControl>
          }
          <br /><br />
          <Button variant="contained" color="primary" onClick={props.model.registerClickHandler}>
            REGISTER</Button>
        </TabContainer>
      }
    </Modal>
  );
}

export default LoginRegisterModal;