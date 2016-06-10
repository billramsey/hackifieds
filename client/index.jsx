import Parent from './components/parent.jsx';
import ListingView from './components/listingView.jsx';
import ShowListing from './components/detailView.jsx';
import Post from './components/post.jsx';

ReactDOM.render((
  <Router>
    <Route path="/" component={Parent}>
      <IndexRoute component={ListingView} type={'rent'}/>      
      <Route path="post" component={Post} />
      <Route name="showListing" path="showListing" component={ShowListing} />
    </Route>  
  </Router>
), document.getElementById("app"));
