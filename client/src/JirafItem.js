import React from 'react'

export default function JirafItem({jirafItem}) {
    var tmpClassName;
    if(jirafItem.color != null) tmpClassName = "jirafItem " + jirafItem.color;
    else tmpClassName = "jirafItem";
     
  return (
    <div className={tmpClassName}>
      <h1>{jirafItem.title}</h1>
      <p>{jirafItem.subtitle}</p>
      <p>{jirafItem.message}</p>
    </div>
  )
}
