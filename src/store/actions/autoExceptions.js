import * as actionTypes from './actionTypes';

import axios from '../../axios-autoexceptions';
import {ClientDetails} from './ClientDetails';

export const setExceptions=(exceptionsArr)=>{
      return {
        type:actionTypes.SET_EXCEPTIONS,
        exceptions:exceptionsArr
    };
};

export const setAutoExceptionsSearchForm=(aeForm)=>{
    return {
      type:actionTypes.SET_AE_FORM,
      autoExceptionsSearchForm:aeForm
  };
};
export const fetchExceptionsStart = ()=>{
    return {
        type:actionTypes.FETCH_EXCEPTIONS_START
    };
}

export const fetchExceptionsFailed = ()=>{
    return {
        type:actionTypes.FETCH_EXCEPTIONS_FAILED
    };
}


export const setClientDetails=(clientDetailsArr)=>{
    return {
      type:actionTypes.SET_CLIENT_DETAILS,
      clientDetails:clientDetailsArr
  };
};
export const fetchClientDetailsStart = ()=>{
  return {
      type:actionTypes.FETCH_CLIENT_DETAILS_START
  };
}

export const fetchClientDetailsFailed = ()=>{
  return {
      type:actionTypes.FETCH_CLIENT_DETAILS_FAILED
  };
}
export const fetchExceptionsAsync=(searchCriteria)=>{
    console.log(searchCriteria);
    
    return dispatch=>{
        dispatch(fetchExceptionsStart());
        axios.post( '/ExceptionsList', JSON.stringify(searchCriteria),  {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then( response => {
            dispatch(setExceptions(response.data.items));
        } )
        .catch( error => {
            //To be replaced
            console.log( error ) ;
            dispatch(fetchExceptionsFailed());
        } );
       
       

    }

}

export const fetchClientDetailsAsync=()=>{
    return dispatch=>{ dispatch(setClientDetails(ClientDetails))};
}

