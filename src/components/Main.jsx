import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Input from "./Kit/Input";
import Button from "./Kit/Button";
import Chip from "@mui/material/Chip";

export default function Main() {
  const [editingContact, setEditingContact] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (editingContact) {
        handleEditContact();
      } else {
        handleAddToList();
      }
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddToList = () => {
    const newContact = {
      name: inputValue,
      color: "#ffffff",
      id: uuidv4(),
    };
    setContacts((prevContacts) => [...prevContacts, newContact]);
    setInputValue("");
  };

  const handleDelete = (contact) => {
    setContacts(contacts.filter((c) => c.id !== contact.id));
  };

  const handleColorChange = (contact) => {
    const newColor = prompt("Pick a background color");
    const updatedContactColor = contacts.map((c) =>
      c.id === contact.id ? { ...contact, color: newColor } : c
    );
    setContacts(updatedContactColor);
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setInputValue(contact.name);
  };

  const handleEditContact = () => {
    const editedContactList = contacts.map((contact) => {
      return editingContact.id === contact.id
        ? { ...editingContact, name: inputValue }
        : contact;
    });
    setContacts(editedContactList);
    setEditingContact(null);
    setInputValue("");
  };

  // dropdown task
  // when user chooses an item from dropdown,
  // it must be displayed on the box, as a deletable chip ** and be hidden in dropdown.
  // and when user deletes the item from box, it will be appear agein in dropdown!
  //for that i need to have an array too add the chosen items in it,
  // and then, inside the box div, map in this array and show the items as i want! ;)

  const provinces = [
    {
      id: 1,
      name: "Alborz",
      cities: [{ name: "tehran" }, { name: "karaj" }, { name: "shahriyar" }],
    },
    {
      id: 2,
      name: "Hormozgan",
      cities: [{ name: "bandarAbas" }, { name: "qeshm" }, { name: "kish" }],
    },
    {
      id: 3,
      name: "Ardabil",
      Cities: [{ name: "Ardabil" }, { name: "Parsabad" }, { name: "Khalkhal" }],
    },
    {
      id: 4,
      name: "Bushehr",
      Cities: [{ name: "Bushehr" }, { name: "Jam" }, { name: "Bank" }],
    },
  ];

  const handleSelectedItems = (index) => {
    provinces.map((p, i) => {
      if (index === i) {
        setSelectedItem((previtem) => [...previtem, p.name]);
      }
    });
  };

  const handleItemDelete = (i) => {
    setSelectedItem(selectedItem.filter((_, index) => i !== index));
  };

  return (
    <main className="main">
      <div className="input-container">
        <Input
          onKeyDown={handleKeyDown}
          type="text"
          className="input"
          placeholder={
            editingContact ? "editing contact value" : "Insert new contact..."
          }
          name="value"
          value={inputValue}
          onChange={handleChange}
        />
        <Button
          disabled={editingContact?.name === inputValue}
          onClick={editingContact ? handleEditContact : handleAddToList}
          type="submit"
          className="addButton"
        >
          {editingContact ? "Edit" : "Add to list"}
        </Button>
      </div>
      <ul className="list">
        {contacts.map((contact, index) => (
          <li
            className="list-item"
            key={index}
            style={{ backgroundColor: contact.color }}
          >
            <h3 className="item-text">
              <p className="text">{contact.name}</p>
            </h3>
            <div className="button-container">
              <Button
                onClick={() => handleDelete(contact)}
                type="submit"
                className="item-buttons delete-button"
              >
                X
              </Button>
              <Button
                onClick={() => handleColorChange(contact)}
                type="submit"
                className="item-buttons color-button"
              >
                Color
              </Button>
              <Button
                onClick={(e) => handleEdit(contact, e)}
                type="submit"
                className="item-buttons edit-button"
              >
                Edit
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {selectedItem && selectedItem.length > 0 ? (
        <fieldset className="display-box-container">
          <legend>Proviences</legend>
          {selectedItem.map((item, i) => (
            <Chip key={i} label={item} onDelete={() => handleItemDelete(i)} />
          ))}
        </fieldset>
      ) : (
        ""
      )}

      <div className="dropdown-container">
        <div className="dropdown">
          <input
            hidden=""
            className="sr-only"
            name="state-dropdown"
            id="state-dropdown"
            type="checkbox"
          />
          <label
            aria-label="dropdown scrollbar"
            htmlFor="state-dropdown"
            className="trigger"
          ></label>

          <ul className="list webkit-scrollbar" role="list" dir="auto">
            {provinces.map((province, index) => (
              <li
                onClick={() => handleSelectedItems(index)}
                key={index}
                className="listitem"
                role="listitem"
                style={{ cursor: "pointer" }}
              >
                {!selectedItem.includes(province.name) ? province.name : ""}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
