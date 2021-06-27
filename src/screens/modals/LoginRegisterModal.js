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
      onRequestClose={props.functions.closeModalHandler}
      style={mStyle}
    >
      <Tabs className="tabs" value={props.model.tabOrder} onChange={(event) => props.functions.tabChangeHandler(event.target.value)}>
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>

      {props.model.tabOrder === 0 &&
        <TabContainer>
          <FormControl required>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input id="username" type="text" username={props.model.username} onChange={(event) => props.functions.inputUsernameChangeHandler(event.target.value)} />
            <FormHelperText className={props.model.req}>
              <span className="red">required</span>
            </FormHelperText>
          </FormControl>
          <br /><br />
          <FormControl required>
            <InputLabel htmlFor="loginPassword">Password</InputLabel>
            <Input id="loginPassword" type="password" loginpassword={props.model.loginPassword} onChange={(event) => props.functions.inputLoginPasswordChangeHandler(event.target.value)} />
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
          <Button variant="contained" color="primary" onClick={(event)=>props.functions.loginClickHandler(event.target.value)}>LOGIN</Button>
        </TabContainer>
      }

      {props.model.tabOrder === 1 &&
        <TabContainer>
          <FormControl required>
            <InputLabel htmlFor="firstname">First Name</InputLabel>
            <Input id="firstname" type="text" firstname={props.model.firstname} onChange={(event)=>props.functions.inputFirstNameChangeHandler(event.target.value)} />
            <FormHelperText className={props.model.req}>
              <span className="red">required</span>
            </FormHelperText>
          </FormControl>
          <br /><br />
          <FormControl required>
            <InputLabel htmlFor="lastname">Last Name</InputLabel>
            <Input id="lastname" type="text" lastname={props.model.lastname} onChange={(event)=>props.functions.inputLastNameChangeHandler(event.target.value)} />
            <FormHelperText className={props.model.req}>
              <span className="red">required</span>
            </FormHelperText>
          </FormControl>
          <br /><br />
          <FormControl required>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" type="text" email={props.model.email} onChange={(event)=>props.functions.inputEmailChangeHandler(event.target.value)} />
            <FormHelperText className={props.model.req}>
              <span className="red">required</span>
            </FormHelperText>
          </FormControl>
          <br /><br />
          <FormControl required>
            <InputLabel htmlFor="registerPassword">Password</InputLabel>
            <Input id="registerPassword" type="password" registerpassword={props.model.registerPassword} onChange={(event)=>props.functions.inputRegisterPasswordChangeHandler(event.target.value)} />
            <FormHelperText className={props.model.req}>
              <span className="red">required</span>
            </FormHelperText>
          </FormControl>
          <br /><br />
          <FormControl required>
            <InputLabel htmlFor="contact">Contact No.</InputLabel>
            <Input id="contact" type="text" contact={props.model.contact} onChange={(event)=>props.functions.inputContactChangeHandler(event.target.value)} />
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
          <Button variant="contained" color="primary" onClick={(event)=>props.functions.registerClickHandler(event.target.value)}>
            REGISTER</Button>
        </TabContainer>
      }
    </Modal>
  );
}

export default LoginRegisterModal;