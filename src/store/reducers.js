const defaultState = {
  filter: {
    fromDate: '',
    tillDate: ''
  }
}

export const filterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'DATE_FROM':
      return {
        ...state,
        filter: {
          ...state.filter,
          dateFrom: action.payload
        }
      }
    case 'DATE_TILL':
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTill: action.payload
        }
      }
    default:
      return state
  }
}
