import React from 'react';

class Comment extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div className="media">
        <div className="media-left">
          <span className="glyphicon glyphicon-comment"></span>
        </div>
        <div className="media-body">{this.props.comment.content}</div>
      </div>
    );
  }
}

export default Comment;
