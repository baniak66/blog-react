import React from 'react';
import axios from 'axios';
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
    e.preventDefault();
    axios.post('https://baniak-blog-api.herokuapp.com/articles', {
      article: this.state
    })
    .then(function (response) {
      console.log(response);
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
          <input className='form-control'
            name="content"
            placeholder={"content"}
            value={this.state.content}
            onChange={this.onChangeField}>
          </input>
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