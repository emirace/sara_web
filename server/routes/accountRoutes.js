import express from "express";
import expressAsyncHandler from "express-async-handler";
import Account from "../models/accountModel.js";
import { isAdmin, isAuth, slugify } from "../utils.js";
const accountRouter = express.Router();

// get all account
accountRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const accounts = await Account.findOne({ type: "Admin" });
    res.send({
      success: true,
      message: "Sucessfully",
      accounts,
    });
  })
);

// get a account

accountRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const account = await Account.findById(req.params.id);
    if (account) {
      res.send({
        success: true,
        message: "Sucessfully",
        account,
      });
    } else {
      res.send({
        success: false,
        message: "Account not Found",
      });
    }
  })
);

// upload a account

accountRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const prevAccount = await Account.findOne({ type: "Admin" });
    if (prevAccount) {
      prevAccount.accountName = req.body.accountName;
      prevAccount.accountNumber = req.body.accountNumber;
      prevAccount.bankName = req.body.bankName;
      const newAccount = await prevAccount.save();
      res.send({
        success: true,
        message: "Account Created Sucessfully",
        account: newAccount,
      });
    } else {
      const account = new Account({
        accountName: req.body.accountName,
        accountNumber: req.body.accountNumber,
        bankName: req.body.bankName,
      });
      const newAccount = await account.save();
      res.send({
        success: true,
        message: "Account Created Sucessfully",
        account: newAccount,
      });
    }
  })
);

// update a account

accountRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const account = await Account.findById(req.params.id);
    if (account) {
      account.accountName = req.body.accountName || account.accountName;
      account.accountNumber = req.body.accountNumber || account.accountNumber;
      account.bankName = req.body.bankName || account.bankName;

      const newAccount = await account.save();

      res.send({
        success: true,
        message: "Account Updated Sucessfully",
        account: newAccount,
      });
    } else {
      res.send({
        success: false,
        message: "Account not Found",
      });
    }
  })
);

accountRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const account = await Account.findById(req.params.id);
    if (account) {
      await account.remove();
      res.send({
        success: true,
        message: "Account deleted Sucessfully",
      });
    } else {
      res.send({
        success: false,
        message: "Account not Found",
      });
    }
  })
);

export default accountRouter;
