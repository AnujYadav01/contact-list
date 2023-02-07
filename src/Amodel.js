import React, { useState } from "react";
import "./index.css";

const Amodel = (props) => {
  const { closeModel, addNewContact } = props;
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const onSubmit = (e) => {
    addNewContact(name, number);
    closeModel(false);
  };
  return (
    <div className="Amodel-container">
      <div className="Amodel-div">
        <h1>Add contact</h1>
        <div className="ui divider"></div>
        <div className="ui form"></div>
        <div className="field">
          <label>Username</label>
          <input
            name="name"
            type="text"
            value={name}
            placeholder="username"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Phone Number</label>
          <input
            type={Number}
            value={number}
            placeholder="Number"
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="submit-cancel-btn">
          <button onClick={() => closeModel(false)}>Cancel</button>
          <button onClick={onSubmit} className="fluid ui button blue">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Amodel;
