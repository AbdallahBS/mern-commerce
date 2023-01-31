import { historyConstants } from "../actions/constans";
const initialState = {
    history :[],

}
export default(state = initialState,action)=>{
    switch(action.type){
        
        case historyConstants.GET_DAY_HISTORY_SUCCESS :
            state = {
                ...state,
                history : action.payload.history,
            }
        break;
      
    }
  
    return state;
}