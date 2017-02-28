import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Alert from 'react-s-alert';
import srv from './Srv';

class NewComment extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        content: ''
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
    var config = {
      headers: { 'Authorization': Cookies.get("token") }
    };
    var self = this;
    e.preventDefault();
    axios.post(srv+'/articles/' + self.props.article + '/comments', {
      comment: this.state, email: Cookies.get('user')
    }, config)
    .then(function (response) {
      self.props.handleNewComment(response.data);
      self.setState({content:''});
    })
    .catch(function (error) {
      console.log(error);
      Alert.error(("login to add a comment"), {
          position: 'bottom-left',
          effect: 'slide',
          timeout: 5000});
    });

  }
  render() {
    return (
      <div>
        <form className='form-inline' onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input className='form-control'
              name="content"
              placeholder={"Type your comment"}
              value={this.state.content}
              onChange={this.onChangeField}>
            </input>
          </div>
          <button className='btn btn-default' type="submit">
            Send
          </button>
        </form>
      </div>
    )
  }
}
export default NewComment;
