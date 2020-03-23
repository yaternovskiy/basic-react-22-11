import React, { useState } from 'react'
import { collapsible } from '../decorators/accordion'

const Article = (props) => {
  const { title, text, collapsed, collapse } = props

  return (
    <article>
      <h2>{title}</h2>
      <button onClick={() => collapse(!collapsed)}>{!collapsed ? '-' : '+'}</button>
      {!collapsed && <p>{text}</p>}
    </article>
  )
}

export const ArticleCollapsible = collapsible(Article)
