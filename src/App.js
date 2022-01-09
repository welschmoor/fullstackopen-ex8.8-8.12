
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import BirthYearForm from './components/BirthYearForm'
import LoginForm from './components/LoginForm'

import { useQuery, useApolloClient } from '@apollo/client'


import { ALL_AUTHORS, ALL_BOOKS, EDIT_YEAR } from './graphql/queries'
import { useEffect } from 'react'




const App = () => {
  const [token, setToken] = useState(null)
  console.log("token", token)
  const [error, setError] = useState(null)
  const [page, setPage] = useState('authors')
  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)
  const client = useApolloClient()
  console.log("booksResult", booksResult)

  // keep user always logged in as long as there's token inside localstorage
  useEffect(() => {
    const tokenLS = window.localStorage.getItem('bookapp-user-token')
    if (tokenLS) {
      setToken(tokenLS)
    }
  }, [token])

  const notifyError = (message) => {
    setError(message)
    setTimeout(() => {
      setError('')
    }, 3000)
  }

  const logout = () => {

    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>

      <div>  {error && <span>{error}</span>}  </div>
      {!token && <LoginForm setToken={setToken} setError={notifyError} />}
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button type="button" onClick={logout}>logout</button>}
      </div>

      <Authors
        show={page === 'authors'}
        result={authorsResult}
      />

      <Books
        show={page === 'books'}
        booksResult={booksResult}
      />

      {token && <NewBook
        show={page === 'add'}
      />}
      <br />
      <br />
      <br />
      <BirthYearForm authorsResult={authorsResult} />
    </div>
  )
}

export default App