export const setFilterDateFrom = (date) => {
  return { type: 'DATE_FROM', payload: date }
}

export const setFilterDateTill = (date) => {
  return { type: 'DATE_TILL', payload: date }
}
