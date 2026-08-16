import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import StudentTable from "../components/StudentTable";
import DeleteModal from "../components/DeleteModal";

import {
  getStudents,
  deleteStudent
} from "../services/studentApi";

const Home = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [studentToDelete, setStudentToDelete] = useState(null);

  const loadStudents = async () => {
    try {
      setLoading(true);

      const data = await getStudents();

      setStudents(data);
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteStudent(studentToDelete);

      setStudents((currentStudents) =>
        currentStudents.filter(
          (student) => student._id !== studentToDelete
        )
      );

      setStudentToDelete(null);
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return <div className="page">Loading students...</div>;
  }

  if (error) {
    return <div className="page">{error}</div>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Student List</h1>

        <Link to="/add-student" className="add-button">
          + Add Student
        </Link>
      </div>

      {students.length === 0 ? (
        <div className="empty-state">
          <p>No students found.</p>

          <Link to="/add-student">
            Add your first student
          </Link>
        </div>
      ) : (
        <StudentTable
          students={students}
          onDelete={setStudentToDelete}
        />
      )}

      {studentToDelete && (
        <DeleteModal
          onCancel={() => setStudentToDelete(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default Home;