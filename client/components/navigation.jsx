import { Row, Col, Nav, NavItem } from 'react-bootstrap';

const Navigation = ({handleNavClick}) => {
  return (
    <Nav bsStyle="pills" stacked>
      <NavItem href="javascript:void(0);" onClick={() => handleNavClick('Rent')}>Rent</NavItem>
      <NavItem href="javascript:void(0);" onClick={() => handleNavClick('Buy')}>Buy</NavItem>
      <NavItem href="javascript:void(0);" onClick={() => handleNavClick('Hack')}>Hack</NavItem>
    </Nav>
  );
};

export default Navigation;

