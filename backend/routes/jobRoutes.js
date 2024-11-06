// routes/jobRoutes.js
const express = require("express");
const Job = require("../models/Job");
const Business = require("../models/Business");
const router = express.Router();
const auth = require("../middleware/auth");

router.use(auth);

// Create a job
router.post("/:businessId", async (req, res) => {
  try {
    const business = await Business.findById(req.params.businessId);
    if (!business) {
      return res.status(404).send({ message: "Business not found" });
    }
    const job = new Job({ ...req.body, createdBy: business._id });
    await job.save();
    business.jobs.push(job._id);
    await business.save();
    res.status(201).send(job);
  } catch (error) {
    res.status(400).send({ message: "Error creating job", error });
  }
});

// Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().populate("createdBy").populate("applicants");
    res.status(200).send(jobs);
  } catch (error) {
    res.status(400).send({ message: "Error fetching jobs", error });
  }
});

// Get a job by ID
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("createdBy")
      .populate("applicants");
    if (!job) {
      return res.status(404).send({ message: "Job not found" });
    }
    res.status(200).send(job);
  } catch (error) {
    res.status(400).send({ message: "Error fetching job", error });
  }
});

// Update a job by ID
router.put("/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!job) {
      return res.status(404).send({ message: "Job not found" });
    }
    res.status(200).send(job);
  } catch (error) {
    res.status(400).send({ message: "Error updating job", error });
  }
});

// Delete a job by ID
router.delete("/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).send({ message: "Job not found" });
    }
    res.status(200).send({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(400).send({ message: "Error deleting job", error });
  }
});

module.exports = router;
