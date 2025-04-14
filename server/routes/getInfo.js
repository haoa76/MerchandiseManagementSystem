const express = require('express')
const router = express.Router()
const sqlFn = require('../mysql')

router.post('/getUserInfo', (req, res) => {
    const sql = 'select * from user where account=?'
    sqlFn(sql, [req.body.account], (err, data) => {
        if (err) {
            res.send({
                code: '-1',
                message: '获取用户名失败'
            })
        } else {
            res.send({
                code: '00000',
                data: data
            })
        }
    })
})
module.exports = router