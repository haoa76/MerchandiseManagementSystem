const express = require('express');
const router = express.Router();
const sqlFn = require('../mysql');

router.get('/test', (req, res, next) => {
    // res.send('Hello World');
    const sql = 'select * from test';
    sqlFn(sql, [], (err, data) => {
        if (err) {
            next(err);
            return;
        } else {
            res.send({ code: "00000", records: data });
        }
    })
});
module.exports = router;