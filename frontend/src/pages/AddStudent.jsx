import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStudent } from "../services/studentApi";
import { uploadStudentPhoto } from "../services/cloudinaryApi";

const AddStudent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    registrationNumber: "",
    name: "",
    branch: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    grade: "",
    section: "",
    CGPA: "",
    fatherName: "",
    motherName: "",
    phone: "",
    email: "",
    address: ""
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Photo must be smaller than 10 MB.");
      return;
    }

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setError("");
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    setError("");
    setSubmitting(true);

    let photoUrl = "";
let photoPublicId = "";

if (photoFile) {
  const uploadedPhoto = await uploadStudentPhoto(photoFile);

  photoUrl = uploadedPhoto.url;
  photoPublicId = uploadedPhoto.publicId;
}

const studentData = {
  ...formData,
  photo: photoUrl,
  photoPublicId
};

    console.log("Sending student:", studentData);

    await createStudent(studentData);

    navigate("/");
  } catch (error) {
    console.error(error);
    setError(error.message);
  } finally {
    setSubmitting(false);
  }
};  return (
    <div className="page">
      <div className="form-header">
        <h1>Add Student</h1>
      </div>

      {error && (
        <p className="form-error">
          {error}
        </p>
      )}

      <form
        className="student-form"
        onSubmit={handleSubmit}
      >
        {/* PHOTO FIRST */}

        <div className="photo-section">
          <div className="photo-preview">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Student preview"
              />
            ) : (
              <span>No Photo</span>
            )}
          </div>

          <label className="photo-button">
            Choose Photo

            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              hidden
            />
          </label>

          <p className="photo-help">
            JPG, PNG or WebP. Maximum 10 MB.
          </p>
        </div>

        {/* BASIC INFORMATION */}

        <div className="form-grid">
          <div className="form-group">
            <label>Registration Number *</label>

            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Name *</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Branch *</label>

            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>

            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Gender</label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Blood Group</label>

            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div className="form-group">
            <label>Grade</label>

            <input
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Section</label>

            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>CGPA</label>

            <input
              type="text"
              name="CGPA"
              value={formData.CGPA}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Father Name</label>

            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Mother Name</label>

            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label>Address</label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="4"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>

          <button type="submit" disabled={submitting}>
            {submitting ? "Adding Student..." : "Add Student"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;