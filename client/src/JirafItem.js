import React from 'react'
import { v1 as uuid } from 'uuid';

export default function JirafItem({jirafItem, editCallback}) {
    var tmpClassName;
    if(jirafItem.color != null) tmpClassName = "jirafItem " + jirafItem.color;
    else tmpClassName = "jirafItem";

    var contentItems = [];

    formatMessage();

    function formatMessage()
    {
        var contentLines = jirafItem.message.split("\n");
        contentLines.forEach(element => {
            if(element.trim() === "")
            {
                contentItems.push(<br key={uuid()}></br>);
            }
            else
            {
                contentItems.push(<p key={uuid()}>{element}</p>);
            }
        });
    }
     
  return (
    <div className={tmpClassName} onClick={() => editCallback(jirafItem.id)}>
      <h1>{jirafItem.title}</h1>
      <p>{jirafItem.subtitle}</p>
      <ul>{contentItems}</ul>
    </div>
  )
}
