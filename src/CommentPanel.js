import React from 'react';
import Comment from './Comment'

class CommentPanel extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments
    };
  }
  render(){
    return(
      <div className='container'>
        <h4>Comments:</h4>
        {this.state.comments.map(function(comment) {
          return <Comment key={comment.id} comment={comment}/>
        })}
      </div>
    );

  }
}
export default CommentPanel;

