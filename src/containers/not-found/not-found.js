import React from 'react'
import Helmet from 'react-helmet'

export default function NotFound() {
  return (
    <div className='container'>
      <Helmet title='404' />
      <h1>404 - Page Not Found</h1>
      <p>These are not the droids you are looking for.</p>
    </div>
  )
}
