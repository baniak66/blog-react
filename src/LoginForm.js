import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import Alert from 'react-s-alert';
import srv from './Srv';

class LoginForm extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.onChangeField = this.onChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChangeField(e) {
    var name = e.target.name;
    var obj = {};
    obj[name] = e.target.value;
    this.setState(obj);
  }
  handleSubmit(e) {
    var self = this;
    e.preventDefault();
    axios.post(srv+'/user_token', {
      auth: {
        email: this.state.email,
        password: this.state.password
      }, format: 'json'
    })
    .then(function (response) {
      Cookies.set('token', response.data.jwt);
      console.log('cookie set');
      self.setUser();
      Alert.success('you are logged in', {
        position: 'bottom-left',
        effect: 'slide',
        timeout: 5000});
    })
    .catch(function (error) {
      console.log(error);
      Alert.error('wrong email or password', {
            position: 'bottom-left',
            effect: 'slide',
            timeout: 5000});
    });
  }
  setUser() {
    var self = this;
    var config = {
      headers: { 'Authorization': Cookies.get("token") }
    }
    axios.post(srv+'/users/sign_in', {
      user: {
        email: this.state.email,
        password: this.state.password
      }, format: 'json'}, config
    )
    .then(function (response) {
      Cookies.set('user', response.data.email);
      self.props.loginUser(response.data.email);
    });
  }
  render() {
    return (
      <div>
        <form className='navbar-form navbar-right' onSubmit={this.handleSubmit}>
          <div className="form-group">
          <input className='form-control'
            type="text"
            name="email"
            placeholder={"email"}
            value={this.state.title}
            onChange={this.onChangeField}>
          </input>
          </div>
          <div className="form-group">
          <input className='form-control'
            type="password"
            name="password"
            placeholder={"password"}
            value={this.state.password}
            onChange={this.onChangeField}>
          </input>
          </div>
          <button className='btn btn-info' type="submit">
            Login
          </button>
          <Link to="/registration" className='btn btn-default'>Register</Link>

        </form>
      </div>
    )
  }
}
export default LoginForm;
