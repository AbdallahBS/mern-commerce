import { historyRentable } from "../actions/constans";
const initialState = {
    historyr:[],

}
export default(state = initialState,action)=>{
    switch(action.type){
        
        case historyRentable.GET_DETAILS_SUCCESS :
            state = {
                ...state,
                historyr: action.payload.historyr,
            }
        break;
      
    }
    return state;
}