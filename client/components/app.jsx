import Nav from './nav.jsx';
import Filter from './filter.jsx';
import Listings from './listings.jsx';
import ListingInfo from './listingInfo.jsx';
import NewListing from './newListing.jsx';
import Comments from './comments.jsx';
import helpers from '../lib/helpers.js';
import { Grid, Row, Col, ButtonToolbar } from 'react-bootstrap';


class App extends React.Component {

  constructor (props) {
    super(props);

    window.globalVar = {};
    this.state = {
      categories: [],
      listings: [],
      navCategory: 'Rent',  //Default listings category to show
      activeFilter: 'All',  //Default filter to show All
      activeListing: parseInt(window.localStorage.getItem('activeListing')) || null, //If activeListing exists in localStorage, set state to that listing
      currentUser: {},
      currentView: window.localStorage.getItem('currentView') || 'listingsView'
    };
  }

  componentWillMount () {
    helpers.userAuth((user) => this.setSession(user));
    globalVar.callback = user => {
      user = user || {};
      this.setState({currentUser: user})
      this.setSession(user);
    };
    this.retrieveCategories();
    this.retrieveListings(this.state.navCategory);
  }

  retrieveCategories () {
    helpers.getCategories( data => this.setState({categories: data}) );
  }

  retrieveListings (category) {
    helpers.getListings( category, data => this.setState({listings: data}) );
  }

  sendListing (newListing, images) {
    var formData = new FormData();
    formData.append('title', newListing.title);
    formData.append('location', newListing.location);
    formData.append('price', newListing.price);
    formData.append('description', newListing.description);
    formData.append('userId', newListing.userId);
    formData.append('categoryId', newListing.categoryId);
    _.each(images, function(file) {
      formData.append('images', file);
    });
    helpers.postListing(formData, data => {
      let newCategory = this.state.categories.filter(cat => cat.categoryId === newListing.categoryId);
      this.handleNavClick(newCategory[0].categoryName);
    });
  }

  handleNavClick (value) {
    this.setState({currentView: 'listingsView', navCategory: value, activeFilter: 'All'});
    window.localStorage.setItem('currentView', 'listingsView');
    this.retrieveListings(value);
  }

  handleFilterItemClick (event) {
    //Set the current activeFilter value
    this.setState({activeFilter: event.currentTarget.id});
  }

  handleListingEntryClick (event) {
    //Store the clicked listing in browser localStorage & set the current activeListing state
    let activeListing = Number(event.currentTarget.id);
    window.localStorage.setItem('activeListing', JSON.stringify(activeListing));
    this.setState({activeListing: activeListing});
  }

  handleListingInfoClick (event) {
    //Clear localStorage & set the current activeListing to null / close the Listing Info component
    window.localStorage.setItem('activeListing', null);
    this.setState({activeListing: null});
  }

  handleNewListingClick (event) {
    window.localStorage.setItem('currentView', 'newListingView');
    this.setState({currentView: 'newListingView'});
  }

  handleNewListingClose (event) {
    window.localStorage.clear();
    console.log('clear');
    this.setState({currentView: 'listingsView'});
  }

  setSession (user) {
    this.setState({currentUser: user});
  }

  logOut () {
    window.localStorage.clear();
    this.setState({currentView: 'listingsView'});
    helpers.logout( data => this.setState({ currentUser: {} }));
  }

  render () {
    let viewLogic;
    let loginLogic;
    let newListingLogic;

    if ( this.state.currentView === 'listingsView' ) {
      viewLogic =
        <Row className="show-grid">
          <Col xs={1} md={1} lg={1}></Col>
          <Col xs={2} md={2} lg={2}>
            <Filter handleFilterItemClick={this.handleFilterItemClick.bind(this)}
                    listings={this.state.listings}/>
          </Col>
          <Col xs={9} md={9} lg={9}>
            <Listings handleListingEntryClick={this.handleListingEntryClick.bind(this)}
                      handleListingInfoClick={this.handleListingInfoClick.bind(this)}
                      activeFilter={this.state.activeFilter}
                      activeListing={this.state.activeListing}
                      listings={this.state.listings}
                      user={this.state.currentUser}/>
          </Col>
        </Row>;
    } else if ( (Object.keys(this.state.currentUser).length !== 0)
               && (this.state.currentView === 'newListingView') ) {
      viewLogic =
        <Row className="show-grid">
          <Col xs={12} md={12} lg={12}>
            <NewListing categories={this.state.categories}
                        navCategory={this.state.navCategory}
                        user={this.state.currentUser}
                        clickHandler={this.sendListing.bind(this)}
                        handleNewListingClose={this.handleNewListingClose.bind(this)}/>
          </Col>
        </Row>;
    }

    if (Object.keys(this.state.currentUser).length === 0) {
      loginLogic =
        <a className="btn top-btn" href="/auth/github">Login with GitHub</a>;
      newListingLogic =
        <a className="btn top-btn"href="/auth/github" onClick={this.handleNewListingClick.bind(this)}>Post A Listing</a>;
    } else {
      loginLogic =
        <a className="btn top-btn" href="/" onClick={this.logOut.bind(this)}>Logout</a>;
      newListingLogic =
        <a className="btn top-btn"href="javascript:void(0);" onClick={this.handleNewListingClick.bind(this)}>Post A Listing</a>;
    }

    return (
      <div className="app">
        <ButtonToolbar>
          {newListingLogic}
          {loginLogic}
        </ButtonToolbar>
        <Nav handleNavClick={this.handleNavClick.bind(this)}/>
        <Grid>
          {viewLogic}
         
        </Grid>
         <Comments />
      </div>
    );
  }

}

export default App;

