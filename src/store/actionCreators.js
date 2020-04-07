import { fromJS, Map } from 'immutable'
import { createAction } from 'redux-actions'

import { keyBy } from 'lodash'
import { push, replace } from 'connected-react-router'
import {
  SET_FILTER_DATE_FROM,
  SET_FILTER_DATE_TILL,
  ADD_COMMENT,
  DELETE_ARTICLE,
  POPULATE_ARTICLES,
  POPULATE_COMMENTS,
  SET_FETCH_STATUS,
  TYPE_SUCCESS,
  TYPE_REQUEST,
  TYPE_ERROR,
  ADD_ARTICLE
} from '../constants/action-types'

import {
  FETCH_ARTICLES_STATUS_KEY,
  REQUEST,
  SUCCESS,
  ERROR,
  fetchDataStatus
} from '../constants/store'
import { getFetchUrl } from '../helpers/api-helpers'

export const setFilterDateFrom = createAction(SET_FILTER_DATE_FROM)

export const setFilterDateTill = createAction(SET_FILTER_DATE_TILL)

export const addNewAutoComment = (payload) => {
  return {
    type: ADD_COMMENT,
    payload,
    generateId: true,
    generateComment: true
  }
}

export const addNewComment = (comment) => {
  return {
    type: ADD_COMMENT,
    payload: comment,
    generateId: true
  }
}

export const deleteArticle = (id) => ({
  type: DELETE_ARTICLE,
  payload: { articleId: id }
})

const MODERATION_TIMEOUT = 1000

export const moderateAsync = (payload) => (dispatch) =>
  setTimeout(() => {
    return new Promise((resolve, reject) => {
      const dice = Math.floor(Math.random() * 10) - 5

      dice > 0 ? resolve() : reject()
    }).then(
      () => {
        console.log('Moderation accept')
        return dispatch(addNewAutoComment(payload))
      },
      () => {
        console.log('Moderation reject')
      }
    )
  }, MODERATION_TIMEOUT)

const createFetchStatus = (type, status) => ({
  type,
  payload: {
    status: fetchDataStatus[status]
  }
})

const createFetchStatusRequest = (type) => createFetchStatus(type, TYPE_REQUEST)
const createFetchStatusSuccess = (type) => createFetchStatus(type, TYPE_SUCCESS)
const createFetchStatusError = (type) => createFetchStatus(type, TYPE_ERROR)

export const createFetchAllArticles = (type) =>
  fetchRecordsToMap({
    type: POPULATE_ARTICLES
  })

export const createFetchAllArticleComments = (id) =>
  fetchRecordsToMap({
    id,
    type: POPULATE_COMMENTS
  })

const fetchRecordsToMap = (options) => (dispatch) => {
  const { type, id } = options

  const url = getFetchUrl({ type, id })

  dispatch(createFetchStatusRequest(type))

  return fetch(url)
    .then((response) => response.json())
    .then(
      (response) => {
        const data = keyBy(response, (article) => article.id)
        dispatch({ type: `${type}_${TYPE_SUCCESS}`, payload: fromJS(data) })
        dispatch(createFetchStatusSuccess(type))
      },
      (error) => dispatch(createFetchStatusError(type))
    )
}

export const createFetchArticleText = (id) =>
  fetchApiRecord({
    id,
    type: ADD_ARTICLE
  })

const fetchApiRecord = (payload) => (dispatch) => {
  const { type, id } = payload
  const url = getFetchUrl({ type, id })

  //dispatch(createFetchRecordStatusRequest(payload))

  return fetch(url)
    .then((response) => {
      if (response.status > 400) throw 'error'
      return response.json()
    })
    .then(
      (response) => {
        dispatch({
          type: `${type}_${TYPE_SUCCESS}`,
          payload: fromJS({
            ...response,
            status: fetchDataStatus[TYPE_SUCCESS]
          })
        })
      },
      (error) => {
        dispatch(replace(`/${error}`))
      } //dispatch(createFetchStatusError(type))
    )
}
