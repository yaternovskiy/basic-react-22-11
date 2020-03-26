import React from 'react'
import PropTypes from 'prop-types'

import { CommentsConnected } from './comments'
import { CommentForm } from './comment-form'

export const Article = (props) => {
  const { article, isOpen, toggleOpen, addComment, store } = props

  const onToggleClick = () => {
    toggleOpen(article.id)
  }

  const onAddComment = (options) => {
    addComment({ ...options, articleId: article.id })
  }

  const buttonText = isOpen ? '-' : '+'

  return (
    <li className="article-list__item">
      <h2>{article.title}</h2>
      <button data-test-expand-article="true" onClick={onToggleClick}>
        {buttonText}
      </button>
      {isOpen && (
        <>
          <p>{article.text}</p>
          <CommentsConnected id={1} store={store} commentIds={article.commentsIds} />

          {/* <button onClick={onAddComment}>ADD</button> */}
          <CommentForm addComment={onAddComment} articleId={article.id}></CommentForm>
        </>
      )}
    </li>
  )
}

Article.propTypes = {
  article: PropTypes.shape(),
  isOpen: PropTypes.bool,
  toggleOpen: PropTypes.func
}
