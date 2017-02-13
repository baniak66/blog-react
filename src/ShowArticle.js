import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';

class ShowArticle extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      article: {}
    }
    this.getArticle();
  }
  getArticle(){
    var self = this;
    axios.get('https://baniak-blog-api.herokuapp.com/articles/' + self.props.params.article)
      .then(function (response) {
        self.setState({article: response.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <h3>{this.state.article.title}</h3>
        <p>{this.state.article.content}</p>
        <Link to="/" className='btn btn-danger'>Back</Link>
      </div>
    );
  }
}

export default ShowArticle;
