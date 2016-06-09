import helpers from '../lib/helpers.js';

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {}
    };

  }
  componentWillMount () {
    helpers.userAuth((user) => {
      console.log('authenticating user', user);
      user = user || {};
      this.setState({currentUser: user});
    });
  }
  render() {
    return (
      <div>
      <a className="btn top-btn" href="/auth/github">Login with GitHub</a>
        <div>
          <div><Link to={{ pathname: '/', query: { type: 'rent' } }}>Rent</Link></div>
          <div><Link to={{ pathname: '/', query: { type: 'buy' } }}>Buy</Link></div>
          <div><Link to={{ pathname: '/', query: { type: 'hack' } }}>Hack</Link></div>
          <div><Link to="post">Post</Link></div>
        </div>
        {React.cloneElement(this.props.children, { user: this.state.currentUser })}
      </div>
    );
  }
};

export default Parent;
