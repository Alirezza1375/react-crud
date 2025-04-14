import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import Input from "./Kit/Input";
import Button from "./Kit/button";

export default function Main() {
  const [editingItem, setEditingItem] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [inputValue, setInputValue] = useState("");


  const handleChange = (e) => {
    setInputValue(e.target.value);
  }


  const handleAddToList = () => {
    const newContact = {
      name: inputValue,
      id: uuidv4(),
      color: '#ffffff',
    };
    setContacts([...contacts, newContact]);
    setInputValue("");
  }

  const handleDelete = (contact) => {
    setContacts(contacts.filter(c => c.id !== contact.id));
  }

  const handleEdit = (contact) => {
    setEditingItem(contact);
    setInputValue(contact.name);
  }

  const handleEditItem = () => {
    const editedContactList = contacts.map(contact => {
      if (contact.id === editingItem.id) {
        return {
          ...editingItem,
          name: inputValue
        };
      }
      return contact;
    });
    setContacts(editedContactList);
    setEditingItem(null);
    setInputValue('');
  };

  function handleColorButton(contact) {
    const color = prompt("Pick a background color")
    if (color) {
      const editedContactList = contacts.map(c => {
        if (c.id === contact.id) {
          return {
            ...contact,
            color: color
          };
        }
        return c;
      });
      setContacts(editedContactList);
    }
  }

  const provinces = [
    { id: 1, name: 'Alborz', cities: [{ name: 'tehran' }, { name: 'karaj' }, { name: 'shahriyar' }] }, // ignore cities
    { id: 2, name: 'Hormozgan', cities: [{ name: 'bandarAbas' }, { name: 'qeshm' }, { name: 'kish' }] }
  ]

  return (
    <main className="main">
      <div className="input-container">
        <Input
          type="text"
          placeholder={editingItem ? 'Editing contact value...' : 'Insert new value...'}
          name="value"
          className='input'
          onChange={handleChange}
          value={inputValue}
        />
        <Button
          type="submit"
          onClick={editingItem ? handleEditItem : handleAddToList}
          className="button-container"
          disabled={editingItem?.name === inputValue}
        >
          {
            editingItem ? 'Edit' : 'Add to list'
          }
        </Button>
      </div>
      <ul className="list">
        {contacts.map((contact, index) => (
          <li key={index} className="list-item" style={{ backgroundColor: contact.color }}>
            <h3 className="item-text">
              <p className="text">{contact.name}</p>
            </h3>
            <div className="button-container">
              <Button
                onClick={() => handleDelete(contact)}
                className="item-buttons delete-button"
                type="submit"
              >
                X
              </Button>
              <Button
                onClick={() => handleColorButton(contact)}
                className="item-buttons color-button"
                type="submit"
              >
                Color
              </Button>
              <Button
                onClick={(e) => handleEdit(contact, e)}
                className="item-buttons edit-button"
                type="submit"
              >
                Edit
              </Button>
            </div>
          </li>

        ))}
      </ul>

    </main>
  )
}
