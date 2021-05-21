import React from 'react';

import * as Styled from '../../styledJS/common/common.styled';
const milestoneTable = React.memo((props)=>{
    
    const milestonesList = props.milestonesList;
    return(
      <div className="table table-responsive">
      <Styled.ResponsiveTable>
            <thead>
            <tr  >
            <th >Milestone</th>
            <th>Est. Date</th>
            <th>Est. Time</th>
            <th>Actual Date</th>
            <th>Actual TIme</th>
            <th>Reason</th>
            <th >Remarks</th>
            </tr>
            </thead>
            <tbody>
            {
                milestonesList.map(milestone=>{
                    return (
                        <tr  key={milestone.milestone+"_"+milestone.estDate}>
                <td >{milestone.milestone}</td>
                <td>{milestone.estDate}</td>
                <td>{milestone.estTime}</td>
                <td>{milestone.actDate}</td>
                <td>{milestone.actTime}</td>
                <td>{milestone.reasonCode}</td>
                <td >{milestone.remarks}</td>
                        </tr>

                    );

                })
            }
</tbody>
</Styled.ResponsiveTable>
</div>
    );

});

export default milestoneTable;