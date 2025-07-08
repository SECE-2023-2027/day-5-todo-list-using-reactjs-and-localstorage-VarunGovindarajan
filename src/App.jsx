import React, { useState, useEffect } from 'react';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === '') return;
    setTasks([...tasks, input]);
    setInput('');
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div style={{ textAlign: 'center', padding: '40px', background: '#eef', minHeight: '100vh' }}>
      <h2>Todo List</h2>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter a task"
        style={{ padding: '6px', width: '200px' }}
      />
      <button onClick={addTask} style={{ marginLeft: '8px', padding: '6px' }}>
        Add
      </button>

      <ul style={{ padding: 0, marginTop: '20px', listStyle: 'none' }}>
        {tasks.length === 0 && <li style={{ color: '#555' }}>No tasks yet</li>}
        {tasks.map((task, i) => (
          <li key={i} style={{ marginBottom: '10px' }}>
            {task}
            <button
              onClick={() => removeTask(i)}
              style={{ marginLeft: '10px', padding: '2px 6px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
