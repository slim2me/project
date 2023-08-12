import React, { useState } from "react";
import 'reactjs-popup/dist/index.css';
import { addItem, handleChange, clearList, searchItem } from './utils/management.js'
import { dayOfMonth, dayName, monthName } from './utils/date.js'
import addIcon from './assets/add.png'
import Task from "./components/task.jsx";

function App() {

  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const [filteredItems, setFilteredItems] = useState([]);
  const reversed = items.slice().reverse();
  const filtredReversed = filteredItems.slice().reverse();

  return (
    <div className="container">
      <div>
        <div className="heading">
          <h1>To-Do List</h1>
        </div>

        <div className="form">
          <input
            placeholder={error ? "Field cannot be empty!" : undefined}
            onChange={(event) => handleChange(event, setInputText, setError)}
            type="text"
            value={inputText}
            className={error ? "error" : ""}
          />
          <img className="add" src={addIcon} onClick={() => addItem(inputText, setInputText, setItems, setError, setFilteredItems)} />
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
          {items.length > 0 ? (
            <ul>
              {isEmpty === false && filteredItems.length > 0 ? (
                filtredReversed.map((todoItem) => (
                  <Task key={todoItem.id} todoItem={todoItem} setItems={setItems} items={items} />
                ))
              ) : (
                (isEmpty===true) ? <p>No item found</p> : reversed.map((todoItem) => (
                  <Task key={todoItem.id} todoItem={todoItem} setItems={setItems} items={items} />
                ))
              )}
            </ul>
          ) : (
            <span>Empty list!</span>
          )}
        </div>

      </div>
      <div className="footer" >
        <hr />
        <div className="footerContent" >
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            onChange={(event) => searchItem(event, setFilteredItems, setIsEmpty, items)}
          />
          <span onClick={() => clearList(setItems)} className="clear">
            Clear
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;