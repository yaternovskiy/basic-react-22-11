import React, { useState } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const Filter = () => {
  const [date, setDate] = useState()

  return <DatePicker selected={date} onChange={setDate} />
}
