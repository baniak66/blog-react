import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Article from './Article';
import srv from './Srv';

class Articles extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
  }
  componentDidMount() {
    var self = this;
    axios.get(srv+'/articles')
      .then(function (response) {
        self.setState({articles: response.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <Link to="/new-article" className='btn btn-success'>New article</Link>
        <hr/>
        {this.state.articles.map(function(article) {
          return <Article key={article.id} article={article}/>})
        }
      </div>
    );
  }
}

export default Articles;
