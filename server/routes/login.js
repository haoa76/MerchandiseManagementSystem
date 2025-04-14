const express = require('express');
const router = express.Router();
const sqlFn = require('../mysql')
const CryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
const {jwtSecret}= require('../config')

router.post('/login', (req, res) => {
    const sql = 'select * from user where account=? and password=?'
    const password = CryptoJs.AES.decrypt(req.body.password, '12345678').toString(CryptoJs.enc.Utf8)
    sqlFn(sql, [req.body.account, password], (err, data) => {
        if (err) {
            res.send({
                error: err,
                code: '-1',
                message: '登陆失败,请检查网络设置'
            })
        } else {
            if (data && data.length > 0) {
                const token = jwt.sign({
                    account: data[0].account,
                }, jwtSecret)
                res.send({
                    code: '00000',
                    message: '登陆成功',
                    token,
                    data: data
                })
            } else {
                res.send({
                    code: '-1',
                    message: '账号或密码错误'
                })
            }
        }
    })
})

module.exports = router;