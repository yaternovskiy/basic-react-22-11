import React from 'react'
import CommentsList from './comments-list'

function Article(props) {
  const { article, isOpen, toggleOpen } = props
  return (
    <div>
      <h3>{article.title}</h3>
      <button onClick={toggleOpen}>{isOpen ? 'close' : 'open'}</button>
      {getBody(props)}
    </div>
  )
}

function getBody({ isOpen, article }) {
  if (!isOpen) return null

  return (
    <section>
      <div>{article.text}</div>
      <CommentsList comments={article.comments} />
    </section>
  )
}

export default Article
