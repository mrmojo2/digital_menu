import { initialState } from "./AppContext"

const reducer = (state,action)=>{
    switch(action.type){
        case 'SET_LOADING_TRUE':
            return {
                ...state,
                loading:true
            };
        case 'SET_LOADING_FALSE':
            return {
                ...state,
                loading:false
            };
        case 'GET_USER_SUCCESS':
            return{
                ...state,
                loading:false,
                user:action.payload.tokenUser,
            };
        case 'LOGIN_USER_SUCCESS':
            return {
                ...state,
                loading: false,
                user: action.payload.tokenUser,
            };
        case 'LOGIN_USER_FAIL':
            return{
                ...state,
                loading:false,
                showAlert:true,
                alertText:action.payload.msg,
                alertType: 'danger'
            };
        case 'LOGOUT_USER':
            return{
                ...initialState,
                loading:false
            };
        case 'CLEAR_ALERT':
            return{
                ...state,
                showAlert:false,
                alertText:null,
                alertType:null
            };
        case 'SET_SEARCH_SUGGESTIONS':
            return{
                ...state,
                searchSuggestions:action.payload,
            };
        case 'SET_SELECTED_LOCATION':
            return{
                ...state,
                selectedLocation:action.payload,
            };
        case 'SET_FORM_LOADING_TRUE':
            return{
                ...state,
                formLoading:true,
            };
        case 'SET_FORM_LOADING_TRUE':
            return{
                ...state,
                formLoading:true,
            };
        case 'PROFILE_UPDATE_SUCCESS':
            return{
                ...state,
                user:action.payload.tokenUser,
                formLoading:false,
                showAlert:true,
                alertType:'success',
                alertText:'Profile Updated Successfully',
            };
        case 'PROFILE_UPDATE_FAIL':
            return{
                ...state,
                formLoading:false,
                showAlert:true,
                alertType:'danger',
                alertText:action.payload.msg
            };
        
        default:
            throw new Error('Unknows action: '+ action.type)
    }
}

export default reducer