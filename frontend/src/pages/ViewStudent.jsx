import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getStudent } from "../services/studentApi";

const ViewStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const data = await getStudent(id);

        setStudent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadStudent();
  }, [id]);

  if (loading) {
    return <div className="page">Loading student...</div>;
  }

  if (error) {
    return <div className="page">{error}</div>;
  }

  if (!student) {
    return <div className="page">Student not found.</div>;
  }

  return (
    <div className="page">
      <div className="details-header">
        <button onClick={() => navigate("/")}>
          ← Back
        </button>

        <h1>Student Details</h1>

        <Link to={`/students/${student._id}/edit`}>
          Edit Student
        </Link>
      </div>

      <div className="student-details">
        <div className="details-photo">
          {student.photo ? (
            <img
              src={student.photo}
              alt={student.name}
            />
          ) : (
            <div className="no-photo-large">
              No Photo
            </div>
          )}
        </div>

        <h2>{student.name}</h2>

        <p className="student-id">
          {student.registrationNumber}
        </p>

        <div className="details-grid">
          <div>
            <span>Branch</span>
            <strong>{student.branch || "N/A"}</strong>
          </div>

          <div>
            <span>Date of Birth</span>
            <strong>{student.dateOfBirth || "N/A"}</strong>
          </div>

          <div>
            <span>Gender</span>
            <strong>{student.gender || "N/A"}</strong>
          </div>

          <div>
            <span>Blood Group</span>
            <strong>{student.bloodGroup || "N/A"}</strong>
          </div>

          <div>
            <span>Grade</span>
            <strong>{student.grade || "N/A"}</strong>
          </div>

          <div>
            <span>Section</span>
            <strong>{student.section || "N/A"}</strong>
          </div>

          <div>
            <span>CGPA</span>
            <strong>{student.CGPA || "N/A"}</strong>
          </div>

          <div>
            <span>Father Name</span>
            <strong>{student.fatherName || "N/A"}</strong>
          </div>

          <div>
            <span>Mother Name</span>
            <strong>{student.motherName || "N/A"}</strong>
          </div>

          <div>
            <span>Phone</span>
            <strong>{student.phone || "N/A"}</strong>
          </div>

          <div>
            <span>Email</span>
            <strong>{student.email || "N/A"}</strong>
          </div>

          <div className="address-field">
            <span>Address</span>
            <strong>{student.address || "N/A"}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;