import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import App from './App';
import Articles from './Articles';
import ShowArticle from './ShowArticle';

const main = document.getElementById('root');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Articles}></IndexRoute>
      <Route path="/article/:article" component={ShowArticle}></Route>
    </Route>
  </Router>,
main);
