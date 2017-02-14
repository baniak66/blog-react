import React from 'react';
import Comment from './Comment'
import NewComment from './NewComment'

class CommentPanel extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments
    };
    this.addComment = this.addComment.bind(this);
  }
  addComment(comment) {
    var comments = this.state.comments.slice();
    comments.push(comment);
    this.setState({comments: comments});
  }
  render(){
    var self = this;
    return(
      <div className='container'>
        <h4>Comments:</h4>
        {this.state.comments.map(function(comment) {
          return <Comment key={comment.id} comment={comment}/>
        })}
        <br/>
        <NewComment article={this.props.article} handleNewComment={self.addComment}/>
      </div>
    );

  }
}
export default CommentPanel;
