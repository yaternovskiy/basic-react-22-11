import {
  generateId,
  generateDateTime,
  generateUsername,
  generateSentence
} from '../helpers/generate'

import { ADD_COMMENT } from '../constants/action-types'

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
  switch (action.type) {
    case ADD_COMMENT:
      if (action.generateComment)
        return next({
          ...action,
          payload: {
            ...action.payload,
            user: generateUsername(),
            text: generateSentence()
          }
        })
    default:
      return next(action)
  }
}

export const addDate = (store) => (next) => (action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return next({
        ...action,
        payload: {
          ...action.payload,
          date: generateDateTime()
        }
      })
    default:
      return next(action)
  }
}

export const errorLogger = (store) => (next) => (action) => {
  try {
    next(action)
  } catch (e) {
    console.error(`Error: ${e};`, { state: store.getState(), action })
  }
}
