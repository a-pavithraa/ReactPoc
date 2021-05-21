import React,{useState} from 'react';

import Dropdown from '../UI/Dropdown';
import {  SplitButton } from '@progress/kendo-react-buttons';

import * as Styled from '../../styledJS/common/common.styled';
import UploadFile from './UploadFile';
const addComment = React.memo((props)=>{

    const [commentForm,setCommentForm] = useState({});
    const [uploadDialog,showUploadDialog]=useState(false);
    const lossCategories=['Carrier Failure','Operation Error','Origin Pre-Alert Failure','Tariff Issue']
    const onInputChange = event => {
        let target = event.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.props ? target.props.name : target.name;    
        const commentFields = { ...commentForm, [name]: value };
   
    setCommentForm(commentFields);
      };

      const onItemClicked = event=>{
        console.log(event);
        if(event.item==='Upload Document and Add Comment'){
          showUploadDialog(true);
        }
      }
      const addComment = ()=>{
        showUploadDialog(false);

      }
      const closeDialog = ()=>{
        showUploadDialog(false);
      }
    
    
return (
  <Styled.TopPane>
       <Styled.MainDiv>
          <div className="row">
<div className="col col-sm-12 col-md-4 col-lg-3">
<Styled.FieldLabel>Comment Type</Styled.FieldLabel>
<Styled.TextField  id="commentType" name="commentType" value={commentForm.commentType || ''}  onChange={onInputChange}     />

</div>

<div className="col col-sm-12 col-md-4 col-lg-4">
<Styled.FieldLabel>Comment</Styled.FieldLabel>
<textarea cols="45" id="comment" name="comment" value={commentForm.comment || ''}  onChange={onInputChange}  />

</div>



<div className="col col-sm-12 col-md-4 col-lg-2">
<Styled.FieldLabel>Loss Category</Styled.FieldLabel>
<Dropdown
            data={lossCategories}
            name="lossCategory"
            id="lossCategory"
           
            value={commentForm.clientName || ''}         
            onChangeHandler={onInputChange}
            />
          </div>
           
            <div className="col col-sm-12 col-md-4 col-lg-2">
<Styled.FieldLabel>Loss  Amount</Styled.FieldLabel>
<Styled.TextField  id="commentType" name="commentType" value={commentForm.lossAmount || ''}   onChange={onInputChange}     />

</div>

</div>

<div className="row" style={{marginBottom: "5px"}}>
<div className="col col-12" style={{textAlign: "right",paddingRight:"10px"}}>
<SplitButton   onItemClick={(event) => onItemClicked(event)} items={['Add Comment','Upload Document and Add Comment']} iconClass="fa  fa-fw" text="Add Comment"  />

</div>
</div>
</Styled.MainDiv>
{uploadDialog && <UploadFile   uploadComment={addComment} cancel={closeDialog}/>}
   </Styled.TopPane>
)
});

export default addComment;