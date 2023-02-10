import React from 'react';
import Header from '../Header';
import {Container } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import './style.css';
/**
* @author
* @function Layout
**/

const Layout =(props)=>{
    return(
        <>
        <Header />
        {
            props.sidebar?
            <Container fluid>
            <div class="row">
            <div class="col-2" id="sidebar">
            <ul>
              <li><NavLink to ={'/'}>Accueil</NavLink></li>
              <li><NavLink to ={'/history'}>Historique de Vente</NavLink></li>
              <li><NavLink to ={'/historyachat'}>Historique d'achat</NavLink></li>
              <li><NavLink to ={'/packs'}>Boites</NavLink></li>
              <li><NavLink to ={'/products'}>Produits</NavLink></li>
              <li><NavLink to ={'/orders'}>Demandes (Boites)</NavLink></li>
              <li><NavLink to ={'/orders2'}>Demandes (Piece)</NavLink></li>
      
     </ul>
            </div>
            <div class="col-10" style ={{marginLeft : 'auto' , paddingTop : '60px'}}>
              {props.children}
            </div>
           
          </div>
        </Container>
        : props.children
        } 
        
        </>
    )
}
export default Layout;