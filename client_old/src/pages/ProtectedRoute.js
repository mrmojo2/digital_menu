import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useMyContext } from '../context/AppContext'
import { Loading } from '../components'

const ProtectedRoute = () => {
    const { user,loading } = useMyContext()

    if(loading){
        return <Loading/>
    }

    // If user is not authenticated, redirect to login
    if (!user && !loading) {
        return <Navigate to='/admin_login' />
    }

    // If user is authenticated, render the Outlet for nested routes
    return <Outlet />
}

export default ProtectedRoute;
