const express = require('express');
const router = express.Router();
const URL = require('url');
const db = require('../config/mysql');
let response = {}

/* GET users listing. */
router.get('/Login', function (req, res, next) {
  let params = URL.parse(req.url, true).query;
  let username = params.username;
  let password = params.password;
  let sql = `select password from user where username = ${username}`;
  db.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return
    } else if (result.length > 0) {
      if (result[0].password == password) {
        response = {
          status: 1,
          data: {
            username: username,
            loginFlag: true,
          }
        };
        res.send(JSON.stringify(response));
      } else {
        response = {
          status: 0,
          msg: '密码错误'
        };
        res.send(JSON.stringify(response));
      }


    } else {
      response = {
        status: 0,
        msg: '用户名不存在'
      };
      res.send(JSON.stringify(response));
    }
  });
});

router.get('/Register', function (req, res, next) {
  let params = URL.parse(req.url, true).query;
  let username = params.username;
  let password = params.password; 
  let sql1 = `select * from user where username = ${username}`;
  let sql2 = `insert into user (username,password) values(${username},${password})`;
  db.query(sql1, function (err, result) {
    if (err) {
      throw err;
    } else {
      if (result.length > 0) {
        response = {
          status: 0,
          msg: '用户名已存在'
        };
        res.send(JSON.stringify(response));
      } else {
        db.query(sql2, function (err, result) {
          console.log(sql2);
          if (err) {
            response = {
              status: 0,
              msg: '注册失败'
            };
            res.send(JSON.stringify(response));
          } else {
            response = {
              status: 1,
              msg: '注册成功'
            };
            res.send(JSON.stringify(response));
          }
        })
      }
    }
  })

});

module.exports = router;