import React,{useContext} from 'react';
import {TopPaneContext} from './Layout';

function useTopPaneSettings(){
    const [settings,saveSettings] = useContext(TopPaneContext);
    const setMode=(mode)=>{
        saveSettings({...settings,mode:mode});
    }
    const setTitle = (title)=>{
        saveSettings({...settings,title:title});
    }

    return [setMode,setTitle]
}

export default useTopPaneSettings;