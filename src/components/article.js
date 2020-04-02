import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import { Loader } from './loader'
import { CommentsConnected } from './comments'
import { NewCommentForm } from './comment-form'
import { fetchDataStatus } from '../constants/store'
import { routes } from '../constants/routes'
import { TYPE_SUCCESS } from '../constants/action-types'
import { createFetchArticleText, deleteArticle } from '../store/actionCreators'
import { getArticleById } from '../store/selectors'

export const ArticleComponent = (props) => {
  const { article, id, isOpen, toggleOpen, deleteArticle, fetchArticleText, asLink } = props

  useEffect(() => {
    if (isOpen && (!article || article.status !== fetchDataStatus[TYPE_SUCCESS])) {
      fetchArticleText(id)
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
        <CommentsConnected id={1} commentIds={article.comments} articleId={article.id} />

        <NewCommentForm articleId={article.id}></NewCommentForm>
      </>
    ) : (
      <Loader />
    )
  }

  const articleTitle = () =>
    asLink ? (
      <Link to={`${routes.ROUTE_ARTICLES}/${article.id}`}>
        <h2>{article.title}</h2>
      </Link>
    ) : (
      <h2>{article.title}</h2>
    )

  if (!article) return null

  return (
    <li className="article-list__item">
      {articleTitle()}
      <button data-test-delete-article="true" onClick={onDeleteClick}>
        Remove
      </button>
      {asLink && (
        <button data-test-expand-article="true" onClick={onToggleClick}>
          {buttonExpandText}
        </button>
      )}
      {articleContent()}
    </li>
  )
}

ArticleComponent.propTypes = {
  article: PropTypes.shape(),
  isOpen: PropTypes.bool,
  toggleOpen: PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
  article: getArticleById(state, ownProps.id)
})

const mapDispatchToProps = (dispatch) => ({
  deleteArticle: (id) => dispatch(deleteArticle(id)),
  fetchArticleText: (id) => dispatch(createFetchArticleText(id))
})

export const Article = connect(mapStateToProps, mapDispatchToProps)(ArticleComponent)
