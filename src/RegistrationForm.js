import React from 'react';
import { Link, hashHistory } from 'react-router';
import axios from 'axios';
import Alert from 'react-s-alert';
import srv from './Srv';

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
    axios.post(srv+'/users', {
      user: {
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation
      },
      format: 'json'
    })
    .then(function (response) {
      console.log('user created');
      hashHistory.push('/');
      Alert.success('account created, please login:)', {
            position: 'bottom-left',
            effect: 'slide',
            timeout: 5000});
    })
    .catch(function (error) {
      console.log(error.response.data.errors);
      var err = error.response.data.errors;
      for (var key in err){
        if (err.hasOwnProperty(key)){
          Alert.error((key + " " + err[key]), {
              position: 'bottom-left',
              effect: 'slide',
              timeout: 5000});
        }
      }
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
