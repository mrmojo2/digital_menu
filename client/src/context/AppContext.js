import React,{useContext,useReducer,useEffect, Children, useDeferredValue} from 'react'
import reducer from './reducer'
import axios from 'axios';

const API_URL = 'http://localhost:5000';
axios.defaults.withCredentials=true;

const AppContext = React.createContext();

const useMyContext = ()=>{
    return useContext(AppContext)
}

export const initialState={
    user:null,
    loading: true,
    formLoading:false,
    showAlert:false,
    alertText:null,
    alertType:null,

}

const AppProvider = ({children})=>{
    const [state,dispatch] = useReducer(reducer,initialState)


    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: 'CLEAR_ALERT' })
        }, 3000)
    }

    const getLoginUser = async ()=>{
        dispatch({type: 'SET_LOADING_TRUE'});
        try {
            const {data} = await axios.get(`${API_URL}/api/v1/auth/me`)
            localStorage.setItem('user',JSON.stringify(data.tokenUser))
            dispatch({type:'GET_USER_SUCCESS',payload:data})
        } catch (error) {
            dispatch({type:'SET_LOADING_FALSE'})
        }
    }

    const login = async (loginData)=>{
        dispatch({type: 'SET_LOADING_TRUE'});
        try {
            const {data} = await axios.post(`${API_URL}/api/v1/auth/login`,loginData)
            dispatch({type:'LOGIN_USER_SUCCESS',payload:data})
        } catch (error) {
            console.log(error)
            dispatch({ type: 'LOGIN_USER_FAIL', payload: error.response.data })
            clearAlert()
        }
    }


    const logout = async () => {
        try {
            await axios.get(`${API_URL}/api/v1/auth/logout`);
            dispatch({ type: 'LOGOUT_USER' });
            localStorage.removeItem('user')
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        dispatch({ type: 'SET_LOADING_TRUE' });
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            dispatch({ type: 'GET_USER_SUCCESS', payload: { tokenUser: JSON.parse(storedUser) } });
        } else {
            getLoginUser(); // Fetch user from backend if not in localStorage
        }

    }, []);


    return <AppContext.Provider value={{...state,getLoginUser,login,logout}}>
        {children}
    </AppContext.Provider>

}

export {AppProvider,useMyContext}