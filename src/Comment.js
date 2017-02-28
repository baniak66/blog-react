import React from 'react';

class Comment extends React.Component{
  render(){
    return(
      <div className="media">
        <div className="media-left">
          <span className="glyphicon glyphicon-comment"></span>
        </div>
        <div className="media-body">{this.props.comment.content} <br/>
          ({this.props.comment.added} {this.props.comment.email})
        </div>
      </div>
    );
  }
}

export default Comment;
