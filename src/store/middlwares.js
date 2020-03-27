import { generateId, generateSentence, generateParagraph } from '../helpers/generate-hash'

export const logger = (store) => (next) => (action) => {
  console.log('dispatching', action)

  let result = next(action)

  console.log('next state', store.getState())

  return result
}

export const randomId = (store) => (next) => (action) => {
  if (!action.generateId) return next(action)

  const randomId = generateId()

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
      user: generateSentence(),
      text: generateParagraph()
    }
  })
}
