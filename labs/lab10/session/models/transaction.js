import mongoose from "mongoose";

const schema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["deposit", "withdraw"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Account",
  },
  // _id: { type: mongoose.Schema.ObjectId, select: false },
  // __v: { type: Number, select: false },
  // }, {
  //   toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  //   toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});

// schema.set('toObject', {
//   transform: function(doc, ret) {
//     // ret.id = ret._id;
//     delete ret._id;
//     delete ret.__v;
//   }
// });

schema.methods.execute = function(account) {
  if (this.type === "deposit") {
    account.deposit(this.amount);
  } else if (this.type === "withdraw") {
    account.withdraw(this.amount);
  }
};

export default mongoose.model("Transaction", schema);
