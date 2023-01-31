import React from 'react';
import {Route,Navigate, Outlet} from 'react-router-dom';

export default function PrivateRoute(){
    const token = window.localStorage.getItem('token');
        if(token){
            return <Outlet/>
        }
        else{

      
        console.log("no")
        return <Navigate to={'/Signin'}/>

    }  }
  
