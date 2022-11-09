import React from 'react'

export default function JirafItem({jirafItem}) {
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
                contentItems.push(<br></br>);
            }
            else
            {
                contentItems.push(<p key="element">{element}</p>);
            }
        });
    }
     
  return (
    <div className={tmpClassName}>
      <h1>{jirafItem.title}</h1>
      <p>{jirafItem.subtitle}</p>
      <ul>{contentItems}</ul>
    </div>
  )
}
