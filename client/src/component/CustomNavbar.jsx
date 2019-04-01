import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

const CustomNavbar = props => {
  return (
    <div>
      <Navbar className="faded" light expand="md">
        <NavbarBrand href="/" className="mr-auto">
          Damin Consulting
        </NavbarBrand>
        <NavbarToggler />
        <Collapse navbar />
      </Navbar>
    </div>
  );
};
export default CustomNavbar;
