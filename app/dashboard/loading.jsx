import React from 'react'
import { CircleLoader } from 'react-spinners'

const loading = () => {
  return (
    <main className='h-screen flex items-center justify-center mt-28' >
            <CircleLoader size={150} color='#BB8D3F' />
      </main>
  )
}

export default loading