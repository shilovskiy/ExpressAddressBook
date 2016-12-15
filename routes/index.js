var express = require('express');
var router = express.Router();

var db = require('../model/db');

/* GET home page. */
router.get('/', function(req, res, next) {


    var collection = db.get().collection('Contacts');

    collection.find({}).toArray(function (err, docs) {
        if (err) {
            console.log(err);
        } else if (docs.length) {
            console.log('Found:', docs);
        } else {
            console.log('No document(s) found with defined "find" criteria!');
        }
        res.render('index', { "docs": docs, "title":"Адресная книга"} );
        //Close connection
        //db.close();
    });



});

module.exports = router;
