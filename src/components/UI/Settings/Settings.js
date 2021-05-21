import React, { useState, useRef } from "react";
import {  SplitButton } from '@progress/kendo-react-buttons';
import { Switch } from "@progress/kendo-react-inputs";

import { useTheme } from "../../UI/Layout/Layout";
import { Popup } from "@progress/kendo-react-popup";
import * as Styled from "../../../styledJS/common/common.styled";


const settings = React.memo(props => {
  const [show, setShow] = useState(false);
  const btnEl = useRef(null);
  
  const onClick = () => {
    console.log(btnEl.current);
    setShow(!show);
  };
  const { toggle, mode } = useTheme();
  const settingEl = (
    <div>
      <button className="btn btn-primary" onClick={onClick} ref={btnEl}>
        <i className="fa fa-gear"></i>
      </button>
      <Popup
        anchor={btnEl.current}
        show={show}
        className={"wrapper"}
        popupClass={"inner-wrapper"}
      >
        <Styled.BlockedSpanBigger>
        Dark Mode &nbsp;
          <Switch
           
            defaultChecked={mode}
            onChange={event => toggle(event.target.value)}
          /> 
        </Styled.BlockedSpanBigger>
      {props.mainPage?<Styled.BlockedSpan>
        <SplitButton primary="true" items={['Save Criteria','Reset Criteria']} text="Search Criteria" onItemClick={props.saveSettings}/>
        </Styled.BlockedSpan>:''}
        
      </Popup>
    </div>
  );

  return <div>{settingEl}</div>;
});

export default settings;
