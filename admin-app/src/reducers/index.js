import authReducer from './auth.reducers';
import { combineReducers } from 'redux' ;
import productReducer from './product.reducer';
import categoryReducer from './category.reducer';
import orderReducer from './order.reducer';
import userReducer from './user.reducer';
import packReducer from './pack.reducer';
import historyReducer from './history.reducer';
import historyNReducer from './historyN.reducer';
import historyachatReducer from './historyachat.reducer';

const rootReducer = combineReducers ({
    user : userReducer,
    auth : authReducer,
    category : categoryReducer,
    product : productReducer,
    order : orderReducer,
    pack : packReducer,
    history : historyReducer,
    historyN : historyNReducer,
    historyachat: historyachatReducer,
}); 
export default rootReducer;