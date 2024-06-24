const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/products.controller")
router.get("/" , controller.index);
router.patch("/change-status/:id" , controller.changeStatusSingle);
router.patch("/change-multiStatus" , controller.changeStatusAll);
router.patch("/delete/:id" , controller.deleteProduct);
router.patch("/delete-multiProduct",controller.deleteMultiProduct)
router.patch("/change-position/:id" ,controller.changePosition)


router.get("/trash",controller.trash)
router.delete("/trash/permanentlyDelete/:id",controller.permanentlyDelete)
router.patch("/trash/restore/:id",controller.restore)
router.patch("/trash/deleteAndRestore",controller.deleteAndRestore)
module.exports = router;