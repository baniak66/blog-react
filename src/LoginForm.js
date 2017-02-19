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
    e.preventDefault();
    axios.post('https://baniak-blog-api.herokuapp.com/auth/sign_in', {
      email: this.state.email,
      password: this.state.password
    })
    .then(function (response) {
      Cookies.set('access-token', response.headers['access-token']);
      Cookies.set('client', response.headers['client']);
      Cookies.set('uid', response.headers['uid']);
    })
    .catch(function (error) {
      console.log(error);
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
          <Link to="/" className='btn btn-default'>Register</Link>

        </form>
      </div>
    )
  }
}
export default LoginForm;
