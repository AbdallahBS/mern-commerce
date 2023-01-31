import React, { useEffect, useState } from 'react'
import { Container , Form , Row, Col, input} from 'react-bootstrap';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import { login} from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

/**
* @author
* @function Signin
**/

export const Signin = (props) => {
    console.log("a")
    const [email , setEmail] = useState('');
    const [password , setpassword] = useState('');
    const [error, setEroor]  = useState('');
    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);
    const userLogin = (e)=>{
        e.preventDefault();
        const user = {
           email,password
        }
        dispatch(login(user));
    }
    if(auth.authenticate){
        return <Navigate to={'/'}/>
    }
  return(
    <Layout>
        <Container>
            <Row style={{marginTop : '50px'}}>
                <Col md={{span : 6,offset : 3}}>
                 <form onSubmit={userLogin}>

                        <Input
                            label="Email"
                            placeholder="Email"
                            value={email}
                            type="email"
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                           <Input
                            label="Password"
                            placeholder="Password"
                            value={password}
                            type="password"
                            onChange={(e)=>setpassword(e.target.value)}
                        />
                            <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                </Col>
            </Row>

        </Container>
    </Layout>
   )

 }
 export default Signin;