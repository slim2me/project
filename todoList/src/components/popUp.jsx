import React, {useState} from "react";
import Popup from 'reactjs-popup';
import deleteIcon from '../assets/delete.png';
import viewIcon from '../assets/view.png';
import editIcon from '../assets/edit.png'
import { deleteItem } from '../utils/management.js';

const DeletePopup = ({ id, setItems, items }) => (
    <Popup trigger={<img src={deleteIcon} />} position="top right"  >
        {close => (
            <>

                <div className="deleteContainer">
                    <button className="button delete" onClick={() => deleteItem(id, items, setItems)}>Delete</button>
                    <button className="button close" onClick={close}>No</button>
                </div>
            </>
        )}
    </Popup>
);

const ShowPopup = ({ item }) => (
    <Popup trigger={<img src={viewIcon} />}    >
        {close => (
            <>
                <div className="itemData">
                    <div>Task id : <span title={item.id}>{item.id.substr(0, 10)}...</span></div>
                    <div>Task title : <span>{item.title}</span></div>
                    <div>Created At : <span>{item.createdAt.toLocaleDateString()}</span></div>
                    <div>Deadline : <span>{item.deadLine.toLocaleDateString()}</span></div>
                    <div>state: <span>{item.checked ? "completed" : "not completed"}</span></div>
                    <div>featured: <span>{item.featured ? "Yes" : "No"}</span></div>
                </div>
            </>
        )}
    </Popup>
);

function EditPopup({ item ,setItems}) {

    const [taskTitle, setTaskTitle] = useState(item.title);
    const [taskDeadline, setTaskDeadline] = useState(formatDateForInput(item.deadLine));
    const [taskFeatured, setTaskFeatured] = useState(item.featured);

    function formatDateForInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    function handleUpdate(close) {
        setItems(prevItems =>
          prevItems.map(prevItem =>
            prevItem.id === item.id
              ? {
                  ...prevItem,
                  title: taskTitle,
                  deadLine: new Date(taskDeadline),
                  featured: taskFeatured,
                }
              : prevItem
          )
        );
        close();
    }
    
    return (
        <Popup trigger={<img src={editIcon} />} modal >
            {close => (
                <>
                    <div className="itemDataForm" >
                        <div>
                            <label htmlFor="taskTitle">Task Title:</label>
                            <input
                                type="text"
                                id="taskTitle"
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="taskDeadline">Deadline:</label>
                            <input
                                type="date"
                                id="taskDeadline"
                                value={taskDeadline}
                                onChange={(e) => setTaskDeadline(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="taskFeatured">Featured:</label>
                            <input
                                type="checkbox"
                                id="taskFeatured"
                                checked={taskFeatured}
                                onChange={(e) => setTaskFeatured(e.target.checked)}
                            />
                        </div>
                        <div className="formButtons">
                            <button className="button save" onClick={()=>handleUpdate(close)}>Save</button>
                            <button className="button cancel"
                                onClick={() => { close(); }}>Cancel</button>
                        </div>
                    </div>
                </>
            )}
        </Popup>
    )
}

export { DeletePopup, ShowPopup, EditPopup }