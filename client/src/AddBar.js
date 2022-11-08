import React from 'react'
import { useRef } from 'react';

export default function AddBar({newJirafMethod}) {
    const inputRef = useRef();

    function addJiraf()
    {
        const random_color = Math.floor(Math.random() * 9);
        var colorName;
    
        switch(random_color){
          case 0:
            colorName = "yellow";
            break;
          case 1:
            colorName = "orange";
            break;
          case 2:
            colorName = "red";
            break;
          case 3:
            colorName = "pink";
            break;
          case 4:
            colorName = "purple";
            break;
          case 5:
            colorName = "blue";
            break;
          case 6:
            colorName = "lightblue";
            break;
          case 7:
            colorName = "lightgreen";
            break;
          case 8:
            colorName = "yellowgreen";
            break;
          default:
            colorName = "white";
            break;
        }
        newJirafMethod(inputRef.current.value, "New item description", colorName);
        inputRef.current.value = "";
    }

  return (
    <>
        <div className='add_bar'>
            <input ref={inputRef} type="text" placeholder='Take a note'/>
            <button onClick={addJiraf}>Create</button>
        </div>
    </>
  )
}
