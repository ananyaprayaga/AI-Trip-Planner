import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
function Hero() {
   return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1
        className='font-extrabold text-[60px] text-center mt-16'>
       <span className='text-[#AEBDE8]' >No more trip planning stress with AI: </span>Vacation itineraries made EZ-PZ!</h1>
        <p className='text-xl text-gray-600 text-center'>We plan your trip for you so that you can focus on relaxing and not planning.</p>
        <Link to={'/create-trip'}>
        <Button>Let's Get Started!</Button>
        </Link>
    </div>
  )
}

export default Hero