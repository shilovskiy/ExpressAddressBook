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
    let Cntct ={};
    let OtherContacts= {};
    if (req.query.Name!=""){
        Cntct.Name = req.query.Name
    }
    if (req.query.LName!=""){
        Cntct.LName = req.query.LName
    }
    if (req.query.Phone!=""){
        Cntct.Phone = req.query.Phone
    }
    if (req.query.Email!=""){
        OtherContacts.Email = req.query.Email
    }
    if (req.query.Skype!=""){
        OtherContacts.Skype = req.query.Skype
    }
    Cntct.OtherContacts=OtherContacts;
   //Cntct.push(OtherContacts);



    var collection = db.get().collection('Contacts');

   // let newContact ={'Name':Name,'LName':LName,'Phone':Phone,'OtherContacts.Email':Email,'OtherContacts.Skype':Skype};
    collection.insertOne(Cntct//{'Name':Name,'LName':LName,'Phone':Phone}

    ,(err,reults)=> {
            if (err) {
                console.log(err);
                var err = new Error("Имя или Фамилия должны быть заполнены ОБЯЗАТЕЛЬНО!!!");
                next(err);
            } else {
                console.log(`Inserted ${reults.length} contact with "_id" are: ${JSON.stringify(reults)}`);
                res.redirect(301,"/");
            }
        });


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
    res.redirect(301,"/");
});




router.delete('/del', function(req, res, next) {
    var collection = db.get().collection('Contacts');
    for(let ids in req.body){
        let mongoID= require('mongodb').ObjectID(req.body[ids]);
        collection.remove({_id:mongoID},
            (err,deleted)=> {
                if (err) {
                    console.log(err);
                    next(new Error(err.message));
                } else {
                    console.log(`deleted ${deleted.length} contact with "_id" are: ${JSON.stringify(deleted)}`);
                }
            }

        );

    }
    // res.redirect("/");
    res.writeHead(200,'OK',{'Content-Type':'application/json'});
    res.write(JSON.stringify('{result:OK}'));
    res.end();
    //res.send(200);

});



module.exports = router;
