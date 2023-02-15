import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'
import './AllTodo.css'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-awesome-modal';


const AllTodo = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);//corrected
  const [updatedTodos, setUpdatedTodos] = useState({});//corrected
  const [falseTodos, setFalseTodos] = useState([]);//corrected
  const [falseUpdatedTodos, setFalseUpdatedTodos] = useState({});
  const [modelVisibility, setModelVisibility] = useState(false)
  useEffect(() => {
    axios.get('/all-todos')
      .then((res) => { setTodos(res.data); })
      .catch((err) => { console.log(err) })
  }, [falseTodos, falseUpdatedTodos]);

  const handleDeleteClick = (e) => {
    axios.delete(`/delete-todo/${e.target.value}`)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
    setFalseTodos(todos.filter((a) => { return a._id !== e.target.value }))
  }
  const handleUpdateClick = (prop) => {
    console.log(prop);
    console.log(todos);
    console.log("updatedTodos", updatedTodos);
    console.log("falseTodos", falseTodos);
    console.log("falseUpdatedTodos", falseUpdatedTodos);
    console.log(prop.title);
    setUpdatedTodos(prop);

  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTodos((prev) => {
      return ({
        ...prev,
        [name]: value,
      })
    });
  }

  const todoUpdateClick = () => {
    axios.put('/update-todo', updatedTodos)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err))
    setFalseUpdatedTodos(updatedTodos);
  }
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     axios.get('/all-todos')
  //       .then((res) => { setTodos(res.data); })
  //       .catch((err) => { console.log(err) })
  //     console.log('This will be called every 2 seconds');
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className='main-div' >
      <h1 className='alltodo-title' >All Todos</h1>
      <button className='btn-allTodo' onClick={() => { navigate('/create-todo') }} >Get Back</button>
      {todos.map((todo) => {
        return (
          <div className='todo-items-div' key={todo._id} >
            <div className="todo-content-div">
              <h4>{todo.title}</h4>
              <h6>{todo.description}</h6>
            </div>
            <div className='todo-items-btn-div'>
              <button className='btn-allTodo update-btn ' onClick={() => { setModelVisibility(true); handleUpdateClick(todo) }} >Update</button>
              {/* ---------------------- model ----------------------*/}
              <Modal visible={modelVisibility} bac width="500" height="300" effect="fadeInDown" onClickAway={() => setModelVisibility(false)} >
                <div className='popup-main-div' >
                  <Form className='main-form-div' >
                    <Form.Group className='main-form-group-div' >
                      <Form.Control
                        className='form-element'
                        value={updatedTodos.title}
                        name='title'
                        placeholder='Title'
                        onChange={handleChange}
                      />
                      <Form.Control
                        className='form-element'
                        name='description'
                        placeholder='Description'
                        value={updatedTodos.description}
                        onChange={handleChange}
                      />
                      <div className='model-btn-div' >
                        <button className='btn-allTodo' onClick={() => { setModelVisibility(false); todoUpdateClick() }} >Update</button>
                        <button className='btn-allTodo' onClick={() => setModelVisibility(false)} >Close</button>
                      </div>
                    </Form.Group>
                  </Form>

                </div>
              </Modal>
              <button className='btn-allTodo delelte-btn ' value={todo._id} onClick={handleDeleteClick}>Delete</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AllTodo