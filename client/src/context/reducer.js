import { initialState } from "./AppContext"

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING_TRUE':
            return {
                ...state,
                loading: true
            };
        case 'SET_LOADING_FALSE':
            return {
                ...state,
                loading: false
            };
        case 'GET_USER_SUCCESS':
            return {
                ...state,
                loading: false,
                user: action.payload.tokenUser,
            };
        case 'LOGIN_USER_SUCCESS':
            return {
                ...state,
                loading: false,
                user: action.payload.tokenUser,
            };
        case 'LOGIN_USER_FAIL':
            return {
                ...state,
                loading: false,
                showAlert: true,
                alertText: action.payload.msg,
                alertType: 'danger'
            };
        case 'LOGOUT_USER':
            return {
                ...initialState,
                loading: false
            };
        case 'CLEAR_ALERT':
            return {
                ...state,
                showAlert: false,
                alertText: null,
                alertType: null
            };
        case 'SET_FORM_LOADING_TRUE':
            return {
                ...state,
                formLoading: true,
            };
        case 'SET_FORM_LOADING_FALSE':
            return {
                ...state,
                formLoading: false,
            };
        case 'GET_CATEGORIES_SUCCESS':
            return {
                ...state,
                loading: false,
                categories: action.payload,
            };
        case 'CREATE_CATEGORY_SUCCESS':
            return {
                ...state,
                loading: false,
                categories: [...state.categories, action.payload],
            };
        case 'GET_MENU_ITEMS_SUCCESS':
            return {
                ...state,
                loading: false,
                menuItems: action.payload,
            };
        case 'CREATE_MENU_ITEM_SUCCESS':
            return {
                ...state,
                loading: false,
                menuItems: [...state.menuItems, action.payload],
            };
        case 'GET_TABLES_SUCCESS':
            return {
                ...state,
                loading: false,
                tables: action.payload,
            };
        case 'CREATE_TABLE_SUCCESS':
            return {
                ...state,
                loading: false,
                tables: [...state.tables, action.payload],
            };
        case 'GET_ORDERS_SUCCESS':
            return {
                ...state,
                loading: false,
                orders: action.payload,
            };
        case 'CREATE_ORDER_SUCCESS':
            return {
                ...state,
                loading: false,
                currentOrder: action.payload,
                orders: [...state.orders, action.payload],
            };
        case 'UPDATE_ORDER_STATUS_SUCCESS':
            return {
                ...state,
                loading: false,
                orders: state.orders.map(order =>
                    order._id === action.payload._id ? action.payload : order
                ),
            };
        case 'API_ERROR':
            return {
                ...state,
                loading: false,
                showAlert: true,
                alertText: action.payload.msg || 'Something went wrong',
                alertType: 'danger'
            };
        default:
            throw new Error('Unknown action: ' + action.type)
    }
}

export default reducer