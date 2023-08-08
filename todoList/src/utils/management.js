import { v4 as uuidv4 } from 'uuid';

export function handleChange(event, setInputText, setError) {
    const newValue = event.target.value;
    setInputText(newValue);
    console.log(newValue);
    setError(false)
  }

  export function handleChecked(id, setItems) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, checked: !item.checked }
          : item
      )
    );
  }

 export function addItem(inputText, setInputText, setItems, setError) {
    if (inputText) {
      const newId = uuidv4();
      setError(false);
      const currentDate = new Date();
      const deadlineDate = new Date();
      deadlineDate.setDate(currentDate.getDate() + 3); // Default deadline 72 hours from now
      const capitalized=inputText.charAt(0).toUpperCase()+ inputText.slice(1)
      setItems((prevItems) => [
        ...prevItems,
        {
          id: newId,
          title: capitalized,
          createdAt: currentDate,
          deadLine: deadlineDate,
          checked: false,
          featured: false,
        }
      ]);

      setInputText("");
    } else {
      setError(true);
    }
  }

  export function deleteItem(id, items, setItems) {
    const filtredItems = items.filter((item) => item.id != id)
    setItems(filtredItems)
  }

  export function clearList(setItems) {
    setItems([])
  }