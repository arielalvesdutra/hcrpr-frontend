import React from 'react'

import './List.scss'
import { Link } from 'react-router-dom'

interface IListProps {
  items: ListItem[]
  actionButtons?: any
}

export interface ListItem {
  id?: number,
  title: string,
  description?: string,
  link?: string
}

const parseItemLink = (item: ListItem, content: any) => {
  return item.hasOwnProperty("link") === true
    ? item.link && ( <Link to={item.link} className="list__item__link">{content}</Link>)
    : (<>{content}</>)
}

const List = ({items, actionButtons}:IListProps) => 
  <ul className="list">
    {items.map((item, key) => (
      <li className="list__item" key={key}>
        {parseItemLink(item, (
          <span className="list__item__content">          
            {item.id && (<span><strong>{item.id} # </strong> </span>)}
            {item.title}
          </span>
        ))}
        {actionButtons && actionButtons.map((buttonWithCallback:any ,buttonKey:any) =>
          <span key={buttonKey} className="list__item__actionButtonArea">
            {buttonWithCallback(item.id)}
          </span>
        )}
      </li>
    ))}
  </ul>

export default List
