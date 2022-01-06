
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import BirthYearForm from './components/BirthYearForm'

import { useQuery, useMutation } from '@apollo/client'


import { ALL_AUTHORS, ALL_BOOKS, EDIT_YEAR } from './graphql/queries'




const App = () => {
  const [page, setPage] = useState('authors')
  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        result={authorsResult}
      />

      <Books
        show={page === 'books'}
        booksResult={booksResult}
      />

      <NewBook
        show={page === 'add'}
      />
      <br />
      <br />
      <br />
      <BirthYearForm authorsResult={authorsResult} />
    </div>
  )
}

export default App