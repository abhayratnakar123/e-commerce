
const express = require("express");
const fetchuserRole = require("../middleware/fetchuserRole");
const { addProduct,getAllProducts,getAProduct,deleteProduct,editProduct } = require("../controllers/productController");

const router = express.Router();

router.get("/",getAllProducts)
router.delete("/delete/:id",fetchuserRole, deleteProduct);
router.post("/add",fetchuserRole,addProduct)
router.get("/:id",getAProduct)
router.put("/edit/:id",fetchuserRole,editProduct)



module.exports=router;