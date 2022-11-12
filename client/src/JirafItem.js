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

        for(var i = 0; i < contentLines.length; i++)
        {
          if(contentLines[i].trim() === "")
          {
            contentItems.push(<br key={uuid()}></br>);
          }
          else if(contentLines[i].startsWith("- "))
          {
            var listItems = [];
            listItems.push(<li className="bulleted" key={uuid()}>{contentLines[i].substring(2, contentLines[i].length)}</li>);
            while(contentLines[++i] != null && contentLines[i].startsWith("- "))
            {
              listItems.push(<li className='bulleted' key={uuid()}>{contentLines[i].substring(2, contentLines[i].length)}</li>);
            }
            contentItems.push(<ul>{listItems}</ul>);
          }
          else
          {
            contentItems.push(<p key={uuid()}>{contentLines[i]}</p>);
          }
        }
    }
     
  return (
    <div className={tmpClassName} onClick={() => editCallback(jirafItem.id)}>
      <h1>{jirafItem.title}</h1>
      <p>{jirafItem.subtitle}</p>
      <ul>{contentItems}</ul>
    </div>
  )
}
