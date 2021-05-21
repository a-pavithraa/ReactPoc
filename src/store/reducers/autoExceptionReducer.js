import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    autoExceptionsSearchForm:{},
    exceptions:null,
    clientDetails:null,    
    loading:false,
    
};
const fetchExceptionStart = (state,action)=>{
    return updateObject(state,{
        loading:true

    });
}

const setAutoExceptionsSearchForm = (state,action)=>{
    return updateObject(state,{
        autoExceptionsSearchForm:action.autoExceptionsSearchForm
    });
}

const setExceptions = (state, action) => {
    return updateObject( state, {
        exceptions:action.exceptions,
        loading:false
    } );
};

const fetchExceptionsFailed = (state, action) => {
    return updateObject( state, { error: true,loading:false } );
};

const fetchClientDetailsStart = (state,action)=>{
    return updateObject(state,{
        loading:true

    });
};

const setClientDetails = (state, action) => {
  
    return updateObject( state, {
        clientDetails:action.clientDetails,
        loading:false
    } );
};

const fetchClientDetailsFailed = (state, action) => {
    return updateObject( state, { error: true,loading:false } );
};



const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_EXCEPTIONS_START:return fetchExceptionStart(state,action);
        case actionTypes.SET_EXCEPTIONS: return setExceptions( state, action );
        case actionTypes.FETCH_EXCEPTIONS_FAILED: return fetchExceptionsFailed( state, action );
       
        case actionTypes.FETCH_CLIENT_DETAILS_START:return fetchClientDetailsStart(state,action);
        case actionTypes.SET_CLIENT_DETAILS: return setClientDetails( state, action );
        case actionTypes.FETCH_CLIENT_DETAILS_FAILED: return fetchClientDetailsFailed( state, action );
        case actionTypes.SET_AE_FORM:return setAutoExceptionsSearchForm(state,action);
        
        default: return state;
    }
};

export default reducer;