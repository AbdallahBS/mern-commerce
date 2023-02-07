import { historyAchatConstants } from "../actions/constans";
const initialState = {
    historyachat :[],

}
export default(state = initialState,action)=>{
    switch(action.type){
        
        case historyAchatConstants.GET_HISTORY_ACHAT_SUCCESS :
            state = {
                ...state,
                historyachat : action.payload.historyachat,
            }
        break;
      
    }
  
    return state;
}