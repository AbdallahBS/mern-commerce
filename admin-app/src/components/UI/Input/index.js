import React from 'react';
import {Form , input , label, div } from 'react-bootstrap';
/**
* @author
* @function Input
**/

export const Input = (props) => {
  return(
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">{props.label}</label>
                            <input type={props.type} class="form-control" placeholder={props.placeholder} value={props.value} onChange={props.onChange} aria-describedby="emailHelp"/>
                            <div class="form-text">{props.errorMessage}</div>
                        </div>
   )

 }
 export default Input