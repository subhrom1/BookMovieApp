import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BookShow from '../screens/bookshow/BookShow';
import Confirmation from '../screens/confirmation/Confirmation';
import Home from '../screens/home/Home';
import Details from '../screens/details/Details';

const urlPrefix = "http://localhost:8085/api/v1/";

const Controller = () => {

    return (
        <Router>
          <div className="main-container">
            <Route exact path='/' render={(props) => <Home {...props} baseUrl={urlPrefix} />} />
            <Route path='/movie/:id' render={(props) => <Details {...props} baseUrl={urlPrefix} />} />
            <Route path='/bookshow/:id' render={(props) => <BookShow {...props} baseUrl={urlPrefix} />} />
            <Route path='/confirm/:id' render={(props) => <Confirmation {...props} baseUrl={urlPrefix} />} />
          </div>
        </Router>
      )

}

export default Controller;