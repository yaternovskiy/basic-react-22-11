import React from 'react'
import PropTypes from 'prop-types'

import { CommentsConnected } from './comments'
import { NewCommentForm } from './comment-form'

export const Article = (props) => {
  const { article, isOpen, toggleOpen, deleteArticle, store } = props

  const onToggleClick = () => {
    toggleOpen(article.get('id'))
  }

  const onDeleteClick = () => {
    deleteArticle(article.get('id'))
  }

  const buttonExpandText = isOpen ? '-' : '+'

  return (
    <li className="article-list__item">
      <h2>{article.get('title')}</h2>
      <button data-test-delete-article="true" onClick={onDeleteClick}>
        Remove
      </button>
      <button data-test-expand-article="true" onClick={onToggleClick}>
        {buttonExpandText}
      </button>
      {isOpen && (
        <>
          <p>{article.get('text')}</p>
          <CommentsConnected id={1} store={store} commentIds={article.get('comments')} />

          {/* <button onClick={onAddComment}>ADD</button> */}
          <NewCommentForm articleId={article.get('id')} store={store}></NewCommentForm>
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
