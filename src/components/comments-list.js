import React, { Component } from 'react'
import Comment from './comment'

class CommentsList extends Component {
  state = {
    isExpanded: false
  }
  render() {
    return <div>{this.commentItems()}</div>
  }

  toggleExpand = () => {
    this.setState({ isExpanded: !this.state.isExpanded })
  }

  commentItems() {
    const { comments } = this.props
    return (
      comments && (
        <div style={{ marginTop: '20px' }}>
          <button onClick={this.toggleExpand}>
            {this.state.isExpanded ? 'Hide comments' : 'Show comments (' + comments.length + ')'}
          </button>
          {this.state.isExpanded && (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <Comment comment={comment} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )
    )
  }
}

export default CommentsList
