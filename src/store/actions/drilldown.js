import * as actionTypes from './actionTypes';
import axios from '../../axios-autoexceptions';
export const setShipmentDetails=(shipmentDetails)=>{
    return {
      type:actionTypes.SET_SHIPMENTS,
      shipmentInformation:shipmentDetails
  };
};
export const fetchShipmentsStart = ()=>{
    return {
        type:actionTypes.FETCH_SHIPMENT_START
    };
}

export const fetchCommentsStart = ()=>{
    return {
        type:actionTypes.FETCH_COMMENTS_START
    };
}
export const setInvoiceDetails=(invoiceDetails)=>{
    return {
      type:actionTypes.SET_INVOICE,
      invoiceInformation:invoiceDetails
  };
};
export const fetchInvoiceStart = ()=>{
    return {
        type:actionTypes.FETCH_INVOICE_START
    };
}
export const fetchInvoiceAsync = (gshipId)=>{
   
    return dispatch=>{
       dispatch(fetchInvoiceStart());
       const invoiceInfo=[];
       dispatch(setInvoiceDetails(invoiceInfo));
    }
}

export const fetchShipmentsAsync = (jobNo)=>{
   
    return dispatch=>{
       dispatch(fetchShipmentsStart());
       axios.get( '/ShipmentDrilldownDetails/'+ jobNo)
    .then( response => {
        dispatch(setShipmentDetails(response.data));
    } )
    .catch( error => {
        //To be replaced
        console.log( error ) ;
    } );
      
    }
}
export const setInvoiceDrilldownDetails=(invoiceDetails)=>{
    return {
      type:actionTypes.SET_INVOICE_DRILLDOWN,
      invoiceDrilldownInfo:invoiceDetails
  };
};
export const fetchInvoiceDrilldownStart = ()=>{
    return {
        type:actionTypes.FETCH_INVOICE_DRILLDOWN_START
    };
}
export const fetchInvoiceDrilldownAsync=(invoiceNo)=>{
    return dispatch=>{
        dispatch(fetchInvoiceDrilldownStart());
        
            // Should be replaced with axios call
            let tempDrilldown ={
               "customerName":"HALLIBURTON ENERGY SERVICES, INC.,", 
               "customerNumber":"HALL102IAH",
              "pieces":"2",
              "weight":"27.66",
              "chargeWeight":"28.00",
              "serviceLevel":"International Standard Service",
              "invoiceDateFrom":"02-Jul-2019",
              "totalInvoiceAmount":"$316.20",
              "custAddr1":"3000 N SAM HOUSTON PARKWAY E",
              "custAddr2":"HOUSTON, TX 77032-3219",
              "shipperName":"MATERIAL ALTERATION CO LLC",
              "shipperCountry":"United States",
              "shipperCity":"HOUSTON",
              "consigneeName":"HALLIBURTON FAR EAST PTE LTD",
              "consigneeCountry":"Singapore",
              "consigneeCity":"SINGAPORE",
              "lineItems":[{
                "awb":"HIAH00109486",              
              
                "chargeDescription":"VDIR",
                "rate":"40.00",
                "quantity":"1.0",
                "quantityUOM":"SHP",
                "currency":"USD",
                "total":"$40.00",
                "tax":"$432",
                "remarks":"test",
              },{
                "awb":"HIAH00109486",
                "shipperName":"MATERIAL ALTERATION CO LLC",
                "shipperCountry":"United States",
                "shipperCity":"HOUSTON",
                "consigneeName":"HALLIBURTON FAR EAST PTE LTD",
                "consigneeCountry":"Singapore",
                "consigneeCity":"SINGAPORE",
                "chargeDescription":"VDIR",
                "rate":"40.00",
                "quantity":"1.0",
                "quantityUOM":"SHP",
                "currency":"USD",
                "total":"$40.00",
                "tax":"$432",
                "remarks":"test",
              }]
      
            };
            dispatch(setInvoiceDrilldownDetails(tempDrilldown));
    }
}



export const addComment = ( commentObj ) => {
    return {
        type: actionTypes.ADD_COMMENT,
        commentDetails: {
            commentType:commentObj.type,
            comment:commentObj.comment,
            lossCategory:commentObj.lossCategory,
            lossAmount:commentObj.lossAmount
            
        }
    };
};

export const setComments = (commentsArr)=>{
    return {
        type:actionTypes.SET_COMMENTS,
        comments:commentsArr
    }
}



export const fetchCommentsAsync = (commentType,aeunid,pageSize)=>{
    return dispatch=>{
        dispatch(fetchCommentsStart());
        axios.get( '/CommentsList/'+ commentType+'/'+aeunid
                +(pageSize>0?'?pageSize='+pageSize:''))
     .then( response => {
         dispatch(setComments(response.data.items));
     } )
     .catch( error => {
         //To be replaced
         console.log( error ) ;
     } );
       
     }
    };

