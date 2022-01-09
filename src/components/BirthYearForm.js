// exercise 8.12

import React, { useState, useEffect } from "react"
import Select from 'react-select'
import { useMutation } from '@apollo/client'


import { ALL_AUTHORS, ALL_BOOKS, EDIT_YEAR } from '../graphql/queries'



const BirthYearForm = ({ authorsResult }) => {
  const [changeAuthorYear, result] = useMutation(EDIT_YEAR, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })
  const [selectOptions, setSelectOptions] = useState([])

  console.log("result", result)
  console.log("AR", authorsResult)

  const changeYearHandler = e => {
    e.preventDefault()
    changeAuthorYear({
      variables: {
        name: e.target.authorname.value,
        setBornTo: parseInt(e.target.birthyear.value)
      }
    })
  }

  useEffect(() => {
    if (authorsResult.data) {
      const options = authorsResult.data.allAuthors.map(e => {
        return { value: e.name, label: e.name }
      })
      setSelectOptions(options)
    }
  }, [authorsResult])

  return (

    <form onSubmit={changeYearHandler}>
      <Select options={selectOptions} name="authorname" />

      <input type="number" placeholder='birthyear' name="birthyear" />
      <button type="submit">Submit</button>
    </form>
  )
}

export default BirthYearForm