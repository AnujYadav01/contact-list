import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import Amodel from "./Amodel";
import Contacts from "./Contacts";
function App() {
  useEffect(() => {}, []);
  const [openModel, setopenModel] = useState(false);

  const [newcontacts, setContacts] = useState([
    { name: "Dummy Name", number: "99999999", id: 1 },
    { name: "Dummy Name 2", number: "88888888", id: 2 },
    { name: "Dummy Name 3", number: "777777777", id: 3 },
  ]);

  const addNewContact = (name, number) => {
    if (newcontacts.findIndex((contact) => contact.number === number) === -1) {
      setContacts([...newcontacts, { name, number, id: uuidv4 }]);
    }
  };
  console.log(newcontacts);
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
        <button className="add-button" onClick={() => setopenModel(true)}>
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
        <Amodel addNewContact={addNewContact} closeModel={setopenModel} />
      )}

      {newcontacts.map((Contact, i) => (
        <Contacts key={i} Contact={Contact} />
      ))}
    </div>
  );
}

export default App;
