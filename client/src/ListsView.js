import React from 'react'
import JirafItem from './JirafItem';

export default function ListsView({ jirafItems}) {
    const itemMap = jirafItems.map( jirafItem => {return <JirafItem key={jirafItem.title} jirafItem={jirafItem}/>});
  return (
    <div>
        <ul>{itemMap}</ul>
    </div>
  );
}
