import React from 'react'
import PropTypes from 'prop-types'

import { CommentsConnected } from './comments'
import { NewCommentForm } from './comment-form'

export const Article = (props) => {
  const { article, isOpen, toggleOpen, store } = props

  const onToggleClick = () => {
    toggleOpen(article.id)
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
          <NewCommentForm articleId={article.id} store={store}></NewCommentForm>
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
