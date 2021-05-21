import styled from 'styled-components';

export const BorderedDiv = styled.div`
border-bottom: 1px solid white;
  margin-bottom:10px;
     margin-left: 10px; 
     margin-right: 5px;
     width:100%;
     color:white;
     font-weight:bold;

`;



export const MilestonePane = styled.fieldset`
display: block;
margin: 10px 14px!important;
background-color: ${props=>props.theme.panelBackgroundColor};
`;


export const ExportExcelLink = styled.span`
float:left;
padding: 7px;
font-weight:bold;
text-decoration:underline;
`

