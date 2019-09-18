const express = require('express');
const router = express.Router();
const URL = require('url');
const dbConnect = require('../config/mysql');
router.get('/Register', function (req, res, next) {
    let params = URL.parse(req.url, true).query;
  
    let sql = "SELECT password FROM user where username ='" + username + "'";
    let response = {
      status: 1,
      data: '正在注册',
  
    };
  
  
    res.send(JSON.stringify(response));
  
  });

  

module.exports = router;