import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Container, Button } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Input/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table } from 'react-bootstrap';
import { addProduct,dropProduct } from '../../actions';
import './style.css';
import { generatePublicUrl } from '../../urlConfig';


/**
* @author
* @function Products
**/

export const Products = (props) => {
  const [text, setText] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [productDetailModal,setProductDetailModal]=useState(false);
  const [query,setQuery] =useState('');
  const [productDetails,setProductDetails]= useState(null);
  const category = useSelector(state => state.category);
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);
 
  const handleClose = () => {
    const form = new FormData();
    form.append('id', id);
    form.append('name', name);
    form.append('quantityp', quantity);
    form.append('price', price);
    
   
    dispatch(addProduct(form));
    setShow(false)
  }
  const handleClose1 = () => {
    const form = new FormData();
    form.append('id', id);
    dispatch(dropProduct(form));
    setShow1(false)
  }
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name })
      if (category.children.length > 0) {
        createCategoryList(category.children, options)

      }
    }
    return options;
  }
  const handleProductPicture = (e) => {

    setProductPictures([
      ...productPictures,
      e.target.files[0],
    ]);

  }
  const renderProducts = () => {
    console.log(product.products)
    return (





      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom de produit</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Fournisseur</th>
          </tr>
        </thead>
        <tbody>
          {
            product.products.length > 0 ?
              
              product.products.filter((prod)=>prod.name.toLowerCase().includes(query)).map((product) =>

                <tr onClick={()=> showProductDetailsModal(product)} key={product._id}>
                  <td>2</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantityp}</td>

                  <td>{product.category}</td>
                </tr>
              
              ) : null
          }

        </tbody>
      </Table>
    )
  }
  const renderAddProductModal=()=>{
    return(
      <Modal
      show={show}
      handleClose={handleClose}
      modalTitle={'Add new Product'}
    >
       <Input
        label="Code"
        value={id}
        placeholder={'Code a bar'}
        onChange={(e) => setId(e.target.value)}
      />
      <Input
        label="Name"
        value={name}
        placeholder={'Product Name'}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label="Quantity"
        value={quantity}
        placeholder={'Quantity'}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <Input
        label="price"
        value={price}
        placeholder={'price'}
        onChange={(e) => setPrice(e.target.value)}
      />
     


      
      <input type="file" name="productPicture" onChange={handleProductPicture} />
    </Modal>
    )
  }
  const renderDropProductModal=()=>{
    return(
      <Modal
      show={show1}
      handleClose={handleClose1}
      modalTitle={'Supprimer un Produit'}
    >
       <Input
        label="Code"
        value={id}
        placeholder={'Code a bar'}
        onChange={(e) => setId(e.target.value)}
      />
    </Modal>
    )
  }
  const handleCloseProductDetailsModal = ()=>{
    setProductDetailModal(false);
  }
  const showProductDetailsModal = (product)=>{
    setProductDetails(product);
    setProductDetailModal(true);
      console.log(product);
  }
  const renderShowProductDetailsModal=()=>{
    
    if(!productDetails){
      return null
    }
   
    return (
      <Modal
      show={productDetailModal}
      handleClose={handleCloseProductDetailsModal}
      modalTitle={'product Details'}
      size="lg"

      >
        <Row>
          <Col md="6">
            <label className='key'>Nom du produit</label>
            <p className='value'>{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className='key'>Prix</label>
            <p className='value'>{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className='key'>Quantité en stock</label>
            <p className='value'>{productDetails.quantityp}</p>
          </Col>
          <Col md="6">
            <label className='key'>Fournisseur</label>
            <p className='value'>{productDetails.category}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className='key'>Description</label>
            <p className='value'>{productDetails.description}</p>
          </Col>
        
        </Row>
        <Row>
          <label className='key'>Photos de produit</label>
          <Col>
            <div  style ={{display :'flex'}}> 
            {productDetails.productPicture.map(picture => 
            <div className='productImageContainer'>
              <img src={generatePublicUrl(picture.img)}/>              
            </div>
             )}
            </div>
         
          </Col>
        </Row>

      </Modal>

    )
  }
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Les produit qui sont en Stock</h3>

              <Button style={{margin : "5px" }}  onClick={handleShow}>Ajouter un produit</Button>
              <Button style={{margin : "5px" }} onClick={handleShow1}>Supprimer un produit</Button>
              
            </div>
          </Col>
          <Col>
                <div class="input-group">
                  <div class="form-outline">
                    <input type="search"
                     id="form1"
                    class="form-control"
                    onChange={(e)=>setQuery(e.target.value)}
                   />
                    
                  </div>
                  <button   type="button" value={'search'} class="btn btn-s">
                    Search
                  </button>
                </div>
              </Col>
        </Row>
        <Row>
          <Col>
            {renderProducts()}
          </Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderDropProductModal()}
      {renderShowProductDetailsModal()}
    </Layout>
  )

}
export default Products;