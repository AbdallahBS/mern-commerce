import { type } from "@testing-library/user-event/dist/type";
import axios from "../helpers/axios";
import { categoryConstansts, initialDataConstants, productConstants ,packsConstants} from "./constans";

export const getInitialData=()=>{
    return async dispatch =>{
       
        const res=await axios.post('/initialdata');
        if(res.status === 200){ 
            const {categories,products,packs}= res.data;
            console.log('this',packs)
        dispatch({
            type : categoryConstansts.GET_ALL_GATEGORIES_SUCCESS,
            payload : {categories}
        });
        dispatch({
            type : productConstants.GET_ALL_PRODUCTS_SUCCESS,
            payload : {products}
        });
        dispatch({
            type : packsConstants.GET_ALL_PACKS_SUCCESS,
            payload : {packs}
        });
    }console.log(res)
    
}
}