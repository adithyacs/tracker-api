require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.DB_URL || 'mongodb://localhost/issuetracker';
function testWithCallbacks(callback) {
  console.log('\n-------- test with call backs-----');
  const client = new MongoClient(url, { useNewUrlParser: true });
  client.connect((connErr) => {
    if (connErr) {
      callback(connErr);
      return;
    }
    console.log('Connected to MongoDB URL', url);
    const db = client.db();
    const collection = db.collection('employees');
    const employee = { id: 1, name: 'Adithya', age: 23 };
    collection.insertOne(employee, (insertErr, result) => {
      if (insertErr) {
        client.close();
        callback(insertErr);
        return;
      }
      console.log('Result of insert: \n', result.insertedId);
      collection.find({ _id: result.insertedId }).toArray((findErr, docs) => {
        if (findErr) {
          client.close();
          callback(findErr);
          return;
        }
        console.log('Result of find: \n', docs);
        client.close();
        callback();
      });
    });
  });
}
async function testwithAsync() {
  console.log('\n--------------test with async---------');
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    await client.connect();
    console.log('connected to mongoDB URL', url);
    const db = client.db();
    const collection = db.collection('employees');
    const employee = { id: 2, name: 'Anush', age: 24 };
    const result = await collection.insertOne(employee);
    console.log('Result of insert: \n', result.insertedId);
    const docs = await collection.find({ _id: result.insertedId }).toArray();
    console.log('Result of find:\n', docs);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}
testWithCallbacks((err) => {
  if (err) {
    console.log(err);
  }
  testwithAsync();
});
