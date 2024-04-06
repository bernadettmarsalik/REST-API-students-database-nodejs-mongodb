const express = require("express");
const app = express();
const connectDB = require("./config/db");
const Student = require("./models/studentModel");

connectDB();

app.use(express.json());

// Server start
app.get("/", (req, res) => {
  res.json({ msg: "API server is running...", version: 1 });
});

const port = 3000;

app.listen(port, console.log(`Server started on port ${port}`));

// Display all students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find({});
    res.json(students);
  } catch (error) {
    res.json("Error getting students" + error);
  }
});

// Display students using ID
app.get("/students/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    res.json(student);
  } catch (error) {
    res.json(`Error getting student with ID ${req.params.studentId}` + error);
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
    res.json({ msg: "Student added succesfully" });
  } catch (error) {
    res.json("Error adding student" + error);
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
    res.json({ msg: "Student updated" });
  } catch (error) {
    res.json(`Error updating student with ID ${req.params.studentId}` + error);
  }
});

// Edit student by ID with patch
app.patch("/students/:studentId", async (req, res) => {
  let updates = req.body;
  try {
    await Student.findByIdAndUpdate(req.params.studentId, { $set: updates });
    res.json({ msg: `Student with ID ${req.params.studentId} updated` });
  } catch (error) {
    res.json(`Error updating student with ID ${req.params.studentId}` + error);
  }
});

// Delete student by ID
app.delete("/students/:studentId", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId);
    res.json({ msg: `Student with ID ${req.params.studentId} deleted` });
  } catch (error) {
    res.json(`Error deleting student with ID ${req.params.studentId}` + error);
  }
});
