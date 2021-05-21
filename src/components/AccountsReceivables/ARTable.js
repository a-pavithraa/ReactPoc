import React from 'react';
import * as Styled from '../../styledJS/common/common.styled';
const arTable = React.memo(props=>{
const arSummary = props.arSummaryList;
    return(
       
  

           
        <div className="table table-responsive">
        
        <Styled.ARTable>
              <thead>
              <tr  >
            <th >Due Type</th>
            <th>Amount</th>
            <th>#Invoices</th>
            <th>% of Total</th>
            </tr>
                  </thead>
                  <tbody>
            {
                arSummary.map(summary=>{
                    return (
                        <tr  key={summary.dueType}>
                            <td><Styled.LinkedSpan>{summary.dueType}</Styled.LinkedSpan></td>
                            <td><Styled.NumericSpan>{summary.totalDue}</Styled.NumericSpan></td>
                            <td><Styled.NumericSpan>{summary.invoiceCount}</Styled.NumericSpan></td>
                            <td><Styled.NumericSpan>{summary.amountPercent}</Styled.NumericSpan></td>
                        </tr>
                            );
            })
            }
            </tbody>
                  </Styled.ARTable>
               
                  
                  <button
              className="btn btn-primary"
              onClick={() => props.onFetchClientDetails()}
            >
            Show Client Details
            </button>
            &nbsp;&nbsp;
            
           <br/>
                  </div>
                 
    );
});

export default arTable;