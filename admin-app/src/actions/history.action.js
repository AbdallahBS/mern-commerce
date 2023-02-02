import axios from "../helpers/axios";
import { historyConstants } from "./constans";

export const addHistory = form =>{
    return async dispatch =>{
        const res = await axios.post('history/add' , form);
        console.log(res);
    }
}
export const addHistoryP = form =>{
    return async dispatch =>{
        const res = await axios.post('historyP/add' , form);
        console.log(res);
    }
}
export const getHistoryD = form =>{
    return async dispatch =>{
        const res = await axios.post('history/getDay' , form);
        const history=res.data
      
        dispatch({
            type : historyConstants.GET_DAY_HISTORY_SUCCESS,
            payload : {history}
        });
    }
}
export const getHistoryN = form =>{
    return async dispatch =>{
        const res = await axios.post('history/getN' , form);
        const historyN=res.data
        console.log('this is',historyN)
        dispatch({
            type : historyConstants.GET_N_HISTORY_SUCCESS,
            payload : {historyN}
        });
    }
}