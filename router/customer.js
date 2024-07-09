const { customerController } = require("../controllers");

const router = require("express").Router();

router.get("/create_customer", customerController.getCustomerById);
router.post("/create_customer", customerController.postCreateCustomer);

module.exports = router;
