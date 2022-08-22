const express = require("express");

const { getLoginPage } = require("../controllers");
const { searchProfile } = require("../controllers/explore");
const { getMainPage } = require("../controllers/main");

const router = express.Router();

router.get("/", getLoginPage);
router.get("/search/profile", searchProfile);
router.get('/:page', getMainPage);
module.exports = router;
