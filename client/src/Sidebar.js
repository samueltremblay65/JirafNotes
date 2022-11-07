import React from 'react'
import logo from "./JirafLogo.PNG"

export default function Sidebar({labels, labelChangeHandler}) {

    const labelList = labels.map(label => {return <li onClick={() => labelSelector(label.label)} key={label.label} className={(label.selected) ? "selected_li": ""}>{label.label}</li>});

    function labelSelector(label)
    {
        labelChangeHandler(label);
    }

    return (
        <div className='sidebar'>
            <img src={logo} width="100px" alt='logo'/>
            <ul>{labelList}</ul>
        </div>
    )
}
