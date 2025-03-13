var express = require('express');
var router = express.Router();
let categoryModel = require('../schemas/category')
let {CreateErrorRes,
  CreateSuccessRes} = require('../utils/responseHandler')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let categorys = await categoryModel.find({
    isDeleted:false
  })
  CreateSuccessRes(res,categorys,200);
});
router.get('/:id', async function(req, res, next) {
  try {
    let category = await categoryModel.findOne({
      _id:req.params.id, isDeleted:false
    }
      
    )
    CreateSuccessRes(res,category,200);
  } catch (error) {
    next(error)
  }
  
});
router.post('/', async function(req, res, next) {
  try {
    let body = req.body
    let newcategory = new categoryModel({
      name:body.name,
      description:body.description,
    })
    await newcategory.save();
    CreateSuccessRes(res,newcategory,200);
  } catch (error) {
    next(error)
  }
});
router.put('/:id', async function(req, res, next) {
  let id = req.params.id;
  try {
    let body = req.body
    let updatedInfo = {};
    if(body.name){
      updatedInfo.name = body.name;
    }
    if(body.description){
      updatedInfo.description = body.description;
    }
    let updatecategory = await categoryModel.findByIdAndUpdate(
      id,updatedInfo,{new:true}
    )
    CreateSuccessRes(res,updatecategory,200);
  } catch (error) {
    next(error)
  }
});
router.delete('/:id', async function(req, res, next) {
  let id = req.params.id;
  try {
    let body = req.body
    let updatecategory = await categoryModel.findByIdAndUpdate(
      id,{
        isDeleted:true
      },{new:true}
    )
    CreateSuccessRes(res,updatecategory,200);
  } catch (error) {
    next(error)
  }
});

module.exports = router;