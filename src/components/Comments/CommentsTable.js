import React,{  useEffect, useCallback } from "react";


import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import Loader from 'react-loader-spinner';
import styled from "styled-components";

import * as Styled from '../../styledJS/common/common.styled';
const commentsTable = React.memo(props => {

  const aeunid=props.aeunid;
  const commentsDetails = useSelector(
    state => state.drilldownDetails.comments
  );
  const commentsLoadingFlag = useSelector(
    state => state.drilldownDetails.commentsLoadingFlag
  );
  const dispatch = useDispatch();

  const onFetchComments = useCallback(
    (aeunid) => dispatch(actions.fetchCommentsAsync('Milestone',aeunid)),
    [dispatch]
  );

  const BlueSpan = styled.span`
  color:blue;
  `
  const WrappedStyle = styled(Styled.BlockedSpan)`
  wordWrap:"break-word"
  `
  useEffect(() => {
    onFetchComments(aeunid);
  }, [onFetchComments,aeunid]);
  let commentsComp= <Loader
  type="Puff"
  color="#00BFFF" 
/>
 

 if(commentsDetails&& !commentsLoadingFlag){
  let commentsList = commentsDetails;
  const showDrilldown = commentsList.length>3?true:false;
  if(!props.drilldown && showDrilldown){
    commentsList=  commentsList.slice(0,3);

  }
  commentsComp=       
 <Styled.ResponsiveTable>
    <thead></thead>
    <tbody>
  
      {commentsList.map(comment => {
        return (
          <tr  key={comment.createTime}>
            <td >
           <WrappedStyle>
           <BlueSpan>{comment.updatedBy} &nbsp;</BlueSpan>
           <Styled.BlockedSpan light>*{comment.createDate} *{comment.commentType}*
           
           </Styled.BlockedSpan>
           </WrappedStyle>
               
               <Styled.BlockedSpan>{comment.comments}</Styled.BlockedSpan>
                {comment.lossCommentType?<Styled.BlockedSpan danger>* Loss Category:{comment.lossCommentType} *Loss Amount:{comment.lossAmount}*</Styled.BlockedSpan>:''}
            </td>
          </tr>
        );
      })}
      {
       !props.drilldown? <tr><td> <Styled.BlockedSpan><input type="button" className="btn btn-primary" 
       value="Add Comment" /> {showDrilldown?<input type="button" className="btn btn-success" 
       value="View All Comments" onClick={props.showDrilldown}/>:''}
    </Styled.BlockedSpan>   </td></tr>:''
      }
     
    </tbody>
    </Styled.ResponsiveTable>

 }

  
  return (
    <div >{commentsComp}</div>
  
  );
});

export default commentsTable;
