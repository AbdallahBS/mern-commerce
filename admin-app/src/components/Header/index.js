import React from 'react'
import {Navbar,Nav,Container} from 'react-bootstrap';
import { NavLink , Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signout } from '../../actions';
/**
* @author
* @function Header
**/

export const Header = (props) => {
  const auth = useSelector(state => state.auth);
  const dispatch =useDispatch();
  const logout =()=>{
    dispatch(signout())
  }
  const renderLoggedInLinks = ()=>{
    return (
      <Nav>
      <li className="nav-item">
      <span  className="nav-link" onClick={logout}>Sign Out</span>
      </li>
      {/*<Nav.Link href="#deets">Signin</Nav.Link>*/}
    </Nav>
    )
    
  }
  const renderNonLoggedInLinks = ()=>{
    return ( <Nav>
      <li className="nav-item">
      <NavLink to="/Signin" className="nav-link">Signin</NavLink>
      </li>
      <li className="nav-item">
      <NavLink to="/Signup" className="nav-link">Signup</NavLink>
      </li>
      {/*<Nav.Link href="#deets">Signin</Nav.Link>*/}
    </Nav>)
  }
  return(
    <Navbar collapseOnSelect fixed='top' expand="lg" bg="dark" variant="dark" style={{zIndex : 1}}>
    <Container fluid>
      {/*<Navbar.Brand href="#home">Admin Dashbord</Navbar.Brand>*/}
      <Link className='navbar-brand' to='/'>Admin dashbord</Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          {/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
</NavDropdown>*/}
        </Nav>
        {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
       
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )

 }
 export default Header;