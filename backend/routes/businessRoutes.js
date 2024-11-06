const express = require("express");
const Business = require("../models/Business");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const router = express.Router();

// Business registration
router.post("/register", async (req, res) => {
  try {
    const business = new Business(req.body);
    await business.save();
    res.status(201).send(business);
  } catch (error) {
    res.status(400).send({ message: "Error creating business", error });
  }
});

// Business login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const business = await Business.findOne({ email });
    if (!business || !(await bcrypt.compare(password, business.password))) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: business._id }, process.env.JWT_SECRET);
    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send({ message: "Error logging in", error });
  }
});

router.use(auth);

// Get all businesses
router.get("/", async (req, res) => {
  try {
    const businesses = await Business.find().populate("jobs");
    res.status(200).send(businesses);
  } catch (error) {
    res.status(400).send({ message: "Error fetching businesses", error });
  }
});

// Get a business by ID
router.get("/:id", async (req, res) => {
  try {
    const business = await Business.findById(req.params.id).populate("jobs");
    if (!business) {
      return res.status(404).send({ message: "Business not found" });
    }
    res.status(200).send(business);
  } catch (error) {
    res.status(400).send({ message: "Error fetching business", error });
  }
});

// Update a business by ID
router.put("/:id", async (req, res) => {
  try {
    const business = await Business.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!business) {
      return res.status(404).send({ message: "Business not found" });
    }
    res.status(200).send(business);
  } catch (error) {
    res.status(400).send({ message: "Error updating business", error });
  }
});

// Delete a business by ID
router.delete("/:id", async (req, res) => {
  try {
    const business = await Business.findByIdAndDelete(req.params.id);
    if (!business) {
      return res.status(404).send({ message: "Business not found" });
    }
    res.status(200).send({ message: "Business deleted successfully" });
  } catch (error) {
    res.status(400).send({ message: "Error deleting business", error });
  }
});

module.exports = router;
