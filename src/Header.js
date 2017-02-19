import React from 'react';
import { Link } from 'react-router';
import LoginForm from './LoginForm'

class Header extends React.Component {
  render(){
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/">React Blog</Link>
          </div>
          <LoginForm/>
        </div>
      </nav>
    );
  }
}

export default Header;
