import React, { useState } from 'react';

const ContactItem = ({ item, deleteContact, saveEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(item.name);
  const [editPhone, setEditPhone] = useState(item.phone);

  const handleSave = () => {
    saveEdit(item.id, editName, editPhone);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(item.name);
    setEditPhone(item.phone);
    setIsEditing(false);
  };

  return (
    <div className="contact-item">
      <div className="contact-outputs">
        {!isEditing ? (
          <div id={`item-${item.id}`}>
            <h3 id={`name-${item.id}`}>{item.name}</h3>
            <p id={`phone-${item.id}`}>{item.phone}</p>
          </div>
        ) : (
          <div>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <input
              type="text"
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="contact-buttons">
        {!isEditing ? (
          <>
            <button className="btn-style" onClick={() => deleteContact(item.id)}>Delete</button>
            <button className="btn-style" onClick={() => setIsEditing(true)}>Edit</button>
          </>
        ) : (
          <>
            <button className="btn-style" onClick={handleCancel}>Cancel</button>
            <button className="btn-style" onClick={handleSave}>Save</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactItem;
