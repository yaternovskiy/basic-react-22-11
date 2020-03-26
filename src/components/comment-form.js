import React, { useState } from 'react'
import { connect } from 'react-redux'

import { addNewComment } from '../store/actionCreators'

export const CommentForm = (props) => {
  const { articleId, addComment } = props

  const handleInput = (type) => {
    const [value, setValue] = useState('')
    return [value, setValue]
  }

  const [user, setUser] = handleInput('user')
  const [text, setText] = handleInput('text')

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
      <label for={`name-${articleId}`}>Name</label>
      <input id={`name-${articleId}`} type="text" onInput={onInputUser} value={user}></input>
      <label for={`comment-${articleId}`}>Comment</label>
      <textarea id={`comment-${articleId}`} onInput={onInputText} value={text}></textarea>
      <button type="submit">Add</button>
    </form>
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (options) => dispatch(addNewComment(options))
  }
}
export const NewCommentForm = connect(null, mapDispatchToProps)(CommentForm)
