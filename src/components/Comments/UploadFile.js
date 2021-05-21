import React,{useState} from 'react';
import * as Styled from "../../styledJS/common/common.styled";
import {  DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Upload } from '@progress/kendo-react-upload';
import axios from '../../axios-autoexceptions';
const uploadAttachement = React.memo(props=>{

    const [uploadedFile,setUploadedFile]=useState([]);
    const uploadFile = ()=>{
        console.log("File Uploaded");
        props.uploadComment();
    }
    const deleteFile =()=>{
        console.log("File deleted");
    }

    const onAdd = (event) => {
        console.log('onAdd: ', event.affectedFiles);
        axios.post("/CommentFile/")

        setUploadedFile(event.newState);
    }

    const onRemove = (event) => {
        console.log('onRemove: ', event.affectedFiles);

        setUploadedFile(event.newState);
    }

    return (
        <Styled.StyledDialog onClose={props.close}>
      <Styled.ScrollableModal>
      <div >
<Upload
                autoUpload={false}
                defaultFiles={[]}
                files={uploadedFile}
                onAdd={onAdd}
                onRemove={onRemove}
                withCredentials={false}
                multiple={false}
              
            />
</div>
      </Styled.ScrollableModal>
      </Styled.StyledDialog>
    );
});

export default uploadAttachement;