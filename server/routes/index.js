var express = require('express');
var router = express.Router();
var dbUtil = require('../util/dbUtil')();
var connection = dbUtil.createConnection();
dbUtil.validate(connection);


/* GET home page. */
router.get('/', function(req, res, next) {
    var stmt = 'select * from tb_user where account = \'han123\'';
    connection.query(stmt, function (err, rows) {
        if(err){
            console.log('error.....')
        }else{
            res.render('index', { title: rows[0].ACCOUNT });
        }
    })
});

module.exports = router;
