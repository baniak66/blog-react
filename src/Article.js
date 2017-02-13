import React from 'react';

class Article extends React.Component{
  render() {
    return (
      <div>
        <h4>{this.props.article.title}</h4>
        <p>{this.props.article.content}</p>
      </div>
    );
  }
}

export default Article;
