import React, {  useState,useRef } from 'react'
import Layout from '../../components/Layout'
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { addHistoryP } from '../../actions';
import { useDispatch } from 'react-redux';
import { Row, Col, Table,Button } from 'react-bootstrap';
import Modal from '../../components/UI/Input/Modal'
import './index.css'
import ReactToPrint from 'react-to-print'

let options =[]
export const Orders = (props) => {

  
  const dispatch=useDispatch()
 
  let quantity = 0;
  let remise=0;
  let pass1=false;
  let pass2=false;
  console.log(quantity)
  const [query, setQuery] = useState('');
  const [handleKey, setHandleKey] = useState('');
  const [handleKeyR, setHandleKeyR] = useState('');
  
  if(handleKey==='Enter'){
    pass1=true
    setHandleKey('')
    console.log(handleKey)
    quantity=document.getElementById("i").value
    if(!quantity){
      quantity = 1
    }
  }
  if(handleKey==='Enter'){
    pass2=true
    setHandleKey('')
    console.log(handleKeyR)
    remise=document.getElementById("f").value
    if(!remise){
      remise = 1
    }
  }
  
  const createOrderList = (categories,options,quantity,remise) => {
    if (categories.id==query){
  options.push(
  
    { value: categories._id, name: categories.name, prix : categories.price ,quantity: quantity,RM :remise,PT: ((categories.price)*(1-remise/100))*quantity})
    console.log('this is',(parseFloat((categories.price)))  )
    
}
    console.log(options)
    return options;
}
const calcpt = (options) => {
  let prixtotal=0;
  for (let category of options) {
     prixtotal=prixtotal+category.PT
  }
  console.log(prixtotal)
  return prixtotal;
}


  const product = useSelector(state => state.pack);
  product.packs.filter((prod) => prod.id==query && pass1 && pass2 ? createOrderList(prod,options,quantity,remise): null )
 

  const [show, setShow] = useState(false);
  const handleShow = () => {
    
    
      setShow(true);
      console.log(options)
      for(let i=0;i<options.length;i++){
  
      
      const form = new FormData();
      form.append('name', options[i].name);
      form.append('id', options[i].id);
      form.append('quantity', options[i].quantity);
      form.append('quantity', options[i].RM);
      form.append('price_totale',options[i].PT)
    
      dispatch(addHistoryP(form));
    }
  }

  const handleClose = () => setShow(false);
  const ComponentRef=useRef()
  const renderorders = () => {
   
    return (
      
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom de produit</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Prix Total</th>
            <th>Remise</th>
          </tr>
        </thead>
       
          { 
             options.map((option)=>(

             
               
                <tbody>
                <tr key={option.value}>
                  <td>2</td>
                  <td>{option.name}</td>
                  <td>{option.prix}</td>
                  <td>{option.quantity}</td>
                  <td>{option.PT}</td>
                  <td>{option.RM}</td>
                </tr>
                </tbody> 
                
              )
              )
          }  
      </Table>
    )
  }
  return (
    
    <Layout sidebar>
      <Container>
        <Row style={{marginTop : "50px" , marginLeft :"2px"}}>
          <Col md={4}>
            <div style={{ display: 'flex' , marginBottom : "100px"}}>
              <h3>Produit a vendre</h3>
            </div>
          </Col>
          <Col>
            <div class="input-group">
              <div class="form-outline">
                <input type="search"
                  id="form1"
                  placeholder='code barre'
                  class="form-control"
                  onChange={(e) => setQuery(e.target.value)}
                />

              </div>
             
              <input type="text" 
                  placeholder="Quantieé"
                  class="form-control"
                  id='i'
                  onKeyPress={(e)=>setHandleKey(e.key)}
                />
                  <input type="text" 
                  placeholder="Remise"
                  class="form-control"
                  id='f'
                  onKeyPress={(e)=>setHandleKeyR(e.key)}
                />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            
            {renderorders()}
            
          </Col>
        </Row>
      </Container>
      <Button onClick={handleShow} >Valideé</Button>
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={'Facture de client'}
      >  <ReactToPrint trigger={()=><button>Print</button>}
      content={()=>ComponentRef.current}/>
      <div class="facture"  ref={ComponentRef}>
        <div class="logo">
        <h3>شركة عمروش للتجارة</h3>
        <h5>الطريق الرئيسي بالزاوية</h5>
        
        </div>
        <hr></hr>
        <div class="ticket">
        
        <p>Servi Par : Administrateur</p>
        </div>
        <hr></hr>
        <div class="details">
        <table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Articles</th>
          <th>Prix</th>
          <th>Qte</th>
          <th>Remise</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
      {
              options.map((option) =>
                <tr>
                  <td>{option.name}</td>
                  <td>{option.prix}</td>
                  <td>{option.quantity}</td>
                  <td>{option.PT}</td>
                  <td>{option.RM}</td>
                </tr>
                
              )
          }
      </tbody>
    </table>
    
    <div class="total">
      <h3>Prix Total : {calcpt(options)}</h3>
    </div>
   
    <div class="footer">
      Merci pour votre visite
    </div>
        </div>
        </div>
    </Modal>
    </Layout>
       
  )

}
export default Orders;