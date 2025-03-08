import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    }, [user, loading, navigate])

    return (
        <Wrapper>
            <div className="login-container">
                <h1>Admin Login</h1>
                <form className='login-form' onSubmit={handleSubmit}>
                    {showAlert && <Alert />}
                    <div className='form-row'>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={loginValues.username}
                            onChange={e => setLoginValues({ ...loginValues, username: e.target.value })}
                            required
                        />
                    </div>
                    <div className='form-row'>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={loginValues.password}
                            onChange={e => setLoginValues({ ...loginValues, password: e.target.value })}
                            required
                        />
                    </div>
                    <button className='btn login-btn' disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f2f5;

    .login-container {
        width: 100%;
        max-width: 400px;
        padding: 2rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;

        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
        }
    }

    h1 {
        text-align: center;
        color: #333;
        margin-bottom: 1.5rem;
    }

    .login-form {
        display: flex;
        flex-direction: column;
    }

    .form-row {
        margin-bottom: 1rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #555;
    }

    input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
        transition: border-color 0.3s ease;

        &:focus {
            outline: none;
            border-color: #2CB1CC;
        }
    }

    .login-btn {
        width: 100%;
        padding: 0.75rem;
        font-size: 1rem;
        color: white;
        background-color: #2CB1CC;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover:not(:disabled) {
            background-color: #239eb5;
        }

        &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
    }
`

export default Login