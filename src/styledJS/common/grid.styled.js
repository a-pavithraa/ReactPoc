import styled, { css } from "styled-components";
import {lighten,darken} from 'polished';
export const GridDiv = styled.div`
margin: 10px 14px!important;
`;

export const GridStyles =css`
& div.k-grid-container{
    background-color:${props=>darken(0.05,props.theme.gridColor)}
  }
  & .k-widget.k-grid{
    border:none;
  }
  & div.k-header{
    
    color: ${props=>props.theme.panelHeaderFontColor};
    background-color: ${props=>props.theme.toolbarColor};
    border-radius: 3px;
   
  } 
  & th {
    font-weight: bolder;
    font-size: 12px;
   
  }
 &  .k-grid-header th {
    position: -webkit-sticky;
    position: sticky;
    z-index: 1;
    background-color: #266c8c;
  }
  
  
  & tbody tr:nth-of-type(odd) {
  
  background-color:${props=>props.theme.gridColor}; 
  }
  & tbody tr:nth-of-type(even) {
    background-color:${props=>lighten(0.1,props.theme.gridColor)}; 
    }
  &  tbody td {
    font-size: 12px;
    color: ${props=>props.theme.tableRowFontColor};

  }
  & tr:last-child td{
    border-bottom: 1px solid rgba(33, 37, 41, 0.125);
  }
  
`;