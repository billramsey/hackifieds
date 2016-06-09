const ListEntryView = (props) => {
  return (
    <div>
      <div>{props.listing.title}</div>
      <div>{props.listing.description}</div>
      <div>{props.listing.price}</div>
      <div>{props.listing.location}</div>
    </div>
  );
};






export default ListEntryView;