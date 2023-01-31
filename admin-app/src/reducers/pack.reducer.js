import { packsConstants } from "../actions/constans";
const initialState = {
    packs :[]
}
export default(state = initialState,action)=>{
    switch(action.type){
        
        case packsConstants.GET_ALL_PACKS_SUCCESS :
            state = {
                ...state,
                packs : action.payload.packs,
            }
        break;
    }
    
    return state;
}