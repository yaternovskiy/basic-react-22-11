import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCommentsByIds } from '../store/selectors'

const renderComments = (comments) => {
  return (
    <>
      {comments
        ? comments.valueSeq().map((comment) => (
            <li key={comment.get('id')}>
              <h4 data-test="comment username">{comment.get('user')}</h4>
              <p>{comment.get('text')}</p>
            </li>
          ))
        : null}
    </>
  )
}

export const Comments = (props) => {
  const { comments } = props

  const [isOpen, toggleOpen] = useState()

  const expandCollapse = () => toggleOpen(!isOpen)

  const buttonText = isOpen ? 'close comment' : 'open comments'

  return (
    <div>
      <button data-test-show-comments="true" onClick={expandCollapse}>
        {buttonText}
      </button>
      <ul>{isOpen && renderComments(comments)}</ul>
    </div>
  )
}

Comment.PropTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape())
}

Comment.defaultProps = {
  comments: []
}

const mapStateToProps = (state, ownProps) => {
  return {
    comments: getCommentsByIds(state, ownProps.commentIds)
  }
}

export const CommentsConnected = connect(mapStateToProps)(Comments)
