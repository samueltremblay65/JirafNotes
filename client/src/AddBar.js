import React from 'react'
import { useRef } from 'react';

export default function AddBar({newJirafMethod}) {
    const titleInputRef = useRef();
    const createModalRef = useRef();
    const createTitleRef = useRef();
    const createContentRef = useRef();

    function openCreateModal()
    {
        createTitleRef.current.value = titleInputRef.current.value;
        titleInputRef.current.value = "";
        createModalRef.current.showModal();
    }

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
        if(createContentRef.current.value.trim() === "" && createTitleRef.current.value.trim() === "")
        {
            newJirafMethod("New note", "", colorName);
        }
        else
        {
            newJirafMethod(createTitleRef.current.value, createContentRef.current.value, colorName);
        }
        createTitleRef.current.value = "";
        createContentRef.current.value = "";
        createModalRef.current.close();
    }

  return (
    <>
        <div className='add_bar'>
            <input ref={titleInputRef} type="text" placeholder='Take a note'/>
            <button className="ml_20" onClick={openCreateModal}>Create</button>
        </div>
        <dialog ref={createModalRef} className="createModal">
            <label>New Note</label>
            <input className="form_input block" type="text" ref={createTitleRef} placeholder="title"></input>
            <textarea ref={createContentRef} placeholder='take a note...'></textarea>
            <div className='centered'>
                <button className='float_right' onClick={addJiraf}>Create note</button>
            </div>
        </dialog>
    </>
  )
}
