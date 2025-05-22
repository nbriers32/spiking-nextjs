import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
};

const NotFoundPage = () => {
  return (
    <>
        <title> 404: Page Not Found </title>
        <h1> Oops! The page you are looking for does not exist</h1>
    </>
  )
}

export default NotFoundPage