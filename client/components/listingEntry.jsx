import ListingInfo from './listingInfo.jsx';
import { Row, Col, Jumbotron, Panel } from 'react-bootstrap';
import helper from '../lib/helpers';

// const ListingEntry = (props) => (
//   <Row id={props.listing.listingId} onClick={props.handleListingEntryClick}>
//     <Col xs={1} sm={1} md={1}>{helper.dateFormatter(props.listing.createdAt)}</Col>
//     <Col xs={1} sm={1} md={1}>House picture</Col>
//     <Col xs={1} sm={1} md={1}><img src={props.user.profilePic} alt="Profile Pic" width="45px" height="45px"/></Col>
//     <Col xs={1} sm={1} md={1}>${props.listing.price}</Col>
//     <Col xs={1} sm={1} md={1}>{props.listing.location}</Col>
//     <Col xs={1} sm={1} md={1}>{props.listing.description}</Col>
//     <Col xs={1} sm={1} md={1}>{props.listing.roomtype}</Col>
//     <Col xs={1} sm={1} md={1}>{props.listing.distance}</Col>
//   </Row>  
// );

const ListingEntry = (props) => {
  const { housePic, handleListingEntryClick, profilePic } = props;
  const { description, price, location, roomtype, distance, createdAt } = props.listing;
  const profileImg = <img src={profilePic} alt="Profile Pic" width="80px" />;
  const houseImg = <img src={housePic} alt="housePic" width="300px"/>;
  const header = 
    <Row>
      <Col md={2}>{helper.dateFormatter(createdAt)}</Col>
      <Col md={2}>${price}</Col>
      <Col md={2}>{distance} miles</Col>
      <Col md={2}>{location}</Col>
      <Col md={2}>{roomtype}</Col>
      <Col md={2}>{profileImg}</Col>
    </Row>

  return (
    <Jumbotron id={props.listing.listingId} onClick={handleListingEntryClick}>
      <Panel header={header}>
        <Row>
          <Col md={6}>{houseImg}</Col>
          <Col md={6} className="text-left">{description}</Col>
        </Row>
      </Panel>
    </Jumbotron>
 );
};






export default ListingEntry;

// Things to have on each entry
// 1. Date, 
// 2. House picture,
// 3. Profile picture, 
// 4. Price,
// 5. Location, 
// 6. Distance, 
// 7. Description, 
// 8. Room type (private or shared)