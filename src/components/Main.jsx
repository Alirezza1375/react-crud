import React from "react";

export default function Main() {

    const [items, setItems] = React.useState([]);
    const [editingIndex, setEditingIndex] = React.useState(null);
    const inputRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const inputValue = formData.get("value");

        if (editingIndex !== null) {
            const updatedItems = items.map((item, i) => 
                i === editingIndex ? {...item, value: inputValue} : item
            ) 
            setItems(updatedItems);
            setEditingIndex(null);
        } else {
            const newItem = {
                value: inputValue,
                backgroundColor: "#ffffff"
            }
            setItems(prevItems => [...prevItems, newItem])
        }
        e.currentTarget.reset();
    }

    function handleDeleteItem (index) {
        const updatedItems = items.filter((_, i) => i !== index)
        setItems(updatedItems)
        if (editingIndex === index) {
            setEditingIndex(null);
        }
    }

    function handleChangeColor (index) {
        const color = prompt("pick a background color:")
        if (color) {
            const updatedItems = items.map((item, i) => 
                i === index ? {...item, backgroundColor: color} : item
            )
            setItems(updatedItems)
        } else {
            alert("Invalid prompt!")
        }
    };

    function handleEditItem (index, e) {
        e.preventDefault();
        setEditingIndex(index)

        inputRef.current.focus();
        inputRef.current.value = items[index].value;
    }

    return (
        <main>
            <form onSubmit={handleSubmit} action="" className="add-value-form">
                <input 
                    type="text" 
                    className="input" 
                    placeholder={editingIndex !== null ? "Enter a new value.." : "Enter a value..."}
                    name="value"/>
                <button 
                    type="submit" 
                    className="addButton"
                >
                    {editingIndex !== null ? "Save" : "Add to list"}
                </button>
            </form>
            <ul className="list">
                {items.map((item, index) => (
                    <li key={index} className="list-item" style={{backgroundColor: item.backgroundColor}}>
                    {item.value}
                    <button onClick={() => handleDeleteItem(index)}>X</button>
                    <button onClick={() => handleChangeColor(index)}>Change background color</button>
                    <button onClick={(e) => handleEditItem(index, e)}>Edit</button>
                    </li>
                ))}
            </ul>
        </main>
    )
}