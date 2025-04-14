const express = require('express');
const router = express.Router();
const sqlFn = require('../mysql')

router.post('/add', (req, res, next) => {

    const sql = 'insert into product values (null,?,?,?,?,?,?,?,?)'
    const { name, type, attrs, mainPic, morePic, isOfShelf, price, descs } = req.body
    const arr = [name, type, attrs, mainPic, morePic, isOfShelf, price, descs]
    sqlFn(sql, arr, (err, data) => {
        if (err) {
            next(err)
            return
        }
        if (data.affectedRows > 0) {
            res.send({ code: '00000', success: true, message: '添加成功' })
        }
    })
})

// router.get('/list', (req, res, next) => {
//     const { query } = req;
//     const { current = 1, pageSize = 3 } = query;
//     const sql = `select COUNT(*) as num from product where ${req.query.name ? 'locate(?,name)>0' : 'name is not null'} and ${req.query.type ? 'type=?' : 'type is not null'}`
//     sqlFn(sql, [req.query.name ? req.query.name : null, req.query.type ? req.query.type : null], (err, data) => {
//         if (err) {
//             next(err)
//             return
//         }
//         const total = data[0].num;
//         const sql = `select * from product where ${req.query.name ? 'locate(?,name)>0' : 'name is not null'} and ${req.query.type ? 'type=?' : 'type is not null'} limit ${(current - 1) * pageSize},${pageSize}`;
//         sqlFn(sql, [req.query.name ? req.query.name : null, req.query.type ? req.query.type : null], (err, data) => {
//             if (err) {
//                 next(err)
//                 return
//             } else {
//                 res.send({ code: "00000", records: data, pagination: { current, total, pageSize } });
//             }
//         })
//     })
// })
router.get('/list', (req, res, next) => {
    const { query } = req;
    const { current = 1, pageSize = 3 } = query;

    // 动态构建 WHERE 条件和参数数组
    const whereClauses = [];
    const params = [];

    if (query.name) {
        whereClauses.push('locate(?, name) > 0');
        params.push(query.name);
    } else {
        whereClauses.push('name is not null');
    }

    if (query.type) {
        whereClauses.push('type = ?');
        params.push(query.type);
    } else {
        whereClauses.push('type is not null');
    }

    const whereSql = whereClauses.join(' AND ');

    // 查询总数
    const countSql = `SELECT COUNT(*) as num FROM product WHERE ${whereSql}`;
    sqlFn(countSql, params, (err, data) => {
        if (err) return next(err);

        const total = data[0].num;

        // 查询分页数据
        const dataSql = `SELECT * FROM product WHERE ${whereSql} LIMIT ${(current - 1) * pageSize}, ${pageSize}`;
        sqlFn(dataSql, params, (err, data) => {
            if (err) return next(err);
            res.send({
                code: "00000",
                records: data,
                pagination: { current: Number(current), total, pageSize: Number(pageSize) }
            });
        });
    });
});
router.post('/delete', (req, res, next) => {
    const sql = 'delete from product where id=?'
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
    const sql = 'update product set name=?,type=?,attrs=?,mainPic=?,morePic=?,isOfShelf=?,price=?,descs=? where id=?'
    const { name, type, attrs, mainPic, morePic, isOfShelf, price, descs, id } = req.body
    const arr = [name, type, attrs, mainPic, morePic, isOfShelf, price, descs, id]
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

module.exports = router;