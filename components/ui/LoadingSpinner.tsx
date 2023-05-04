import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export const LoadingSpinner = () => {
  return (
    <div className='fixed inset-0 text-white text-4xl top-1/2 left-1/2'>
        <AiOutlineLoading3Quarters className='animate-spin'/>
    </div>
  )
}
