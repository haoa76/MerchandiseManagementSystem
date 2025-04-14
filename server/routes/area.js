const express = require('express');
const router = express.Router();
const sqlFn = require('../mysql');

router.get('/province', (req, res, next) => {
    const sql = 'select * from province';
    sqlFn(sql, [], (err, data) => {
        if (err) {
            next(err);
            return;
        } else {
            res.send({ code: "00000", records: data });
        }
    })
});
router.get('/city', (req, res, next) => {
    const sql = 'select * from city where province_id=?';
    sqlFn(sql, [req.query.pid], (err, data) => {
        if (err) {
            next(err);
            return;
        } else {
            res.send({ code: "00000", records: data });
        }
    })
});
router.get('/district', (req, res, next) => {
    const sql = 'select * from district where city_id=?';
    sqlFn(sql, [req.query.pid], (err, data) => {
        if (err) {
            next(err);
            return;
        } else {
            res.send({ code: "00000", records: data });
        }
    })
});
module.exports = router;