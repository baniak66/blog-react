import React from 'react';
import { Link, hashHistory } from 'react-router';
import axios from 'axios';
import CommentPanel from './CommentPanel';
import Cookies from 'js-cookie';
import srv from './Srv';

class ShowArticle extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      article: {}
    }
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount(){
    var self = this;
    axios.get(srv+'/articles/' + self.props.params.article)
      .then(function (response) {
        self.setState({article: response.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  handleDelete(e) {
    var config = {
      headers: { 'Authorization': Cookies.get("token") }
    };
    var self = this;
    e.preventDefault();
    axios.delete(srv+'/articles/' + self.props.params.article, config)
      .then(function (response) {
        hashHistory.push('/');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    var editDeleteButtons;
    if (this.state.article.email === Cookies.get('user')) {
      editDeleteButtons=[<button className="btn btn-danger pull-right" onClick={this.handleDelete} key="delete">Delete article</button>,
      <Link to={"/edit-article/"+this.state.article.id} className='btn btn-warning pull-right' key="edit">Edit</Link>]
    }
    return (
      <div>
        <h3>{this.state.article.title}
        {editDeleteButtons}
        </h3>
        <hr/>
        <p>{this.state.article.content}</p>
        {this.state.article.comments &&<CommentPanel comments={this.state.article.comments} article={this.state.article.id}/>}
        <hr/>
        <Link to="/" className='btn btn-default'>Back</Link>
      </div>
    );
  }
}
export default ShowArticle;
