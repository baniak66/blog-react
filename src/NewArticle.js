import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { Link, hashHistory } from 'react-router';
import Alert from 'react-s-alert';
import srv from './Srv';

class NewArticle extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        title: '',
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
    e.preventDefault();
    axios.post(srv+'/articles',
      {article: this.state, email: Cookies.get('user')}, config
    )
    .then(function (response) {
      hashHistory.push('/');
    })
    .catch(function (error) {
      if (error.response.status === 401){
        Alert.error('please login to add article', {
          position: 'bottom-left',
          effect: 'slide',
          timeout: 5000});
      } else {
        var err = error.response.data.errors;
        for (var key in err){
          if (err.hasOwnProperty(key)){
            Alert.error((key + " " + err[key]), {
                position: 'bottom-left',
                effect: 'slide',
                timeout: 5000});
          }
        }
      }
    });
  }
  render() {
    return (
      <div>
        <h3>New article</h3>
        <form className='' onSubmit={this.handleSubmit}>
          <div className="form-group">
          <input className='form-control'
            name="title"
            placeholder={"title"}
            value={this.state.title}
            onChange={this.onChangeField}>
          </input>
          </div>
          <div className="form-group">
          <textarea className='form-control'
            rows={4}
            name="content"
            placeholder={"content"}
            value={this.state.content}
            onChange={this.onChangeField}>
          </textarea>
          </div>
          <button className='btn btn-default' type="submit">
            Save
          </button>
          <Link to="/" className='btn btn-danger'>Back</Link>
        </form>
      </div>
    )
  }
}


export default NewArticle;
