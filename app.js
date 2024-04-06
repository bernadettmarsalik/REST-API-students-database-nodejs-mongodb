const express = require("express");
const app = express();
const connectDB = require("./config/db");
const Student = require("./models/studentModel");

// INITIALIZE APP

connectDB();

app.use(express.json());

// Server start
app.get("/", (req, res) => {
  res.status(200).json({ message: "API server is running...", version: 1 });
});

const port = 3000;

app.listen(port, console.log(`Server started on port ${port}`));

// API ENDPOINTS

// Display all students
app.get("/students", async (req, res) => {
  const page = parseInt(req.query.p) || 1;
  const studentsPerPage = 5;

  try {
    const totalCount = await Student.countDocuments({});
    const totalPages = Math.ceil(totalCount / studentsPerPage);

    const students = await Student.find({})
      .skip((page - 1) * studentsPerPage)
      .limit(studentsPerPage);

    res.status(200).json({ students, totalPages, currentPage: page });
  } catch (error) {
    res.status(500).json({ error: "Error getting students", message: error });
  }
});

// Display students using ID
app.get("/students/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) {
      return res
        .status(404)
        .json({ error: `Student with ID ${req.params.studentId} not found` });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      error: `Error getting student with ID ${req.params.studentId}`,
      message: error,
    });
  }
});

// Create new student
app.post("/students", async (req, res) => {
  try {
    await Student.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      dob: req.body.dob,
      email: req.body.email,
      phone: req.body.phone,
    });
    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error adding student", message: error });
  }
});

// Edit student by ID with put
app.put("/students/:studentId", async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.studentId, {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      dob: req.body.dob,
      email: req.body.email,
      phone: req.body.phone,
    });
    res.status(200).json({ message: "Student updated" });
  } catch (error) {
    res.status(500).json({
      error: `Error updating student with ID ${req.params.studentId}`,
      message: error,
    });
  }
});

// Edit student by ID with patch
app.patch("/students/:studentId", async (req, res) => {
  let updates = req.body;
  try {
    await Student.findByIdAndUpdate(req.params.studentId, { $set: updates });
    res
      .status(200)
      .json({ message: `Student with ID ${req.params.studentId} updated` });
  } catch (error) {
    res.status(500).json({
      error: `Error updating student with ID ${req.params.studentId}`,
      message: error,
    });
  }
});

// Delete student by ID
app.delete("/students/:studentId", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId);
    res
      .status(200)
      .json({ message: `Student with ID ${req.params.studentId} deleted` });
  } catch (error) {
    res.status(500).json({
      error: `Error deleting student with ID ${req.params.studentId}`,
      message: error,
    });
  }
});
