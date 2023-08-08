import React from 'react'
import featured from '../assets/featured.png' 
import { DeletePopup, ShowPopup, EditPopup } from '../components/popUp.jsx'
import { handleChecked} from '../utils/management.js'
export default function Task({todoItem,items,setItems}) {
    return (
        <li>
            <div>
                <input
                    type="checkbox"
                    name="check"
                    value={todoItem.id}
                    onChange={() => handleChecked(todoItem.id, setItems)}
                />
                <span style={{ textDecoration: todoItem.checked ? 'line-through' : 'none' }}>
                    {todoItem.title}
                    {todoItem.featured&& <img src={featured} title='Featured'/>}
                </span>
            </div>
            <div>
                <ShowPopup item={todoItem} />
                <EditPopup item={todoItem} setItems={setItems}/>
                <DeletePopup id={todoItem.id} items={items} setItems={setItems} />
            </div>
        </li>
    )
}
