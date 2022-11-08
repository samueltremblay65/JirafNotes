import React from 'react'
import { useRef } from 'react';

export default function AddBar({newJirafMethod}) {
    const inputRef = useRef();

    function addJiraf()
    {
        newJirafMethod(inputRef.current.value, "New item description");
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
