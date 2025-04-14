const express = require('express');
const router = express.Router();
const sqlFn = require('../mysql');
const remove = require('lodash/remove')

router.post('/add', (req, res, next) => {
    const sql = 'insert into menu values (null,?,?,?,?,?,?)'
    const { pid = -1, name, linkUrl, openType, isOfAdmin, icon } = req.body;
    const arr = [pid, name, linkUrl, openType, isOfAdmin, icon]
    sqlFn(sql, arr, (err, data) => {
        if (err) {
            next(err)
            return
        }
        if (data.affectedRows > 0) {
            res.send({ code: '00000', success: true })
        }
    })
})
router.get('/list', (req, res, next) => {
    const sql = 'select * from menu'
    sqlFn(sql, [], (err, data) => {
        if (err) {
            next(err)
            return
        }
        //遍历菜单数据，为每个菜单添加children属性，值为子菜单
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

        res.send({ code: '00000', record: getMenuTree(data) })
    })
})

router.get('/getpName', (req, res, next) => {
    const sql = 'select * from menu where id=?'
    sqlFn(sql, [req.query.id], (err, data) => {
        if (err) {
            next(err)
            return
        }
        res.send({ code: '00000', record: data[0] })
    })
})

router.post('/edit', (req, res, next) => {
    const sql = 'update menu set name=?,linkUrl=?,openType=?,isOfAdmin=?,icon=? where id=?'
    const { name, linkUrl, openType, isOfAdmin, icon, id } = req.body;
    const arr = [name, linkUrl, openType, isOfAdmin, icon, id]
    sqlFn(sql, arr, (err, data) => {
        if (err) {
            next(err)
            return
        }
        if (data.affectedRows > 0) {
            res.send({ code: '00000', success: true })
        }
    })
})

router.post('/delete', (req, res, next) => {
    const sql = 'select * from menu where pid=?'
    sqlFn(sql, [req.body.id], (err, data) => {
        if (err) {
            next(err)
            return
        }
        if (data && data.length > 0) {
            res.send({ code: '-1', message: '该菜单下存在子菜单，不能删除' })
        } else {
            const sql = 'delete from menu where id=?'
            sqlFn(sql, [req.body.id], (err, data) => {
                if (err) {
                    next(err)
                    return
                }
                if (data.affectedRows > 0) {
                    res.send({ code: '00000', success: true })
                }
            })
        }

    })
})

module.exports = router