import Parent from './components/parent.jsx';
import ListingView from './components/listingView.jsx';
import Post from './components/post.jsx';

ReactDOM.render((
  <Router>
    <Route path="/" component={Parent}>
      <IndexRoute component={ListingView} type={'rent'}/>      
      <Route path="post" component={Post} />
    </Route>  
  </Router>
), document.getElementById("app"));
