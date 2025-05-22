
"use client";

import React from 'react'
import { useParams } from "next/navigation";

const UserPage = () => {
  const {id} = useParams()

  const idInt = parseInt(id as string, 10)

  return (
    <p> User Page Id: {isNaN(idInt) ? 'Invalid Id' : idInt}</p>
  )
}

export default UserPage