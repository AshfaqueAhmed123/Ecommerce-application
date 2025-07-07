import React from 'react'
import { fetchAll } from './services/product/product.services.js'

const App = () => {

  (async()=>{    
    
    await fetchAll({
      limit:100
    })

  })()

  return (
    <div
    className='w-[100vw] h-[100vh] bg-black text-white'
    >App</div>
  )
}

export default App