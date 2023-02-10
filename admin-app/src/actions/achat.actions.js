import axios from "../helpers/axios";
import { historyAchatConstants } from "./constans";
export const getHistoryAchat = form =>{
    return async dispatch =>{
        const res = await axios.post('historyachat/get', form);
        const historyachat=res.data
      
        dispatch({
            type : historyAchatConstants.GET_HISTORY_ACHAT_SUCCESS,
            payload : {historyachat}
        });
    }
}