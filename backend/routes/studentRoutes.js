const express = require("express");
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const router = express.Router();

// Student registration
router.post("/register", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send({ message: "Error creating student", error });
  }
});

// Student login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ email });
    if (!student || !(await bcrypt.compare(password, student.password))) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET);
    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send({ message: "Error logging in", error });
  }
});

router.use(auth);

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().populate("appliedJobs");
    res.status(200).send(students);
  } catch (error) {
    res.status(400).send({ message: "Error fetching students", error });
  }
});

// Get a student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate(
      "appliedJobs",
    );
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    res.status(200).send(student);
  } catch (error) {
    res.status(400).send({ message: "Error fetching student", error });
  }
});

// Update a student by ID
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    res.status(200).send(student);
  } catch (error) {
    res.status(400).send({ message: "Error updating student", error });
  }
});

// Delete a student by ID
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    res.status(200).send({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(400).send({ message: "Error deleting student", error });
  }
});

// Student applies for a job
router.post("/:studentId/apply/:jobId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    const job = await Job.findById(req.params.jobId);

    if (!student || !job) {
      return res.status(404).send({ message: "Student or Job not found" });
    }

    if (job.applicants.includes(student._id)) {
      return res
        .status(400)
        .send({ message: "Student has already applied for this job" });
    }

    job.applicants.push(student._id);
    student.appliedJobs.push(job._id);

    await job.save();
    await student.save();

    res.status(200).send({ message: "Application successful", job });
  } catch (error) {
    res.status(400).send({ message: "Error applying for job", error });
  }
});

module.exports = router;
