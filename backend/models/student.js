const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    branch: {
      type: String,
      required: true,
      trim: true
    },

    dateOfBirth: {
      type: String
    },

    gender: {
      type: String
    },

    bloodGroup: {
      type: String
    },

    grade: {
      type: String
    },

    section: {
      type: String
    },

    CGPA: {
      type: String
    },

    fatherName: {
      type: String
    },

    motherName: {
      type: String
    },
    phone: {
  type: String
},

    photo: {
      type: String
    },

    photoPublicId: {
      type: String
    },

    email: {
      type: String
    },

    address: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Student", studentSchema);