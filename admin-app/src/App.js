import React,{useEffect} from 'react';
import './App.css';
import {  BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import Home from './containers/Home';
import History from './containers/HistoryN/history';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import Products from './containers/products';  
import Orders from './containers/orders';
import Orders2 from './containers/orders2';
import Packs from './containers/packs';
import Category from './containers/category';
import { useDispatch , useSelector } from 'react-redux';
import {isUserLoggedIn , getAllCategory} from './actions';
import { getInitialData } from './actions/initialData.action';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  useEffect(()=>{
    if(!auth.authenticate){

    
    dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());
},[])
  return (
    <div className="App">
    
        <Routes>
          
          <Route  exact element={<PrivateRoute/>}>
            <Route exact path="/" element={<Home/>}/>
          </Route>
          <Route  exact element={<PrivateRoute/>}>
            <Route exact path="/history" element={<History/>}/>
          </Route> 
          <Route  exact element={<PrivateRoute/>}>
               <Route  exact path="/products" element={<Products/>} />
          </Route> 
          <Route  exact element={<PrivateRoute/>}>
            <Route exact path="/orders" element={<Orders/>}/>
          </Route>
          <Route  exact element={<PrivateRoute/>}>
            <Route exact path="/orders2" element={<Orders2/>}/>
          </Route>    
          <Route  exact element={<PrivateRoute/>}>
            <Route exact path="/category" element={<Category/>}/>
          </Route> 
          <Route  exact element={<PrivateRoute/>}>
            <Route exact path="/packs" element={<Packs/>}/>
          </Route>          
          <Route path="/Signin" element={<Signin/>}/>
          <Route path="/Signup" element={<Signup/>}/>
        </Routes>
    
    </div>
  );
}

export default App;
