import Link from 'next/link';
import React from 'react'

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
}

const UsersPage = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    cache: 'no-store'
  })
  const tableHeaders = ["Name", "Username", "Contact", "Assigned Tasks", "Completed Tasks", "Incomplete Tasks"]
  const users: User[] = await res.json();

  return (
    <>
    <div className="bg-white dark:bg-gray-800 rounded p-4 shadow-lg">
      <h2 className="font-bold text-3xl"> Users</h2>
      <table className="table-auto">
        <thead>
          <tr>
            { tableHeaders.map(((header, i) => {
              return <th key={i}> {header} </th>
            }))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => {
            return <tr key={i}>
              <td> {user.name} </td>
              <td> {user.username} </td>
              <td> {user.email} {user.phone}</td>
            </tr>
          })}
        </tbody>
      </table>
      </div>
    </>
  )
}

export default UsersPage 