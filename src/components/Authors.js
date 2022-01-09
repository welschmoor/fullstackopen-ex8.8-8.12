
import React from 'react'

const Authors = (props) => {
  console.log(props.result)
  if (!props.show) {
    return null
  }
  if (props.result.loading) {
    return <div>loading...</div>
  }

  // 
  const authors = props?.result?.data?.allAuthors
  if (!authors || authors.length < 1) {
    return <div>No authors to load</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Authors
