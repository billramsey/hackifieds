const ListEntryView = (props) => {
  console.log('id:', props.listing.listingId);

  return (
    <div>
    <div><Link to={{ pathname: '/showListing', query: { listId: 5 } }} >details</Link></div>
      <div>{props.listing.title}</div>
      <div>{props.listing.description}</div>
      <div>{props.listing.price}</div>
      <div>{props.listing.location}</div>
    </div>
  );
};






export default ListEntryView;