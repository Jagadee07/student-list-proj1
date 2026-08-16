import { Link } from "react-router-dom";

const StudentTable = ({ students, onDelete }) => {
  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>Photo</th>
          <th>Registration Number</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {students.map((student) => (
          <tr key={student._id}>
            <td>
              {student.photo ? (
                <img
                  src={student.photo}
                  alt={student.name}
                  className="student-avatar"
                />
              ) : (
                <div className="student-avatar no-photo">
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
  </svg>
</div>
              )}
            </td>

            <td>{student.registrationNumber}</td>

            <td>{student.name}</td>

            <td className="actions">
              <Link to={`/students/${student._id}`}>
                View
              </Link>

              <Link to={`/students/${student._id}/edit`}>
                Edit
              </Link>

              <button onClick={() => onDelete(student._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;