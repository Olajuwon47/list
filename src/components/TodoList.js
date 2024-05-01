import React, { useEffect, useState} from 'react';
import SearchBox from './SearchBox.js'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import todoImage from "../assests/todo.svg";
import trash_icon from '../assests/trash.svg';
import edit_icon from'../assests/edit.svg';
//import ErrorBoundary from './ErrorBoundary.js';
import './TodoList.css';
//const TodoList = ({ todos }) => {
  const TodoList = ({ todos = [] }) => {  
  const [tasks, setTasks] = useState([]); 
  const [inputValue, setInputValue] = useState(''); 
  const [filter, setFilter] = useState('all'); 
  //const [isLoading, setIsLoading] = useState(true); 
  const [editTaskId, setEditTaskId] = useState(null);
  const [searchfield, setSearchfield] = useState('');
  const [filteredTodos, setFilteredTodos] = useState([]);
 /* useEffect(() => {
    setTasks(todos);
    setIsLoading(false);
  }, [todos]);*/
  useEffect(() => {
   if (todos.length > 0) {
      setTasks(todos);
     // setIsLoading(false);
    }
  }, [todos]);
   /* setTasks(todos);
      setIsLoading(false);
     catch (error) {
      console.log('Error fetching todos:', error);
      setIsLoading(false);
    }*/
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleAddTask = async () => {
    try {
     // const response = await fetch('your-api-endpoint');
     // const addedTask = await response.json();
      const addedTask = { id: 3, title: 'New Task', completed: false };
      setTasks((prevTasks) => [...prevTasks, addedTask]);
      setInputValue('');
      toast.success('Task added successfully');
    } catch (error) {
      console.log('Error adding task:', error);
      toast.error('Error adding task');
    }
  };
    const handleSearchChange=(event) => {
      const searchValue=event.target.value.toLowerCase();
   setSearchfield(searchValue);
   const filteredTodos= tasks.filter(todo => 
       todo.title.toLowerCase().includes(searchValue)
     );
  setFilteredTodos(filteredTodos);
   }
    /*const addedTask = await response.json() => {
    setTasks((prevTasks) => [...prevTasks, addedTask]);
    setInputValue('');
    toast.success('Task added successfully');
    filteredTodos.map((_todo)
    )};*/
  /*  }catch (error) {
    console.log('Error adding task:', error);
    toast.error('Error adding task');
  };;*/
const handleTaskCheckboxChange = (taskId) => {
  setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
  );
};
const handleDeleteTask = (taskId) => {
  setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  toast.success('Task deleted successfully');
};
const handleEditTask = (taskId) => {
  setEditTaskId(taskId);
  const taskToEdit = tasks.find((task) => task.id === taskId);
  setInputValue(taskToEdit.title);
};
const handleUpdateTask = async () => {
  try {
    if (inputValue.trim() === '') {
      return;
    }
    const updatedTask = {
      id: editTaskId,
      title: inputValue,
      completed: false
    };
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === editTaskId ? updatedTask : task))
    );
    setInputValue('');
    setEditTaskId(null);
    toast.success('Task updated successfully');
  } catch (error) {
    console.log('Error updating task:', error);
    toast.error('Error updating task');
  }
};
  const handleCompleteAll = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({ ...task, completed: true }))
    );
  };
  const handleClearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };
  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };
  //console.log('Tasks:', tasks);
