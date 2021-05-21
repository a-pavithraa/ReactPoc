import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
const initialState = {
  
    comments:[],
    loading:false,
    commentsLoading:false,
    shipmentInformation:null,
    invoiceInformation:null,
    invoiceDrilldownInfo:null
};
const setComments=(state, action)=>{
    return updateObject( state, {
        comments:action.comments,       
        commentsLoading: false
    } );
}

const fetchCommentsStart=(state, action)=>{
    return updateObject( state, {
       
        commentsLoading: true
    } );
}

const fetchShipmentStart = (state,action)=>{
    return updateObject(state,{
        loading:true

    });
}
const setShipmentInfo=(state,action)=>{
    return updateObject(state,{
        shipmentInformation:action.shipmentInformation,
        loading:false
    })
}
const fetchInvoiceStart = (state,action)=>{
    return updateObject(state,{
        loading:true

    });
}
const setInvoiceInfo=(state,action)=>{
    return updateObject(state,{
        invoiceInformation:action.invoiceInformation,
        loading:false
    })
}

const fetchInvoiceDrilldownStart = (state,action)=>{
    return updateObject(state,{
        loading:true

    });
}
const setInvoiceDrilldownInfo=(state,action)=>{
    return updateObject(state,{
        invoiceDrilldownInfo:action.invoiceDrilldownInfo,
        loading:false
    })
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
      
        case actionTypes.SET_COMMENTS: return setComments(state, action);     
        case actionTypes.FETCH_COMMENTS_START: return fetchCommentsStart(state, action);     
        case actionTypes.SET_SHIPMENTS: return setShipmentInfo(state,action);
        case actionTypes.FETCH_SHIPMENT_START: return fetchShipmentStart(state,action);
        case actionTypes.FETCH_INVOICE_START: return fetchInvoiceStart(state,action);
        case actionTypes.SET_INVOICE: return setInvoiceInfo(state,action);
        case actionTypes.FETCH_INVOICE_DRILLDOWN_START: return fetchInvoiceDrilldownStart(state,action);
        case actionTypes.SET_INVOICE_DRILLDOWN: return setInvoiceDrilldownInfo(state,action);
     
     
        
        default: return state;
    }
};

export default reducer;