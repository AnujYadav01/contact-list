import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import Amodel from "./Amodel";
import Contacts from "./Contacts";
function App() {
  const apiUrl = "https://jsonplaceholder.typicode.com/users";
  const [newcontacts, setContacts] = useState([]);
  const getContacts = () => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const contacts = [];
        data.forEach((contact) => {
          contacts.push({
            name: contact.name,
            number: contact.phone,
            id: contact.id,
          });
        });
        setContacts([...contacts]);
      });
  };
  const postContact = (name, number) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, number }),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("data posted"))
      .catch((err) => console.log("Contact addition failed"));
  };
  const patchContact = (name, number, id) => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, number }),
    };
    fetch(`${apiUrl}/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("data updated"))
      .catch((err) => console.log("Contact update failed"));
  };
  const deleteAPIContact = (id) => {
    const requestOptions = {
      method: "DELETE",
    };
    fetch(`${apiUrl}/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("data deleted"))
      .catch((err) => console.log("Contact delete failed"));
  };
  useEffect(() => {
    getContacts();
  }, []);
  const [openModel, setopenModel] = useState(false);

  // const [newcontacts, setContacts] = useState([
  //   { name: "Dummy Name", number: "99999999", id: 1 },
  //   { name: "Dummy Name 2", number: "88888888", id: 2 },
  //   { name: "Dummy Name 3", number: "777777777", id: 3 },
  // ]);
  const [defaultName, setDefaultName] = useState("");
  const [defaultNumber, setDefaultNumber] = useState("");
  const [editId, setEditId] = useState("");
  const [mode, setMode] = useState("add");

  const addNewContact = (name, number) => {
    if (newcontacts.findIndex((contact) => contact.number === number) === -1) {
      setContacts([...newcontacts, { name, number, id: uuidv4() }]);
    }
    postContact(name, number);
  };
  const addNewContactForm = () => {
    setopenModel(true);
    setDefaultName("");
    setDefaultNumber("");
    setMode("add");
  };
  const deleteContact = (id) => {
    setContacts((prev) => [
      ...newcontacts.filter((contact) => contact.id !== id),
    ]);
    deleteAPIContact(id);
  };
  console.log(newcontacts);

  const editContact = (contact) => {
    setopenModel(true);
    setDefaultName(contact.name);
    setDefaultNumber(contact.number);
    setEditId(contact.id);
    setMode("edit");
  };

  const handleEditContact = (name, number) => {
    const tempContacts = [...newcontacts];
    for (let i = 0; i < tempContacts.length; i++) {
      if (tempContacts[i].id === editId) {
        tempContacts[i].name = name;
        tempContacts[i].number = number;
      }
    }

    setContacts([...tempContacts]);
    patchContact(name, number, editId);
    setopenModel(false);
    setDefaultName("");
    setDefaultNumber("");
    setEditId("");
    setMode("add");
  };
  return (
    <div className="container">
      <div className="main">
        <div className="main-heading-icon">
          <i class="fa-solid fa-address-book fa-2xl"></i>
        </div>
        <div className="main-heading">
          <h1>Contact App</h1>
        </div>
      </div>
      <div>
        <button className="add-button" onClick={addNewContactForm}>
          <i class="fa-solid fa-user-plus"></i> Add Contact
        </button>
      </div>
      <form className="input-search">
        {/* <i class="fa-solid fa-magnifying-glass fa-2xl"></i> */}

        <input type="text" placeholder="Search.." />
        <button>Submit</button>
      </form>
      <div></div>
      {openModel && (
        <Amodel
          addNewContact={addNewContact}
          editContact={handleEditContact}
          closeModel={setopenModel}
          defaultName={defaultName}
          defaultNumber={defaultNumber}
          mode={mode}
        />
      )}

      {newcontacts.map((Contact, i) => (
        <Contacts
          deleteContact={deleteContact}
          key={i}
          Contact={Contact}
          editContact={editContact}
        />
      ))}
    </div>
  );
}

export default App;
