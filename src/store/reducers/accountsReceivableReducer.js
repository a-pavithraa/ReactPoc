import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    arSummary:null,
    clientDetails:null,    
    loading:false,
    
};

const fetchARSummaryStart = (state,action)=>{
    return updateObject(state,{
        loading:true

    });
}

const setARSummary = (state, action) => {
    return updateObject( state, {
        arSummary:action.arSummary,
        loading:false
    } );
};

const fetchARSummaryFailed = (state, action) => {
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
       
        case actionTypes.FETCH_AR_SUMMARY_START:return fetchARSummaryStart(state,action);
        case actionTypes.SET_AR_SUMMARY: return setARSummary( state, action );
        case actionTypes.FETCH_AR_SUMMARY_FAILED: return fetchARSummaryFailed( state, action );
       
        case actionTypes.FETCH_CLIENT_DETAILS_START:return fetchClientDetailsStart(state,action);
        case actionTypes.SET_CLIENT_DETAILS: return setClientDetails( state, action );
        case actionTypes.FETCH_CLIENT_DETAILS_FAILED: return fetchClientDetailsFailed( state, action );
       
        
        default: return state;
    }
};


export default reducer;