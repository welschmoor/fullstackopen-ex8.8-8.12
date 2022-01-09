import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Books = (props) => {
  const [filterST, setFilterST] = useState('all')
  const [filteredBookList, setFilteredBookList] = useState([])
  const books = props?.booksResult?.data?.allBooks

  useEffect(() => {
    console.log('useeff')
    setFilteredBookList(books)
  }, [books])


  if (!props.show) {
    return null
  }

  if (props.booksResult.loading) {
    return (
      <div>Loading...</div>
    )
  }
  // 8.9

  if (!books || books.length < 1) {
    return <div>No books</div>
  }

  if (books?.length < 1) {
    return (
      <div>No books!</div>
    )
  }
  console.log(books)

  //ex8.19
  const filterClickHandler = (filter) => {
    setFilterST(filter)
    if (filter === 'all') {
      setFilteredBookList(books)
      return
    }
    const filteredBooksByGenre = books.filter(e => {
      return e.genres.includes(filter)
    })
    setFilteredBookList(filteredBooksByGenre)
  }

  return (
    <div>
      <h2>books</h2>
      <h4>Filter by genre: {filterST} </h4>
      <button onClick={() => filterClickHandler('all')}>all</button>
      <button onClick={() => filterClickHandler('crime')}>crime</button>
      <button onClick={() => filterClickHandler('scifi')}>scifi</button>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBookList && filteredBookList.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books