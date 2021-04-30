import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Form, Button } from 'semantic-ui-react'
const Register = (props) => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState('')

    const onChange = (e) => {
        console.log('here', {...values, [e.target.name]: e.target.value})
        setValues({...values, [e.target.name]: e.target.value})
    }
    

    const [addUser, { loading }] = useMutation( REGISTER_USER, {
        // this is the result data
        update(proxy, result){
            console.log('proxy', proxy)
            console.log('result', result)
            props.history.push('/')
        },
        // catch error
        onError(err){
            console.log('err', err.graphQLErrors[0].extensions.exception.errors)
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        // params
        variables: {
            username: values.username,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword
        },
       
    })

    const onSubmit = (e) => {
        e.preventDefault();
        addUser()
    }
    return <div className='form-container'>
        <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
            <h1> Register </h1>
            <Form.Input
                label="Username"
                placeholder="Username..."
                name="username"
                type="text"
                onChange={onChange}
                error={errors.username ? true : false}
                values={values.username}
            />
            <Form.Input
                label="Email"
                placeholder="Email..."
                name="email"
                type="email"
                onChange={onChange}
                error={errors.email ? true : false}
                values={values.email}
            />
            <Form.Input
                label="Password"
                placeholder="Password..."
                name="password"
                type="password"
                onChange={onChange}
                error={errors.password ? true : false}
                values={values.password}
            />
            <Form.Input
                label="Confirm Password"
                placeholder="Confirm Password..."
                name="confirmPassword"
                type="password"
                onChange={onChange}
                error={errors.confirmPassword ? true : false}
                values={values.confirmPassword}
            />
           <Button type='submit' primary> 
                Register
           </Button>
        </Form>
        
        {Object.keys(errors).length > 0 && (
            <div className="ui error message">
                <ul className="list">
                    {Object.values(errors).map((value) => {
                        return <li key={value}> {value} </li>
                    })}
                </ul>
            </div>
        )}
    </div>
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            # return
            id
            email
            token
            createdAt
            username
        }
    }
`

export default Register