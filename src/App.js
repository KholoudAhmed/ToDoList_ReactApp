import React, { useState, useEffect } from 'react';

function TodoInput({ onSubmit, label = 'Add todo', inputValue }) {
  let [value, setValue] = useState(inputValue);
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></input>
      <button
        className="btn btn-primary"
        onClick={() => {
          onSubmit(value);
          setValue('');
        }}
      >
        {label}
      </button>
    </div>
  );
}

function TodoList({ items, onDelete, onChecked, onUpdate }) {
  const [inEdit, setInEdit] = useState(null);
  return (
    <>
      <ul className="list-group">
        {items.map((item) =>
          inEdit === item.id ? (
            <TodoInput
              inputValue={item.title}
              label="save"
              onSubmit={(value) => {
                onUpdate(item, value);
                setInEdit(null);
              }}
            />
          ) : (
            <TodoItem
              key={item.id}
              value={item}
              onDelete={() => {
                onDelete(item);
              }}
              onChecked={() => {
                onChecked(item);
              }}
              onDoubleClick={(value) => setInEdit(value)}
            >
              {(title) => <span>{title}</span>}
            </TodoItem>
          )
        )}
      </ul>
    </>
  );
}

function TodoItem({ value, onDelete, onChecked, onDoubleClick }) {
  return (
    <li
      className="list-group-item"
      onDoubleClick={() => onDoubleClick(value.id)}
    >
      <input
        type="checkbox"
        checked={value.isCompleted}
        onChange={() => {
          onChecked(value);
        }}
      />
      {value.title}

      <button className="btn btn-danger" onClick={() => onDelete()}>
        Delete
      </button>
    </li>
  );
}

function App() {
  const [items, setItems] = useState([
    { id: 1, title: 'list item', isCompleted: false },
  ]);

  const handleUpdate = (item, value) => {
    setItems(
      items.map((TodoItem) =>
        TodoItem.id === item.id ? { ...TodoItem, title: value } : TodoItem
      )
    );
  };

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/todos")
  //     .then((response) => response.json())
  //     .then((json) => setItems(json));
  // }, []);

  return (
    <div className="container bg-primary text-white p-4">
      <h1> To Do List</h1>
      <TodoInput
        onSubmit={(value) => {
          setItems([
            ...items,
            { id: Math.random(), title: value, isCompleted: false },
          ]);
        }}
      />
      <TodoList
        items={items}
        onDelete={(item) => {
          setItems(items.filter((TodoItem) => TodoItem.id !== item.id));
        }}
        onChecked={(item) => {
          setItems(
            items.map((TodoItem) =>
              TodoItem.id === item.id
                ? { ...TodoItem, isCompleted: !TodoItem.isCompleted }
                : TodoItem
            )
          );
        }}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default App;
