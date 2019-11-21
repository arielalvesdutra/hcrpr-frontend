import React from 'react'

import './List.scss'

interface IListProps {
  items: ListItem[]
}

export interface ListItem {
  title: string,
  description?: string
}

const List = (props: IListProps) => 
  <ul className="list">
    {props.items.map((item, key) => (
      <li className="list__item" key={key}>
        {item.title}
      </li>
    ))}
  </ul>

export default List
