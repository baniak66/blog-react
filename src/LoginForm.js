import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';

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
    axios.post('https://baniak-blog-api.herokuapp.com/user_token', {
      auth: {
        email: this.state.email,
        password: this.state.password
      }, format: 'json'
    })
    .then(function (response) {
      Cookies.set('token', response.data.jwt);
      console.log('cookie set');
      self.setUser();
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  setUser() {
    var self = this;
    var config = {
      headers: { 'Authorization': Cookies.get("token") }
    }
    axios.post('https://baniak-blog-api.herokuapp.com/users/sign_in', {
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
