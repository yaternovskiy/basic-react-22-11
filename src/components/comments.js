import React, { useState } from 'react'
import PropTypes from 'prop-types'

const renderComments = (comments) => {
  return (
    <>
      {comments && comments.length
        ? comments.map((comment) => (
            <li key={comment.id}>
              <h4 data-test="comment username">{comment.user}</h4>
              <p>{comment.text}</p>
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
