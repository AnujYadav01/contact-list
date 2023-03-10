import React from "react";

export default function Contacts({ Contact, deleteContact, editContact }) {
  const deleteContactHandler = (id) => {
    deleteContact(id);
  };
  return (
    <div className="contact-list">
      <div className="contact-name">
        <i class="fa-solid fa-user fa-2x"></i>
        <div className="contact-detail">
          <span>{Contact.name}</span>

          <span>{Contact.number}</span>
        </div>
      </div>

      <div>
        <i
          class="fa-solid fa-pen-to-square fa-2x"
          onClick={() => editContact(Contact)}
        ></i>
        <i
          onClick={() => deleteContactHandler(Contact.id)}
          style={{ color: "#F47D77" }}
          class="fa-solid fa-trash fa-2x"
        ></i>
      </div>
    </div>
  );
}
