var express = require('express');
var router = express.Router();
var https = require('https');
var urlencode = require('urlencode');

/* GET users listing. */
router.get('/auction/:itemName', function(req, res, next) {

    var itemName = req.params.itemName;

    var params = '?';
    params += 'itemName=' + urlencode(itemName);
    params += '&apikey=' + '5mFNhtcCHNXza0X514xt8Tvelz933cup';

    for (const key in req.query) {
        params += "&" + key + "=" + req.query[key];
    }

    https.get('https://api.neople.co.kr/df/auction' + params, (response) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        response.on('data', (d) => {
            res.send( JSON.parse(d));
        });

    }).on('error', (e) => {
        console.error(e);
    });
});

module.exports = router;
