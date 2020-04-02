import React from 'react'
import { Link } from 'react-router-dom'

import { links } from '../constants/routes'

export const Navigation = (props) => {
  return (
    <nav>
      <ul>
        {links &&
          Object.keys(links).map((linkKey) => {
            const link = links[linkKey]
            return (
              <li>
                <Link to={link.url}>{link.name}</Link>
              </li>
            )
          })}
      </ul>
    </nav>
  )
}
