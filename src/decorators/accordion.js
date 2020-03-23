import React, { useState } from 'react'

export const collapsible = (WrappedComponent) => (props) => {
  const [collapsed, collapse] = useState(true)

  return (
    <>
      <WrappedComponent collapsed={collapsed} collapse={collapse} {...props} />
    </>
  )
}
