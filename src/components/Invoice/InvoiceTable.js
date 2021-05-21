import React from 'react';
import * as Styled from '../../styledJS/common/common.styled';

const invoiceTable = React.memo((props)=>{

    const invoiceList = props.invoiceList;
    return(
         <div className="table table-responsive">
      <Styled.ResponsiveTable>
        <thead>
            <tr  >
               
            <th >Invoice#</th>
            <th>Client Name</th>
            <th>Client Number</th>
            <th>Invoice Amount</th>
            <th >Invoice Date</th>          
           
            </tr>
            </thead>
            <tbody>
            {
              
                invoiceList.map(invoice=>{
                    return (
                        <tr  key={invoice.invoiceNo}>
                <td ><a href="#" onClick={()=>props.drilldownHandler(invoice.invoiceNo)}><u>{invoice.invoiceNo}</u></a></td>
                <td>{invoice.clientName}</td>
                <td>{invoice.clientNumber}</td>
                <td>{invoice.invoiceAmount}</td>
                <td >{invoice.invoiceDate}</td>
               
                        </tr>

                    );
                   
                })
               
            }
</tbody>
       </Styled.ResponsiveTable>
       </div>
      
    );


});

export default invoiceTable;