import React from 'react'
import { useNavigate } from 'react-router-dom'

function NuvButtene(pageToNuvTo : string) {
    const nav = useNavigate()
    nav(pageToNuvTo)
  return (
    <div>
        <button>
        NuvButtene
        </button>
        </div>
  )
}

export default NuvButtene