const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

// We transform the RETURNED document by removing adding the id property equal to a stringified _id property
// We remove the _id property (so only id as a string exists)
// And we delete the __v property which removes the version from the returned object
// None of this affects the data INSIDE the database.
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema);
