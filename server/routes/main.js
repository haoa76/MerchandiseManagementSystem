const express = require('express');
const router = express.Router();
const sqlFn = require('../mysql');
const remove = require('lodash/remove')

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

router.get('/list', (req, res, next) => {
    if (req.authData.account === '1169740905') {
        const sql = 'select * from menu'
        sqlFn(sql, [], (err, data) => {
            if (err) {
                next(err)
                return
            }
            res.send({ code: '00000', record: getMenuTree(data) })
        })
        return
    }
    const sql = 'select * from user where account=?'
    sqlFn(sql, [req.authData.account], (err, data) => {
        if (err) {
            next(err)
            return
        }
        if (data && data.length > 0) {
            if (data[0].relateMenu === '' || data[0].relateMenu === null) {
                res.send({ code: '00000', record: getMenuTree([]), message: '您暂未被设置权限' })
                return
            }
            let sql = 'select * from menu where '
            const menusId = (data[0].relateMenu || '').split(',')
            menusId.map((item, index) => {
                if (index === 0) {
                    sql += 'id=' + item
                } else {
                    sql += ' or id=' + item
                }
            })
            sqlFn(sql, (err, data) => {
                if (err) {
                    next(err)
                    return
                }
                res.send({ code: '00000', record: getMenuTree(data) })
            })
        } else {
            res.send({ code: '00000', record: getMenuTree([]), message: '请先登录' })
        }
    })
})
module.exports = router
