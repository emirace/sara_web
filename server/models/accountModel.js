import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    accountName: { type: String, require: true },
    accountNumber: { type: Number, require: true },
    bankName: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account", accountSchema);
export default Account;
