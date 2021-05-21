import styled, { css } from "styled-components";
import { Input } from "@progress/kendo-react-inputs";
import { lighten, darken, complement } from "polished";
import { Toolbar } from "@progress/kendo-react-buttons";
import { PanelBar } from "@progress/kendo-react-layout";
import { Dialog } from "@progress/kendo-react-dialogs";

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px"
};

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`
};

export const BlockedSpan = styled.span`
  display: block;
  font-size: 12px;
  color: ${props =>
    props.light
      ? lighten(0.1, props.theme.headingFontColor)
      : props.danger
      ? props.theme.dangerHeadingFontColor
      : props.theme.headingFontColor};
  font-style: ${({ danger }) => (danger ? "italic" : "normal")};
  float: ${({ danger }) => (danger ? "right" : "none")};
`;

export const BlockedSpanBigger = styled(BlockedSpan)`
  font-weight: 600;
  font-size: 13px;
`;

export const TopPane = styled.fieldset`
  display: block;
  position: relative;
  background: ${props =>
    props.light
      ? complement(props.theme.paneBackgroundColor)
      : props.theme.paneBackgroundColor};
  margin: 0px 14px !important;
`;

export const FieldHeading = styled.span`
  color: ${props =>
    props.light
      ? lighten(0.8, props.theme.headingFontColor)
      : props.theme.headingFontColor};
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 14px;
  display: block;
  padding: 10px 0 0 10px;
`;

export const FieldValue = styled.span`
  color: ${props =>
    props.light
      ? lighten(5, props.theme.darkestFontColor)
      : props.theme.darkestFontColor};
  font-weight: 600;
  font-size: "18px";
  display: block;
  margin-bottom: 10px;
  padding: 0px 0 10px 10px;
`;

export const ScrollableModal = styled.div`
  @media ${device.mobileM} {
    max-width: 300px;
    max-height: 300px;
    overflow: auto;
  }
  @media ${device.tablet} {
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  @media ${device.laptop} {
    max-height: 700px;
    overflow-y: auto;
    overflow-x: hidden;
  }
`;

export const FieldHeadingSmall = styled.span`
  margin-top: 5px;
  margin-bottom: 2px;
  font-weight: bolder;
  display: block;
  font-size: 12px;
`;

export const FieldValueSmall = styled.span`
  font-weight: 400;
  font-size: "0.875rem";
  margin-bottom: 10px;
`;

export const TableHeadingStyling = css`
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  font-size: 13px;
  padding: 0px;

  border-bottom: 1px solid
    ${props => lighten(0.2, props.theme.tableHeadingBackgroundColor)};
  border-top: 1px solid transparent;
  font-weight: bold;
  background: ${props => props.theme.tableHeadingBackgroundColor};
  color: ${props => props.theme.tableHeadingFontColor};
`;

export const RowStyling = css`
  border: none !important;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
  margin-top: 0.66rem;

  padding-left: 10px;
  color: ${props => props.theme.tableRowFontColor};
  font-size: 12px;
`;
export const ResponsiveDiv = styled.div.attrs({
  className: "table table-responsive"
});

export const ResponsiveTable = styled.table.attrs({
  className: "table table-bordered  table-condensed table-hover "
})`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 7px;
  text-align: left;
  border-radius: 10px;
  border-radius: 2px;
  border-collapse: separate;
  border-spacing: 0 5px;
  margin-top: 0.66rem;
 
  & thead tr {
    ${TableHeadingStyling}
  }

  & tbody tr {
    ${RowStyling}
    background-color: ${props => props.theme.tableRowBackgroundColor};
    &:hover, &:focus {
      background-color: ${props =>
        darken(0.1, props.theme.tableRowBackgroundColor)};
   }
  }

  & tbody tr td:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
   
    
  }
  & tbody tr td{
    padding:2px;
  }

  & tbody tr td:last-child {
   
    border-top-right-radius: 6x;
    border-bottom-right-radius: 6px;
    
  }
