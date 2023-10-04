const express = require("express");
const router = express.Router();
const cors = require("cors");

const con = require("../database");
const sql = require("../helper/sqlCommand.js");

router.use(cors());

router.get("/", async (req, res) => {
  const goods = await new Promise((resolve, reject) => {
    con.query("SELECT * FROM goods ", (err, rows) => {
      resolve(rows);
    });
  });

  if (!req.isAuthenticated()) {
    return res
      .send({
        page: "home",
        user: null,
        wallet: null,
        pagerequire: { goods: goods },
      })
      .status(200);
  }

  const user = await sql.getUser(req.user.username);
  if (user.isAdmin) {
    res.redirect("/admin");
  }
  const wallet = await sql.getWallet(user.walletId);
  res
    .send({
      user: user,
      wallet: wallet || null,
      total: req.cookies.total,
      page: "home",
      pagerequire: {
        goods: goods,
      },
    })
    .status(200);
});

router.post("/", async (req, res) => {
  res.redirect("/");
});

module.exports = router;
