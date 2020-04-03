import React, { useState } from 'react'
import { connect } from 'react-redux'

import { addNewComment, moderateAsync } from '../store/actionCreators'

export const CommentForm = (props) => {
  const { articleId, addComment, addRandomComment } = props

  const [user, setUser] = useState('')
  const [text, setText] = useState('')

  const addNew = (e) => {
    e.preventDefault()
    addComment({ articleId, user, text })
    setUser('')
    setText('')
  }

  const onInputUser = (e) => {
    setUser(e.currentTarget.value)
  }

  const onInputText = (e) => {
    setText(e.currentTarget.value)
  }

  return (
    <form onSubmit={addNew}>
      <label htmlFor={`name-${articleId}`}>Name</label>
      <input id={`name-${articleId}`} type="text" onInput={onInputUser} value={user}></input>
      <label htmlFor={`comment-${articleId}`}>Comment</label>
      <textarea id={`comment-${articleId}`} onInput={onInputText} value={text}></textarea>
      <button type="submit">Add</button>
      <button type="button" onClick={() => addRandomComment({ articleId })}>
        Add random
      </button>
    </form>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (options) => dispatch(addNewComment(options)),
    addRandomComment: (options) => dispatch(moderateAsync(options))
  }
}

export const NewCommentForm = connect(null, mapDispatchToProps)(CommentForm)
