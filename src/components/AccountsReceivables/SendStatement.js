import React,{useState} from 'react';
import { DialogActionsBar } from '@progress/kendo-react-dialogs';

import * as Styled from '../../styledJS/common/common.styled';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

const statementDialog = React.memo((props)=>{

    const [editableItem,setEditedItem]=useState(props.selectedItems.map((item) =>{return {...item,inEdit: true}}));
    const  handleSubmit=(event)=> {
        event.preventDefault();
    }

   
   
  
const itemChange = (e) => {
    e.dataItem[e.field] = e.value;
    setEditedItem([...editableItem]);
};

    return (
        <Styled.StyledDialog
            onClose={props.cancel}
          
        >
            
      <Styled.ScrollableModal>
             
              <form  onSubmit={handleSubmit}>
             
              <Grid
            data={editableItem}
            editField="inEdit"
            onItemChange={itemChange}
            style={{ maxHeight: "150px" }}
        >
            <Column field="id" title="Party ID" width="150px" editable={false} />
            <Column field="email" width="200px" title="E-Mail IDs"  />
            <Column field="message" width="200px" title="Message" />
            
        </Grid>
           
          






             
<hr/>
            
            <DialogActionsBar>
                <button
                    className="btn btn-warning"
                    onClick={()=>props.cancel('Comments')}
                >
                    Cancel
                </button>&nbsp;&nbsp;
                <button
                    className="btn btn-primary"
                    onClick={()=>props.save(editableItem)}
                >
                    Save
                </button>&nbsp;&nbsp;
                
            </DialogActionsBar>
            <br/>
            </form>
            </Styled.ScrollableModal>
        </Styled.StyledDialog>
        
    );

});

export default statementDialog;