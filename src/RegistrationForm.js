import React from 'react';
import { Link, hashHistory } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';

class RegistrationForm extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        password_confirmation: ''
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
    axios.post('https://baniak-blog-api.herokuapp.com/auth', {
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    })
    .then(function (response) {
      Cookies.set('access-token', response.headers['access-token']);
      Cookies.set('client', response.headers['client']);
      Cookies.set('uid', response.headers['uid']);
      hashHistory.push('/');
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    return (
      <div>
        <h3>New User</h3>
        <form className='' onSubmit={this.handleSubmit}>
          <div className="form-group">
          <input className='form-control'
            type="text"
            name="email"
            placeholder={"email"}
            value={this.state.email}
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

          <div className="form-group">
          <input className='form-control'
            type="password"
            name="password_confirmation"
            placeholder={"password_confirmation"}
            value={this.state.password_confirmation}
            onChange={this.onChangeField}>
          </input>
          </div>
          <button className='btn btn-default' type="submit">
            Signup
          </button>
          <Link to="/" className='btn btn-danger'>Back</Link>
        </form>
      </div>
    )
  }
}
export default RegistrationForm;
