const express = require("express");
const router = express.Router();

const sql = require("../helper/sqlCommand.js");

router.get("/", async (req, res) => {
    if (!req.isAuthenticated()) {
      res.redirect('/login')
      return
    }
    const user = await sql.getUser(req.user.username)
    if(user.isAdmin){
      res.redirect('/admin')
    }
    const wallet = await sql.getWallet(user.walletId)
    res.render("page", 
    {
      user: user,
      wallet: wallet||null,
      total: req.cookies.total,
      page: 'money',
      pagerequire: {    
        wallet: wallet||null,
      }
    })
  });
  
  router.get("/add", async (req, res) => {
    const user = await sql.getUser(req.user.username)
    const wallet = await sql.getWallet(user.walletId)
    const updatedMoney = wallet.money + 100;
    await sql.queryPromise("UPDATE wallets SET money = ? WHERE walletId = ?",[updatedMoney,wallet.walletId])
    res.redirect("/money");
  });
  
  router.get("/transfer", async (req, res) => {
    const user = await sql.getUser(req.user.username)
    const wallet = await sql.getWallet(user.walletId)
    const updatedMoney = wallet.money + 20;
    const updatedPoint = wallet.point - 100;
    if (wallet.point >= 100) {
      await sql.queryPromise("UPDATE wallets SET money = ?,point = ? WHERE walletId = ?",[updatedMoney,updatedPoint,wallet.walletId])
      res.redirect("/money");
    } else {
      res.redirect("/money");
    }
  });

module.exports = router;