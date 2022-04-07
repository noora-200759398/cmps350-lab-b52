import mongoose from "mongoose";

const schema = mongoose.Schema({
  id: {
    type: String,
    required: [true, "id is a required field."],
    unique: true,
  },
  type: {
    type: String,
    enum: ["current", "savings"],
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  monthlyFee: {
    type: Number,
    min: 0,
  },
  minimumBalance: {
    type: Number,
    min: 0,
  },
  // _id: { type: mongoose.ObjectId, select: false },
  // __v: { type: Number, select: false },
});

// schema.set('toObject', {
//   transform: function(doc, ret) {
//     // ret.id = ret._id;
//     delete ret._id;
//     delete ret.__v;
//   }
// });

// schema.virtual("minBal").get(function() {
//   return this.type === "savings" ? 1000 : null;
// });
//
// schema.virtual("monFee").get(function() {
//   return this.type === "current" ? 15 : null;
// });

schema.virtual("wealthStatus").get(function() {
  if (this.balance >= 1e6 && this.balance < 1e7) {
    return "wealthy";
  }

  if (this.balance >= 1e7 && this.balance < 1e8) {
    return "super wealthy";
  }

  if (this.balance >= 1e8 && this.balance < 1e9) {
    return "extremely wealthy";
  }
});

schema.methods.deposit = function(amount) {
  this.balance += amount;
};

schema.methods.withdraw = function(amount) {
  this.balance -= amount;
};

export default mongoose.model("Account", schema);
