import React from 'react'
import { notFound } from 'next/navigation'

const NotFoundButton = () => {
  return (
    <button onClick={() => notFound()}> Take Me To 404 </button>
  )
}

export default NotFoundButton