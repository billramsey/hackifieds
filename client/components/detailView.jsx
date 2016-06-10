import helpers from '../lib/helpers.js';
import { Modal, Button } from 'react-bootstrap';

class ShowListing extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      listingId: props.location.query.listId,
      listing:{}
    };
  }
  componentWillMount () {
    helpers.getDetailedListing(this.state.listingId, (listing) => this.setState({listing: listing}));
  }
  render() {
    return (
    <div className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title><span className="modal-title">{this.state.listing.title}</span></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <span className="listing-info-date"> List Date: </span>
            <span> {helpers.dateFormatter(this.state.listing.createdAt)} </span>
          </div>
          <div>
            <span className="listing-info-location"> Location: </span>
            <span> {this.state.listing.location} </span>
          </div>
          <div>
            <span className="listing-info-price"> Price: </span>
            <span> ${this.state.listing.price} </span>
          </div>
          <div>
            <span className="listing-info-start-date"> Start Date: </span>
            <span> {helpers.dateFormatter(this.state.listing.startDate)} </span>
          </div>
          <div>
            <span className="listing-info-end-date"> End Date: </span>
            <span> {helpers.dateFormatter(this.state.listing.endDate)} </span>
          </div>
          <div>
            <span className="listing-info-description"> Description: </span>
            <span> {this.state.listing.description} </span>
          </div>
          <div>{this.state.listing.Images.map(image =>
            <div className="listing-image">
              <img src={image.path}/>
            </div>)}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div className="contact">
            {contactLogic}
          </div>
          <Button onClick={this.state.handleListingInfoClick}>Close</Button>
        </Modal.Footer>

      </Modal.Dialog>
    </div>
  );
  }
};


export default ShowListing;