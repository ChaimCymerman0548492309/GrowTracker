import React from 'react'
import { useNavigate } from 'react-router-dom'
import { functionToDoInterface } from '../../../interfaces/functionToDo'

function NuvButteneAndFunc(pageToNuvTo : string , functionToDo : functionToDoInterface ) {
    const nav = useNavigate()

    functionToDo()
    nav(pageToNuvTo)

  return (
    <div>NuvButteneAndFunc</div>
  )
}

export default NuvButteneAndFunc