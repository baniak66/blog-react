import React from 'react';
import axios from 'axios';
import { Link, hashHistory } from 'react-router';

class EditArticle extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    }
    this.getArticle();
    this.onChangeField = this.onChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChangeField(e) {
    var name = e.target.name;
    var obj = {};
    obj[name] = e.target.value;
    this.setState(obj);
  }
  getArticle(){
    var self = this;
    axios.get('https://baniak-blog-api.herokuapp.com/articles/' + self.props.params.article)
      .then(function (response) {
        self.setState({title: response.data.title});
        self.setState({content: response.data.content});
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  handleSubmit(e) {
    var self = this;
    e.preventDefault();
    axios.put('https://baniak-blog-api.herokuapp.com/articles/' + self.props.params.article, {
      article: this.state
    })
    .then(function (response) {
      console.log(response);
      hashHistory.push('/article/'+ self.props.params.article);
    })
    .catch(function (error) {
      console.log(error);
    });

  }
  render() {
    return (
      <div>
        <h3>Edit article</h3>
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


export default EditArticle;
