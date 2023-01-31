import React, {  useState,useRef } from 'react'
import Layout from '../../components/Layout'
import { Container } from 'react-bootstrap';
import { useSelector,useDispatch} from 'react-redux';
import { addHistory} from '../../actions';
import { Row, Col, Table,Button,Form } from 'react-bootstrap';
import Modal from '../../components/UI/Input/Modal'
import './index.css'
import ReactToPrint from 'react-to-print'
let options =[]


export const Orders = (props) => {
  const product = useSelector(state => state.product);
  let quantity = 0;

  let pass1=false;
 
  let helper =[]

  for(let i=0;i<product.products.length;i++){
    if(product.products[i].id.length==3){
      
      helper.push({name :product.products[i].name, id : product.products[i].id})
    }
  }
  console.log(helper)
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const ComponentRef= useRef()
  const [handleKey, setHandleKey] = useState('');
  const [handleKeyR, setHandleKeyR] = useState('');
  const [change,setChange]= useState('')

 
  if(handleKey==='Enter'){
    pass1=true
    setHandleKey('')
    console.log(handleKey)
    quantity=document.getElementById("i").value
    document.getElementById('form1').value=""
    document.getElementById('form1').focus()
    document.getElementById('i').value=""

    if(!quantity){
      quantity = 1
    }
  }
  
  const createOrderList = (categories,options,quantity) => {
    console.log(query.substring(0,7))
    if (categories.id==query){
    
  options.push(
    
    { value: categories._id,id:categories.id, name: categories.name, prix : categories.price ,quantity: quantity,PT: categories.price * quantity})
    console.log(query);
  }
else if (categories.id==query.substring(0,7)){

  options.push(
    {value: categories._id ,id:categories.id,name: categories.name, prix : categories.price ,quantity: query.substring(8,query.length-1)/1000,PT: categories.price * query.substring(8,query.length-1)/1000})
  
  console.log("quantité",query.substring(8,query.length-1)/1000,"id")
}
    return options;
}
const calcpt = (options) => {
  let prixtotal=0;
  for (let category of options) {
     prixtotal=prixtotal+category.PT
  }
  
  return prixtotal;
}
  
  product.products.filter((prod) => (prod.id==query || prod.id==query.substring(0,7)) && pass1 ? createOrderList(prod,options,quantity): null )
  console.log(query.substring(0,7))
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
    console.log(options)
    for(let i=0;i<options.length;i++){

    
    const form = new FormData();
    form.append('name', options[i].name);
    form.append('id', options[i].id);
    form.append('quantity', options[i].quantity);
    form.append('price_totale',options[i].PT)
  
    dispatch(addHistory(form));
  }

  }
  const handleChange=()=>{
    
    if(document.getElementById('hl')!=0){
    document.getElementById('form1').value=document.getElementById('hl').value
    setQuery(document.getElementById('hl').value)
    }}
    const handleClose = () => setShow(false);
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
  const renderhelp=()=>{
    return (
    
    <Form.Select aria-label="Default select example" onChange={handleChange} id='hl'>
    <option> select menu</option>
    {helper.map((help)=>(
      <option value={help.id}>{help.name}</option>
    ))}
  </Form.Select>
  )}
  return (
    
    <Layout sidebar>
      <Container>
        <Row>
        <Col>
        { renderhelp()}
     </Col>

        </Row>
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
      >
       <ReactToPrint trigger={()=><Button>Print</Button>}
       content={()=>ComponentRef.current}/>

       <div class="facture"  ref={ComponentRef}>
        <div class="logo">
        <h3>  Superette Amrouch</h3>
        <h5>Zouiet El Mgaiez</h5>
        <h5>www.3amrouchEcom.com</h5>
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
        </tr>
      </thead>
      <tbody>
      {
              options.map((option) =>
                <tr>
                  <td>{option.name}</td>
                  <td>{option.prix}</td>
                  <td>{option.quantity}</td>
                  <td>{parseInt(option.PT)}</td>
                </tr>
              
              )
          }
      </tbody>
    </table>
    
    <div class="total">
      <h3>Prix Total : {parseInt(calcpt(options))}</h3>
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