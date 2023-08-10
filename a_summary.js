const mongoose = require('mongoose');
require('dotenv').config()
// Connect to MongoDB Atlas
const uri = process.env.MONGO_ATLAS_URL;
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    // Specify the collection and database name
    const collectionName = 'books';
    // Get a reference to the collection
    const collection = mongoose.connection.db.collection(collectionName);

    // Insert a document
    const document = { name: 'John Doe', age: 30 };
    collection.insertOne(document)
      .then(() => {
        console.log('Document inserted successfully');

        // Find documents
        collection.find({ age: { $gte: 25 } }).toArray()
          .then((documents) => {
            console.log('Documents found:');
            console.log(documents);

            // Update a document
            collection.updateOne({ name: 'John Doe' }, { $set: { age: 35 } })
              .then(() => {
                console.log('Document updated successfully');

                // Delete a document
                collection.deleteOne({ name: 'John Doe' })
                  .then(() => {
                    console.log('Document deleted successfully');
                    // Disconnect from MongoDB Atlas
                    mongoose.connection.close()
                      .then(() => {
                        console.log('Disconnected from MongoDB Atlas');
                      })
                      .catch((error) => {
                        console.log('Error disconnecting from MongoDB Atlas:', error);
                      });
                  })
                  .catch((error) => {
                    console.log('Error deleting document:', error);
                  });
              })
              .catch((error) => {
                console.log('Error updating document:', error);
              });
          })
          .catch((error) => {
            console.log('Error finding documents:', error);
          });
      })
      .catch((error) => {
        console.log('Error inserting document:', error);
      });
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB Atlas:', error);
  });
