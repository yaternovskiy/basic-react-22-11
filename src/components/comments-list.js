import React, { Component } from 'react'
import Comment from './comment'
import CollapsibleList from '../decorators/collapsible-list'

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
    const { comments, isExpanded, toggleExpand } = this.props
    return (
      comments && (
        <div style={{ marginTop: '20px' }}>
          <button onClick={toggleExpand}>
            {isExpanded ? 'Hide comments' : 'Show comments (' + comments.length + ')'}
          </button>
          {isExpanded && (
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

export default CollapsibleList(CommentsList)
