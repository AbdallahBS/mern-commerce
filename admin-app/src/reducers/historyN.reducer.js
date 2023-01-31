import { historyConstants } from "../actions/constans";
const initialState = {
    historyN :[],

}
export default(state = initialState,action)=>{
    switch(action.type){
        
        case historyConstants.GET_N_HISTORY_SUCCESS :
            state = {
                ...state,
                historyN : action.payload.historyN,
            }
        break;
      
    }
  
    return state;
}