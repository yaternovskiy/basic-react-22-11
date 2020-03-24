import React from 'react'
import PropTypes from 'prop-types'

import { Comments } from './comments'

export const Article = (props) => {
  const { article, isOpen, toggleOpen } = props

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
          <Comments id={1} comments={article.comments} />
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
