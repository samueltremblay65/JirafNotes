import React from 'react'

export default function JirafItem({jirafItem}) {
  return (
    <div className='half_width'>
      <h1>{jirafItem.title}</h1>
      <p>{jirafItem.message}</p>
      <hr/>
    </div>
  )
}
