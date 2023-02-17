import React from 'react'
import './App.css';
import { useNavigate } from 'react-router-dom';
const App = () => {
  const navigate = useNavigate()
  return (
    <div className='App'>
      <h1>Todo Application</h1>
      <button className='entry-button' onClick={() => { navigate('create-todo') }} > Get started </button>
    </div>
  )
}

export default App