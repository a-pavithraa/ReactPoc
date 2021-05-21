import React from "react";

import {  PanelBarItem } from "@progress/kendo-react-layout";

import CommentsTable from '../Comments/CommentsTable';
import AddComment from '../Comments/AddComment';
import * as Styled from '../../styledJS/common/common.styled';
import * as LocalStyled from './Styled';
const transactionDrilldown = React.memo((props)=>{
    const aeunid = props.match.params.aeUnid;

    return(
        <div>
             <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <Styled.PageTitle>COMMENTS DETAILS</Styled.PageTitle>
          </div>
        </div>
            <AddComment aeunid={aeunid}/>
            <LocalStyled.MilestonePane>
            <Styled.CustomizedPanelBar expandMode="multiple">
         

         <PanelBarItem
           title={"Comments"}
           expanded={true}
          
         >
               <Styled.ScrollableModal>
           <CommentsTable aeunid={aeunid} drilldown="true"   />
           </Styled.ScrollableModal>
           
         </PanelBarItem>
         </Styled.CustomizedPanelBar>
          
</LocalStyled.MilestonePane>
        </div>
    )


});

export default transactionDrilldown;
