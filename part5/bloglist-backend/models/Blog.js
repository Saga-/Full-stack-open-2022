const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { versionKey: false }); // For idempotence

// We transform the RETURNED document by removing adding the id property equal to a stringified _id property
// We remove the _id property (so only id as a string exists)
// And we delete the __v property which removes the version from the returned object
// None of this affects the data INSIDE the database.
// It returns its normal value if using Blog.Find() or FindByID() -
  // it is only AFTER a transaction in the response from the transaction it doesn't return the __v or _id.
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema);
