import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import {lighten,darken} from 'polished';
import { PanelBar,PanelBarItem } from "@progress/kendo-react-layout";




export const CardDefaultLayout = styled.div`
box-sizing: border-box;
-webkit-flex-direction: column;
-ms-flex-direction: column;
flex-direction: column;
overflow-y: auto;
padding: 10px;
background-color: ${props=>props.theme.cardBackgroundColor};
box-shadow: 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);
`

export const CardMixin =(height,maxHeight)=>{
    return `height:${height}px;max-height:${maxHeight}px`
} 


export const CardLayout=styled(CardDefaultLayout)`
 background:${(props) => props.dark ? darken(0.5,props.theme.cardBackgroundColor) : props.theme.cardBackgroundColor};
 
 ${CardMixin(200,250)}
 `
 export const CardLayoutSmall=styled(CardDefaultLayout)`
 ${CardMixin(50,100)}
 `
export const StyledLoader = styled(Loader)`
position: absolute;
width:100%;
 z-index: 15;
 top: 40%;
 left: 50%; 
`



export const MilestonePane = styled.fieldset`
display: block;
margin: 10px 14px!important;
background-color: ${props=>props.theme.panelBackgroundColor};
`;


export const StyledPanelBarItem = styled(PanelBarItem)`

`



  