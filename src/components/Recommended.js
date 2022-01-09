import { useQuery } from '@apollo/client'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ME } from '../graphql/queries'


const Books = (props) => {
  const [filterST, setFilterST] = useState('')
  const [filteredBookList, setFilteredBookList] = useState([])
  const books = props?.booksResult?.data?.allBooks

  const author = useQuery(ME)
  console.log('author', author?.data?.me.favoriteGenre)

  useEffect(() => {
    const filter = author?.data?.me.favoriteGenre
    setFilterST(filter)
  }, [author])

  useEffect(() => {
    console.log('useeff')
    setFilteredBookList(books)
  }, [books])


  useEffect(() => {

    if (!filterST || !books || books.length < 1) return;

    const filteredBooksByGenre = books.filter(e => {
      return e.genres.includes(filterST)
    })
    setFilteredBookList(filteredBooksByGenre)
  }, [filterST, books])


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
      {author?.data?.me &&
        <>
          <h2>books</h2>
          <h4>Showing genre: {filterST} </h4>

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
        </>
      }
    </div>
  )
}

export default Books