import { productConstants } from "../actions/constans";
import Products from "../containers/products";
const initialState = {
    products :[]
}
export default(state = initialState,action)=>{
    switch(action.type){
        case productConstants.GET_ALL_PRODUCTS_SUCCESS :
            state = {
                ...state,
                products : action.payload.products,
            }
            console.log('thos ',state)

        break;
    }
    return state;
}