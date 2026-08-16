const Student = require("../models/Student");
const cloudinary = require("../config/cloudinary");

const createStudent = async (req, res) => {
  try {
    const studentCount = await Student.countDocuments();

    if (studentCount >= 30) {
      return res.status(400).json({
        message: "Your student list is full. Delete a student to add more."
      });
    }

    const student = await Student.create(req.body);

    res.status(201).json({
      message: "Student created successfully",
      student
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Registration number already exists. Please use a different one."
      });
    }

    res.status(500).json({
      message: "Failed to create student",
      error: error.message
    });
  }
};
const getStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get students",
      error: error.message
    });
  }
};

const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get student",
      error: error.message
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update student",
      error: error.message
    });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    // Delete the student's photo from Cloudinary
    if (student.photoPublicId) {
      try {
        await cloudinary.uploader.destroy(
          student.photoPublicId,
          {
            resource_type: "image"
          }
        );

        console.log("Student photo deleted from Cloudinary");
      } catch (cloudinaryError) {
        console.error(
          "Cloudinary deletion failed:",
          cloudinaryError.message
        );
      }
    }

    // Delete the student from MongoDB
    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Student and photo deleted successfully",
      student
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete student",
      error: error.message
    });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent
};