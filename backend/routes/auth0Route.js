const express = require("express");
const router = express.Router();

router.route("/").get(function(req, res) {
    res.send(req.oidc.isAuthenticated() ? JSON.stringify(req, null, 2) : "not Logged in")
})

module.exports = router;