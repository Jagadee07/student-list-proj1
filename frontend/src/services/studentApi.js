const API_URL =
  `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/students`;

export const getStudents = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  return response.json();
};

export const getStudent = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch student");
  }

  return response.json();
};

export const createStudent = async (studentData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(studentData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create student");
  }

  return data;
};
export const updateStudent = async (id, studentData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(studentData)
  });

  if (!response.ok) {
    throw new Error("Failed to update student");
  }

  return response.json();
};

export const deleteStudent = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete student");
  }

  return response.json();
};