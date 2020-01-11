const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded());
app.use(express.json());

const mongoose = require('mongoose');
let dev_db_url = 'mongodb://127.0.0.1:27017/gobd2019';
let mongodb = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongodb);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

var studentSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    age: Number,
    gender: String
});
var Student = mongoose.model('Student', studentSchema);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/newstudent', function(req, res) {

    var newstudent = new Student({
        first_name : req.body.firstname,
        last_name : req.body.lastname,
        email : req.body.email,
        phone : req.body.phone,
        age : req.body.age,
        gender : req.body.gender
    });

    newstudent.save(function(err, newstudent) {
        if (err) return console.error(err);
        console.log(newstudent);
    });

    res.redirect('/');
});

let port = 4040;
app.listen(port, '10.0.1.11', () => {
    console.log('Server is up and running on port: ' + port);
});