let filteredTasks = [];
if (tasks) {
  filteredTasks = tasks.filter((task) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'uncompleted') {
      return !task.completed;
    }
    return true;
  });
 // console.log('Filter:', filter);
}
  /*const filteredTasks = tasks && tasks.filter((task) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'uncompleted') {
      return !task.completed;
    }
    return true;
  });
console.log("filteredTasks:", filteredTasks);*/
  /*if (isLoading) {
    return <div>Loading...</div>;
 }*/
  return (
    <div className="todo-app">
    <h2>
      <img src={todoImage} alt="todo-assets" />Todo List
    </h2>
    <div className="container">
      <SearchBox searchChange={handleSearchChange} />
      {searchfield ? (
        filteredTodos.map((todo) => (
          <div key={todo.id}>{todo.title}</div>
        ))
      ) : (
        <ToastContainer />
      )}
        <div className="row">
          <i className="fas fa-list-check"></i>
          <input
            type="text"
            className="add-task"
            id="add"
            placeholder="Add your todo"
            autoFocus
            value={inputValue}
            onChange={handleInputChange}
          />
          <button id="btn" onClick={editTaskId ? handleUpdateTask : handleAddTask}>
            {editTaskId ? 'Update' : 'Add'}
          </button>
        </div>
        <div className="mid">
          <i className="fas fa-check-double"></i>
          <p id="complete-all" onClick={handleCompleteAll}>
            Complete all tasks
          </p>
          <p id="clear-all" onClick={handleClearCompleted}>
            Delete comp tasks
          </p>
        </div>
        <ul id="list">
        {filteredTasks && filteredTasks.length > 0 ? (
       filteredTasks.map((task) => (
       <li key={task.id}>
       <input
        type="checkbox"
        id={`task-${task.id}`}
        data-id={task.id}
        className="custom-checkbox"
        checked={task.completed}
        onChange={() => handleTaskCheckboxChange(task.id)}
      />
      <label htmlFor={`task-${task.id}`}>{task.title}
      {/*tasks && tasks.map((task) => (
       <li key={task.id}>
        {filteredTasks.map((task) => (
        <li key={task.id}>
      </li>
    ))}*/}
      </label>
      <div>
        <img
          src={edit_icon}
          className="edit"
          alt="edit"
          data-id={task.id}
          onClick={() => handleEditTask(task.id)}
        />
        <img
          src={trash_icon} 
          className="delete"
          alt="delete"
          data-id={task.id}
          onClick={() => handleDeleteTask(task.id)}
        />
      </div>
    </li>
    ))
  ) : (
    <li>No tasks available</li>
  )}
</ul>
       {/*<ul id="list">
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                id={`task-${task.id}`}
                data-id={task.id}
                className="custom-checkbox"
                checked={task.completed}
                onChange={() => handleTaskCheckboxChange(task.id)}
              />
              <label htmlFor={`task-${task.id}`}>{task.title}
              {/*tasks && tasks.map((task) => (
                {filteredTasks.map((task) => (
                <li key={task.id}>
              </li>
            ))}
              </label>
              <div>
                <img
                  src='../assests/edit.svg'
                  className="edit"
                  alt="edit-icon"
                  data-id={task.id}
                  onClick={() => handleEditTask(task.id)}
                />
                <img
                  src='../assests/delete.svg'
                  className="delete"
                  alt="delete-icon"
                  data-id={task.id}
                  onClick={() => handleDeleteTask(task.id)}
                />
              </div>
            </li>
          ))}
        </ul>*/}
        <div className="filters">
          <div className="dropdown">
            <button className="dropbtn">Filter</button>
            <div className="dropdown-content">
            <button className="dropbtn" onClick={() => handleFilterChange('all')}>
                  All
                </button>
                <button className="dropbtn" onClick={() => handleFilterChange('uncompleted')}>
                  Uncompleted
                </button>
                <button className="dropbtn" onClick={() => handleFilterChange('completed')}>
                  Completed
                </button>
              {/*<a href="#" id="all" onClick={() => handleFilterChange('all')}>
                All
              </a>
              <a href="#" id="rem" onClick={() => handleFilterChange('uncompleted')}>
                Uncompleted
              </a>
              <a href="#" id="com" onClick={() => handleFilterChange('completed')}>
                Completed
        </a>*/}
            </div>
          </div>
          <div className="completed-task">
            <p>
              Completed: <span id="c-count">{tasks.filter((task) => task.completed).length}</span>
            </p>
          </div>
          <div className="remaining-task">
            <p>
              <span id="total-tasks">
                Total Tasks: <span id="tasks-counter">{tasks.length}</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TodoList;