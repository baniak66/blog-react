import React, { Component } from 'react';
import Header from './Header'
import Alert from 'react-s-alert';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <div className="container">
          {this.props.children}
        </div>
        <Alert stack={{limit: 3}} />
      </div>
    );
  }
}

export default App;
