const express = require('express');
const router = express.Router();
const dataJson = require('../../data/users')
/* GET home page. */
const db = require('../models/db')
const fs = require('fs')
router.post('/regist', (req, res, next) => {
  const now = new Date()
  const { id, username, name, password, dob} = req.body
    console.log((req.body))
  const query = ` INSERT INTO tbl_users( username, password, name, dob)
                  VALUES ('${username}', '${password}', '${name}','${dob}');`

  db.postgre
      .run(query)
      .then((rs) => {
        return res.status(200).json({
          code: 0
        })
      })
      .catch(()=>{
        return res.status(500).json({
          code: 1
        })
      })
});
router.post('/:id/update', (req, res, next) => {
  const now = new Date()
  const { id, username, name, password, dob} = req.body
  const query = ` UPDATE tbl_users
                  SET  username = '${username}', password = '${password}', name= '${name}', dob= '${dob}'
                  WHERE id = ${id};`

  db.postgre
      .run(query)
      .then((rs) => {
        return res.status(200).json({
          code: 0
        })
      })
      .catch(()=>{
        return res.status(500).json({
          code: 1
        })
      })
});
router.put('/:id/:password', (req, res, next) => {

  const { id, password} = req.body
  const query = ` UPDATE tbl_users
                  SET   password = '${password}'
                  WHERE id = ${id};`

  db.postgre
      .run(query)
      .then((rs) => {
        return res.status(200).json({
          code: 0
        })
      })
      .catch(()=>{
        return res.status(500).json({
          code: 1
        })
      })
});
router.get('/get-all', function(req, res, next) {

  const query = ` select * from tbl_users`

  db.postgre
      .run(query)
      .then((rs) => {
        if(rs.rows.length === 0){
          return res.status(500).json({
            code: 1
          })
        }

        return res.status(200).json({
          code: 0,
          data: rs.rows
        })
      })
      .catch(()=>{
        return res.status(500).json({
          code: 1
        })
      })

});

router.get('/:id', function(req, res, next) {

  const id1 = req.params.id

  const query = ` select * from tbl_users where id = ${id1}`

  db.postgre
      .run(query)
      .then((rs) => {
        if(rs.rows.length === 0){
          return res.status(500).json({
            code: 1
          })
        }
        return res.status(200).json({
          code: 0,
          data: rs.rows
        })
      })
      .catch(()=>{
        return res.status(500).json({
          code: 1
        })
      })

});


router.delete('/:id', function(req, res, next) {
  const id1 = req.params.id

  const query = ` delete from tbl_users where id = ${id1}`

  db.postgre
      .run(query)
      .then((rs) => {
        if(rs.rows.length === 0){
          return res.status(500).json({
            code: 1
          })
        }
        return res.status(200).json({
          code: 0
        })
      })
      .catch(()=>{
        return res.status(500).json({
          code: 1
        })
      })
});
module.exports = router;
