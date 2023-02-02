import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../Store/auth-context'
import Login from '../pages/Login';
import CreateAccount from '../pages/CreateAccount';
import Project1 from '../pages/Project1';
import ChangeEmailPass from '../pages/ChangeEmailPass';
import ChangeEmail from '../pages/ChangeEmail';
import ChangePassword from '../pages/ChangePassword';


const NavBar = () => {


    const authCtx = useContext(AuthContext);

    const logoutHandler = () => {
        authCtx.logout()
    }

    const isLoggedin = authCtx.isLoggedIn;


    return (
        <>
            <div>    
                <Navbar bg="warning" variant="light">
                    <Container>
                        <Navbar.Brand href="/">Yu Xuan's Apps</Navbar.Brand>
                        <Nav className="me-auto">
                            {isLoggedin && <Nav.Link href="/">Home</Nav.Link>}
                            {isLoggedin && <NavDropdown title="Applications" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="App1">App 1</NavDropdown.Item>
                                <NavDropdown.Item href="App2">
                                    App 2
                                </NavDropdown.Item>
                                <NavDropdown.Item href="App3">App 3</NavDropdown.Item>
                            </NavDropdown>}
                        </Nav>
                        <Nav>
                            {isLoggedin && <Nav.Link href="editinfo">
                                Change Email or Password
                            </Nav.Link>}
                            {isLoggedin && <Nav.Link href="login" onClick={logoutHandler}>
                                Logout
                            </Nav.Link>}
                            {!isLoggedin && <Nav.Link href="CreateAccount">
                                Create Account
                            </Nav.Link>}
                        </Nav>
                    </Container>
                </Navbar>

                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element />
                        <Route path="/CreateAccount" element={<CreateAccount />}/>
                        {isLoggedin && <Route path="/changeemail" element={<ChangeEmail />} />}
                        {isLoggedin && <Route path="/changepassword" element={<ChangePassword />} />}
                        {isLoggedin && <Route path="/editinfo" element={<ChangeEmailPass />} />}
                        {isLoggedin && <Route path="/Projects" element={<Project1 />}/>}
                    </Routes>
                </div>
            </div>    
        </>
    );
}
 
export default NavBar;