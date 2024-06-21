import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [nameList, setNameList] = useState(() => {
    const savedNames = localStorage.getItem('name');
    return savedNames ? JSON.parse(savedNames) : [];
  });

  useEffect(() => {
    localStorage.setItem('name', JSON.stringify(nameList));
  }, [nameList]);

  const addName = () => {
    if (name.trim()) {
      const newNameList = [
        {
          id: nameList.length === 0 ? 1 : nameList[0].id + 1,
          name: name.trim()
        },
        ...nameList
      ];
      setNameList(newNameList);
      setName('');
    }
  };

  const deleteName = (id) => {
    const newNameList = nameList.filter(item => item.id !== id);
    setNameList(newNameList);
  };

  const saveEdit = (id, newName) => {
    const newNameList = nameList.map(item => item.id === id ? { ...item, name: newName } : item);
    setNameList(newNameList);
  };

  return (
    <div className="App">
      <div className="nav">
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn-style" id="add" onClick={addName}>Add</button>
      </div>
      <div id="root" className="container">
        {nameList.map(item => (
          <React.Fragment key={item.id}>
            <NameItem 
              item={item} 
              deleteName={deleteName} 
              saveEdit={saveEdit} 
            />
            <div className="line"></div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const NameItem = ({ item, deleteName, saveEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(item.name);

  const handleSave = () => {
    saveEdit(item.id, editName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(item.name);
    setIsEditing(false);
  };

  return (
    <div className="action">
      <div className="action-outputs">
        {!isEditing ? (
          <div id={`item-${item.id}`}>
            <h3 id={`name-${item.id}`}>{item.name}</h3>
          </div>
        ) : (
          <input
            type="text"
            id={`editInput-${item.id}`}
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
        )}
      </div>
      <div className="action-buttons">
        {!isEditing ? (
          <>
            <button className="btn-style del" id={`del-${item.id}`} onClick={() => deleteName(item.id)}>Delete</button>
            <button className="btn-style edit" id={`edit-${item.id}`} onClick={() => setIsEditing(true)}>Edit</button>
          </>
        ) : (
          <>
            <button className="btn-style" id={`cancel-${item.id}`} onClick={handleCancel}>Cancel</button>
            <button className="btn-style" id={`save-${item.id}`} onClick={handleSave}>Save</button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
