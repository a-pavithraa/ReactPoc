import React from "react";
import * as Styled from "../../styledJS/common/common.styled";
import CommentsTable from './CommentsTable';
import {  DialogActionsBar } from "@progress/kendo-react-dialogs";

const commentsDrilldown = React.memo((props)=>{
    const commentsDetails = props.commentsDetails;
     
  
 
  return (
    
    <Styled.StyledDialog onClose={props.close}>
      <Styled.ScrollableModal>
    <CommentsTable
    commentsList={commentsDetails}
    drilldown="true"   
  />
  </Styled.ScrollableModal>
  <DialogActionsBar>
          <button className="btn btn-warning" onClick={props.close}>
            Close
          </button>
          &nbsp;&nbsp;
        </DialogActionsBar>
        <br />

      </Styled.StyledDialog>

 
  )
});

export default commentsDrilldown;