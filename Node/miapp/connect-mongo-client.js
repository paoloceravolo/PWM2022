const MongoClient = require('mongodb').MongoClient;

// Connect URL
const url = 'mongodb://127.0.0.1:27017';

// Connec to MongoDB
MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }, (err, client) => {
        if (err) {
        return console.log(err);
    }else{console.log('Mongo is connected')}

    // Create DB
    const db = client.db('PWM');

    // Create a collection
    const courses = db.collection('courses');

    courses.insertOne({name: 'Web Security'}, (err, result) => {
        //console.log(result);
    });

     courses.insertMany([
        {name: 'Web Security'},
        {name: 'Distributed Databases'},
        {name: 'Artificial Intelligence'}
        ], (err, result) => {}
        );

     courses.findOne({name: 'Web Security'}, (err, result) => {
            console.log(result)
     });

  courses.deleteOne({name: 'Web Security'}, (err, result) => {
            console.log(result)
     });


  courses.updateMany({},{$set:{'room': 'N.A.'}});

  courses.updateOne({name: 'Distributed Databases'}, {$set:{'room': 'Gamma'}})

    courses.findOne({name: 'Distributed Databases'}, (err, result) => {
            console.log(result)
     });












});