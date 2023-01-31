import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Col, Row, Button,Table } from 'react-bootstrap';
import './style.css';
import { useSelector,useDispatch} from 'react-redux';
import { getHistoryD,getHistoryN } from '../../actions';

/**
* @author
* @function Home
**/

export const Home = (props) => {
  const [pt,setPT]=useState('')
  const dispatch=useDispatch()
  const history =  useSelector(state => state.history);
  const today = new Date()
  const yyyy = today.getFullYear();
  let mm=today.getMonth()+1
  let dd=today.getDate();
  if(dd<10 ) dd='0' +dd;
  if(mm<10 ) mm='0' +mm;
  const final =yyyy+'-'+mm+'-'+dd

 
  const form = new FormData();
  form.append('time',final);
  let PT=0

  if(history.history.data != null){
    for(let i=0;i<history.history.data.length;i++){
      
      PT=parseFloat(PT)+parseFloat(history.history.data[i].price_totale)
    }
  }  

  
  
  
 


    
      
    
    
    
    
  
  return (

    <Layout sidebar>
    
      <h1>Orders <span id='order'>{history.history.data? history.history.data.length : null}</span></h1>
      <h1>Prix TOtale <span id='PT'>{history.history.data? PT : null}</span></h1>
   
   
      <Button onClick={(()=>dispatch(getHistoryD(form)))}>afficher la liste des ventes ajourd'hui </Button>
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
          <td>{history.price_totale}</td>
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
export default Home;