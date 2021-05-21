import * as actionTypes from './actionTypes';

import axios from '../../axios-autoexceptions';
import {ARSummary} from './ARSummary';

export const setARSummary=(arSummary)=>{
    return {
      type:actionTypes.SET_AR_SUMMARY,
      arSummary:arSummary
  };
};
export const fetchARSummaryStart = ()=>{
  return {
      type:actionTypes.FETCH_AR_SUMMARY_START
  };
}
export const fetchARSummaryAsync = ()=>{
        return dispatch=>{
      //  dispatch(fetchARSummaryStart());
      dispatch(setARSummary(ARSummary));
       
       

    }
  }