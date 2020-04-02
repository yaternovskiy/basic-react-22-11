import React from 'react'
import { ConnectedRouter as Router } from 'connected-react-router'

export const LocaleSwitcher = ({ langs, setter }) => (
  <div>
    {langs.map((lang) => (
      <button onClick={() => setter(lang)}>{lang.toUpperCase()}</button>
    ))}
  </div>
)
