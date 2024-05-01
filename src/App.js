import React from 'react';
import TodoList from './components/TodoList.js';
import ParticlesBg from 'particles-bg'

//import './App.css';
 const App=() =>{
  return (
    <div>
    {/* <h1 style={{display:'flex', justifyContent:'center'}}> Todo List 
    </h1>*/}
      <TodoList />
      <ParticlesBg 
      type="tadpole"
       bg={true}
        />
    </div>
  );
}
export default App;