import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Col, Row, Button,Table } from 'react-bootstrap';
import './style.css';
import { useSelector,useDispatch} from 'react-redux';
import {getRentable} from '../../actions';
/**
* @author
* @function Rentable
**/
export const Rentable = (props) => {
    const dispatch=useDispatch()
    const history=  useSelector(state => state.historyr);
    console.log(history)
    const formatter= new Intl.NumberFormat()
    const form = new FormData();
    const input1=document.getElementById('time1')
    const input2=document.getElementById('time2')
    const input3=document.getElementById('code')
    const value1=input1?.value || '2022-01-29';
    const value2=input2?.value || '2022-01-30';
    const value3=input3?.value || '0';
    console.log(value1,value2,value3) 
    form.append('time1',value1)
    form.append('time2',value2) 
    form.append('id',value3)
    console.log(value3)
    console.log(history.history)
  return (

    <Layout sidebar>
    <input type='date'  id='time1'></input>
    <input type='date'  id='time2'></input>
    <input type='text' id='code' placeholder='Code Barre'></input>
      <h1>La rentabilité de ce Produit/Produits :<span id='order'>{history.history.data? history.history.data1.length : null}</span></h1>

      <Button onClick={(()=>dispatch(getRentable(form)))}>afficher la liste des ventes ajourd'hui </Button>
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Produit </th>
          <th>Quantité </th>
          <th>Prix Total</th>
          <th>Date de la Vente</th>
          
        </tr>
      </thead>
      <tbody>
        
        
        {history.history.data!=null ?
        history.history.data.map(history=>
          <tr>
          <td></td>
          <td>{history.name}</td>
          <td>{history.quantity}</td>
          <td>{formatter.format(history.price_totale)}</td>
          <td>{history.createdAt}</td>
        </tr> ):null }
        
       
      </tbody>
    </Table>
    <hr></hr>

      
      {/*<div className='text-center' style={{margin: '5rem' , background: '#fff'}}>
  <div class="container-fluid bg-light text-dark p-5"  >
    <div class="container bg-light p-5" >
      <h1 class="display-0 fw-bold">Welcome to Admin Dashboard</h1>
    </div>
  </div>
  </div>*/}
    </Layout>
    
  );

}
export default Rentable;