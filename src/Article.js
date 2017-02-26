import React from 'react';
import { Link } from 'react-router';

class Article extends React.Component{
  render() {
    return (
      <div>
        <h4>{this.props.article.title}</h4>
        <p>{this.props.article.content.substr(0,250) + "..."}</p>
        <p>added {this.props.article.added} by {this.props.article.user.email}</p>
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
