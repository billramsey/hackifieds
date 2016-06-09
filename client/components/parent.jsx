const Parent = props => {
  return (
    <div>
      <div>
        <div><Link to={{ pathname: '/', query: { type: 'rent' } }}>Rent</Link></div>
        <div><Link to={{ pathname: '/', query: { type: 'buy' } }}>Buy</Link></div>
        <div><Link to={{ pathname: '/', query: { type: 'hack' } }}>Hack</Link></div>
        <div><Link to="post">Post</Link></div>
      </div>
      {props.children}
    </div>
  );
};

export default Parent;
