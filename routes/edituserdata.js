/**
 * Created by Олег Шиловский on 13.12.2016.
 */
var express = require('express');
var router = express.Router();
var db = require('../model/db');
/* GET users profile. */

router.get('/add', function(req, res, next) {
    let docs=[{Name:'',LName:'',Email:'',Phone:'',Skype:''}];

    res.render('profile', { 'docs': docs[0],'title':'Адресная книга','nextaction':'/edituserdata/save'} );//'docs': null,
});


router.get('/save', function(req, res, next) {
    //let id = require('mongodb').ObjectID(req.params.id);
    let Name = req.query.Name;
    let LName = req.query.LName;
    let Email = req.query.Email;
    let Phone = req.query.Phone;
    let Skype = req.query.Skype;
    var collection = db.get().collection('Contacts');

   // let newContact ={'Name':Name,'LName':LName,'Phone':Phone,'OtherContacts.Email':Email,'OtherContacts.Skype':Skype};
    collection.insertOne({'Name':Name,'LName':LName,'Phone':Phone}

    ,(err,res)=> {
            if (err) {
                console.log(err);
            } else {
                console.log(`Inserted ${res.length} devices with "_id" are: ${JSON.stringify(res)}`);
            }
        });

    res.redirect(301,"/");
});

router.get('/:id', function(req, res, next) {
    let id = require('mongodb').ObjectID(req.params.id);
    let Name = req.query.Name;
    let LName = req.query.LName;
    let Email = req.query.Email;
    let Phone = req.query.Phone;
    let Skype = req.query.Skype;
    var collection = db.get().collection('Contacts');

    //todo:mongo modify

    collection.updateOne({'_id':id}
    ,{$set:{'Name':Name,'LName':LName,'Phone':Phone,'OtherContacts.Email':Email,'OtherContacts.Skype':Skype}

    });
    //     .toArray(function (err, docs) {
    //     if (err) {
    //         console.log(err);
    //     } else if (docs.length) {
    //         console.log('Found:', docs);
    //
    //     } else {
    //         console.log('No document(s) found with defined "find" criteria!');
    //     }
    //     res.render('profile', { 'docs': docs[0], 'title':'Адресная книга'} );
    //     //todo:redirect?
    //     //Close connection
    //     //db.close();
    // });

    res.redirect(301,"/");
});







module.exports = router;
