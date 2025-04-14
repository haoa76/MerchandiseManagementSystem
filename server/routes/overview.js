const express = require('express');
const router = express.Router();
const sqlFn = require('../mysql');

router.get('/statistics', (req, res, next) => {
    const sql = 'select * from statistics';
    sqlFn(sql, [], (err, data) => {
        if (err) {
            next(err);
            return;
        } else {
            res.send({ code: "00000", record: data[0] });
        }
    })
});

router.get('/producttypesales', (req, res, next) => {
    const sql = 'select * from producttypesales';
    sqlFn(sql, [], (err, data) => {
        if (err) {
            next(err);
            return;
        } else {
            res.send({ code: "00000", records: data });
        }
    })
}
)
router.get('/mapsales', (req, res, next) => {
    const sql = 'select * from mapsales';
    sqlFn(sql, [], (err, data) => {
        if (err) {
            next(err);
            return;
        } else {
            res.send({ code: "00000", records: data });
        }
    })
}
)
router.get('/salestop10', (req, res, next) => {
    const sql = 'select * from salestop10';
    sqlFn(sql, [], (err, data) => {
        if (err) {
            next(err);
            return;
        } else {
            res.send({ code: "00000", records: data });
        }
    })
}
)
router.get('/volumetop10', (req, res, next) => {
    const sql = 'select * from volumetop10';
    sqlFn(sql, [], (err, data) => {
        if (err) {
            next(err);
            return;
        } else {
            res.send({ code: "00000", records: data });
        }
    })
}
)
router.get('/salestrend', (req, res, next) => {
    const sql = 'select * from salestrend where type=?';
    sqlFn(sql, [req.query.type], (err, data) => {
        if (err) {
            next(err);
            return;
        } else {
            res.send({ code: "00000", records: data });
        }
    })
}
)
router.get('/hotwords', (req, res, next) => {
    const sql = 'select * from hotwords';
    sqlFn(sql, [], (err, data) => {
        if (err) {
            next(err);
            return;
        } else {
            res.send({ code: "00000", records: data });
        }
    })
}
)

module.exports = router;