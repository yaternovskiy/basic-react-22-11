import React, { useState } from 'react'
import { collapsible } from '../decorators/accordion'

export const Article = (props) => {
  const { article, isOpen, toggleOpen } = props

  const onToggleClick = () => {
    toggleOpen(article.id)
  }

  return (
    <li>
      <h2>{article.title}</h2>
      <button onClick={onToggleClick}>{isOpen ? '-' : '+'}</button>
      {isOpen && <p>{article.text}</p>}
    </li>
  )
}
