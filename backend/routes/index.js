const express = require('express');
const router = express.Router();
const dataJson = require('../../data/comments')
/* GET home page. */


router.get('/:id', function(req, res, next) {

  const idArr = parseInt(req.params.id)
  const getData = dataJson
  const getDataById = getData.find(e => {
    if(e.id === idArr) {
      return e
    }
  })
  console.log(getDataById)
  if(!getDataById){
    return res.status(500).json({
      code: 1
    })
  }
  return res.status(200).json({
    data: getDataById,
    code: 0
  })
});

module.exports = router;
