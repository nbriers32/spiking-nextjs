import React from 'react'
import DocumentTable from '../components/DocumentTable';

const UsersPage = () => {
  return (
    <>
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-4 shadow-lg">
      <h2 className="font-bold text-3xl"> Users</h2>
      <br></br>
      <DocumentTable/>
    </div>
    </>
  )
}

export default UsersPage 