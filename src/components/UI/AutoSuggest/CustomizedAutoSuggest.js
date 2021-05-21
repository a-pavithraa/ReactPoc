import React,{useState} from 'react';
import Autosuggest from 'react-autosuggest';
import axios from '../../../axios-autoexceptions';

const theme = {
  container: {
    position: 'relative'
  },
  input: {
    padding: '4px',
    fontSize: '13px',
    lineHeight: '1.5',
    borderRadius: '4px',
    width: '220px',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
  },
  inputFocused: {
    outline: 'none'
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  suggestionsContainer: {
    display: 'none'
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    top: 30,
    width: 280,
    maxHeight:250,
    overflowY:'auto',
    border: '1px solid #aaa',
    backgroundColor: '#f7f7f7',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
    fontWeight: 400,
    fontSize: '13px',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  suggestion: {
    cursor: 'pointer',
    padding: '5px 5px'
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd'
  }
};



 
  
  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = suggestion => suggestion;
  
  // Use your imagination to render suggestions.
  const renderSuggestion = suggestion => (
    <span>
      {suggestion}
    </span>
  );
  
const customAutoSuggest = React.memo((props)=>{
 // Teach Autosuggest how to calculate suggestions for any given input value.
 
    const [suggestions,setSuggestions]=useState([]);
    const [value,setValue]=useState(props.value)

    const onSuggestionsFetchRequested = ({ value }) => {
     if(value.length<2){
       setSuggestions([]);
     }
     else{
      axios.get( '/SuggestionsList/'+ props.type+"/"+value)
      
      .then(response => setSuggestions(response.data))
      .catch( error => {
          //To be replaced
          console.log( error ) ;
      } );
    }
      };
     const onChange = (event, { newValue }) => {
        setValue(newValue);
        props.onChange({name:props.id,value:newValue},'')
      };
    
      // Autosuggest will call this function every time you need to clear suggestions.
     const onSuggestionsClearRequested = () => {
        setSuggestions([]);
      };
      const inputProps = {
      
        value:props.value,
        onChange: onChange
      };
      return (
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          id={props.id}
          theme={theme}
          
        />
      );
  

});


export default customAutoSuggest;
