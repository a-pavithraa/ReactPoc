import React from 'react';
import { DialogActionsBar } from '@progress/kendo-react-dialogs';
import * as Styled from '../../../styledJS/common/common.styled';

const modal =React.memo((props)=>{

    let content =props.show ? <Styled.StyledDialog
        onClose={props.modalClosed}      
        >
          <Styled.MainDiv>
          {props.children}
              <br/><br/>
                  <DialogActionsBar>
                <button
                    className="btn btn-warning"
                    onClick={props.modalClosed}
                >
                    Cancel
                </button>&nbsp;&nbsp;
                
                
            </DialogActionsBar></Styled.MainDiv>
              </Styled.StyledDialog>:'';
    return (
        <React.Fragment>{content}</React.Fragment>
    )
       
    

});

export default modal;