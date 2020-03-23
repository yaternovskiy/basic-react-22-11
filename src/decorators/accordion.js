import React, { useState } from 'react'

export const Accordion = (WrappedComponent) => (props) => {
  const [openId, toggleOpenId] = useState()

  const expandCollapse = (id) => toggleOpenId(id === openId ? null : id)

  return (
    <>
      <WrappedComponent openId={openId} toggleOpen={expandCollapse} {...props} />
    </>
  )
}
