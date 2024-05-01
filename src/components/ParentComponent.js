// ParentComponent.js
import React from 'react';
import TodoList from './components/TodoList';

const ParentComponent = () => {
  const todos = []; // Define your todos array here or fetch it from somewhere

  return (
    <div>
      <TodoList todos={todos} />
    </div>
  );
};

export default ParentComponent;
