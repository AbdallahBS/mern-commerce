import React, { useState } from 'react'
import { Container, Form, Row, Col, input } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions';

/**
* @author
* @function Signup
**/

export const Signup = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);
    const user=useSelector(state =>state.user);
    const dispatch=useDispatch();
    const userSignup = (e) => {
        e.preventDefault();
        const user ={
            firstName ,lastName , email , password
        }
        dispatch(signup(user));
    }
    if (auth.authenticate) {
        return <Navigate to={'/'} />
    }
    if(user.loading){
        return <p>Loading...</p>
    }
    return (
        <Layout>
            <Container>
                {user.message}
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <form onSubmit={userSignup}>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        label="First Name"
                                        placeholder="First Name"
                                        value={firstName}
                                        type="text"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        label="Last Name"
                                        placeholder="Last Name"
                                        value={lastName}
                                        type="text"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Input
                                label="Email Adressee"
                                placeholder="Email Adresse"
                                value={email}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                label="password"
                                placeholder="password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </Col>
                </Row>

            </Container>
        </Layout>
    )

}
export default Signup;