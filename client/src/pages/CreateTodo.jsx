import React from 'react'
import { Button , Form} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './CreateTodo.css'

const CreateTodo = () => {

    const navigate = useNavigate()
    const [todos , setTodos] = useState({
        title : "",
        description : ""
    });

    const handleChange=(e)=>{
        const {name , value} = e.target;
        setTodos((prev)=>{
            return({
                ...prev,
            [name] : value,
            }) 
        })
    }

    const handleCreateTodoClick=(event)=>{
        event.preventDefault()
        axios.post('/create-todo',todos)
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err));

        navigate('all-todos');

    }
    
    return (
        <div className='main-div'>
            <h1 className='title' >CreateTodo</h1>
            <Form className='main-form-div' >
                <Form.Group className='main-form-group-div' >
                    <Form.Control 
                        className='form-element' 
                        name='title' 
                        placeholder='Title' 
                        value={todos.title}
                        onChange={handleChange}
                    />
                    <Form.Control 
                        className='form-element' 
                        name='description' 
                        placeholder='Description' 
                        value={todos.description}
                        onChange={handleChange}
                    />
                <Button className='btn-createTodo' onClick={handleCreateTodoClick} > Create Todo </Button>
                </Form.Group>
            </Form>
            <Button className='btn-getBack' onClick={() => { navigate(-1) }} > Get Back </Button>
        </div>

    )
}

export default CreateTodo