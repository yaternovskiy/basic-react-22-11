import React, { Component } from 'react'
import Comment from './comment'

class CommentsList extends Component {
  render() {
    return <ul>{this.commentItems()}</ul>
  }

  commentItems() {
    const { comments } = this.props
    return comments.map((comment) => (
      <li key={comment.id}>
        <Comment comment={comment} />
      </li>
    ))
  }
}

export default CommentsList
