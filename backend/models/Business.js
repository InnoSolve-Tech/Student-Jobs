const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const BusinessSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  },
  {
    collection: "handyman", // Specify the collection name here
  },
);

// Hash the password before saving
BusinessSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

module.exports = mongoose.model("Business", BusinessSchema);
