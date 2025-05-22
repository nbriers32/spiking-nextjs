import Link from 'next/link';
import React from 'react'

interface User {
  id: number,
  name: string,
}

const UsersPage = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    cache: 'no-store'
  })
  const users: User[] = await res.json();

  return (
    <>
      <h1> Users</h1>
      <ul>
        { users.map(user => <li key={user.id}><Link href={`/users/${user.id}`}> {user.name}  </Link></li>) }
      </ul>
    </>
  )
}

export default UsersPage 