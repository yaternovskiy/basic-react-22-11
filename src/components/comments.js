import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCommentsByIds, getStatusArticleCommentLoaded } from '../store/selectors'
import { Loader } from './loader'
import { createFetchAllArticleComments } from '../store/actionCreators'

const renderComments = (comments) => {
  return (
    <>
      {comments
        ? comments.valueSeq().map((comment) => (
            <li key={comment.get('id')}>
              <h4 data-test="comment username">{comment.get('user')}</h4>
              <p>{comment.get('text')}</p>
            </li>
          ))
        : null}
    </>
  )
}

export const Comments = (props) => {
  const { comments, articleId, fetchingStatus, fetchComments } = props

  const [isOpen, toggleOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    fetchComments(articleId)
  }, [isOpen])

  const expandCollapse = () => toggleOpen(!isOpen)

  const buttonText = isOpen ? 'Hide comments' : 'Show comments'

  const isLoading = false

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <button data-test-show-comments="true" onClick={expandCollapse}>
            {buttonText}
          </button>
          <ul>{isOpen && renderComments(comments)}</ul>
        </>
      )}
    </div>
  )
}

Comment.PropTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape())
}

Comment.defaultProps = {
  comments: []
}

const mapStateToProps = (state, ownProps) => {
  return {
    comments: getCommentsByIds(state, ownProps.commentIds),
    fetchingStatus: getStatusArticleCommentLoaded(state, ownProps.articleId)
  }
}

const mapDispathToProps = (dispatch) => ({
  fetchComments: (id) => dispatch(createFetchAllArticleComments(id))
})

export const CommentsConnected = connect(mapStateToProps, mapDispathToProps)(Comments)
