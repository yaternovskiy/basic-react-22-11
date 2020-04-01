import { TYPE_REQUEST, TYPE_SUCCESS, TYPE_ERROR } from './action-types'

export const GLOBAL_FETCH_STATUS_KEY = 'globalFetch'

export const fetchDataStatus = {
  [TYPE_REQUEST]: 'loading',
  [TYPE_SUCCESS]: 'loaded',
  [TYPE_ERROR]: 'error'
}
