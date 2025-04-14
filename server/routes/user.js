const express = require('express');
const router = express.Router();
const sqlFn = require('../mysql')
const remove  = require('lodash/remove')
const {createPassword} = require('../utils/index')

router.post('/add', (req, res, next) => {
    const sql = 'select * from user where locate(?,account)>0'
    sqlFn(sql, req.body.account, (err, data) => {
        if (err) {
            next(err)
            return
        }
        if (data && data.length) {
            res.send({ code: '-1', message: '该账号已存在' })
        } else {
            const sql = 'insert into user values (null,?,?,?,?,?,?,?,?)'
            const { name, account, area, tel, email, picture ,relateMenu} = req.body
            const arr = [name, account, area, tel, email, picture,relateMenu,createPassword(8)]
            sqlFn(sql, arr, (err, data) => {
                if (err) {
                    next(err)
                    return
                }
                if (data.affectedRows > 0) {
                    res.send({ code: '00000', success: true, message: '添加成功' })
                }
            })
        }
    })
})

router.get('/list', (req, res, next) => {
    const { query } = req;
    const { current = 1, pageSize = 5 } = query;
    const sql = `select COUNT(*) as num from user where account!='1169740905' ${req.query.name ? 'and locate(?,name)>0' : ''}`

    sqlFn(sql, [req.query.name], (err, data) => {
        if (err) {
            next(err)
            return
        }
        const total = data[0].num;
        const sql = `select * from user where account!='1169740905' ${req.query.name ? 'and locate(?,name)>0' : ''} limit ${(current - 1) * pageSize},${pageSize}`;
        sqlFn(sql, [req.query.name], (err, data) => {
            if (err) {
                next(err)
                return
            } else {
                res.send({ code: "00000", records: data, pagination: { current, total, pageSize } });
            }
        })
    })
})

router.post('/delete', (req, res, next) => {
    const sql = 'delete from user where id=?'
    sqlFn(sql, [req.body.id], (err, data) => {
        if (err) {
            next(err)
            return
        }
        if (data.affectedRows > 0) {
            res.send({ code: '00000', success: true, message: '删除成功' })
        }
    })
})

router.post('/edit', (req, res, next) => {
    const sql = 'update user set name=?,account=?,area=?,tel=?,email=?,picture=? where id=?'
    const { name, account, area, tel, email, picture, id } = req.body
    const arr = [name, account, area, tel, email, picture, id]
    sqlFn(sql, arr, (err, data) => {
        if (err) {
            next(err)
            return
        }
        if (data.affectedRows > 0) {
            res.send({ code: '00000', success: true, message: '修改成功' })
        } else {
            res.send({ code: '-1', success: false, message: '修改失败' })
        }
    })
})

router.get('/relateMenu', (req, res, next) => {
    const sql = 'select * from menu where isOfAdmin=2'
    sqlFn(sql, [], (err, data) => {
        if (err) {
            next(err)
            return
        } else {
            const getMenuTree = (menus = []) => {
                menus.map(item => {
                    menus.map(menu => {
                        if (item.pid === menu.id) {
                            menu.children = menu.children || []
                            menu.children.push(item)
                        }
                    })
                })
                remove(menus, (item) => item.pid !== -1)
                return menus
            }
            res.send({ code: "00000", records: getMenuTree(data) });
        }
    })
})

router.post('/relate', (req, res, next) => {
    const sql = 'update user set relateMenu=? where id=?'
    sqlFn(sql, [req.body.relateMenu, req.body.id], (err, data) => {
        if (err) {
            next(err)
            return
        }
        if (data.affectedRows > 0) {
            res.send({ code: '00000', success: true, message: '修改成功' })
        } else {
            res.send({ code: '-1', success: false, message: '修改失败' })
        }
    })
})

module.exports = router;