import React from 'react'

export const CommentForm = (props) => {
  const { addComment, articleId } = props

  const addNew = (e) => {
    e.preventDefault()
    const user = e.target[0].value
    const text = e.target[1].value

    addComment({ user, text })
  }

  return (
    <form onSubmit={addNew}>
      <label for={`name-${articleId}`}>Name</label>
      <input id={`name-${articleId}`} type="text"></input>
      <label for={`comment-${articleId}`}>Comment</label>
      <textarea id={`comment-${articleId}`}></textarea>
      <button type="submit">Add</button>
    </form>
  )
}
