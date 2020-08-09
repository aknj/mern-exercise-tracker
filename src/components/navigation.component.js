import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand } from 'reactstrap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="dark" dark expand="lg">
      <NavbarBrand tag={Link} to={'/'}>ExcerTracker</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">Excercises</Link>
          </li>
          <li className="navbar-item">
            <Link to="/create" className="nav-link">Create Excercise Log</Link>
          </li>
          <li className="navbar-item">
            <Link to="/create-user" className="nav-link">Create User</Link>
          </li>
        </ul>
      </Collapse>
    </Navbar>
  )
}

export default Navigation;
