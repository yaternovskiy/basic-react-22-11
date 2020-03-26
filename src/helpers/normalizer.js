export const getNormalizedData = (data) => {
  const result = {}

  data.forEach((datum) => {
    result[datum.id] = generateNormalizedRecord(datum)
  })
  return result
}

const generateNormalizedRecord = (datum) => {
  const record = {}

  Object.keys(datum).forEach((key) => {
    if (Array.isArray(datum[key])) {
      record[`${key}Ids`] = datum[key].map((el) => el.id)
    } else {
      record[key] = datum[key]
    }
  })
  return record
}
