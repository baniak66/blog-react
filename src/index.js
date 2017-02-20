import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import App from './App';
import Articles from './Articles';
import ShowArticle from './ShowArticle';
import NewArticle from './NewArticle';
import EditArticle from './EditArticle';
import RegistrationForm from './RegistrationForm';

const main = document.getElementById('root');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Articles}></IndexRoute>
      <Route path="/article/:article" component={ShowArticle}></Route>
      <Route path="/new-article" component={NewArticle}></Route>
      <Route path="/edit-article/:article" component={EditArticle}></Route>
      <Route path="/registration" component={RegistrationForm}></Route>
    </Route>
  </Router>,
main);
