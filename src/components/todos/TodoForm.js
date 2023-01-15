import React, { useState, useEffect } from "react"
import {Formik, Field, Form} from 'formik'
import { todoSchema } from "../../utilities/validationSchema"
import axios from "axios"


export default function TodoForm(props) {

    const [categories, setCategories] = useState([])

    const getCategories = () => {
        axios.get(`https://localhost:7298/api/Categories`).then(response => setCategories(response.data))
    }

    const handleSubmit = (values) => {
        console.log(values)
        if(!props.todo){
            const todoToCreate = values;

            axios.post(`https://localhost:7298/api/ToDos`, todoToCreate).then(() => {
                props.getTodos()
                props.setShowCreate(false)
            })
        }
        else{
            const todoToEdit = {
                toDoId: props.todo.toDoId,
                name: values.name,
                description: values.description,
                done: values.done,
                categoryId: values.categoryId
            }

            axios.put(`https://localhost:7298/api/ToDos/${props.todo.toDoId}`, todoToEdit).then(() => {
                props.getTodos()
                props.setShowEdit(false)
            })
        }
    }
    
    useEffect(() => {
        getCategories()
    }, []);


  return (
    <Formik 
        initialValues={{
            name: props.todo ? props.todo.name : '',
            description: props.todo ? props.todo.description : '',
            done: props.todo ? props.todo.done : false,
            categoryId: props.todo ? props.todo.categoryId : ''
        }}
        validationSchema={todoSchema}
        onSubmit={(values) => handleSubmit(values)}>
        {({errors, touched}) => (
            <Form id='todoForm'>
                <div className="form-group m-3">
                    <Field name='name' className='form-control' placeholder='Name' />
                    {errors.name && touched.name ? (
                        <div className='text-danger'>{errors.name}</div>
                    ) : null}
                </div>
                <div className='form-group m-3'>
                    <Field name='description' as='textarea' className='form-control' placeholder='Description' style={{resize: 'none', height: '5em'}} />
                    {errors.description && touched.description ? (
                        <div className='text-danger'>{errors.description}</div>
                    ) : null}
                </div>
                <div className="form-group m-3">
                    <p>Task Completed?</p>
                    <Field name='done' type='Checkbox' className='form-control form-check-input' label='Complete?'/>
                    {errors.done && touched.done ? (
                        <div className='text-danger'>{errors.done}</div>
                    ) : false}
                </div>
                <div className="form-group m-3">
                    <Field name='categoryId' as='select' className='form-control'>
                        <option value='' disabled>[---Please Choose---]</option>
                        {categories.map(cat => 
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.categoryName}
                            </option>
                        )}
                    </Field>
                </div>
                <div className="form-group m-3">
                    <button type='submit' className="btn btn-info m-3">Submit ToDo</button>
                </div>
            </Form>
        )}
        </Formik>
  )
}
