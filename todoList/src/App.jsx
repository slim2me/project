import React, { useState } from "react";
import 'reactjs-popup/dist/index.css';
import { addItem,handleChange, clearList } from './utils/management.js'
import {dayOfMonth,dayName,monthName} from './utils/date.js'
import addIcon from './assets/add.png'
import Task from "./components/task.jsx";

function App() {

  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false)
  const reversed = items.slice().reverse();
  
  return (
    <div className="container">
      <div>
        <div className="heading">
          <h1>To-Do List</h1>
        </div>

        <div className="form">
          <input
            placeholder={error ? "Field cannot be empty!" : undefined}
            onChange={(event)=>handleChange(event, setInputText, setError)}
            type="text"
            value={inputText}
            className={error ? "error" : ""}
          />
          <img className="add" src={addIcon} onClick={()=>addItem(inputText, setInputText, setItems, setError)} />
        </div>
        <div className="date">
          <span>
            {dayName} / {dayOfMonth} /{monthName}
          </span>
          <span className="total">
            Total : {items && items.length}
          </span>
        </div>
        <hr />
        <div>
          <ul>
            {reversed.length > 0 && reversed.map((todoItem) => (
              <Task key={todoItem.id} todoItem={todoItem} setItems={setItems} items={items} />
            ))}
          </ul>

        </div>
      </div>
      <div className="footer" onClick={()=>clearList(setItems)}>
        <hr />
        <span style={{ visibility: items.length > 0 ? 'visible' : 'hidden' }} className="clear">
          Clear
        </span>
      </div>
    </div>
  );
}

export default App;