const express = require('express')
const { createProduct, UpdateProduct, DeleteProduct, Readprodut } = require('../Controller/Controller')

const router = express.Router()


router.post("/job", createProduct)
router.put("/job/:id", UpdateProduct)
router.delete("/delete/:id", DeleteProduct)
router.get("/job", Readprodut)


module.exports = router