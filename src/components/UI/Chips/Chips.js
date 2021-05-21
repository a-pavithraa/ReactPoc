import React from 'react';
import classes from './Chips.module.scss';
import Moment from 'moment';

function capitalizeFirstLetterAndSplitWords([firstLetter, ...rest]) {
  return [firstLetter.toLocaleUpperCase(), ...rest].join('')
        .match(/([A-Z]?[^A-Z]*)/g).slice(0,-1).join(" ");
}
const chips = React.memo((props)=>{

  
  
 let data =props.data;
  console.log("in chips"+JSON.stringify(data));
    
    const deleteChip=(removedAttribue) =>{
      
        let updatedData ={...data};
        delete updatedData[removedAttribue];
      data=updatedData;
        props.resetValForAttribute(removedAttribue);

        
      }

    return (
      Object.keys(data).map(searchCriteria=>{
        let value = data[searchCriteria];
        if(searchCriteria.indexOf('Date')>-1){  
       
          value =Moment(value).format("DD/MMM/YYYY");
          
        
       
      }
        return (  <span className={classes.chip} key={searchCriteria}>
          <span className={classes.chipValue}>{capitalizeFirstLetterAndSplitWords(searchCriteria)}:{value}</span>
                  <button type="button" className={classes.chipDeleteButton} onClick={()=>deleteChip(searchCriteria)}>x</button>
                </span>);
        
      })
      
    )

});

export default chips;