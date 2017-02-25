import React from 'react';
import Cookies from 'js-cookie';
import Alert from 'react-s-alert';

class UserPanel extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    Cookies.set('token', "");
    Cookies.set('user', "");
    this.props.logoutUser();
    Alert.success('you are logged out', {
      position: 'bottom-left',
      effect: 'slide',
      timeout: 5000});
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
