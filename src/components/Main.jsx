import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Input from "./Kit/Input";
import Button from "./Kit/Button";
import Chip from "@mui/material/Chip";
import "/src/index.css";

export default function Main() {
  const [editingContact, setEditingContact] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [isEmptyValue, setIsEmptyValue] = useState(false);

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
    if (!inputValue) {
      setIsEmptyValue(true);
      alert("Invalid Input! Try again!!");
    } else {
      const newContact = {
        name: inputValue,
        color: "#ffffff",
        id: uuidv4(),
        isFavorit: false,
      };
      setIsEmptyValue(false);
      setContacts((prevContacts) => [...prevContacts, newContact]);
      setInputValue("");
    }
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

  const toggleFavorit = (contact) => {
    const updatedFavoritStatus = contacts.map((c) =>
      contact.id === c.id ? { ...c, isFavorit: !c.isFavorit } : c
    );
    setContacts(updatedFavoritStatus);
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
    <main className="mt-6">
      <div className="mt-[30px] flex justify-center gap-[7px] w-full ml-[10px]">
        <Input
          onKeyDown={handleKeyDown}
          type="text"
          className={`rounded-[60px] border border-grey-300 shadow-xs py-[9px] px-[13px] flex-grow max-w-[400px] min-w-[150px] h-[50px] focus:outline-none
            ${
              isEmptyValue
                ? "border-[#ff0000] border-[3px]"
                : "rounded-[60px] border border-grey-300"
            }`}
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
          className="rounded-[60px] border-none bg-[#000000] text-[#ffffff] w-[150px] 
            text-sm cursor-pointer h-[55px] ml-5 hover:shadow-xs active:shadow-lg active:scale-95 transition-all mt-[7px]"
        >
          {editingContact ? "Edit" : "Add to list"}
        </Button>
      </div>
      <ul className="w-[600px] list-none p-0 my-[20px] mx-auto ">
        {contacts.map((contact, index) => (
          <li
            className="rounded-full flex items-center mb-[15px] h-[50px] shadow-[4px_4px_10px_rgba(0,0,0,0.3)]"
            key={index}
            style={{ backgroundColor: contact.color }}
          >
            <h3 className="w-[60%] px-[15px] text-[17px] flex items-center">
              <p className="font-semibold font-poppins ">{contact.name}</p>
            </h3>
            <div className="w-[40%] flex justify-around gap-[10px] my-0 mx-[10px]">
              <Button
                onClick={() => handleDelete(contact)}
                type="submit"
                className="w-[49px] max-h-[40px] cursor-pointer rounded-full font-bold border border-[#000000] bg-[#ffffff] text-[#000000] transmition-all duration-300 ease-in-out 
                  text-[15px] py-[10px] px[15px] hover:transform hover:scale-95 hover:shadow-[0 4px 8px rgba(0, 0, 0, 0.2)] hover:text-shadow-[2px 2px 4px rgba(0, 0, 0, 0.8)] 
                  hover:text-[#ffffff] hover:transition-all hover:duration-200 hover:ease-in-out hover:bg-[#ff0000] active:shadow-[0 4px 8px rgba(0, 0, 0, 0.2)] active:transform active:scale-120 
                  active:border active:border-blck active:transition-all active:duration-300 active:ease-in-out"
              >
                X
              </Button>
              <Button
                onClick={() => handleColorChange(contact)}
                type="submit"
                className="w-[49px] max-h-[40px] cursor-pointer rounded-full font-bold border border-[#000000] bg-[#ffffff] text-[#000000] transmition-all duration-300 ease-in-out 
                  text-[15px] py-[10px] px[15px] hover:transform hover:scale-95 hover:shadow-[0 4px 8px rgba(0, 0, 0, 0.2)] hover:text-shadow-[2px 2px 4px rgba(0, 0, 0, 0.8)] 
                  hover:text-[#ffffff] hover:transition-all hover:duration-200 hover:ease-in-out hover:bg-[#ff4500] active:shadow-[0 4px 8px rgba(0, 0, 0, 0.2)] active:transform active:scale-120 
                  active:border active:border-blck active:transition-all active:duration-300 active:ease-in-out"
              >
                Color
              </Button>
              <Button
                onClick={(e) => handleEdit(contact, e)}
                type="submit"
                className="w-[49px] max-h-[40px] cursor-pointer rounded-full font-bold border border-[#000000] bg-[#ffffff] text-[#000000] transmition-all duration-300 ease-in-out 
                  text-[15px] py-[10px] px[15px hover:transform hover:scale-95 hover:shadow-[0 4px 8px rgba(0, 0, 0, 0.2)] hover:text-shadow-[2px 2px 4px rgba(0, 0, 0, 0.8)] 
                  hover:text-[#ffffff] hover:transition-all hover:duration-200 hover:ease-in-out hover:bg-[#378F5B] active:shadow-[0 4px 8px rgba(0, 0, 0, 0.2)] active:transform active:scale-120 
                  active:border active:border-blck active:transition-all active:duration-300 active:ease-in-out"
              >
                Edit
              </Button>
              <Button
                onClick={() => toggleFavorit(contact)}
                className="w-[49px] max-h-[40px] border-none rounded-full bg-[#ffffff] cursor-pointer 
                                hover:transition hover:duration-300 hover:scale-[0.95] hover:ease-in-out hover:shadow-[0 4px 8px rgba(0, 0, 0, 0.2)]
                                active:shadow-[0 4px 8px rgba(0, 0, 0, 0.2)] active:transform active:scale-[1.2] active:duration-300 hover:bg-[#F1E3A4]
                                active:transition-all active:ease-in-out"
              >
                <svg
                  className="ms-3 text-gray-300 dark:text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path
                    fill={contact.isFavorit === true ? "yellow" : "white"}
                    strokeWidth="0.7"
                    stroke="black"
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 
                    5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 
                    17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                  />
                </svg>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
