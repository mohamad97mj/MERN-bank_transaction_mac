import React from 'react';

import styles from './Toolbar.module.css';
import './Toolbar.css';
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import Logo from '../../Logo/Loog';
import Aux from '../../../hoc/Aux/Aux';
import Auth from "../../../containers/Forms/Auth/Auth";
import {NavLink} from "react-router-dom";

const toolbar = (props) => (

    <header>
        <div id="my-toolbar">

            <Logo/>

            <Navbar collapseOnSelect expand="lg"  className={styles.Toolbar}>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav activeKey="/" className={styles.Toolbar}>

                        {!props.isAuth ?

                            <Aux>
                                <Nav.Item>
                                    {/*<Nav.Link exact as={NavLink} to="/">*/}
                                    {/*    صفحه نخست*/}

                                    {/*</Nav.Link>*/}
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link id="nav-1" exact as={NavLink} to="/">
                                        ورود
                                    </Nav.Link>
                                </Nav.Item>


                                <Nav.Item>
                                    <Nav.Link id="nav-2" exact as={NavLink} to="/transaction">
                                        ماک
                                    </Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link id="nav-2" exact as={NavLink} to="/about" disabled>
                                        درباره ما
                                    </Nav.Link>
                                </Nav.Item>
                            </Aux> :

                            <Aux>

                                <Nav.Item>
                                    < Nav.Link id="nav-3" exact as={NavLink} to="/logged">
                                        صفحه نخست
                                    </Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    < Nav.Link id="nav-3" exact as={NavLink} to="/profile">
                                        مشخصات صرافی
                                    </Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    < Nav.Link id="nav-4" exact as={NavLink} to="/form">
                                        اطلاعات ارتباطات داخلی وخارجی
                                    </Nav.Link>
                                </Nav.Item>


                                <Nav.Item>
                                    <Nav.Link id="nav-5" onClick={()=>window.location.reload(true)} exact as={NavLink} to="/logout">
                                        خروج
                                    </Nav.Link>
                                </Nav.Item>
                            </Aux>
                        }

                    </Nav>



                    {/*<Nav className="ml-auto">*/}
                    {/*    <Nav.Link href="#features">Features</Nav.Link>*/}
                    {/*    <Nav.Link href="#pricing">Pricing</Nav.Link>*/}
                    {/*    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">*/}
                    {/*        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                    {/*        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>*/}
                    {/*        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                    {/*        <NavDropdown.Divider />*/}
                    {/*        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
                    {/*    </NavDropdown>*/}
                    {/*</Nav>*/}

                </Navbar.Collapse>
            </Navbar>




        </div>
    </header>
);

{/*<Nav.Item>*/
}
{/*    <Nav.Link eventKey="3" href="/signin">*/
}
{/*        ثبت نام*/
}
{/*    </Nav.Link>*/
}
{/*</Nav.Item>*/
}

export default toolbar;