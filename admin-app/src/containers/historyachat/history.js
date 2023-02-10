import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Col, Row,Input, Button,Table } from 'react-bootstrap';

import { useSelector,useDispatch} from 'react-redux';
import { getHistoryAchat } from '../../actions';

/**
* @author
* @function History
**/

export const HistoryAchat = (props) => {
    const dispatch=useDispatch()
    const historyachat =  useSelector(state => state.historyachat);
    const formatter= new Intl.NumberFormat()
    const form = new FormData();
    const input1=document.getElementById('time1')
    const input2=document.getElementById('time2')
    const input3=document.getElementById('code')
    const value1=input1?.value || '2022-01-29';
    const value2=input2?.value || '2022-01-30';
    const value3=input3?.value || '0';
    console.log(value1,value2) 
    form.append('time1',value1)
    form.append('time2',value2) 
    form.append('id',value3)
    console.log('yeeee',historyachat)
  return (

    <Layout sidebar>
    <input type='date'  id='time1'></input>
    <input type='date'  id='time2'></input>
    <input type='text' id='code' placeholder='Code Barre'></input>
    <Button onClick={()=>dispatch(getHistoryAchat(form))}>afficher(cliquer 2 fois !)</Button>
    <hr></hr>
   
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Produit </th>
          <th>Quantité des boites </th>
          <th>Quantité des pieces/boite </th>
          <th>Prix d'achat</th>
          <th>fournisseur</th>
          <th>Date d'achat</th>
          
        </tr>
      </thead>
      <tbody>
        
        
        {historyachat.historyachat.data!=null ?
        historyachat.historyachat.data.map(history=>
          <tr>
          <td></td>
          <td>{history.name}</td>
          <td>{history.quantity}</td>
          <td>{history.quantityp}</td>
          <td>{formatter.format(parseFloat(history.price_achat))}</td>
          <td>{history.category}</td>
          <td>{history.createdAt}</td>
        </tr> ):null }
      </tbody>
    </Table>
      
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
export default HistoryAchat;