import React from 'react'
import {useRef} from 'react'
import JirafItem from './JirafItem';
import { v1 as uuid } from 'uuid';

export default function ListsView({jirafItems, editCallback}) {
    var counter = 0;
    const numberColumns = 2;

    const createModalRef = useRef();
    const createTitleRef = useRef();
    const createContentRef = useRef();

    const columnArrays = [[],[]];

    var currentJiraf;

    jirafItems.forEach(element => {
        columnArrays[counter % numberColumns].push(<JirafItem key={uuid()} jirafItem={element} editCallback={() => showEditModal(element)}/>);
        counter++;
    });

    function showEditModal(jirafItem)
    {
        createTitleRef.current.value = jirafItem.title;
        createContentRef.current.value = jirafItem.message;
        createModalRef.current.showModal();
        currentJiraf = jirafItem;
    }

    function editJiraf()
    {
        const newJiraf = {title:currentJiraf.title, message:currentJiraf.message, labels:currentJiraf.labels, color: currentJiraf.color, id:currentJiraf.id};
        newJiraf.title = createTitleRef.current.value;
        newJiraf.message = createContentRef.current.value;
        editCallback(newJiraf);
        createModalRef.current.close();
    }

  return (
    <div className="column_container">
        <div className="column">
            <ul>{columnArrays[0]}</ul>
        </div>
        <div className="column">
            <ul>{columnArrays[1]}</ul>
        </div>
        <div className="column">

        </div>
        <dialog ref={createModalRef} className="jirafModal">
            <label>Edit note</label>
            <input className="form_input block" type="text" ref={createTitleRef} placeholder="title"></input>
            <textarea ref={createContentRef} placeholder='take a note...'></textarea>
            <div className='centered'>
                <button className='float_right' onClick={editJiraf}>Save changes</button>
            </div>
        </dialog>
    </div>
  );
}
