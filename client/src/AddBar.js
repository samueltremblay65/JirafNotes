import React from 'react'
import { useRef } from 'react';

export default function AddBar({newJirafMethod}) {
    const titleInputRef = useRef();
    const createModalRef = useRef();
    const createTitleRef = useRef();
    const createContentRef = useRef();
    const selectColorRef = useRef();

    function openCreateModal()
    {
        createTitleRef.current.value = titleInputRef.current.value;
        titleInputRef.current.value = "";
        createModalRef.current.showModal();
    }

    function addJiraf()
    {
      var color = selectColorRef.current.value;
      if(color === "")
      {
        color = "white";
      }
      if(createContentRef.current.value.trim() === "" && createTitleRef.current.value.trim() === "")
      {
        newJirafMethod("New note", "", color);
      }
      else
      {
        newJirafMethod(createTitleRef.current.value, createContentRef.current.value, color);
      }
      createTitleRef.current.value = "";
      createContentRef.current.value = "";
      createModalRef.current.close();
      selectColorRef.current.value = "";
    }

  return (
    <>
        <div className='add_bar'>
            <input ref={titleInputRef} type="text" placeholder='Take a note'/>
            <button className="ml_20" onClick={openCreateModal}>Create</button>
        </div>
        <dialog ref={createModalRef} className="jirafModal">
            <label>New Note</label>
            <input className="form_input block" type="text" ref={createTitleRef} placeholder="title"></input>
            <textarea ref={createContentRef} placeholder='take a note...'></textarea>
            <div>
              <button className='float_right' onClick={addJiraf}>Create note</button>
              <select className='float_right' ref={selectColorRef}>
                <option value="" disabled>Select a color</option>
                <option value="white">White</option>
                <option value="yellow">Yellow</option>
                <option value="orange">Orange</option>
                <option value="red">Red</option>
                <option value="pink">Pink</option>
                <option value="purple">Purple</option>
                <option value="blue">Blue</option>
                <option value="lightblue">Light blue</option>
                <option value="lightgreen">Light green</option>
                <option value="yellowgreen">Yellow-Green</option>
              </select>
            </div>
        </dialog>
    </>
  )
}