`;

export const LinkedSpan = styled.span`
  text-decoration: underline;
  cursor: pointer;
  font-weight: bold;
`;

export const NumericSpan = styled.span`
  float: right;
`;

export const ARTable = styled(ResponsiveTable)`
& thead tr {
  ${TableHeadingStyling}
  background: ${props => props.theme.panelHeaderBackgroundColor};
}
& tbody tr {
  ${RowStyling}
 
  &:hover, &:focus {
    background-color: ${props =>
      darken(0.1, props.theme.tableRowBackgroundColor)};
 } 
}
& tbody tr:nth-of-type(odd) {
  
  background-color:${props => props.theme.arColor}; 
  }
  & tbody tr:nth-of-type(even) {
    background-color:${props => lighten(0.1, props.theme.arColor)}; 
    }
& tbody tr td{
  padding:10px;
}

`;

export const PageTitle = styled.h2`
  margin: 12px 0 12px;
  padding-left: 20px;
  color: ${props => props.theme.pageTitleFontColor};
  font-weight: bolder;
`;

export const MainDiv = styled.div`
  padding: 10px 14px !important;

  & textarea {
    height: auto !important;
    resize: none;
  }
  & fieldset {
    background: transparent;
    position: relative;
    padding: 10px 14px !important;
    margin: 2px;
  }
`;

const inputCss = css`
  padding: 4px;
  font-size: 13px;
  line-height: 1.5;
  border-radius: 4px;
  width: ${({ size }) =>
    size === "sm" ? `40px` : size === "md" ? `120px` : `220px`}!important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
`;

export const FieldLabel = styled.label`
  font-weight: bold !important;

  color: ${props => props.theme.inputFontColor};
  width: 220px;
  display: block;
  font-size: 12px;
`;

export const FieldLabelDark = styled(FieldLabel)`
  color: rgb(33, 34, 34);
`;

export const FieldLabelBigger = styled(FieldLabel)`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.tableHeadingFontColor};
`;
export const TextField = styled(Input)`
  ${inputCss}
`;

export const StyledDatePicker = styled.span`
  ${inputCss}
`;

export const StyledDialog = styled(Dialog)`
  & div {
    background-color: ${props => props.theme.dialogColor};
  }
`;
export const HeaderLink = styled.span`
  color: ${props => props.theme.pageTitleFontColor};
  font-size: 13px;
  font-weight: bolder;
  padding-right: 5px !important;
  float: right !important;
  position: absolute;
  right: 0px;
  align-items: center;
`;

export const CustomizedToolbar = styled(Toolbar)`
  padding: 0px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${props => darken(0.3, props.theme.bodyColor)};
`;
export const CustomizedPanelBar = styled(PanelBar)`
  border-color: ${props => lighten(0.1, props.theme.bodyColor)}!important;
  background-color: ${props => props.theme.bodyColor}!important;
  & div.k-panelbar {
    border-color: ${props => lighten(0.5, props.theme.bodyColor)}!important;
    color: ${props => props.theme.panelHeaderFontColor};
    background-color: ${props => props.theme.bodyColor};
  }

  & span.k-link {
    font-weight: 600;
    font-size: 16px;
  }
  & div.k-animation-container {
    border-color: rgb(50, 76, 127);
    border-top-color: rgb(50, 76, 127);
    border-right-color: rgb(50, 76, 127);
    border-bottom-color: rgb(50, 76, 127);
    border-left-color: rgb(50, 76, 127);
    background-color: ${props => props.theme.bodyColor};
  }
  & div.div.k-child-animation-container {
    background-color: ${props => props.theme.bodyColor};
  }

  & table.table {
    border-color: rgba(33, 37, 41, 0.125);
    color: #292b2c;
    background-color: ${props => props.theme.bodyColor};
  }
`;

export const CustomizedPane = styled.fieldset`
  display: block;
  margin: 10px 14px !important;
  background-color: ${props => props.theme.panelBackgroundColor};
`;
