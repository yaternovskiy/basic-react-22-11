import React from 'react'

function Comment(props) {
  const { comment } = props
  return (
    <div style={{ marginTop: '20px' }}>
      <section>{comment.text}</section>
      <span style={{ fontStyle: 'italic' }}>By: {comment.user}</span>
    </div>
  )
}

export default Comment
