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
    if (isOpen && article.status !== fetchDataStatus[TYPE_SUCCESS]) {
      fetchArticleText(article.id)
    }
  }, [isOpen])

  const onToggleClick = () => {
    toggleOpen(article.id)
  }

  const onDeleteClick = () => {
    deleteArticle(article.id)
  }

  const buttonExpandText = isOpen ? '-' : '+'

  const articleContent = () => {
    if (!isOpen) return null

    return article.status === fetchDataStatus[TYPE_SUCCESS] ? (
      <>
        <p>{article.text}</p>
        <CommentsConnected
          id={1}
          store={store}
          commentIds={article.comments}
          articleId={article.id}
        />

        {/* <button onClick={onAddComment}>ADD</button> */}
        <NewCommentForm articleId={article.id} store={store}></NewCommentForm>
      </>
    ) : (
      <Loader />
    )
  }

  return (
    <li className="article-list__item">
      <h2>{article.title}</h2>
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
