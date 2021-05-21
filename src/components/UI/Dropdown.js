import React from 'react';
import styled from 'styled-components';
const unstyledDropdown = React.memo((props)=>{
    return (
        <select name={props.name} 
        className={props.className}
         id={props.id}
         onChange={props.onChangeHandler} 
         value={props.value}>
            {
                
                props.data.map(item=>{
                   let val = props.itemValue?item[props.itemValue]:item;
                   let label = props.itemLabel?item[props.itemLabel]:item;
                    return <option key={val} value={val}>{label}</option>
                })
            }
        </select>
    );
});

const dropdown = styled(unstyledDropdown)`   
border-radius: 4px;
   
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    outline: 0;
  
    font-size: 13px;
    line-height: 1.5;
    display: inline-flex;
    vertical-align: middle;
    position: relative;
    width:200px;
    padding: 4px;
    font-size: 13px;
    line-height: 1.5;
    border-radius: 4px;
   
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

`

export default dropdown;