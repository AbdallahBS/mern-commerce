import { categoryConstansts } from "../actions/constans";

const iniState= {
    categories : [],
    loading : false,
    error : null
};
const buildNewCategories =(id,categories,category)=>{
    let myCategories = [];
    if(id == undefined){
        return [
            ...categories,
            {
                _id: category._id,
                name : category.name,
                slug : category.slug,
                children : []
            }
        ];
    }
    for (let cat of categories){
        if( cat._id == id){
            myCategories.push({
                ...cat,
                children : cat.children ? buildNewCategories(id,[...cat.children,{
                    _id : category._id,
                    name : category.name,
                    slug : category.slug,
                    parentId :category.parentId,
                    children : category.children
                                }],category) : []
            });
        }else{
            myCategories.push({
                ...cat,
                children : cat.children  ? buildNewCategories(id ,cat.children,category) : []
            })
        }
       
    }
    return myCategories;
}
export default (state = iniState , action) =>{
    switch(action.type){
        case categoryConstansts.GET_ALL_GATEGORIES_SUCCESS:
            state ={
                ...state,
                categories : action.payload.categories
            }
        break;
        case categoryConstansts.ADD_NEW_CATEGORY_REQUEST:
            state ={
                ...state,
                loading : true
            }
        break;
        case categoryConstansts.ADD_NEW_CATEGORY_SUCCESS:
            const category = action.payload.category;
            const updatedCategories = buildNewCategories(category.parentId,state.categories,category);
            console.log(updatedCategories);
            state ={
                ...state,
                categories : updatedCategories,
                loading : false

            }
        break;
        case categoryConstansts.ADD_NEW_CATEGORY_FAILURE:
            state ={
               ...iniState
            }
        break
    }
    return state
}