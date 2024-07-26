import React, { useState, useEffect } from 'react';
import ContactItem from './ContactItem'; // Импортируем новый компонент

const App = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [contactList, setContactList] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : [];
  });

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contactList));
  }, [contactList]);

  const addContact = () => {
    if (name.trim() && phone.trim()) {
      const newContactList = [
        {
          id: contactList.length === 0 ? 1 : contactList[0].id + 1,
          name: name.trim(),
          phone: phone.trim(),
        },
        ...contactList
      ];
      setContactList(newContactList);
      setName('');
      setPhone('');
    }
  };

  const deleteContact = (id) => {
    const newContactList = contactList.filter(item => item.id !== id);
    setContactList(newContactList);
  };

  const saveEdit = (id, newName, newPhone) => {
    const newContactList = contactList.map(item =>
      item.id === id ? { ...item, name: newName, phone: newPhone } : item
    );
    setContactList(newContactList);
  };

  return (
    <div className="App">
      <div className="nav">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button className="btn-style" onClick={addContact}>Add Contact</button>
      </div>
      <div className="container">
        {contactList.map(item => (
          <React.Fragment key={item.id}>
            <ContactItem 
              item={item} 
              deleteContact={deleteContact} 
              saveEdit={saveEdit} 
            />
            <div className="line"></div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default App;
