const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: [String], // Array of strings for multiple requirements
      required: false, // Optional field
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    collection: "handyman", // Specify the collection name here
  },
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
