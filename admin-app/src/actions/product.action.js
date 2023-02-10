import axios from "../helpers/axios";

export const addProduct = form =>{
    return async dispatch =>{
        const res = await axios.post('product/create' , form);
        console.log(res);
    }
}
export const dropProduct = form =>{
    return async dispatch =>{
        const res = await axios.post('product/drop' , form);
        console.log(res);
    }
}