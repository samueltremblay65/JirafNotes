import React from 'react'
import JirafItem from './JirafItem';

export default function ListsView({jirafItems}) {
    var counter = 0;
    const numberColumns = 2;

    const columnArrays = [[],[]];

    jirafItems.forEach(element => {
        columnArrays[counter % numberColumns].push(<JirafItem key={element.title} jirafItem={element}/>);
        counter++;
    });

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
    </div>
  );
}
