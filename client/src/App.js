import React from 'react'
import './App.css';
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
const App = () => {
  const navigate = useNavigate()
  return (
    <div className='App'>
      <h1>App</h1>
      <Button onClick={() => { navigate('create-todo') }} > Click here </Button>
    </div>
  )
}

export default App