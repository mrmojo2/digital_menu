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
    categories: [],
    menuItems: [],
    tables: [],
    orders: [],
    currentOrder: null,

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

    const getCategories = async () => {
        dispatch({ type: 'SET_LOADING_TRUE' });
        try {
            const { data } = await axios.get(`${API_URL}/api/v1/category`);
            dispatch({ type: 'GET_CATEGORIES_SUCCESS', payload: data.categories });
        } catch (error) {
            dispatch({ type: 'API_ERROR', payload: error.response.data });
            clearAlert();
        }
    }

    const createCategory = async (categoryData) => {
        dispatch({ type: 'SET_LOADING_TRUE' });
        try {
            const { data } = await axios.post(`${API_URL}/api/v1/category`, categoryData);
            dispatch({ type: 'CREATE_CATEGORY_SUCCESS', payload: data.category });
        } catch (error) {
            dispatch({ type: 'API_ERROR', payload: error.response.data });
            clearAlert();
        }
    }

    const getMenuItems = async () => {
        dispatch({ type: 'SET_LOADING_TRUE' });
        try {
            const { data } = await axios.get(`${API_URL}/api/v1/menu`);
            dispatch({ type: 'GET_MENU_ITEMS_SUCCESS', payload: data.menuItems });
        } catch (error) {
            dispatch({ type: 'API_ERROR', payload: error.response.data });
            clearAlert();
        }
    }

    const createMenuItem = async (menuItemData) => {
        dispatch({ type: 'SET_LOADING_TRUE' });
        try {
            const { data } = await axios.post(`${API_URL}/api/v1/menu`, menuItemData);
            dispatch({ type: 'CREATE_MENU_ITEM_SUCCESS', payload: data.menuItem });
        } catch (error) {
            dispatch({ type: 'API_ERROR', payload: error.response.data });
            clearAlert();
        }
    }

    const getTables = async () => {
        dispatch({ type: 'SET_LOADING_TRUE' });
        try {
            const { data } = await axios.get(`${API_URL}/api/v1/tables`);
            dispatch({ type: 'GET_TABLES_SUCCESS', payload: data.tables });
        } catch (error) {
            dispatch({ type: 'API_ERROR', payload: error.response.data });
            clearAlert();
        }
    }

    const createTable = async (tableData) => {
        dispatch({ type: 'SET_LOADING_TRUE' });
        try {
            const { data } = await axios.post(`${API_URL}/api/v1/tables`, tableData);
            dispatch({ type: 'CREATE_TABLE_SUCCESS', payload: data.table });
        } catch (error) {
            dispatch({ type: 'API_ERROR', payload: error.response.data });
            clearAlert();
        }
    }

    const getOrders = async () => {
        dispatch({ type: 'SET_LOADING_TRUE' });
        try {
            const { data } = await axios.get(`${API_URL}/api/v1/orders`);
            dispatch({ type: 'GET_ORDERS_SUCCESS', payload: data.orders });
        } catch (error) {
            dispatch({ type: 'API_ERROR', payload: error.response.data });
            clearAlert();
        }
    }

    const createOrder = async (orderData) => {
        dispatch({ type: 'SET_LOADING_TRUE' });
        try {
            const { data } = await axios.post(`${API_URL}/api/v1/orders`, orderData);
            dispatch({ type: 'CREATE_ORDER_SUCCESS', payload: data.order });
        } catch (error) {
            dispatch({ type: 'API_ERROR', payload: error.response.data });
            clearAlert();
        }
    }

    const updateOrderStatus = async (orderId, status) => {
        dispatch({ type: 'SET_LOADING_TRUE' });
        try {
            const { data } = await axios.patch(`${API_URL}/api/v1/orders/${orderId}/status`, { status });
            dispatch({ type: 'UPDATE_ORDER_STATUS_SUCCESS', payload: data.order });
        } catch (error) {
            dispatch({ type: 'API_ERROR', payload: error.response.data });
            clearAlert();
        }
    }

    useEffect(() => {
        dispatch({ type: 'SET_LOADING_TRUE' });
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            dispatch({ type: 'GET_USER_SUCCESS', payload: { tokenUser: JSON.parse(storedUser) } });
        } else {
            getLoginUser(); // Fetch user from backend if not in localStorage
        }

    }, []);


    return <AppContext.Provider value={{...state, getLoginUser, login, logout, getCategories, createCategory, getMenuItems,createMenuItem,getTables,createTable,getOrders,createOrder,updateOrderStatus}}>
        {children}
    </AppContext.Provider>

}

export {AppProvider,useMyContext}