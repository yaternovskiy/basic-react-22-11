import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { Loader } from './loader'
import { CommentsConnected } from './comments'
import { NewCommentForm } from './comment-form'
import { fetchDataStatus } from '../constants/store'
import { TYPE_SUCCESS } from '../constants/action-types'

export const Article = (props) => {
  const { article, isOpen, toggleOpen, deleteArticle, store, fetchArticleText } = props

  useEffect(() => {
    if (isOpen && article.get('status') !== fetchDataStatus[TYPE_SUCCESS]) {
      fetchArticleText(article.get('id'))
    }
  }, [isOpen])

  const onToggleClick = () => {
    toggleOpen(article.get('id'))
  }

  const onDeleteClick = () => {
    deleteArticle(article.get('id'))
  }

  const buttonExpandText = isOpen ? '-' : '+'

  const articleContent = () => {
    if (!isOpen) return null

    return article.get('status') === fetchDataStatus[TYPE_SUCCESS] ? (
      <>
        <p>{article.get('text')}</p>
        <CommentsConnected
          id={1}
          store={store}
          commentIds={article.get('comments')}
          articleId={article.get('id')}
        />

        {/* <button onClick={onAddComment}>ADD</button> */}
        <NewCommentForm articleId={article.get('id')} store={store}></NewCommentForm>
      </>
    ) : (
      <Loader />
    )
  }

  return (
    <li className="article-list__item">
      <h2>{article.get('title')}</h2>
      <button data-test-delete-article="true" onClick={onDeleteClick}>
        Remove
      </button>
      <button data-test-expand-article="true" onClick={onToggleClick}>
        {buttonExpandText}
      </button>
      {articleContent()}
    </li>
  )
}

Article.propTypes = {
  article: PropTypes.shape(),
  isOpen: PropTypes.bool,
  toggleOpen: PropTypes.func
}
