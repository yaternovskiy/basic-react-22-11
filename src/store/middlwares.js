export const logger = (store) => (next) => (action) => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

export const randomId = (store) => (next) => (action) => {
  if (!action.generateId) return next(action)

  const randomId = Date.now()

  next({
    ...action,
    payload: {
      ...action.payload,
      randomId
    }
  })
}

export const randomComment = (store) => (next) => (action) => {
  if (!action.generateComment) return next(action)

  next({
    ...action,
    payload: {
      ...action.payload,
      user: 'Gilliam Underwood',
      text:
        'Velit anim deserunt elit velit est fugiat duis eiusmod eu do incididunt ut tempor voluptate. Officia dolor aliqua id anim mollit pariatur id commodo. Laborum minim non ut aliquip commodo est consectetur. Mollit eu aliqua tempor est nulla ullamco irure. Sit non amet et eiusmod cillum ex cillum anim incididunt ad laboris mollit. Sunt quis incididunt elit ea qui non ullamco aliquip consequat voluptate eiusmod est. Irure laboris amet culpa sit aliquip.'
    }
  })
}
