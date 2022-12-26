import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import List from "./List";
import Admin from "./Admin";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLayoutEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";


function NavbarComp() {
    useLayoutEffect(() => {
      document.body.style.backgroundColor = "#012522"
      document.body.style.backgroundImage = `url('https://i.ibb.co/ky3wyT1/4614.png')`
      document.body.style.backgroundSize =  "500px 600px"
    });

    const { loginWithRedirect, logout, user, isAuthenticated, isLoading  } = useAuth0();
  
    return (
      <div className="NavbarComp">
          <Navbar className="color-nav" expand="lg" variant="light">
            <Container>
              <Navbar.Brand style={{color:"white"}} href="/">Unofficial ACE Placements</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link style={{color:"white"}} href="/">Home</Nav.Link>
                  <Nav.Link style={{color:"white"}} href="/list">List</Nav.Link>

                  {!isAuthenticated && <Nav.Link onClick={()=>{loginWithRedirect()}} style={{position:"absolute",color:"white",right: "10px"}} href="">Login</Nav.Link>}
                  {isAuthenticated && <Nav.Link  onClick={() => logout({ returnTo: window.location.origin })} style={{position:"absolute",color:"white",right: "10px"}} href="">Logout <img style={{borderRadius:"100%",width:"2em"}} src={user.picture}></img></Nav.Link>}
                </Nav>
              </Navbar.Collapse>
            </Container>
        </Navbar>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/list" element={<List/>}/>
            <Route path="/admin" element={<Admin/>}/>
        </Routes>
        </BrowserRouter>
      </div>
    );
  }
  
  export default NavbarComp;
  