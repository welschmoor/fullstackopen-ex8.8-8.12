import React from 'react'

const Books = (props) => {
  if (!props.show) {
    return null
  }

  if (props.booksResult.loading) {
    return (
      <div>Loading...</div>
    )
  }
  // 8.9
  const books = props.booksResult.data.allBooks
  console.log(books)
  
  return (
    <div>
      <h2>books</h2>

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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books