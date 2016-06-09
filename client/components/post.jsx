import helpers from '../lib/helpers.js';

const Post = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('sending')
    var formData = new FormData();
    formData.append('title', document.getElementById("title").value);
    formData.append('location', document.getElementById("location").value);
    formData.append('price', document.getElementById("price").value);
    formData.append('description', document.getElementById("description").value);
    formData.append('userId', 1);
    formData.append('categoryId', 1);
    formData.append('images', null);
    helpers.postListing(formData, data => {
      console.log(data)
    })
  };

  
  return (
    <div>
      <div className="container-fluid">
        <h1 id="heading">Post a new Listing</h1>
        <form action="" onSubmit={handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input className="form-control" id="title" required type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input className="form-control" id="location" required type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price *</label>
            <input className="form-control" id="price" required type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="question">Description *</label>
            <textarea className="form-control" id="description" rows="4" required/>
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">Post</button>
          </div>
        </form>
      </div>
    </div>  
  );
     
};

export default Post;
