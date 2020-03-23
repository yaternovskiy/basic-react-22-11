import React from 'react'
import { Comments } from './comments'

export const Article = (props) => {
  const { article, isOpen, toggleOpen } = props

  const onToggleClick = () => {
    toggleOpen(article.id)
  }

  return (
    <li>
      <h2>{article.title}</h2>
      <button onClick={onToggleClick}>{isOpen ? '-' : '+'}</button>
      {isOpen && (
        <>
          <p>{article.text}</p>
          <Comments id={1} comments={article.comments} />
        </>
      )}
    </li>
  )
}
