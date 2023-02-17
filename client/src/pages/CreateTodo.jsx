import React from 'react'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './CreateTodo.css'

const CreateTodo = () => {

    const navigate = useNavigate()
    const [todos, setTodos] = useState({
        title: "",
        description: "",
        time : ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTodos((prev) => {
            return ({
                ...prev,
                [name]: value,
            })
        })
    }

    const handleCreateTodoClick = (event) => {
        event.preventDefault();
        var timing =`${new Date(Date.now())}`;
        console.log(timing);
        todos.time = timing.slice(0, 25);
        console.log(todos.time);
        axios.post('/create-todo', todos)
            .then((res) => console.log(res))
            .then(navigate('all-todos'))
            .catch((err) => console.log(err));
    }

    return (
        <div className='main-div-createTodo'>
            <h1 className='title-createTodo' >CreateTodo</h1>
            <Form className='main-form-div-createTodo' >
                <Form.Group className='main-form-group-div-createTodo' >
                    <Form.Control
                        className='form-element-createTodo'
                        name='title'
                        placeholder='Title'
                        value={todos.title}
                        onChange={handleChange}
                    />
                    <Form.Control
                        className='form-element-createTodo'
                        name='description'
                        placeholder='Description'
                        value={todos.description}
                        onChange={handleChange}
                    />
                    <button className='btn-createTodo' onClick={handleCreateTodoClick} > Create Todo </button>
                </Form.Group>
            </Form>
            <div className="bottom-btns-div">
                <button className='bottom-btn-createTodo' onClick={() => { navigate('/create-todo/all-todos') }} > All Todos </button>
                <button className='bottom-btn-createTodo' onClick={() => { navigate('/')}} > Get Back </button>
            </div>
        </div>

    )
}

export default CreateTodo