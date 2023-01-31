import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Container, Button } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Input/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table } from 'react-bootstrap';
import { addPack } from '../../actions';
import { updatePack, deletePack } from '../../actions';

import { generatePublicUrl } from '../../urlConfig';
import Tesseract, { createWorker } from 'tesseract.js';

import './index.css'
/**
* @author
* @function Products
**/

export const Products = (props) => {
  const [text, setText] = useState('');
  const [id, setId] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [quantityP, setQuantityP] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [priceproduct, setPriceProduct] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [packDetailModal, setPackDetailModal] = useState(false);
  const [query, setQuery] = useState('');
  const [list, setList] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const dispatch = useDispatch();
  const pack = useSelector(state => state.pack);
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [handleKey, setHandleKey] = useState('');
  let st = ""
  let np = []
  let nq = []
  let nu = []
  let nt = []
  let nc= []
  let nqp=[]
  const handleE = async () => {
    await Tesseract.recognize(image,
      "eng",
      { logger: (m) => { console.log(m); } })
      .then(({ data: { text } }) => {
        setText(text);
        for (let i = 0; i < text.length; i++) {
          if (text.charCodeAt(i) != 10) {
            st = st + text[i]
          }
          else {
            if (st != "") {
              np.push(st)
            }
            st = ""
          }
        }
        for(let n=0;n<np.length;n++){
        let get=true
        let qn =""
        let nomp=np[n]
        
        let i=nomp.length-1

        while(i>0 && get){
          if (nomp.charCodeAt(i)>=48 && nomp.charCodeAt(i)<=59){
            qn=nomp[i]+qn
          
            let j=i-1
            while(j>0 && get){
              if(nomp.charCodeAt(j)>=48 && nomp.charCodeAt(j)<=59){
                qn=nomp[j]+qn
                j=j-1
     
              }
              else {
                get=false
              }
            }
          }
          i=i-1
        }
        
        nqp.push(qn)
      }
      })
      console.log(nqp)
    await Tesseract.recognize(image1,
      "eng",
      { logger: (m) => { console.log(m); } })
      .then(({ data: { text } }) => {
        setText(text);
        for (let i = 0; i < text.length; i++) {
          if (text.charCodeAt(i) != 10) {
            st = st + text[i]
          }
          else {
            if (st != "") {
              nq.push(st)
            }
            st = ""
          }
        }
      })
    await Tesseract.recognize(image2,
      "eng",
      { logger: (m) => { console.log(m); } })
      .then(({ data: { text } }) => {
        setText(text);
        for (let i = 0; i < text.length; i++) {
          if (text.charCodeAt(i) != 10) {
            st = st + text[i]
          }
          else {
            if (st != "") {
              nu.push(st)
            }
            st = ""
          }
        }
      })
    await Tesseract.recognize(image3,
      "eng",
      { logger: (m) => { console.log(m); } })
      .then(({ data: { text } }) => {
        setText(text);
        for (let i = 0; i < text.length; i++) {
          if (text.charCodeAt(i) != 10) {
            st = st + text[i]
          }
          else {
            if (st != "") {
              nt.push(st)
            }
            st = ""
          }
        }
      })
    
    console.log(nc)
    console.log(nqp)
    console.log(nq)
    console.log(np)
    console.log(nu)
    console.log(nt)
   for (let i = 0; i < np.length; i++) {
      const form = new FormData();
      form.append('id', list[i]);
      form.append('name', np[i]);
      form.append('quantity', nq[i]);
      form.append('quantityP', nqp[i]);
      form.append('price', nt[i]);
      form.append('price_product', '--');
      form.append('category', "category");
      console.log(form)
      dispatch(addPack(form));
    }
  }
  if(handleKey==='Enter'){
   // nc.push(document.getElementById("a").value)
   setList([...list,document.getElementById("a").value])
    document.getElementById("a").value=""
    setHandleKey('')
  }
  
  
  const handleClose = () => {
    const form = new FormData();
    form.append('id', id);
    form.append('name', name);
    form.append('quantity', quantity);
    form.append('quantityP',quantityP)
    form.append('price', price);
    form.append('price_product', priceproduct);
    
    form.append('category', category);
    for (let pic of productPictures) {
      form.append('packImage', pic);
    }
    dispatch(addPack(form));
    setShow(false)
  }
  const handleClose1 = () => {
    const form = new FormData();
    form.append('id', id);
    form.append('name', name);
    form.append('price', price);
    form.append('price_product', priceproduct);
    for (let pic of productPictures) {
      form.append('packImage', pic);
    }
    dispatch(updatePack(form));
    setShow1(false)
  }
  const handleClose2 = () => {
    const form = new FormData();
    form.append('id', id);
    dispatch(deletePack(form));
    setShow2(false)
  }
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
  const handleShow2 = () => setShow2(true);
  const handleProductPicture = (e) => {
    setProductPictures([
      ...productPictures,
      e.target.files[0],
    ]);

  }


  const renderPack = () => {
    return (
      <>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Nom de pack</th>
              <th>Prix</th>
              <th>Prix Du produit</th>
              <th>Quantité</th>
              <th>Fournisseur</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {
              pack.packs.length > 0 ?

                pack.packs.filter((pack) => pack.name.toLowerCase().includes(query)).map(pack =>

                  <tr onClick={() => showProductDetailsModal(pack)} key={pack.name}>
                    <td>2</td>
                    <td>{pack.name}</td>
                    <td>{pack.price}</td>
                    <td>{pack.price_product}</td>
                    <td>{pack.quantity}</td>
                    <td>{pack.category}</td>
                    <td>{pack.createdAt}</td>
                  </tr>

                ) : null
            }

          </tbody>
        </Table>

      </>
    )
  }
  const renderAddPackModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={'ajouter des Boites !'}
      >
        <Input
          label="Code barre"
          value={id}
          placeholder={'Code barre'}
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          label="Nom du Boite"
          value={name}
          placeholder={'Nom du Boite'}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Quantité des boites'"
          value={quantity}
          placeholder={'Quantité des boites'}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Prix"
          value={price}
          placeholder={'Prix'}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
        label="Quantité des produits/ 1 Boite"
        value={quantityP}
        placeholder={'Quantité des produits/ 1 Boite'}
        onChange={(e) => setQuantityP(e.target.value)}
      />
        <Input
          label="prix de produit(Piece)"
          value={priceproduct}
          placeholder={'prix de produit(Piece)'}
          onChange={(e) => setPriceProduct(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          placeholder={'Description'}
          onChange={(e) => setDescription(e.target.value)}
        />


        <Input
          label="Fournisseur"
          value={category}
          placeholder={'Fournisseur '}
          onChange={(e) => setCategory(e.target.value)}
        />
       
      </Modal>
    )
  }
  const renderDeletePack = () => {
    return (
      <Modal
        show={show2}
        handleClose={handleClose2}
        modalTitle={'Suprimer un boite'}
      >
        <Input
          label="Code a barre"
          value={id}
          placeholder={'Code barre'}
          onChange={(e) => setId(e.target.value)}
        />
      </Modal>
    )
  }
  const renderUpdatePackModal = () => {
    return (
      <Modal
        show={show1}
        handleClose={handleClose1}
        modalTitle={'Modifier un Produit/Boite'}
      >
        <Input
          label="Code Barre"
          value={id}
          placeholder={'Code barre'}
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          label="Nom"
          value={name}
          placeholder={'Modifier le Nom'}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Prix"
          value={price}
          placeholder={'Modifier Le Prix'}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Prix de produit"
          value={priceproduct}
          placeholder={'Modifier le Prix De Produit'}
          onChange={(e) => setPriceProduct(e.target.value)}
        />
       
      </Modal>
    )
  }
  const HandleClosePackDetailModal = () => {
    setPackDetailModal(false);
  }
  const showProductDetailsModal = (pack) => {
    setProductDetails(pack);
    setPackDetailModal(true);
  }
  const renderShowProductDetailsModal = () => {

    if (!productDetails) {
      return null
    }

    return (
      <Modal
        show={packDetailModal}
        handleClose={HandleClosePackDetailModal}
        modalTitle={'pack Details'}
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
            <p className='value'>{productDetails.quantity}</p>
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


      </Modal>

    )
  }
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col>
            <div style={{  justifyContent: 'space-between' }}>
              <h3>Les produit qui sont en Stock</h3>
              <Button  style={{ margin :'5px'}} onClick={handleShow1}>Edit</Button>
              <Button style={{ margin :'5px'}} onClick={handleShow2}>Suprimer</Button>
              <Button style={{ margin :'5px'}} onClick={handleShow}>Ajouter un produit</Button>
            </div>
          </Col>
          <Col>
            <div class="input-group">
              <div class="form-outline">
                <input type="search"
                  id="form1"
                  class="form-control"
                  onChange={(e) => setQuery(e.target.value)}
                />

              </div>
              <button type="button" value={'search'} class="btn btn-s">
                Search
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {renderPack()}
          </Col>
        </Row>
      </Container>
      {renderAddPackModal()}
      {renderUpdatePackModal()}
      {renderShowProductDetailsModal()}
      {renderDeletePack()}
    </Layout>
  )

}
export default Products;