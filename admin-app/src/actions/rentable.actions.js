import axios from "../helpers/axios";
import { historyRentable } from "./constans";
export const getRentable = form =>{
    return async dispatch =>{
        console.log("hmmm")
        const res = await axios.post('rentable/get', form);
        
        console.log("it is ?",res)
        const historyVente=res.data
        console.log("it is this ?",historyVente)
        dispatch({
            type : historyRentable.GET_DETAILS_SUCCESS,
            payload : {historyVente}
        });
    }
}