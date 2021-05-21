import React,{useState} from "react";
import styled, { ThemeProvider } from "styled-components";
import {LightTheme,DarkTheme} from '../Themes/Themes';


const MainDiv = styled.div`
  font-family: "Open Sans", Arial, Helvetica, Sans-Serif;
  font-size: 13px;
  line-height: 1.42857143;
  color: #333;
  height: 100vh;
  background-color: ${props => props.theme.bodyColor};
  @media (min-width: 1024px) {
    overflow-x: hidden;a
  }
`;


export const TopPaneContext = React.createContext();
export const useTheme = () => React.useContext(TopPaneContext);
const layout = React.memo(props => {


const toggleLayout=(value)=>{
    if(value){
    setCurrentTheme(DarkTheme);
    setDarkMode(true);
    }
    else{
    setCurrentTheme(LightTheme);
    setDarkMode(false);
    }
}
const [currentTheme,setCurrentTheme] = useState(LightTheme);
const [darkMode,setDarkMode]=useState(false);
  return (
    <TopPaneContext.Provider  value={{ toggle: toggleLayout,mode:darkMode }}>
    <ThemeProvider theme={currentTheme}>
      <MainDiv>    
       
        {props.children}
      </MainDiv>
    </ThemeProvider>
    </TopPaneContext.Provider>
  );
});

export default layout;
