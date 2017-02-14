import React from 'react';
import { Link, hashHistory } from 'react-router';
import axios from 'axios';
import CommentPanel from './CommentPanel';

class ShowArticle extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      article: {}
    }
    this.getArticle();
    this.handleDelete = this.handleDelete.bind(this);
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
  handleDelete(e) {
    var self = this;
    e.preventDefault();
    axios.delete('https://baniak-blog-api.herokuapp.com/articles/' + self.props.params.article)
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
        <h3>{this.state.article.title}
        <button className="btn btn-danger pull-right" onClick={this.handleDelete}>
          Delete article
        </button>
        </h3>
        <hr/>
        <p>{this.state.article.content}</p>
        {this.state.article.comments &&<CommentPanel comments={this.state.article.comments} article={this.state.article.id}/>}
        <hr/>
        <Link to="/" className='btn btn-default'>Back</Link>
        <Link to={"/edit-article/"+this.state.article.id} className='btn btn-warning'>Edit</Link>
      </div>
    );
  }
}

export default ShowArticle;
