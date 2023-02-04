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
let PrixTotal=0
let ne=1
export const Orders = (props) => {  
  const dispatch=useDispatch()
  let quantity = 0;
  let remise=0;
  let pass1=false;
  let pass2=false;
  console.log(quantity)
  const [query, setQuery] = useState('');
  const formatter= new Intl.NumberFormat()
  const [handleKey, setHandleKey] = useState('');
  const [handleKeyR, setHandleKeyR] = useState('');
  const [handleKey1, setHandleKey1] = useState('');
  const [handleKey2, setHandleKey2] = useState('');
  if(handleKey2==='Enter'){
    document.getElementById('i').focus()
    setHandleKey2("")
}
if(handleKey1==='Enter'){
  document.getElementById('rd').value=formatter.format(PrixTotal-document.getElementById('r').value)
}
  if(handleKey==='Enter'){
    pass1=true
    document.getElementById('form1').focus()
    setHandleKey('')
    quantity=document.getElementById("i").value
    document.getElementById('form1').value=""
    document.getElementById('i').value=""
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
      remise = 0
    }
  }
  
  const createOrderList = (categories,options,quantity,remise) => {
    if (categories.id==query){
  options.push(
  
    { value: categories._id,id:categories.id, name: categories.name, prix : categories.price_vente ,quantity: quantity,RM :remise,PT: ((categories.price_vente)*(1-remise/100))*quantity})
    PrixTotal=PrixTotal+((categories.price_vente)*(1-remise/100))*quantity
    
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
      setTimeout(function(i){
        console.log('this is the i',i)
        const form = new FormData();
        form.append('name', options[i].name);
        form.append('id', options[i].id);
        form.append('quantity', options[i].quantity);
        form.append('price_totale',options[i].PT)
        form.append('remise', options[i].RM);
        dispatch(addHistoryP(form));
      },1000*i,i)
      
    }
  }
  const handledelete = (index)=>{
    console.log(index)
    PrixTotal=PrixTotal-options[index].PT
    setHandleKey('Enter')
    console.log("initial option",options)
    options.splice(index,1)
    console.log("res",options)
    console.log('ne',ne)
    setQuery(toString(ne))
    setHandleKey('Enter')
    ne=100
    document.getElementById('form1').value=""
    document.getElementById('i').focus()
   
  }
  const handlemodf = (e,index,v)=>{
    if(e==="Enter"){
    console.log("runn")
    console.log(index)
    options[index].quantity=v
    PrixTotal=(PrixTotal-options[index].PT)+v*options[index].prix
    options[index].PT=v*options[index].prix
    
    console.log(options)
    setHandleKey('Enter')
   
    setQuery(toString(ne))
    setHandleKey('Enter')
    ne=100
    document.getElementById('form1').value=""
    document.getElementById('i').focus()
    }}

  const handleClose = () =>     window.location.reload(true);
  const ComponentRef=useRef()
  const renderorders = () => {
   
    return (
      
      <Table responsive="sm">
        <thead>
          <tr>
            
            <th>Nom de produit</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Prix Total</th>
            <th>Remise</th>
            <th></th>
            <th>Modifier la quantiter</th>
          </tr>
        </thead>
       
          { 
             options.map((option,index)=>(

             
               
                <tbody>
                <tr key={option.value}>
                  <td>{option.name}</td>
                  <td>{option.prix}</td>
                  <td>{option.quantity}</td>
                  <td>{formatter.format(option.PT)}</td>
                  <td>{option.RM}</td>
                  <td><Button onClick={()=>handledelete(index)}>Delete</Button></td>
                  <td>   <input type="text" 
                  placeholder="Quantieé"
                  class="form-control"
                  id='ii'
                  onKeyPress={(e)=>handlemodf(e.key,index,e.target.value)}
                /></td>
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
              <h3>Boite a vendre</h3>
            </div>
          </Col>
          <Col>
            <div class="input-group">
              <div class="form-outline">
                <input type="search"
                  id="form1"
                  placeholder='code barre'
                  class="form-control"
                  onChange={(e)=>setQuery(e.target.value)}
                  onKeyPress={(e)=>setHandleKey2(e.key)}
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
        <Row><Col style={{float :'left'}}><h5>Prix Total : {PrixTotal? formatter.format(PrixTotal):null} DT</h5></Col>
        <Col><input type="text" 
                  placeholder="Reglements : ESPECE"
                  class="form-control"
                  id='r'
                  onKeyPress={(e)=>setHandleKey1(e.key)}
                  
                />
                <input type="text" 
                  placeholder="Rendu"
                  class="form-control"
                  id='rd'
                  
                /></Col></Row>
       
        <Row>
          <Col>
            
            {renderorders()}
            
          </Col>
        </Row>
      </Container>
      <Button onClick={handleShow} >Valideé</Button>
      <Button onClick={handleClose} >annuler</Button>
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={'Facture de client'}
      >  <ReactToPrint trigger={()=><button>Print</button>}
      content={()=>ComponentRef.current}/>
      <div class="facture"  ref={ComponentRef}>
        <div class="logo">
        <h3>Superette Amrouch</h3>
        <h5>Zouiet El Mgaiez </h5>
        
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
          <th>Total</th>
          <th>Remise</th>
       
        </tr>
      </thead>
      <tbody>
      {
              options.map((option) =>
                <tr>
                  <td>{option.name}</td>
                  <td>{option.prix}</td>
                  <td>{option.quantity}</td>
                  <td>{formatter.format(option.PT)}</td>
                  <td>{option.RM}</td>
                  
                </tr>
                
              )
          }
      </tbody>
    </table>
    <hr></hr>
    <div class="total">
      <h3>Prix Total : {formatter.format(calcpt(options))} DT</h3>
    </div>
    <div class="info">
      <p>Reglements : {document.getElementById('r')? formatter.format(document.getElementById('r').value): null}</p>
      <p>Rendu : {document.getElementById('rd')? document.getElementById('rd').value: null}</p>
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