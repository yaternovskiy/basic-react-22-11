import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { setFilterDateFrom, setFilterDateTill } from '../store/actionCreators'

const FilterWrapper = (props) => {
  const dispatch = useDispatch()

  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  const onChangeDateFrom = (date) => {
    setStartDate(date)
    dispatch(setFilterDateFrom(date))
  }

  const onChangeDateTill = (date) => {
    setEndDate(date)
    dispatch(setFilterDateTill(date))
  }

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={onChangeDateFrom}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        selected={endDate}
        onChange={onChangeDateTill}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </>
  )
}

export const Filter = FilterWrapper
