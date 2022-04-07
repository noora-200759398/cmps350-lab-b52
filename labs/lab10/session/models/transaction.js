import mongoose from "mongoose";

const schema = mongoose.Schema({
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
    type: String,
    required: true,
    ref: "Account",
  },
  // _id: { type: mongoose.Schema.ObjectId, select: false },
  // __v: { type: Number, select: false },
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
