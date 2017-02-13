import React from 'react';
import axios from 'axios';

import Article from './Article';

class Articles extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
    this.getArticles = this.getArticles.bind(this);
    this.getArticles();
  }
  getArticles() {
    var self = this;
    axios.get('https://baniak-blog-api.herokuapp.com/articles')
      .then(function (response) {
        console.log(response.data);
        self.setState({articles: response.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <h3>Articles</h3>
        {this.state.articles.map(function(article) {
          return <Article key={article.id} article={article}/>})
        }
      </div>
    );
  }
}

export default Articles;
