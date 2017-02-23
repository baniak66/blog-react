import React from 'react';
import { Link } from 'react-router';
import LoginForm from './LoginForm';
import UserPanel from './UserPanel';
import Cookies from 'js-cookie';
import axios from 'axios';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      name: ""
    }
    this.getUser = this.getUser.bind(this);
    this.handleLogoutUser = this.handleLogoutUser.bind(this);
    this.handleLoginUser = this.handleLoginUser.bind(this);
  }
  componentWillMount() {
    var name = Cookies.get('user');
    var token = Cookies.get('token');
    if (name !== '' && token !== '') {
      this.setState({user: true});
      this.setState({name: name});
    }
  }
  getUser() {
    var self = this;
    var config = {
      headers: { 'Authorization': Cookies.get("token") }
    };
    axios.get('https://baniak-blog-api.herokuapp.com/user_signed', config)
      .then(function (response) {
        console.log(response);
        self.setState({user: response.data.status});
        self.setState({name: response.data.user.email});
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  handleLogoutUser() {
    console.log('handleLogoutUser triggered');
    this.setState({user: false});
    this.setState({name: ""});
  }
  handleLoginUser(name) {
    console.log('handleLoginUser triggered');
    this.setState({user: true});
    this.setState({name: name});
  }
  render(){
    var userField;
    if (this.state.user) {
      userField = <UserPanel user={this.state.name} logoutUser={this.handleLogoutUser}/>;
    }else{
      userField = <LoginForm loginUser={this.handleLoginUser}/>;
    }
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/">React Blog</Link>
          </div>
          <div>
            {userField}
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
