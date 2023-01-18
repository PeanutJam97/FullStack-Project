import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import CreateAccount from '../pages/CreateAccount';



const NavBar = () => {
    return (
        <>
            <div>    
                <Navbar bg="warning" variant="light">
                    <Container>
                        <Navbar.Brand href="home">Yu Xuan's Apps</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <NavDropdown title="Applications" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="App1">App 1</NavDropdown.Item>
                                <NavDropdown.Item href="App2">
                                    App 2
                                </NavDropdown.Item>
                                <NavDropdown.Item href="App3">App 3</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link href="EditAccount">
                                Edit Account
                            </Nav.Link>
                            <Nav.Link href="CreateAccount">
                                Create Account
                            </Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>

                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element />
                        <Route path="/CreateAccount" element={<CreateAccount />}/>
                        <Route path="/ChangeAccount" element />
                        <Route path="/Projects" element />
                    </Routes>
                </div>
            </div>    
        </>
    );
}
 
export default NavBar;