import React from 'react'
import { useRef } from 'react';
import logo from "./JirafLogo.PNG"
import LabelList from './LabelList';

export default function Sidebar({labels, labelChangeHandler, labelAddHandler, labelDeleteHandler}) {

    const addLabelDialog = useRef();
    const errorMessageLabel = useRef();
    const addLabelInput = useRef();
    const manageLabelsDialog = useRef();

    var labelList;
    if(labels == null)
    {
        labelList = null;
    }
    else
    {
        labelList = labels.map(label => {return <li onClick={() => labelSelector(label.label)} key={label.label} className={(label.selected) ? "selected_li": ""}>{label.label}</li>});
    }

    function labelSelector(label)
    {
        labelChangeHandler(label);
    }

    function showDialog()
    {
        addLabelDialog.current.showModal();
    }

    function addLabel()
    {
        const newLabelName = addLabelInput.current.value.trim();
        if(newLabelName === "")
        {
            errorMessageLabel.current.innerHTML = "Please enter a label name";
        }
        else
        {
            var found = false;
            labels.forEach(element => {
                if(newLabelName === element.label)
                {
                    found = true;
                }
            });

            if(found)
            {
                errorMessageLabel.current.innerHTML = "This label already exists";
            }
            else
            {
                labelAddHandler(addLabelInput.current.value.trim());
                addLabelInput.current.value = "";
                addLabelDialog.current.close();
                errorMessageLabel.current.innerHTML = "";
            }
        }
    }

    function deleteHandler(id)
    {
        labelDeleteHandler(id)
    }

    function showManageLabels()
    {
        manageLabelsDialog.current.showModal();
    }

    return (
        <div className='sidebar'>
            <img src={logo} width="100px" alt='logo'/>
            <ul>{labelList}</ul>
            <hr />
            <button className="fullWidth" onClick={showDialog}>Add Label</button>
            <button className="fullWidth red mg_top_10" onClick={showManageLabels}>Manage Labels</button>

            <dialog ref={addLabelDialog}>
                <label htmlFor="">Create new label</label>
                <input ref={addLabelInput} type="text" placeholder='Label name' />
                <button onClick={addLabel}>Add</button>
                <p className="error_message" ref={errorMessageLabel}></p>
            </dialog>

            <dialog className="manageLabelsDialog" ref={manageLabelsDialog}>
                <label>Manage labels</label>
                <LabelList labels={labels} deleteCallback={deleteHandler}/>
            </dialog>
        </div>
    )
}
