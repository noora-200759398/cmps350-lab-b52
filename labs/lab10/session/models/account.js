 import mongoose from "mongoose";

 const schema = new mongoose.Schema({
     id: {
         type: Number,
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
         min: 0,
         required: true,
     },
     monthlyFee: {
         type: Number,
         min: 0,
     },
     minimumBalance: {
         type: Number,
         min: 0,
     },
     date: {
         type: Date,
         default: Date.now,
     },
     // }, {
     //    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
     //    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
 });

 //  schema.virtual("minBalance").get(function() {
 //     return this.type === "savings" ? 1000 : null;
 //  });
 //
 //  schema.virtual("monthlyFee").get(function() {
 //     return this.type === "current" ? 15 : null;
 //  });

 schema.virtual("wealth").get(function() {
     if (this.balance >= 1e6 && this.balance < 1e7) {
         return "rich";
     } else if (this.balance >= 1e7 && this.balance < 1e8) {
         return "super rich";
     } else {
         return "";
     }
 });

 schema.virtual("vvvip").get(function() {
     return this.balance >= 1e12;
 });

 schema.methods.deposit = function(amount) {
     this.balance += amount;
 }

 schema.methods.withdraw = function(amount) {
     this.balance -= amount;
 }

 export default mongoose.model("Account", schema);
