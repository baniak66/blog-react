import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { Link, hashHistory } from 'react-router';

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
      headers: {'access-token': Cookies.get("access-token"),
                'client': Cookies.get("client"),
                'uid': Cookies.get("uid")}
    };
    e.preventDefault();
    axios.post('https://baniak-blog-api.herokuapp.com/articles',
      {article: this.state}, config
    )
    .then(function (response) {
      hashHistory.push('/');
    })
    .catch(function (error) {
      console.log(error);
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
