import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

class UserPanel extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout(e) {
    var self = this;
    e.preventDefault();
    var config = {
      headers: {'access-token': Cookies.get("access-token"),
                'client': Cookies.get("client"),
                'uid': Cookies.get("uid"),
                'expiry': Cookies.get("expiry")}
    };
    e.preventDefault();
    axios.delete('http://localhost:3000/auth/sign_out', config)
    .then(function (response) {
      Cookies.set('access-token', "");
      Cookies.set('client', "");
      Cookies.set('uid', "");
      console.log('cookies clear');
      self.props.logoutUser();
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    return (
      <div className="navbar-nav navbar-right">
        <p className="navbar-text">{this.props.user}</p>
        <button className='btn btn-default navbar-btn' onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }
}
export default UserPanel;
