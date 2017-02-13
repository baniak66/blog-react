import React from 'react';
import { Link } from 'react-router';

class Article extends React.Component{
  render() {
    return (
      <div>
        <h4>{this.props.article.title}</h4>
        <p>{this.props.article.content}</p>
        <p>Comments: {this.props.article.count_comments}</p>
        <Link to={"/article/"+this.props.article.id}>
          <button className="btn btn-default">
            Read more
          </button>
        </Link>
        <hr />
      </div>
    );
  }
}

export default Article;
