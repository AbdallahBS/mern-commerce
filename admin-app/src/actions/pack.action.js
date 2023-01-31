import axios from "../helpers/axios";

export const addPack = form =>{
    return async dispatch =>{
        const res = await axios.post('pack/create' , form);
        console.log(res);
    }
}
export const updatePack = form =>{
    return async dispatch =>{
        const res = await axios.post('pack/update' , form);
        console.log(res);
    }
}
export const deletePack = form =>{
    return async dispatch =>{
        const res = await axios.post('pack/delete' , form);
        console.log(res);
    }
}