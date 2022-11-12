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
    const colorSelector = useRef();

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
        editCallback(newJiraf, false);
        createModalRef.current.close();
    }

    function deleteJiraf()
    {
        editCallback(currentJiraf, true);
        createModalRef.current.close();
    }

    function changeColor()
    {
        const color = colorSelector.current.value;
        currentJiraf.color = color;
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
            <div>
                <button className='mg-inline-5 float_right' onClick={editJiraf}>Save changes</button>
                <button className='mg-inline-5 float_right red' onClick={deleteJiraf}>Delete note</button>
                <select className="float_right" ref={colorSelector} onChange={changeColor}>
                    <option value="" disabled>Select a color</option>
                    <option value="yellow">White</option>
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
    </div>
  );
}
