import React from "react";
import Input from "./Kit/Input";
import Button from "./Kit/button";

export default function Main() {

    const [inputValue, setInputValue] = React.useState("");
    const [items, setItems] = React.useState([]);
    const [editingIndex, setEditingIndex] = React.useState(null);
    const [inputClassName, setInputClassName] = React.useState("input")
    const [buttonClassName, setButtonClassName] = React.useState("addButton")
    const [originalValue, setOriginalValue] = React.useState("")
    const [placeholder, setPlaceholder] = React.useState("Enter a value...")

    
    
    const handleChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue)

        if (editingIndex !== null && newValue !== originalValue) {
            setButtonClassName("save-button")
        } else if (editingIndex !== null && newValue === originalValue) {
            setButtonClassName("hidden-save-button")
        } else {
            setButtonClassName("addButton")
        }
    };


    const handleAddTolist = function (e) {
        e.preventDefault();
        if(inputValue === "") {
            setInputClassName("input-error")
            setPlaceholder("Input cannot be empty!")
        } else if (editingIndex !== null) {
            const updatedItems = items.map((item, i) => 
                editingIndex === i ? {...item, value: inputValue} : item
            )
            setItems(updatedItems);
            setInputClassName("input");
            setEditingIndex(null);
            setPlaceholder("Enter a value...")
            setButtonClassName("addButton")
        } else {
            const newItem = {
                value: inputValue,
                backgroundColor: "transparent"
            }
            setItems(prevItems => [...prevItems, newItem])
        }
        setInputValue("");
    };

    function handleDeleteButton (index) {
        const updatedItems = items.filter((_,i) => i !== index)
        setItems(updatedItems)
        if (editingIndex === index) {
            setEditingIndex(null)
        };
    };

    function handleColorButton (index) {
        const color = prompt("Pick a background color")
        if (color === "") {
            alert("You must enter a valid color!")
        } else if (color === null) {
            alert("Prompt was canceled!")
        } else if (editingIndex === index) {
            setEditingIndex(null)
        } else {
            const updatedItems = items.map((item, i) => 
                index === i ? {...item, backgroundColor: color} : item
            )
            setItems(updatedItems);
        }
    }

    function handleEditButton (index) {
        setButtonClassName("hidden-save-button")
        const prevValue = items.find((_,i) => index === i)?.value || "";
        setEditingIndex(index)
        setOriginalValue(prevValue)
        setInputValue(prevValue)
        
    }

    return (
        <main className="main">
            <div className="input-container">
                <Input 
                    type= "text"
                    placeholder= {placeholder}
                    name= "value"
                    className= {inputClassName}
                    onChange= {handleChange}
                    value={inputValue}
                />
                <Button 
                    type= "submit"
                    onClick= {handleAddTolist}
                    className= {buttonClassName}
                >
                    Add to list
                </Button>
            </div>
            <ul className="list">
            {items.map((item, index) => (
                    <li key={index} className="list-item" style={{backgroundColor: item.backgroundColor}}>
                        <h3 className="item-text">{item.value}</h3>
                        <div className="button-container">
                            <Button onClick={() => handleDeleteButton(index)} className="item-buttons delete-button" type="submit" >X</Button>
                            <Button onClick={() => handleColorButton(index)} className="item-buttons color-button" type="submit" >Color</Button>
                            <Button onClick={(e) => handleEditButton(index, e)} className="item-buttons edit-button" type="submit" >Edit</Button>
                        </div>
                    </li>
                    
                ))}
            </ul>
            
        </main>
    )
}