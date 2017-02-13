import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  render(){
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/">React Blog</Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
