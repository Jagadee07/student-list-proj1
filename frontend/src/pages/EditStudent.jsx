import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getStudent,
  updateStudent
} from "../services/studentApi";
import { uploadStudentPhoto } from "../services/cloudinaryApi";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photoFile, setPhotoFile] = useState(null);
const [photoPreview, setPhotoPreview] = useState(null);

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
    address: "",
   photo: "",
photoPublicId: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const student = await getStudent(id);

        setFormData({
          registrationNumber: student.registrationNumber || "",
          name: student.name || "",
          branch: student.branch || "",
          dateOfBirth: student.dateOfBirth || "",
          gender: student.gender || "",
          bloodGroup: student.bloodGroup || "",
          grade: student.grade || "",
          section: student.section || "",
          CGPA: student.CGPA || "",
          fatherName: student.fatherName || "",
          motherName: student.motherName || "",
          phone: student.phone || "",
          email: student.email || "",
          address: student.address || "",
          photo: student.photo || "",
photoPublicId: student.photoPublicId || ""
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadStudent();
  }, [id]);

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
    setSaving(true);
    setError("");

    let photoUrl = formData.photo;
let photoPublicId = formData.photoPublicId;

if (photoFile) {
  const uploadedPhoto = await uploadStudentPhoto(photoFile);

  photoUrl = uploadedPhoto.url;
  photoPublicId = uploadedPhoto.publicId;
}

    const updatedStudent = {
  ...formData,
  photo: photoUrl,
  photoPublicId: photoPublicId
};

    await updateStudent(id, updatedStudent);

    navigate(`/students/${id}`);
  } catch (error) {
    setError(error.message);
  } finally {
    setSaving(false);
  }
};

  return (
    <div className="page">
      <div className="form-header">
        <button onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1>Edit Student</h1>
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
      {/* PHOTO */}

<div className="photo-section">
  <div className="photo-preview">
    {photoPreview ? (
      <img
        src={photoPreview}
        alt="New student preview"
      />
    ) : formData.photo ? (
      <img
        src={formData.photo}
        alt={formData.name}
      />
    ) : (
      <span>No Photo</span>
    )}
  </div>

  <label className="photo-button">
    Change Photo

    <input
      type="file"
      accept="image/*"
      onChange={handlePhotoChange}
      hidden
    />
  </label>

  <p className="photo-help">
    Choose a new photo to replace the current one.
  </p>
</div>

        {/* STUDENT INFORMATION */}

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
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
          >
            {saving ? "Saving..." : "Update Student"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;