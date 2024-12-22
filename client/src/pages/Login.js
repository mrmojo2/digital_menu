import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Alert } from '../components'

import { useMyContext } from '../context/AppContext'



const Login = () => {
    const { login, user, showAlert, loading } = useMyContext()
    const [loginValues, setLoginValues] = useState({ username: '', password: '' })
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(loginValues)
    }

    useEffect(() => {
        if (user && !loading) {
            navigate('/admin')
        }
    },[user,loading])

    return (
        <Wrapper>
            <form className='login-form' onSubmit={handleSubmit}>
                {showAlert && <Alert />}
                <div className='form-row'>
                    <label>Usename</label><br />
                    <input type="text" value={loginValues.username} onChange={e => setLoginValues({ ...loginValues, username: e.target.value })} />
                </div>
                <br />
                <div className='form-row'>
                    <label>Password</label><br />
                    <input type="password" value={loginValues.password} onChange={e => setLoginValues({ ...loginValues, password: e.target.value })} />
                </div>
                <br />
                <button className='btn login-btn' disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            </form>
            <p>Not a member? <Link to='/register'>Register</Link></p>
        </Wrapper>
    )
}

const Wrapper = styled.main.attrs({ className: 'login-main' })`
    .login-form{
        width:90vw;
        max-width:300px;
        background:white;
        padding:2rem;
        border-radius:5px;
        box-shadow: 0 10px 24px hsla(0,0%,0%,0.05), 0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1)
    }
    .form-row>label{
        font-weight:500;
    }
    .form-row>input{
        height:1.65rem;
        width:100%;
    }
    .login-btn{
        width:100%;
        font-size:1rem;
        color:white;
        transition:none;
    }
    .login-btn:hover{
        background:#2CB1cC;
    }
`

export default Login