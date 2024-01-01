import React, { useState } from 'react'
// import NuvButteneAndFunc from '../../components/Buttons/NuvButteneAndFunc.tsx/NuvButteneAndFunc'
import NuvButtene from '../../../gardens/components/Buttons/NuvButtene/NuvButtene'

function Sign_in() {
  const[page ,setPage ] = useState('')
  return (
    <div>Sign_in
      <NuvButtene pageToNuvTo={page} />
    </div>
  )
}

export default Sign_in