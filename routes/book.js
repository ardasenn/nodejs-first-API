const express = require("express");
const router = express.Router();
const ROLES = require("../config/roles");
const bookController = require("../controllers/bookController");
const verifyRoles = require("../middleware/verifyRoles");

router
  .route("/create")
  .post(verifyRoles(ROLES.User), bookController.createBook);
router.route("/update").put(bookController.updateBook);
router
  .route("/delete")
  .delete(verifyRoles(ROLES.Admin), bookController.deleteBook);
router.route("/:id").get(bookController.getById);
router.route("/").get(bookController.getAll);

module.exports = router;
