import React from 'react'
import trash from './DeleteBinTransparent.png'

export default function LabelList({labels, deleteCallback}) {

  function handleDelete(label)
  {
    deleteCallback(label);
  }

  const labelItems = [];

  if(labels.length <= 1)
  {
    return (<div><p>No labels to manage</p></div>);
  }

  for(var i = 0; i < labels.length; i++)
  {
    if(!(labels[i].label === "All"))
    {
      const label = labels[i];
      labelItems.push(<div key={labels[i].label} className="flex space_between borders manageLabelsLabel">
      <p className='inline space_between mg-0'>{label.label}</p>
      <button className='mg-block-5 red space_between auto_height' onClick={() => handleDelete(label)}><img src={trash} alt="delete icon" height="16px"/></button>
    </div>);
    }
  }

  return (
    <div>
      {labelItems}
    </div>
  )
}
